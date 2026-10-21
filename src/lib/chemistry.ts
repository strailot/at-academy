/**
 * SSC Chemistry content model.
 *
 * This module defines the structured SSC Chemistry content hierarchy used by
 * the public chapter map, chapter detail pages, practice centre and tools:
 *
 *   SSC Chemistry → Chapter → Topics → Lessons → Practice → Quiz → Revision
 *
 * Chapter names follow the current NCTB SSC (Class 9–10) Chemistry textbook.
 * These records mirror the admin-manageable content model (Course → Chapter →
 * Lesson in prisma/schema.prisma); when the database is connected, this data
 * is replaced by the CMS-managed equivalents without UI changes.
 */

export type SscChemistryChapter = {
  number: number;
  slug: string;
  /** English chapter name (matches the course catalogue). */
  title: string;
  /** Bangla chapter name as used in the NCTB textbook. */
  titleBn: string;
  summary: string;
  objectives: string[];
  topics: string[];
  lessons: number;
  duration: string;
  practiceCount: number;
  mcqCount: number;
  cqCount: number;
  numericalCount: number;
  commonMistakes: string[];
  keyFormulas: { label: string; formula: string }[];
};

export const sscChemistryChapters: SscChemistryChapter[] = [
  {
    number: 1,
    slug: "concepts-of-chemistry",
    title: "Concept of Chemistry",
    titleBn: "রসায়নের ধারণা",
    summary:
      "What chemistry is, how matter is classified, and the language of elements, compounds and mixtures — the foundation for the whole syllabus.",
    objectives: [
      "Distinguish elements, compounds and mixtures with examples",
      "Classify matter as pure substances and impure substances",
      "Describe the characteristics of physical and chemical changes",
      "Understand the laws of conservation of mass and constant composition",
    ],
    topics: [
      "Definition and scope of chemistry",
      "Classification of matter",
      "Elements, compounds and mixtures",
      "Physical and chemical changes",
      "Laws of chemical combination",
      "Symbols and formulae",
    ],
    lessons: 4,
    duration: "6h 40m",
    practiceCount: 120,
    mcqCount: 80,
    cqCount: 12,
    numericalCount: 8,
    commonMistakes: [
      "Confusing mixtures with compounds — compounds have fixed composition, mixtures do not",
      "Writing symbol case incorrectly (e.g. CO is carbon monoxide, Co is cobalt)",
    ],
    keyFormulas: [
      { label: "Law of conservation of mass", formula: "Σ mass of reactants = Σ mass of products" },
      { label: "Mass percent of an element", formula: "(mass of element ÷ molar mass of compound) × 100" },
    ],
  },
  {
    number: 2,
    slug: "states-of-matter",
    title: "States of Matter",
    titleBn: "পদার্থের অবস্থা",
    summary:
      "Solids, liquids and gases explained through kinetic molecular theory, with diffusion, evaporation and gas behaviour.",
    objectives: [
      "Explain the three states of matter using kinetic molecular theory",
      "Describe diffusion and the effect of temperature on it",
      "Distinguish evaporation from boiling",
      "Apply the gas laws to simple numerical problems",
    ],
    topics: [
      "Kinetic molecular theory",
      "Solids, liquids and gases compared",
      "Diffusion and Graham's law",
      "Evaporation and boiling",
      "Boyle's law and Charles's law",
      "Plasma and liquid crystal states",
    ],
    lessons: 4,
    duration: "7h 10m",
    practiceCount: 110,
    mcqCount: 75,
    cqCount: 10,
    numericalCount: 12,
    commonMistakes: [
      "Mixing up Boyle's law (constant temperature) and Charles's law (constant pressure)",
      "Forgetting to convert units to kelvin in gas calculations",
    ],
    keyFormulas: [
      { label: "Boyle's law", formula: "P₁V₁ = P₂V₂ (T constant)" },
      { label: "Charles's law", formula: "V₁/T₁ = V₂/T₂ (P constant)" },
      { label: "Ideal gas equation", formula: "PV = nRT" },
    ],
  },
  {
    number: 3,
    slug: "structure-of-matter",
    title: "Structure of Matter",
    titleBn: "পদার্থের গঠন",
    summary:
      "From Dalton's atom to subatomic particles, electronic configuration, isotopes and radioactivity — the atomic theory behind every reaction.",
    objectives: [
      "Describe subatomic particles and their relative masses",
      "Write electronic configurations of the first 20 elements",
      "Distinguish isotopes and isobars with uses",
      "Explain the causes and effects of radioactivity",
    ],
    topics: [
      "Dalton's atomic theory",
      "Subatomic particles",
      "Atomic number and mass number",
      "Electronic configuration and shells",
      "Isotopes and isobars",
      "Radioactivity and nuclear reactions",
    ],
    lessons: 5,
    duration: "9h 20m",
    practiceCount: 140,
    mcqCount: 95,
    cqCount: 14,
    numericalCount: 15,
    commonMistakes: [
      "Filling shells beyond capacity (K=2, L=8, M=8 for the first 20 elements)",
      "Confusing mass number with atomic mass — mass number is a whole number count of nucleons",
    ],
    keyFormulas: [
      { label: "Mass number", formula: "A = number of protons + number of neutrons" },
      { label: "Number of neutrons", formula: "n = A − Z" },
    ],
  },
  {
    number: 4,
    slug: "periodic-table",
    title: "Periodic Table",
    titleBn: "পর্যায় সারণি",
    summary:
      "Mendeleev to the modern periodic law — groups, periods, periodic properties and how position determines behaviour.",
    objectives: [
      "Explain the modern periodic law and long-form table structure",
      "Describe trends in atomic radius, ionisation potential and electronegativity",
      "Identify metals, non-metals and metalloids from position",
      "Relate group number to valency",
    ],
    topics: [
      "Early attempts at classification",
      "Modern periodic law",
      "Groups, periods and blocks",
      "Periodic properties: radius, ionisation potential, electronegativity, electron affinity",
      "Noble gases and inertness",
      "Diagonal relationships",
    ],
    lessons: 4,
    duration: "7h 50m",
    practiceCount: 105,
    mcqCount: 70,
    cqCount: 10,
    numericalCount: 6,
    commonMistakes: [
      "Ionisation potential increases across a period and decreases down a group — direction errors are the most common MCQ trap",
      "Atomic radius increases down a group, not across it",
    ],
    keyFormulas: [
      { label: "Group number and valency (main-group elements)", formula: "Valency = group number for groups 1–4 (then 8 − group number)" },
    ],
  },
  {
    number: 5,
    slug: "chemical-bonding",
    title: "Chemical Bond",
    titleBn: "রাসায়নিক বন্ধন",
    summary:
      "Why atoms bond: ionic, covalent and metallic bonding, with Lewis structures, coordinate bonds and the logic of molecular shape.",
    objectives: [
      "Explain ionic and covalent bond formation",
      "Draw Lewis electron-dot structures for simple molecules",
      "Distinguish polar and non-polar covalent bonds",
      "Describe coordinate covalent and metallic bonding",
    ],
    topics: [
      "Octet rule and valence electrons",
      "Ionic (electrovalent) bonding",
      "Covalent bonding: single, double and triple",
      "Lewis structures",
      "Coordinate covalent bonding",
      "Metallic bonding and intermolecular forces",
    ],
    lessons: 4,
    duration: "8h 05m",
    practiceCount: 115,
    mcqCount: 78,
    cqCount: 12,
    numericalCount: 5,
    commonMistakes: [
      "Counting lone pairs when drawing structures — check the octet for each atom separately",
      "Coordinate bond arrows point from donor to acceptor, never the reverse",
    ],
    keyFormulas: [
      { label: "Bond order (simple cases)", formula: "Number of shared electron pairs between two atoms" },
    ],
  },
  {
    number: 6,
    slug: "concept-of-mole",
    title: "Concept of Mole and Chemical Calculation",
    titleBn: "মোলের ধারণা ও রাসায়নিক গণনা",
    summary:
      "The mole concept: molar mass, Avogadro's number, mole–mass–volume relationships, percentage composition and empirical formulae.",
    objectives: [
      "Use the mole to convert between mass, particles and volume",
      "Calculate molar mass and percentage composition",
      "Determine empirical and molecular formulae",
      "Solve gas-volume and concentration numericals",
    ],
    topics: [
      "The mole and Avogadro's number",
      "Molar mass calculations",
      "Mass–particle–volume relationships",
      "Percentage composition",
      "Empirical and molecular formulae",
      "Solution concentration: molarity and dilution",
    ],
    lessons: 5,
    duration: "10h 30m",
    practiceCount: 160,
    mcqCount: 90,
    cqCount: 12,
    numericalCount: 40,
    commonMistakes: [
      "Using atomic mass instead of molar mass for compounds",
      "Forgetting that one mole of any gas occupies 22.4 L at STP",
    ],
    keyFormulas: [
      { label: "Moles from mass", formula: "n = m ÷ M" },
      { label: "Number of particles", formula: "N = n × 6.022 × 10²³" },
      { label: "Gas volume at STP", formula: "V = n × 22.4 L" },
      { label: "Molarity", formula: "M = moles of solute ÷ litres of solution" },
      { label: "Dilution", formula: "M₁V₁ = M₂V₂" },
    ],
  },
  {
    number: 7,
    slug: "chemical-reactions",
    title: "Chemical Reaction",
    titleBn: "রাসায়নিক বিক্রিয়া",
    summary:
      "Reaction types, writing and balancing equations, oxidation–reduction, and the collisions that actually make reactions happen.",
    objectives: [
      "Classify reactions: combination, decomposition, displacement, double displacement",
      "Balance chemical equations using the oxidation-number method",
      "Identify oxidising and reducing agents",
      "Explain factors affecting reaction rate",
    ],
    topics: [
      "Evidence of chemical reaction",
      "Types of chemical reactions",
      "Writing and balancing equations",
      "Oxidation, reduction and redox reactions",
      "Oxidation number method",
      "Rate of reaction and its factors",
    ],
    lessons: 4,
    duration: "7h 15m",
    practiceCount: 150,
    mcqCount: 85,
    cqCount: 14,
    numericalCount: 18,
    commonMistakes: [
      "Balancing atoms before accounting for polyatomic ions as a whole",
      "Oxidation is loss of electrons, reduction is gain — OIL RIG",
    ],
    keyFormulas: [
      { label: "Oxidation number rule (neutral compound)", formula: "Sum of oxidation numbers = 0" },
      { label: "Redox check", formula: "Increase in oxidation number = decrease in oxidation number" },
    ],
  },
  {
    number: 8,
    slug: "chemistry-and-energy",
    title: "Chemistry and Energy",
    titleBn: "রসায়ন ও শক্তি",
    summary:
      "Exothermic and endothermic reactions, activation energy, fuel value and the chemistry behind everyday energy use.",
    objectives: [
      "Distinguish exothermic and endothermic reactions",
      "Explain activation energy using energy-profile diagrams",
      "Calculate fuel value from combustion data",
      "Relate bond energy to heat released or absorbed",
    ],
    topics: [
      "Energy changes in reactions",
      "Exothermic and endothermic reactions",
      "Activation energy and catalysts",
      "Fuel value and calorimetry",
      "Fossil fuels, biofuels and alternative energy",
    ],
    lessons: 3,
    duration: "5h 45m",
    practiceCount: 85,
    mcqCount: 55,
    cqCount: 8,
    numericalCount: 12,
    commonMistakes: [
      "Heat released means products are lower in energy than reactants — energy profile direction errors",
      "Catalysts lower activation energy but never change the overall ΔH",
    ],
    keyFormulas: [
      { label: "Heat of reaction", formula: "ΔH = energy of products − energy of reactants" },
      { label: "Fuel value", formula: "q = m × c × ΔT (calorimetry)" },
    ],
  },
  {
    number: 9,
    slug: "acid-base-and-salt",
    title: "Acid-Base Balance",
    titleBn: "এসিড-ক্ষারক সমতা",
    summary:
      "Arrhenius and Bronsted–Lowry concepts, pH, neutralisation, indicators and the industrial chemistry of common salts.",
    objectives: [
      "Compare Arrhenius and Bronsted–Lowry definitions of acids and bases",
      "Use the pH scale to classify solutions",
      "Write neutralisation and salt-hydrolysis equations",
      "Describe preparation and uses of common salts",
    ],
    topics: [
      "Acids, bases and salts — definitions",
      "pH scale and indicators",
      "Neutralisation reactions",
      "Salt hydrolysis",
      "Preparation of NaCl, NaOH, Na₂CO₃ and bleaching powder",
      "Oxides: acidic, basic and amphoteric",
    ],
    lessons: 4,
    duration: "7h 55m",
    practiceCount: 130,
    mcqCount: 88,
    cqCount: 12,
    numericalCount: 20,
    commonMistakes: [
      "pH decreases as [H⁺] increases — the scale is logarithmic and inverse",
      "Strong acid + weak base gives an acidic salt solution, not a neutral one",
    ],
    keyFormulas: [
      { label: "pH", formula: "pH = −log[H⁺]" },
      { label: "Neutralisation", formula: "acid + base → salt + water" },
      { label: "Dilution / titration", formula: "N₁V₁ = N₂V₂" },
    ],
  },
  {
    number: 10,
    slug: "mineral-resources",
    title: "Mineral Resources: Metals and Non-metals",
    titleBn: "খনিজ সম্পদ: ধাতু-অধাতু",
    summary:
      "Where metals and non-metals come from: minerals, ores and gangue, the reactivity series, and how metals are extracted, refined and protected from corrosion.",
    objectives: [
      "Define mineral, ore and gangue",
      "Classify minerals as metallic, non-metallic and fuel minerals",
      "Arrange metals in the reactivity series and relate it to extraction method",
      "Explain roasting, calcination and smelting",
      "Describe extraction of iron, copper, aluminium and zinc",
      "Explain corrosion and methods of prevention",
    ],
    topics: [
      "Minerals, ores and gangue",
      "Metallic and non-metallic minerals",
      "Mineral resources of Bangladesh",
      "Reactivity series of metals",
      "Roasting, calcination and smelting",
      "Extraction of iron (Blast furnace)",
      "Extraction of aluminium (electrolysis)",
      "Refining, alloying and corrosion prevention",
    ],
    lessons: 5,
    duration: "9h 30m",
    practiceCount: 200,
    mcqCount: 125,
    cqCount: 18,
    numericalCount: 14,
    commonMistakes: [
      "Every ore is a mineral, but not every mineral is an ore — ore must be economically extractable",
      "Carbon reduction only works for metals below carbon in the reactivity series",
      "Roasting uses oxygen with a sulfide ore; calcination uses heat without oxygen on a carbonate ore",
    ],
    keyFormulas: [
      { label: "Concentration", formula: "% of metal in ore = (mass of metal ÷ mass of ore) × 100" },
      { label: "Blast furnace (overall)", formula: "Fe₂O₃ + 3CO → 2Fe + 3CO₂ (heat)" },
      { label: "Aluminium extraction", formula: "2Al₂O₃ → 4Al + 3O₂ (electrolysis)" },
    ],
  },
  {
    number: 11,
    slug: "fossil-resources",
    title: "Mineral Resources: Fossils",
    titleBn: "খনিজ সম্পদ: জীবাশ্ম",
    summary:
      "Fossil fuels — how coal, petroleum and natural gas form, how they are refined and used, and why their environmental cost matters.",
    objectives: [
      "Distinguish renewable and non-renewable resources",
      "Describe the formation and types of coal",
      "Explain fractional distillation of petroleum and the uses of its fractions",
      "Describe the composition and uses of natural gas",
      "Discuss the environmental impact of burning fossil fuels",
    ],
    topics: [
      "Fossil fuels and how they form",
      "Coal: types and uses",
      "Petroleum: fractional distillation and its fractions",
      "Natural gas: composition and uses",
      "Petrochemicals and plastics",
      "Fossil fuels, pollution and alternative energy",
    ],
    lessons: 3,
    duration: "5h 40m",
    practiceCount: 85,
    mcqCount: 55,
    cqCount: 9,
    numericalCount: 6,
    commonMistakes: [
      "Coal, petroleum and natural gas are non-renewable — they cannot be replaced on a human timescale",
      "Fractional distillation separates petroleum by boiling point, not by density or colour",
    ],
    keyFormulas: [
      { label: "Combustion of methane", formula: "CH₄ + 2O₂ → CO₂ + 2H₂O (heat)" },
      { label: "Fractional distillation", formula: "Fractions separate by boiling point — lighter fractions leave the column first" },
    ],
  },
  {
    number: 12,
    slug: "chemistry-in-our-life",
    title: "Chemistry in Our Lives",
    titleBn: "আমাদের জীবনে রসায়ন",
    summary:
      "Applied chemistry: fertilisers, detergents, drugs, food preservatives, polymers and environmental chemistry.",
    objectives: [
      "Classify fertilisers and describe the NPK ratio",
      "Distinguish soaps and detergents chemically",
      "Explain common drug actions and food preservation methods",
      "Identify causes of environmental pollution and greenhouse gases",
    ],
    topics: [
      "Fertilisers: organic and inorganic",
      "Soaps and detergents",
      "Drugs and pharmaceuticals",
      "Food additives and preservatives",
      "Polymers and plastics",
      "Pollution, acid rain and greenhouse effect",
    ],
    lessons: 4,
    duration: "7h 05m",
    practiceCount: 110,
    mcqCount: 75,
    cqCount: 10,
    numericalCount: 5,
    commonMistakes: [
      "Soaps fail in hard water because Ca²⁺/Mg²⁺ form scum — detergents do not",
      "NPK ratio is N : P₂O₅ : K₂O by mass, not the raw element masses",
    ],
    keyFormulas: [
      { label: "NPK ratio", formula: "N : P₂O₅ : K₂O (mass ratio in mixed fertiliser)" },
    ],
  },
];

