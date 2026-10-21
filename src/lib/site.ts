/**
 * AT Academy — shared site configuration.
 *
 * AT Academy is positioned as a focused SSC Chemistry learning platform.
 * The data model underneath stays generic (Subject → Course → Chapter →
 * Lesson, see prisma/schema.prisma) so additional subjects can be enabled
 * later through the admin system — but the public product experience is
 * configured for SSC Chemistry only.
 *
 * The public marketing pages are editorial content curated for AT Academy.
 * Enrolment, progress, payments and access control are served by the existing
 * application logic (see src/lib/prisma.ts and src/lib/require-course-access.ts).
 */

/**
 * Resolve the public site URL, ignoring unusable values.
 *
 * NEXT_PUBLIC_APP_URL is injected by the host (Vercel/Netlify). It has been
 * observed to arrive as a placeholder such as "[SENSITIVE]" or as a relative
 * path, neither of which is a valid absolute URL. A bad value used to crash
 * `new URL()` during page-data collection, failing the entire build, so only
 * accept a value that actually parses as http(s) and fall back otherwise.
 */
function resolveSiteUrl(): string {
  const fallback = "https://at-academy.netlify.app";
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!raw) return fallback;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? parsed.origin
      : fallback;
  } catch {
    return fallback;
  }
}

export const site = {
  name: "AT Academy",
  tagline: "SSC Chemistry learning platform — from fundamentals to board-style exam preparation.",
  url: resolveSiteUrl(),
  email: "support@at-academy.com",
  emailAlt: "info@at-academy.com",
  phone: "+880 1712-345678",
  phoneAlt: "+880 2-1234 5678",
  addressLines: ["Dhanmondi, Dhaka-1205", "Bangladesh"],
  timezone: "Asia/Dhaka",
  timezoneLabel: "Bangladesh Standard Time (GMT+6)",
  social: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
  },
} as const;

export type NavItem = { href: string; label: string; description?: string };

export const primaryNav: NavItem[] = [
  { href: "/courses", label: "Courses", description: "SSC Chemistry programmes" },
  { href: "/chapters", label: "Chapters", description: "The full SSC Chemistry syllabus" },
  { href: "/live-classes", label: "Live Classes", description: "Scheduled Chemistry sessions" },
  { href: "/practice", label: "Practice", description: "MCQ, CQ, numericals & tests" },
  { href: "/teachers", label: "Teachers", description: "Meet your Chemistry educators" },
  { href: "/results", label: "Results", description: "Verified student outcomes" },
  { href: "/about", label: "About", description: "Our Chemistry mission" },
];

export const resourcesNav: NavItem[] = [
  { href: "/chemistry/formulas", label: "Formula Library", description: "Searchable formulas by chapter" },
  { href: "/chemistry/equations", label: "Equation Library", description: "Reactions, reactants & conditions" },
  { href: "/chemistry/periodic-table", label: "Periodic Table", description: "Interactive element explorer" },
  { href: "/chemistry/balancing", label: "Equation Balancing", description: "Balancing practice" },
  { href: "/chemistry/mcq", label: "MCQ Practice", description: "Chapter-wise question drills" },
  { href: "/account/notes", label: "My Notes", description: "Your saved Chemistry notes" },
  { href: "/faq", label: "FAQ", description: "Answers to common questions" },
];

/* ------------------------------------------------------------------ */
/* Catalogue                                                          */
/* ------------------------------------------------------------------ */

export type CourseLevel = "SSC" | "HSC";
export type CourseMode = "Live" | "Recorded" | "Hybrid";
export type CourseType = "Complete Course" | "Chapter-wise" | "Revision Course" | "Model Test Series";
export type AccentKey = "blue" | "cyan" | "navy";

export type Chapter = {
  title: string;
  lessons: number;
  duration: string;
};

export type Course = {
  slug: string;
  title: string;
  subject: string;
  level: CourseLevel;
  type: CourseType;
  mode: CourseMode;
  accent: AccentKey;
  tag?: string;
  featured?: boolean;
  price: number;
  compareAt?: number;
  installment?: string;
  lessons: number;
  chaptersCount: number;
  hours: number;
  /** Number of scheduled live sessions in the batch, where the programme has them. */
  liveSessions?: number;
  instructor: string;
  instructorTitle: string;
  rating: number;
  ratingCount: number;
  seatsLeft?: number;
  startsOn?: string;
  summary: string;
  outcomes: string[];
  includes: string[];
  chapters: Chapter[];
  faqs: { q: string; a: string }[];
};

