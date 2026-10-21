/**
 * SSC Chemistry blog content.
 *
 * Kept in one module so the blog index, post pages and sitemap all read from
 * the same source. Posts are editorial guides — no scores, ranks or claims
 * about results.
 */

export type BlogSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  intro: string;
  sections: BlogSection[];
  closing: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mole-concept-guide",
    title: "Chapter 6: Mastering the Mole Concept",
    excerpt:
      "The mole is where many SSC students first get stuck in chemistry. Here is a calm, chapter-wise way to handle the three conversions that cover most numericals.",
    category: "Chapter Guide",
    readTime: "6 min",
    date: "Oct 15, 2026",
    intro:
      "The mole concept is not a separate topic to memorise — it is a bridge between grams, particles and litres. Once you see it that way, most Chapter 6 numericals become the same three steps repeated.",
    sections: [
      {
        heading: "Start with what a mole actually is",
        body: "One mole is 6.022 × 10²³ particles (Avogadro's number). That number is not something you measure on a balance; it is a counting unit, like a dozen but much larger. The useful part is that one mole of a substance has a mass equal to its molar mass in grams.",
      },
      {
        heading: "The three conversions that cover most questions",
        body: "Nearly every mole numerical asks you to move between mass, particles and gas volume. Keep these three relationships on one line in your formula sheet:",
        bullets: [
          "Mass → moles: n = m ÷ M, where M is the molar mass of the compound",
          "Moles → particles: N = n × 6.022 × 10²³",
          "Moles → gas volume at STP: V = n × 22.4 L",
        ],
      },
      {
        heading: "A worked example",
        body: "For 11 g of CO₂: molar mass = 12 + (16 × 2) = 44 g/mol, so n = 11 ÷ 44 = 0.25 mol. If the question then asks for molecules, multiply by Avogadro's number: 0.25 × 6.022 × 10²³ = 1.5055 × 10²³ molecules. Notice that the second step uses the answer from the first — write both steps down, because method marks are real marks.",
      },
      {
        heading: "Common mistakes to avoid",
        body: "Most lost marks in this chapter come from two habits, not from hard chemistry:",
        bullets: [
          "Using the atomic mass of an element when the question gives a compound — always calculate the full molar mass",
          "Forgetting that gas volume at STP only applies at 0 °C and 1 atm; other conditions need the ideal gas equation",
        ],
      },
    ],
    closing:
      "Practise five mole numericals a day for a week and the conversions stop feeling like formulas and start feeling like arithmetic. Use the numerical practice page to check each step, not just the final answer.",
  },
  {
    slug: "balancing-equations",
    title: "Balancing Chemical Equations Without Guesswork",
    excerpt:
      "Balancing is a skill, not a memory test. Use a fixed order, treat polyatomic ions as units, and check both sides before you move on.",
    category: "Skills",
    readTime: "5 min",
    date: "Oct 10, 2026",
    intro:
      "A balanced equation is simply a statement that atoms are conserved. The difficulty is bookkeeping, not chemistry — which means a fixed method will beat guessing every time.",
    sections: [
      {
        heading: "Count atoms, not molecules",
        body: "Write the unbalanced equation, then make a quick table of each element and the number of atoms on both sides. Update the table after every coefficient you change. This is slower for the first few equations and much faster by the tenth.",
      },
      {
        heading: "Treat polyatomic ions as single units",
        body: "If SO₄²⁻ or NO₃⁻ appears unchanged on both sides, balance it as one group instead of counting sulfur and oxygen separately. This prevents the most common double-displacement errors.",
      },
      {
        heading: "Work in a fixed order",
        body: "A reliable order for SSC equations is: metals, then non-metals, then hydrogen, then oxygen last. Oxygen usually appears in several compounds, so leaving it until the end avoids re-balancing everything else.",
        bullets: [
          "Balance the most complex compound first",
          "Use the lowest whole-number coefficients",
          "Never change a subscript to balance — only the coefficient in front",
        ],
      },
      {
        heading: "Check both sides before moving on",
        body: "Recount every element after your final coefficient. If one side has an odd number and the other an even number, double the relevant coefficient rather than introducing fractions. Fractions are acceptable in intermediate steps but not in the final answer.",
      },
    ],
    closing:
      "Use the equation balancing practice to work through eight real equations with hints. Mark yourself honestly — the ones you get wrong are the ones worth repeating tomorrow.",
  },
  {
    slug: "chemistry-cq-answer",
    title: "How to Write a Full-Marks Chemistry CQ Answer",
    excerpt:
      "সৃজনশীল answers are marked part by part. Learn how to structure each part, where the marks actually sit, and why writing more is not always better.",
    category: "Exam Strategy",
    readTime: "6 min",
    date: "Oct 5, 2026",
    intro:
      "A CQ (সৃজনশীল প্রশ্ন) rewards structure more than length. Each part has a job, and the final part carries the most marks — so it deserves the most planning time, not the most words.",
    sections: [
      {
        heading: "Read the stem once, then map the parts",
        body: "The stem gives you the data and the context. Before writing anything, underline the substance names, conditions and quantities. Then read all four parts together: the earlier parts often give you the facts you need for the final one.",
      },
      {
        heading: "Answer in the order asked",
        body: "Markers follow the parts in order. Keep each answer under its own part label, and do not merge parts into one paragraph. A clear structure makes it easy for the examiner to award each mark.",
      },
      {
        heading: "Give the definition, then the application",
        body: "For knowledge and comprehension parts, a precise definition plus one example is usually enough. For application parts, show the equation or calculation with units. For the final higher-order part, take a position and support it with chemistry — not with general advice.",
        bullets: [
          "Write equations with correct symbols and conditions",
          "Show calculation steps and units, even when the answer is short",
          "Use the correct Bangla or English terminology consistently",
        ],
      },
      {
        heading: "Practise against a mark scheme",
        body: "Writing answers without checking them against a mark scheme trains length, not accuracy. After each practice CQ, compare your answer part by part and note which specific mark you missed — definition, example, equation, or conclusion.",
      },
    ],
    closing:
      "CQ practice is part of the practice centre. Start with one chapter, write one full answer under timed conditions, then review it against the expected structure before attempting the next.",
  },
  {
    slug: "periodic-trends",
    title: "Periodic Trends You Must Know for SSC",
    excerpt:
      "Atomic radius, ionisation potential and electronegativity follow three simple directions. Learn the directions once and the MCQ traps stop working.",
    category: "Chapter Guide",
    readTime: "5 min",
    date: "Sep 28, 2026",
    intro:
      "Chapter 4 is full of trends that look like isolated facts. They are not — they all come from the same two ideas: nuclear charge and the number of shells.",
    sections: [
      {
        heading: "Across a period",
        body: "Moving left to right, protons are added while electrons stay in the same shell. The nucleus pulls the outer electrons more strongly, so atomic radius decreases, ionisation potential increases and electronegativity increases.",
      },
      {
        heading: "Down a group",
        body: "Moving down, a new shell is added each time. The outer electrons are farther from the nucleus and screened by inner electrons, so atomic radius increases, ionisation potential decreases and electronegativity decreases.",
      },
      {
        heading: "The traps that appear in MCQs",
        body: "Most wrong options in periodic-table MCQs come from reversing a direction or confusing the property being asked about:",
        bullets: [
          "Atomic radius increases down a group — it decreases across a period",
          "Ionisation potential is the energy needed to remove an electron, so it rises across a period",
          "Group number gives the number of valence electrons for main-group elements, which determines valency",
        ],
      },
      {
        heading: "Connect position to behaviour",
        body: "Once you know an element's group and period, you can predict its valency, whether it forms ionic or covalent bonds, and how it will behave in a displacement reaction. That connection is what the board questions actually test.",
      },
    ],
    closing:
      "Use the interactive periodic table to check group and period for elements 1–54, then test yourself with the chapter-wise MCQ drill.",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
