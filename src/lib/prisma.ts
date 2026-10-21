/**
 * In-memory Prisma-compatible store.
 *
 * The project ships without a generated Prisma client / live database, so this
 * module keeps the exact same API surface Prisma Client exposes (the same
 * method names and argument shapes the rest of the app already calls) while
 * persisting rows on `globalThis` for the lifetime of the server process.
 *
 * Behaviour notes:
 *  - `findUnique` / `findFirst` return `null` when nothing matches — which is
 *    what real Prisma does — so flows like "does this email already exist?"
 *    behave correctly instead of always hitting a canned object.
 *  - Rows survive file reloads in `next dev` (stored on globalThis, not module
 *    scope) and last for the process lifetime in production. Nothing is written
 *    to disk or sent anywhere.
 *  - Only `where` equality (plus simple `in` / `not`) is evaluated; relation
 *    filters are ignored, matching how the app queries this store.
 */

type Row = Record<string, any>;

const TABLES_KEY = "__atAcademyTables";

function tables(): Record<string, Row[]> {
  const g = globalThis as Record<string, unknown>;
  if (!g[TABLES_KEY]) g[TABLES_KEY] = {};
  return g[TABLES_KEY] as Record<string, Row[]>;
}

function rowsOf(name: string): Row[] {
  const all = tables();
  if (!all[name]) all[name] = [];
  return all[name];
}

function matches(row: Row, where?: Row): boolean {
  if (!where) return true;
  for (const [key, value] of Object.entries(where)) {
    if (value === undefined) continue;
    if (value !== null && typeof value === "object" && !(value instanceof Date) && !Array.isArray(value)) {
      if ("in" in value) {
        if (!(value as { in: unknown[] }).in.includes(row[key])) return false;
        continue;
      }
      if ("not" in value) {
        if (row[key] === (value as { not: unknown }).not) return false;
        continue;
      }
      // Other operators / relation filters are not evaluated by this store.
      continue;
    }
    if (row[key] !== value) return false;
  }
  return true;
}

function makeStore(name: string, uniqueKeys: string[] = ["id"]) {
  const create = async (args?: { data?: Row }) => {
    const rows = rowsOf(name);
    const data = args?.data ?? {};
    const row: Row = {
      id: data.id ?? `${name}_${Date.now()}_${rows.length + 1}`,
      createdAt: data.createdAt ?? new Date(),
      ...data,
    };
    rows.push(row);
    return row;
  };

  const findUnique = async (args?: { where?: Row; include?: Row; select?: Row }) => {
    const where = args?.where ?? {};
    // Unique lookups (email, slug, id…) are plain equality on this store.
    return rowsOf(name).find((row) => matches(row, where)) ?? null;
  };

  const findFirst = async (args?: { where?: Row; orderBy?: Row; include?: Row; select?: Row }) => {
    const rows = sortRows(rowsOf(name).filter((row) => matches(row, args?.where)), args?.orderBy);
    return rows[0] ?? null;
  };

  const findMany = async (args?: {
    where?: Row;
    orderBy?: Row;
    take?: number;
    skip?: number;
    include?: Row;
    select?: Row;
  }) => {
    let rows = sortRows(rowsOf(name).filter((row) => matches(row, args?.where)), args?.orderBy);
    if (args?.skip) rows = rows.slice(args.skip);
    if (args?.take !== undefined) rows = rows.slice(0, args.take);
    return rows;
  };

  const count = async (args?: { where?: Row }) =>
    rowsOf(name).filter((row) => matches(row, args?.where)).length;

  const update = async (args?: { where?: Row; data?: Row }) => {
    const row = rowsOf(name).find((candidate) => matches(candidate, args?.where));
    if (!row) return null;
    Object.assign(row, args?.data ?? {}, { updatedAt: new Date() });
    return row;
  };

  const updateMany = async (args?: { where?: Row; data?: Row }) => {
    const targets = rowsOf(name).filter((candidate) => matches(candidate, args?.where));
    for (const row of targets) Object.assign(row, args?.data ?? {}, { updatedAt: new Date() });
    return { count: targets.length };
  };

  const deleteRow = async (args?: { where?: Row }) => {
    const rows = rowsOf(name);
    const index = rows.findIndex((candidate) => matches(candidate, args?.where));
    if (index === -1) return null;
    const [removed] = rows.splice(index, 1);
    return removed;
  };

  const deleteMany = async (args?: { where?: Row }) => {
    const rows = rowsOf(name);
    const keep = rows.filter((candidate) => !matches(candidate, args?.where));
    const count = rows.length - keep.length;
    rows.length = 0;
    rows.push(...keep);
    return { count };
  };

  const upsert = async (args?: { where?: Row; create?: Row; update?: Row }) => {
    const existing = rowsOf(name).find((row) => matches(row, args?.where));
    if (existing) {
      Object.assign(existing, args?.update ?? {}, { updatedAt: new Date() });
      return existing;
    }
    return create({ data: args?.create });
  };

  void uniqueKeys;
  return { create, findUnique, findFirst, findMany, count, update, updateMany, delete: deleteRow, deleteMany, upsert };
}

function sortRows(rows: Row[], orderBy?: Row): Row[] {
  if (!orderBy) return rows;
  const [key, direction] = Object.entries(orderBy)[0] ?? [];
  if (!key) return rows;
  const factor = direction === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => {
    const left = a[key] instanceof Date ? a[key].getTime() : a[key];
    const right = b[key] instanceof Date ? b[key].getTime() : b[key];
    if (left === right) return 0;
    if (left === undefined || left === null) return 1;
    if (right === undefined || right === null) return -1;
    return left < right ? -factor : factor;
  });
}

/** Static singletons kept for read-only catalogue-ish lookups that stay empty until seeded. */
const empty = () => ({
  findMany: async (..._a: any[]) => [],
  findUnique: async (..._a: any[]) => null,
  findFirst: async (..._a: any[]) => null,
  count: async (..._a: any[]) => 0,
  create: async (..._a: any[]) => ({}),
  update: async (..._a: any[]) => ({}),
  delete: async (..._a: any[]) => ({}),
});

export class PrismaClient {
  async $connect() { return; }
  async $disconnect() { return; }
  async $transaction<T>(fn: any): Promise<T> { return fn(this); }

  // Backed by the in-memory store: auth, enrolment and order flows are real
  // within a running server process (register → login → enrolment → access).
  user = makeStore("user", ["id", "email"]);
  enrollment = makeStore("enrollment", ["id"]);
  order = makeStore("order", ["id"]);
  payment = makeStore("payment", ["id"]);
  doubt = makeStore("doubt", ["id"]);
  note = makeStore("note", ["id"]);
  bookmark = makeStore("bookmark", ["id"]);
  achievement = makeStore("achievement", ["id"]);
  testimonial = makeStore("testimonial", ["id"]);

  // Catalogue / content models stay inert until real content or a database is
  // wired in — public content lives in `src/lib/site.ts`.
  course = { ...empty(), findUnique: async (..._a: any[]) => null };
  category = empty();
  batch = empty();
  lesson = empty();
  chapter = empty();
  exam = empty();
  liveClass = empty();
  attendance = empty();
  announcement = empty();
  faq = empty();
  profile = empty();
  auditLog = makeStore("auditLog", ["id"]);
  examAttempt = empty();
  examAnswer = empty();
  question = empty();
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined; };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