export const courses: Course[] = [
  {
    slug: "ssc-chemistry",
    title: "SSC Chemistry Complete Course",
    subject: "Chemistry",
    level: "SSC",
    type: "Complete Course",
    mode: "Hybrid",
    accent: "blue",
    tag: "Flagship",
    featured: true,
    price: 4999,
    compareAt: 6500,
    installment: "or 3 × BDT 1,667",
    lessons: 48,
    chaptersCount: 12,
    hours: 96,
    liveSessions: 24,
    instructor: "Md. Tareque Aziz",
    instructorTitle: "B.Sc. (Honours) & M.Sc. Chemistry · Assistant Teacher, Chittagong Collegiate School",
    rating: 4.9,
    ratingCount: 312,
    seatsLeft: 12,
    startsOn: "Batch starts 10 Nov 2026",
    summary:
      "The complete NCTB SSC Chemistry programme — 12 chapters, live problem-solving classes, recorded lessons, formula library and chapter-wise MCQ/CQ practice.",
    outcomes: [
      "Master all 12 NCTB SSC Chemistry chapters end to end",
      "Balance chemical equations and solve mole-concept numericals confidently",
      "Read and analyse the periodic table like a chemist",
      "Answer CQ (সৃজনশীল) items with structured mark-scheme technique",
      "Complete practical preparation for the board practical exam",
      "Revise with flashcards, formula sheets and past-paper walkthroughs",
    ],
    includes: [
      "48 recorded lessons across 12 chapters",
      "24 live classes (Bangladesh Standard Time)",
      "Chapter-wise MCQ and CQ practice sets",
      "Interactive periodic table & equation balancer",
      "Downloadable notes and formula library",
      "Doubt-solving support thread",
    ],
    chapters: [
      { title: "Concept of Chemistry", lessons: 4, duration: "6h 40m" },
      { title: "States of Matter", lessons: 4, duration: "7h 10m" },
      { title: "Structure of Matter", lessons: 5, duration: "9h 20m" },
      { title: "Periodic Table", lessons: 4, duration: "7h 50m" },
      { title: "Chemical Bond", lessons: 4, duration: "8h 05m" },
      { title: "Concept of Mole and Chemical Calculation", lessons: 5, duration: "10h 30m" },
      { title: "Chemical Reaction", lessons: 4, duration: "7h 15m" },
      { title: "Chemistry and Energy", lessons: 3, duration: "5h 45m" },
      { title: "Acid-Base Balance", lessons: 4, duration: "7h 55m" },
      { title: "Mineral Resources: Metals and Non-metals", lessons: 5, duration: "9h 30m" },
      { title: "Mineral Resources: Fossils", lessons: 3, duration: "5h 40m" },
      { title: "Chemistry in Our Lives", lessons: 4, duration: "7h 05m" },
    ],
    faqs: [
      { q: "Is this a live class or a recorded course?", a: "Both. You get 24 live sessions in Bangladesh Standard Time plus all lessons recorded so you can revise at any time." },
      { q: "How long do I get access?", a: "Course access runs for 12 months from your batch start date, including all future updates to the course." },
      { q: "What if I miss a live class?", a: "Every live class is recorded and published to your dashboard within 4 hours of the session ending." },
      { q: "Do you support bKash and Nagad?", a: "Yes. bKash, Nagad, card payments and bank transfer are all supported at checkout." },
    ],
  },
  {
    slug: "ssc-chemistry-crash",
    title: "SSC Chemistry Final Revision Crash Course",
    subject: "Chemistry",
    level: "SSC",
    type: "Revision Course",
    mode: "Live",
    accent: "navy",
    tag: "Exam Season",
    price: 1999,
    lessons: 20,
    chaptersCount: 12,
    hours: 40,
    liveSessions: 20,
    instructor: "Md. Tareque Aziz",
    instructorTitle: "B.Sc. (Honours) & M.Sc. Chemistry · Assistant Teacher, Chittagong Collegiate School",
    rating: 4.9,
    ratingCount: 74,
    seatsLeft: 22,
    startsOn: "Batch starts 05 Dec 2026",
    summary:
      "A focused 6-week live revision sprint covering the whole SSC Chemistry syllabus with daily MCQ drills and model tests.",
    outcomes: [
      "Revise every chapter in a condensed, exam-first format",
      "Complete 12 timed model tests with feedback",
      "Rehearse the highest-frequency board questions",
    ],
    includes: [
      "20 live revision classes",
      "12 timed model tests",
      "Condensed revision notes",
      "Live doubt-clearing every Friday",
    ],
    chapters: [
      { title: "Weeks 1–2 · Core Concepts", lessons: 7, duration: "14h 00m" },
      { title: "Weeks 3–4 · Reactions & Calculations", lessons: 7, duration: "14h 00m" },
      { title: "Weeks 5–6 · Model Tests & Revision", lessons: 6, duration: "12h 00m" },
    ],
    faqs: [
      { q: "Who is this crash course for?", a: "SSC candidates who want a fast, exam-focused revision before the board examination." },
      { q: "Are the classes recorded?", a: "Yes, all live revision classes are recorded for later review." },
    ],
  },
];