export function getChapter(slug: string): SscChemistryChapter | undefined {
  return sscChemistryChapters.find((c) => c.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Formula Library                                                    */
/* ------------------------------------------------------------------ */

export type FormulaEntry = {
  label: string;
  formula: string;
  chapter: string;
  note: string;
};

export const formulaLibrary: FormulaEntry[] = [
  { label: "Moles from mass", formula: "n = m ÷ M", chapter: "Concept of Mole and Chemical Calculation", note: "m = given mass, M = molar mass." },
  { label: "Mass from moles", formula: "m = n × M", chapter: "Concept of Mole and Chemical Calculation", note: "Used in titration and stoichiometry problems." },
  { label: "Number of particles", formula: "N = n × Nᴀ", chapter: "Concept of Mole and Chemical Calculation", note: "Nᴀ = 6.022 × 10²³ mol⁻¹." },
  { label: "Gas volume at STP", formula: "V = n × 22.4 L", chapter: "Concept of Mole and Chemical Calculation", note: "For any ideal gas at STP (0 °C, 1 atm)." },
  { label: "Ideal gas equation", formula: "PV = nRT", chapter: "States of Matter", note: "R = 0.082 L·atm·mol⁻¹·K⁻¹." },
  { label: "Boyle's law", formula: "P₁V₁ = P₂V₂", chapter: "States of Matter", note: "Temperature held constant." },
  { label: "Charles's law", formula: "V₁ ÷ T₁ = V₂ ÷ T₂", chapter: "States of Matter", note: "Pressure held constant; T in kelvin." },
  { label: "Mass number", formula: "A = Z + n", chapter: "Structure of Matter", note: "Z = protons, n = neutrons." },
  { label: "pH", formula: "pH = −log[H⁺]", chapter: "Acid-Base Balance", note: "pH < 7 acidic, > 7 basic, = 7 neutral." },
  { label: "Neutralisation", formula: "acid + base → salt + water", chapter: "Acid-Base Balance", note: "Net ionic form: H⁺ + OH⁻ → H₂O." },
  { label: "Titration equation", formula: "N₁V₁ = N₂V₂", chapter: "Acid-Base Balance", note: "At the equivalence point of an acid–base titration." },
  { label: "Mass percent", formula: "(part ÷ whole) × 100", chapter: "Concept of Chemistry", note: "Applies to composition and yield calculations." },
  { label: "Percentage yield", formula: "(actual ÷ theoretical) × 100", chapter: "Chemical Reaction", note: "Compare experimental mass to stoichiometric mass." },
  { label: "Heat of reaction", formula: "ΔH = H(products) − H(reactants)", chapter: "Chemistry and Energy", note: "Negative ΔH = exothermic." },
  { label: "Calorimetry", formula: "q = m × c × ΔT", chapter: "Chemistry and Energy", note: "c = 4.18 J·g⁻¹·°C⁻¹ for water." },
];

/* ------------------------------------------------------------------ */
/* Equation Library                                                   */
/* ------------------------------------------------------------------ */

export type EquationEntry = {
  reaction: string;
  reactants: string;
  products: string;
  condition: string;
  type: string;
  chapter: string;
  explanation: string;
};

export const equationLibrary: EquationEntry[] = [
  { reaction: "2Na + Cl₂ → 2NaCl", reactants: "Sodium, Chlorine", products: "Sodium chloride", condition: "Room temperature", type: "Combination · Redox", chapter: "Chemical Bond", explanation: "Sodium transfers an electron to chlorine — a classic ionic bond formation." },
  { reaction: "2Mg + O₂ → 2MgO", reactants: "Magnesium, Oxygen", products: "Magnesium oxide", condition: "Burns in air", type: "Combination", chapter: "Chemical Reaction", explanation: "Magnesium burns with a white flame forming a basic oxide." },
  { reaction: "Fe + S → FeS", reactants: "Iron, Sulfur", products: "Iron(II) sulfide", condition: "Heat", type: "Combination", chapter: "Chemical Reaction", explanation: "Elements combine directly; the product has completely new properties." },
  { reaction: "N₂ + 3H₂ ⇌ 2NH₃", reactants: "Nitrogen, Hydrogen", products: "Ammonia", condition: "Fe catalyst · 450 °C · high pressure", type: "Reversible · Combination", chapter: "Chemical Reaction", explanation: "Haber process — equilibrium shifts right with higher pressure." },
  { reaction: "2KClO₃ → 2KCl + 3O₂", reactants: "Potassium chlorate", products: "Potassium chloride, Oxygen", condition: "MnO₂ catalyst · heat", type: "Decomposition", chapter: "Chemical Reaction", explanation: "A single compound breaks down; oxygen gas is collected over water." },
  { reaction: "CaCO₃ → CaO + CO₂", reactants: "Limestone", products: "Quicklime, Carbon dioxide", condition: "Strong heat (calcination)", type: "Decomposition", chapter: "Mineral Resources: Metals and Non-metals", explanation: "Industrial step in lime production and in the blast furnace feed." },
  { reaction: "Zn + 2HCl → ZnCl₂ + H₂", reactants: "Zinc, Hydrochloric acid", products: "Zinc chloride, Hydrogen", condition: "Dilute acid · room temperature", type: "Displacement", chapter: "Chemical Reaction", explanation: "Zinc lies above hydrogen in the reactivity series, so it displaces hydrogen." },
  { reaction: "CuSO₄ + Fe → FeSO₄ + Cu", reactants: "Copper sulfate, Iron", products: "Iron(II) sulfate, Copper", condition: "Aqueous solution", type: "Displacement", chapter: "Chemical Reaction", explanation: "Iron displaces copper — the blue solution turns pale green." },
  { reaction: "NaOH + HCl → NaCl + H₂O", reactants: "Sodium hydroxide, Hydrochloric acid", products: "Sodium chloride, Water", condition: "Neutralisation", type: "Double displacement", chapter: "Acid-Base Balance", explanation: "Strong base + strong acid gives a neutral salt solution (pH 7)." },
  { reaction: "AgNO₃ + NaCl → AgCl↓ + NaNO₃", reactants: "Silver nitrate, Sodium chloride", products: "Silver chloride (ppt), Sodium nitrate", condition: "Aqueous, mixed", type: "Double displacement · Precipitation", chapter: "Acid-Base Balance", explanation: "White precipitate of AgCl confirms chloride ions in qualitative analysis." },
  { reaction: "Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂", reactants: "Sodium carbonate, Hydrochloric acid", products: "Sodium chloride, Water, Carbon dioxide", condition: "Dilute acid", type: "Double displacement", chapter: "Acid-Base Balance", explanation: "Effervescence of CO₂ is the standard test for carbonate ions." },
  { reaction: "CH₄ + 2O₂ → CO₂ + 2H₂O", reactants: "Methane, Oxygen", products: "Carbon dioxide, Water", condition: "Ignition", type: "Combustion", chapter: "Chemistry and Energy", explanation: "Complete combustion of the simplest hydrocarbon; releases large heat." },
  { reaction: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O", reactants: "Propane, Oxygen", products: "Carbon dioxide, Water", condition: "Ignition", type: "Combustion", chapter: "Chemistry and Energy", explanation: "Complete combustion of LPG component; basis of fuel-value numericals." },
  { reaction: "4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂", reactants: "Iron pyrites, Oxygen", products: "Iron(III) oxide, Sulfur dioxide", condition: "Roasting in air", type: "Roasting · Redox", chapter: "Mineral Resources: Metals and Non-metals", explanation: "First step of iron extraction; SO₂ is captured for sulfuric acid production." },
  { reaction: "Fe₂O₃ + 3CO → 2Fe + 3O₂↑", reactants: "Haematite, Carbon monoxide", products: "Iron, Carbon dioxide", condition: "Blast furnace · high heat", type: "Reduction", chapter: "Mineral Resources: Metals and Non-metals", explanation: "Carbon monoxide reduces haematite — the core reaction of the blast furnace." },
  { reaction: "2Al₂O₃ → 4Al + 3O₂", reactants: "Bauxite (alumina)", products: "Aluminium, Oxygen", condition: "Electrolysis · cryolite", type: "Electrolytic reduction", chapter: "Mineral Resources: Metals and Non-metals", explanation: "Aluminium is too reactive for carbon reduction, so it is electrolysed." },
  { reaction: "CaO + H₂O → Ca(OH)₂", reactants: "Quicklime, Water", products: "Slaked lime", condition: "Slaking · exothermic", type: "Combination", chapter: "Mineral Resources: Metals and Non-metals", explanation: "Highly exothermic; slaked lime is used in mortar and for neutralising acidity." },
  { reaction: "Ca(OH)₂ + CO₂ → CaCO₃ + H₂O", reactants: "Slaked lime, Carbon dioxide", products: "Calcium carbonate, Water", condition: "Lime water test", type: "Double displacement", chapter: "Mineral Resources: Metals and Non-metals", explanation: "Lime water turns milky — the standard test for carbon dioxide." },
  { reaction: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", reactants: "Carbon dioxide, Water", products: "Glucose, Oxygen", condition: "Sunlight · chlorophyll", type: "Photochemical", chapter: "Chemistry in Our Lives", explanation: "Photosynthesis — the basis of almost every food chain on earth." },
  { reaction: "NH₃ + HCl → NH₄Cl", reactants: "Ammonia, Hydrochloric acid", products: "Ammonium chloride", condition: "Gas phase", type: "Combination", chapter: "Acid-Base Balance", explanation: "White fumes of NH₄Cl confirm the presence of ammonia gas." },
];

/* ------------------------------------------------------------------ */
/* Valency reference (for valency practice)                           */
/* ------------------------------------------------------------------ */

export type ValencyEntry = { symbol: string; name: string; valency: string };

export const valencyTable: ValencyEntry[] = [
  { symbol: "Na⁺", name: "Sodium", valency: "1" },
  { symbol: "K⁺", name: "Potassium", valency: "1" },
  { symbol: "Ag⁺", name: "Silver", valency: "1" },
  { symbol: "NH₄⁺", name: "Ammonium", valency: "1" },
  { symbol: "H⁺", name: "Hydrogen", valency: "1" },
  { symbol: "Cu²⁺", name: "Copper", valency: "2" },
  { symbol: "Ca²⁺", name: "Calcium", valency: "2" },
  { symbol: "Mg²⁺", name: "Magnesium", valency: "2" },
  { symbol: "Zn²⁺", name: "Zinc", valency: "2" },
  { symbol: "Fe²⁺", name: "Iron (ferrous)", valency: "2" },
  { symbol: "Fe³⁺", name: "Iron (ferric)", valency: "3" },
  { symbol: "Ba²⁺", name: "Barium", valency: "2" },
  { symbol: "Pb²⁺", name: "Lead", valency: "2" },
  { symbol: "Al³⁺", name: "Aluminium", valency: "3" },
  { symbol: "Cl⁻", name: "Chloride", valency: "1" },
  { symbol: "Br⁻", name: "Bromide", valency: "1" },
  { symbol: "I⁻", name: "Iodide", valency: "1" },
  { symbol: "OH⁻", name: "Hydroxide", valency: "1" },
  { symbol: "NO₃⁻", name: "Nitrate", valency: "1" },
  { symbol: "HCO₃⁻", name: "Bicarbonate", valency: "1" },
  { symbol: "CH₃COO⁻", name: "Acetate", valency: "1" },
  { symbol: "O²⁻", name: "Oxide", valency: "2" },
  { symbol: "S²⁻", name: "Sulfide", valency: "2" },
  { symbol: "SO₄²⁻", name: "Sulfate", valency: "2" },
  { symbol: "CO₃²⁻", name: "Carbonate", valency: "2" },
  { symbol: "PO₄³⁻", name: "Phosphate", valency: "3" },
  { symbol: "N³⁻", name: "Nitride", valency: "3" },
];

/* ------------------------------------------------------------------ */
/* Balancing practice                                                 */
/* ------------------------------------------------------------------ */

export type BalanceExercise = {
  unbalanced: string;
  balanced: string;
  chapter: string;
  hint: string;
};

export const balancingExercises: BalanceExercise[] = [
  { unbalanced: "__H₂ + __O₂ → __H₂O", balanced: "2H₂ + O₂ → 2H₂O", chapter: "Chemical Reaction", hint: "Balance oxygen first, then hydrogen." },
  { unbalanced: "__N₂ + __H₂ → __NH₃", balanced: "N₂ + 3H₂ → 2NH₃", chapter: "Chemical Reaction", hint: "Balance nitrogen, then multiply hydrogen to 3, then fix NH₃." },
  { unbalanced: "__Fe + __O₂ → __Fe₃O₄", balanced: "3Fe + 2O₂ → Fe₃O₄", chapter: "Chemical Reaction", hint: "Start with the complex product Fe₃O₄." },
  { unbalanced: "__CH₄ + __O₂ → __CO₂ + __H₂O", balanced: "CH₄ + 2O₂ → CO₂ + 2H₂O", chapter: "Chemistry and Energy", hint: "Carbon, then hydrogen, then balance oxygen last." },
  { unbalanced: "__Al + __HCl → __AlCl₃ + __H₂", balanced: "2Al + 6HCl → 2AlCl₃ + 3H₂", chapter: "Chemical Reaction", hint: "Use the LCM of 3 and 2 for hydrogen." },
  { unbalanced: "__C₃H₈ + __O₂ → __CO₂ + __H₂O", balanced: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O", chapter: "Chemistry and Energy", hint: "Carbon (3), hydrogen (8), then count oxygen atoms." },
  { unbalanced: "__KMnO₄ → __K₂MnO₄ + __MnO₂ + __O₂", balanced: "2KMnO₄ → K₂MnO₄ + MnO₂ + O₂", chapter: "Chemical Reaction", hint: "Start by balancing potassium." },
  { unbalanced: "__Zn + __HNO₃ → __Zn(NO₃)₂ + __NH₄NO₃ + __H₂O", balanced: "4Zn + 10HNO₃ → 4Zn(NO₃)₂ + NH₄NO₃ + 3H₂O", chapter: "Chemical Reaction", hint: "Treat each NO₃ group as a unit; balance N last." },
];

/* ------------------------------------------------------------------ */
/* Numerical practice (step-by-step)                                  */
/* ------------------------------------------------------------------ */

export type NumericalProblem = {
  question: string;
  steps: string[];
  answer: string;
  chapter: string;
};

export const numericalProblems: NumericalProblem[] = [
  {
    question: "How many moles are there in 11 g of carbon dioxide (CO₂)?",
    steps: [
      "Molar mass of CO₂ = 12 + (16 × 2) = 44 g/mol",
      "n = m ÷ M",
      "n = 11 ÷ 44",
    ],
    answer: "0.25 mol",
    chapter: "Concept of Mole and Chemical Calculation",
  },
  {
    question: "Calculate the number of molecules in 2 mol of water (H₂O).",
    steps: [
      "Number of particles N = n × Nᴀ",
      "N = 2 × 6.022 × 10²³",
    ],
    answer: "1.2044 × 10²⁴ molecules",
    chapter: "Concept of Mole and Chemical Calculation",
  },
  {
    question: "What is the volume of 3 mol of oxygen gas at STP?",
    steps: [
      "One mole of any gas occupies 22.4 L at STP",
      "V = n × 22.4 L",
      "V = 3 × 22.4",
    ],
    answer: "67.2 L",
    chapter: "Concept of Mole and Chemical Calculation",
  },
  {
    question: "A gas occupies 5 L at 2 atm pressure. What volume will it occupy at 5 atm, keeping temperature constant?",
    steps: [
      "Apply Boyle's law: P₁V₁ = P₂V₂",
      "2 × 5 = 5 × V₂",
      "V₂ = 10 ÷ 5",
    ],
    answer: "2 L",
    chapter: "States of Matter",
  },
  {
    question: "Calculate the pH of a solution with [H⁺] = 1 × 10⁻³ mol/L.",
    steps: [
      "pH = −log[H⁺]",
      "pH = −log(10⁻³)",
    ],
    answer: "3 — the solution is acidic",
    chapter: "Acid-Base Balance",
  },
  {
    question: "What mass of sodium oxide (Na₂O) is formed when 4.6 g of sodium burns completely in oxygen?",
    steps: [
      "2Na + ½O₂ → Na₂O",
      "Molar mass of Na = 23 g/mol, so n(Na) = 4.6 ÷ 23 = 0.2 mol",
      "From the equation, 2 mol Na gives 1 mol Na₂O → n(Na₂O) = 0.1 mol",
      "M(Na₂O) = (23 × 2) + 16 = 62 g/mol",
      "m = 0.1 × 62",
    ],
    answer: "6.2 g",
    chapter: "Chemical Reaction",
  },
];

/* ------------------------------------------------------------------ */
/* MCQ practice bank (sample — CMS-managed in production)             */
/* ------------------------------------------------------------------ */

export type McqQuestion = {
  chapter: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export const mcqBank: McqQuestion[] = [
  {
    chapter: "concepts-of-chemistry",
    question: "Which of the following is a mixture?",
    options: ["Sodium chloride", "Distilled water", "Air", "Carbon dioxide"],
    correct: 2,
    explanation: "Air is a homogeneous mixture of gases; the others are pure compounds.",
  },
  {
    chapter: "concepts-of-chemistry",
    question: "The law of conservation of mass states that:",
    options: [
      "Mass can be created in a chemical reaction",
      "Total mass of reactants equals total mass of products",
      "Elements always combine in fixed volume ratios",
      "Volume is conserved in all reactions",
    ],
    correct: 1,
    explanation: "In a chemical reaction, atoms are only rearranged — total mass stays constant.",
  },
  {
    chapter: "states-of-matter",
    question: "Boyle's law holds at constant:",
    options: ["Pressure", "Volume", "Temperature", "Number of moles"],
    correct: 2,
    explanation: "P₁V₁ = P₂V₂ is valid when temperature remains constant.",
  },
  {
    chapter: "structure-of-matter",
    question: "The number of neutrons in ³⁵₁₇Cl is:",
    options: ["17", "18", "35", "52"],
    correct: 1,
    explanation: "n = A − Z = 35 − 17 = 18.",
  },
  {
    chapter: "periodic-table",
    question: "Ionisation potential increases across a period because:",
    options: [
      "Atomic radius increases",
      "Nuclear charge increases with added shells remaining the same",
      "Electrons are added to new shells",
      "Atomic mass increases",
    ],
    correct: 1,
    explanation: "Across a period, protons are added to the same shell, so attraction for valence electrons increases.",
  },
  {
    chapter: "chemical-bonding",
    question: "The bond in NaCl is:",
    options: ["Covalent", "Ionic (electrovalent)", "Metallic", "Coordinate"],
    correct: 1,
    explanation: "Sodium transfers its valence electron to chlorine, forming Na⁺ and Cl⁻ ions.",
  },
  {
    chapter: "concept-of-mole",
    question: "The mass of 0.5 mol of CaCO₃ (M = 100 g/mol) is:",
    options: ["50 g", "100 g", "150 g", "200 g"],
    correct: 0,
    explanation: "m = n × M = 0.5 × 100 = 50 g.",
  },
  {
    chapter: "chemical-reactions",
    question: "In the reaction Zn + CuSO₄ → ZnSO₄ + Cu, the reducing agent is:",
    options: ["CuSO₄", "Cu", "ZnSO₄", "Zn"],
    correct: 3,
    explanation: "Zinc is oxidised (loses electrons) and therefore acts as the reducing agent.",
  },
  {
    chapter: "chemistry-and-energy",
    question: "A catalyst in a reaction:",
    options: [
      "Increases the heat of reaction",
      "Lowers the activation energy",
      "Shifts the equilibrium position",
      "Increases the yield permanently",
    ],
    correct: 1,
    explanation: "Catalysts provide an alternative pathway with lower activation energy and are not consumed.",
  },
  {
    chapter: "acid-base-and-salt",
    question: "A solution with pH 3 is:",
    options: ["Basic", "Neutral", "Acidic", "Amphoteric"],
    correct: 2,
    explanation: "Any solution with pH below 7 is acidic; lower pH means higher [H⁺].",
  },
  {
    chapter: "mineral-resources",
    question: "In the blast furnace, iron ore is reduced by:",
    options: ["Carbon", "Carbon monoxide", "Hydrogen", "Sulfuric acid"],
    correct: 1,
    explanation: "CO removes oxygen from haematite: Fe₂O₃ + 3CO → 2Fe + 3CO₂.",
  },
  {
    chapter: "fossil-resources",
    question: "Which of the following is a fossil fuel?",
    options: ["Biogas", "Natural gas", "Hydrogen", "Wind energy"],
    correct: 1,
    explanation: "Natural gas is a fossil fuel formed from buried organic matter; biogas, hydrogen and wind are not fossil-derived.",
  },
  {
    chapter: "fossil-resources",
    question: "Petroleum is separated into its fractions by:",
    options: ["Filtration", "Fractional distillation", "Sublimation", "Decantation"],
    correct: 1,
    explanation: "Fractional distillation separates crude oil by boiling point in a fractionating column.",
  },
  {
    chapter: "chemistry-in-our-life",
    question: "Soaps fail in hard water because of ions of:",
    options: ["Sodium and potassium", "Calcium and magnesium", "Iron and copper", "Zinc and aluminium"],
    correct: 1,
    explanation: "Ca²⁺ and Mg²⁺ react with soap anions to form insoluble scum.",
  },
];