/**
 * The platform's data model supports multiple subjects and levels — SSC
 * Chemistry is the currently published product. Additional subjects (SSC
 * Mathematics, Physics, HSC Chemistry, …) can be enabled through the admin
 * system later without redesigning the architecture.
 */
export const subjects = ["Chemistry"] as const;
export const levels: CourseLevel[] = ["SSC"];
export const modes: CourseMode[] = ["Live", "Recorded", "Hybrid"];
export const courseTypes: CourseType[] = ["Complete Course", "Revision Course"];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Teachers — SSC Chemistry faculty                                    */
/* ------------------------------------------------------------------ */

export type TeacherProfile = {
  id: string;
  name: string;
  /** Bangla name as it appears on official records. */
  nameBn: string;
  /** Designation in English. */
  role: string;
  roleBn: string;
  institution: string;
  institutionBn: string;
  specialization: string;
  qualifications: string;
  training: string[];
  /** Public service (PDS) ID. */
  pdsId: string;
  district: string;
  districtBn: string;
  /** First posting in a government school. */
  joined: string;
  experience: string;
  focus: string;
  teaches: string[];
  email: string;
  photo: string;
  location: string;
  mapEmbedUrl: string;
  resource: { label: string; href: string; note: string };
};

export const teachers: TeacherProfile[] = [
  {
    id: "md-tareque-aziz",
    name: "Md. Tareque Aziz",
    nameBn: "মোঃ তারেক আজিজ",
    role: "Assistant Teacher (Physical Science)",
    roleBn: "সহকারী শিক্ষক (ভৌত বিজ্ঞান)",
    institution: "Chittagong Collegiate School",
    institutionBn: "চট্টগ্রাম কলেজিয়েট স্কুল",
    specialization: "SSC Chemistry",
    qualifications: "B.Sc. (Honours) & M.Sc. in Chemistry",
    training: ["B.Ed", "ICI", "Curriculum", "Question Setter & Moderator"],
    pdsId: "2017714502",
    district: "Cox's Bazar",
    districtBn: "কক্সবাজার",
    joined: "2017 (34th BCS, Non-cadre)",
    experience: "Government school teacher since 2017",
    focus:
      "Concept-first Chemistry teaching: every chapter starts from the idea, then moves to equations and numericals, and finally to board-style CQ and MCQ practice — never memorisation alone.",
    teaches: [
      "Concept of Chemistry",
      "States of Matter",
      "Structure of Matter",
      "Periodic Table",
      "Chemical Bond",
      "Concept of Mole and Chemical Calculation",
      "Chemical Reaction",
      "Chemistry and Energy",
      "Acid-Base Balance",
      "Mineral Resources: Metals and Non-metals",
      "Mineral Resources: Fossils",
      "Chemistry in Our Lives",
    ],
    email: "md.tarequec@gmail.com",
    photo: "https://ctgcs.edu.bd/uploads/1742791050.jpeg",
    location: "Ice Factory Rd, Chittagong, Bangladesh",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.537430075478!2d91.82479546090842!3d22.333327398475742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8af31bdc191%3A0x58dae09129584959!2sIce%20Factory%20Rd%2C%20Chittagong%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1792428013564!5m2!1sen!2sus",
    resource: {
      label: "SSC Chemistry textbook (Google Drive)",
      href: "https://drive.google.com/file/d/1lbgge3uWpQmuHOBvlxJ4AuPP2Na1RYQ8/view",
      note: "The prescribed Chemistry textbook used alongside every class.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Reviews — only real, supplied feedback should be published here.   */
/* ------------------------------------------------------------------ */

export type Review = {
  name: string;
  course: string;
  quote: string;
  rating: number;
};

/**
 * Intentionally empty until verified student feedback is supplied.
 * The UI renders a tasteful empty state instead of invented testimonials.
 */
export const reviews: Review[] = [];

/* ------------------------------------------------------------------ */
/* FAQ                                                               */
/* ------------------------------------------------------------------ */

export const faqGroups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "SSC Chemistry Course",
    items: [
      { q: "What does AT Academy teach?", a: "AT Academy is a focused SSC Chemistry learning platform. Every course, chapter, live class and practice set is built around the NCTB SSC Chemistry syllabus — nothing else." },
      { q: "Is the content aligned with the NCTB syllabus?", a: "Yes. All 12 chapters of the NCTB SSC Chemistry textbook are covered in order, with lessons, notes, practice and quizzes mapped to each one." },
      { q: "How long does the complete course take?", a: "The complete programme runs 6–8 months with a structured chapter plan. The revision crash course is a focused 6-week sprint before the board exam." },
      { q: "Can I access recorded lessons?", a: "Yes. Every live class is recorded, and the complete course includes a full recorded lesson library with resume tracking and playback speed." },
      { q: "Does the course cover practical preparation?", a: "Yes. Practical preparation is built into the course rather than left to the final week — including common board practical experiments and viva questions." },
    ],
  },
  {
    title: "Enrolment & Payment",
    items: [
      { q: "How do I enrol in a course?", a: "Open any course page and choose Enrol. You will be guided through checkout and receive dashboard access once payment is confirmed." },
      { q: "What payment methods are accepted?", a: "bKash, Nagad, card payments and bank transfer are supported. Availability is shown at checkout." },
      { q: "Can I pay in instalments?", a: "Instalment options are offered on selected courses and shown on the course page where available." },
      { q: "Can I switch batches?", a: "Yes. You can request a batch change within 7 days of your batch start date at no extra cost." },
    ],
  },
  {
    title: "Live Classes",
    items: [
      { q: "When are live classes held?", a: "Schedules vary by batch and are always published in Bangladesh Standard Time (GMT+6) on the Live Classes page and in your dashboard." },
      { q: "What happens if I miss a session?", a: "Every live class is recorded and published to your dashboard within 4 hours of the session ending." },
      { q: "How do I join a live class?", a: "Join links are never public. They appear in your dashboard only when you are enrolled in that batch and the class is about to start." },
    ],
  },
  {
    title: "Practice & Exams",
    items: [
      { q: "What practice options are available?", a: "Chapter-wise MCQ practice, CQ (সৃজনশীল) writing practice, numerical problem solving, equation balancing, valency drills and full model tests." },
      { q: "Are model tests board-style?", a: "Model tests follow the board paper pattern and mark distribution. We use board-style practice — never claims of guaranteed common questions." },
      { q: "How is my progress tracked?", a: "Lesson completion, practice accuracy, quiz scores and weak topics are all tracked in your Chemistry dashboard." },
    ],
  },
  {
    title: "Account & Support",
    items: [
      { q: "How do I get help with a doubt?", a: "Every course includes a doubt-solving thread where your Chemistry teacher replies. You can also raise a support ticket from your account area." },
      { q: "Is there a free demo?", a: "Yes — free demo lessons are listed on the homepage and course pages, and free practice sets are available without enrolling." },
      { q: "Which devices are supported?", a: "The platform is fully responsive and works on phones, tablets and desktops. No separate app install is required to watch lessons." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

export function accentClasses(accent: AccentKey, variant: "solid" | "soft" | "text" = "solid") {
  const map = {
    blue: {
      solid: "bg-gradient-to-br from-brand-500 to-brand-700",
      soft: "bg-brand-50 text-brand-700",
      text: "text-brand-600",
    },
    cyan: {
      solid: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      soft: "bg-cyan-50 text-cyan-700",
      text: "text-cyan-600",
    },
    navy: {
      solid: "bg-gradient-to-br from-navy-700 to-navy-900",
      soft: "bg-navy-50 text-navy-700",
      text: "text-navy-700",
    },
  } as const;
  return map[accent][variant];
}
