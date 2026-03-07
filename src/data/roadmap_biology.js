// ─── BIOLOGICAL SCIENCE ROADMAP (TS SSC 2026) ──────────────────────────────
// Exam Date: April 7, 2026 — 31-day roadmap
// 10 Chapters: Nutrition, Respiration, Transportation, Excretion, Coordination,
//              Reproduction, Coordination in Life, Heredity, Environment, Natural Resources
export const ROADMAP_BIOLOGY = [
    {
        topic: "Nutrition", sub: "Autotrophic & Heterotrophic Nutrition",
        chapter: "Ch 1 — Nutrition (Food Supply System)",
        whatToStudy: [
            "Autotrophic nutrition: photosynthesis in plants",
            "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (in presence of sunlight & chlorophyll)",
            "Light reaction vs Dark reaction (Calvin cycle)",
            "Heterotrophic nutrition: holozoic, saprophytic, parasitic",
            "Human digestive system: mouth → oesophagus → stomach → small intestine → large intestine",
            "Role of enzymes: amylase, pepsin, lipase, trypsin, bile",
            "Absorption in small intestine through villi"
        ],
        problems: [
            "Write the balanced equation for photosynthesis.",
            "Draw and label the human digestive system.",
            "What is the role of bile juice in digestion?",
            "Compare autotrophic and heterotrophic nutrition — 4 differences.",
            "Explain the process of digestion in the stomach."
        ],
        formulas: [
            "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
            "Mouth: Salivary amylase → starch → maltose",
            "Stomach: Pepsin → proteins → peptones (pH ~2, HCl)",
            "Small intestine: Trypsin, Lipase, Bile"
        ],
        recallTask: [
            "Write photosynthesis equation and explain each part — from memory",
            "Draw digestive system and label all organs — no book",
            "Name the enzyme, substrate, and product at each digestive stage"
        ],
        quizFormulas: [
            { q: "Photosynthesis equation", a: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" },
            { q: "Enzyme in mouth", a: "Salivary amylase" },
            { q: "Enzyme in stomach", a: "Pepsin" },
        ]
    },
    {
        topic: "Respiration", sub: "Aerobic, Anaerobic & Breathing",
        chapter: "Ch 2 — Respiration (The Energy Releasing System)",
        whatToStudy: [
            "Respiration: breaking down glucose to release energy (ATP)",
            "Aerobic: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (38 ATP)",
            "Anaerobic: without O₂, produces ethanol/lactic acid (2 ATP)",
            "Glycolysis → Krebs cycle → Electron transport chain",
            "Breathing mechanism: inhalation (diaphragm contracts) and exhalation",
            "Respiratory system: nasal cavity → pharynx → trachea → bronchi → lungs → alveoli",
            "Gas exchange in alveoli: O₂ in, CO₂ out"
        ],
        problems: [
            "Write the equation for aerobic respiration.",
            "Compare aerobic and anaerobic respiration — 4 differences.",
            "Draw and label the human respiratory system.",
            "Explain gas exchange in alveoli.",
            "Why does lactic acid buildup cause muscle cramps?"
        ],
        formulas: [
            "Aerobic: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP",
            "Anaerobic (yeast): C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2 ATP",
            "Anaerobic (muscles): Glucose → Lactic acid + 2 ATP",
            "Inhalation: diaphragm contracts, ribs move up → air in"
        ],
        recallTask: [
            "Write both aerobic and anaerobic equations — from memory",
            "Draw respiratory system with labels — no book",
            "Explain gas exchange in alveoli in 5 points"
        ],
        quizFormulas: [
            { q: "Aerobic respiration equation", a: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy" },
            { q: "ATP from aerobic respiration", a: "38 ATP" },
            { q: "ATP from anaerobic respiration", a: "2 ATP" },
        ]
    },
    {
        topic: "Transportation", sub: "Blood, Heart & Circulatory System",
        chapter: "Ch 3 — Transportation (The Circulatory System)",
        whatToStudy: [
            "Blood components: RBC, WBC, Platelets, Plasma",
            "Heart: 4 chambers — RA, RV, LA, LV",
            "Double circulation: pulmonary + systemic",
            "Arteries: thick walls, carry oxygenated blood (except pulmonary artery)",
            "Veins: thin walls, carry deoxygenated blood (except pulmonary vein), have valves",
            "Capillaries: thin walls for exchange",
            "Blood groups: A, B, AB, O | Rh factor",
            "Transportation in plants: xylem (water up), phloem (food down)"
        ],
        problems: [
            "Draw and label the human heart.",
            "Explain double circulation with diagram.",
            "Compare arteries and veins — 4 differences.",
            "What is the role of blood platelets?",
            "Explain how water is transported in plants through xylem."
        ],
        formulas: [
            "Heart: RA→RV→Lungs→LA→LV→Body (circulation path)",
            "Arteries: thick, elastic, no valves, oxygenated blood",
            "Veins: thin, less elastic, have valves, deoxygenated blood",
            "Xylem: water transport (root → leaves) by transpiration pull",
            "Phloem: food transport (leaves → all parts) by translocation"
        ],
        recallTask: [
            "Draw labelled heart diagram — from memory",
            "Write the path of blood: RA → RV → ... → LV → Body — no book",
            "Compare xylem and phloem — 4 differences"
        ],
        quizFormulas: [
            { q: "Double circulation means", a: "Blood passes through heart twice in one cycle" },
            { q: "Xylem transports", a: "Water and minerals (upward)" },
            { q: "Phloem transports", a: "Food (translocation)" },
        ]
    },
    {
        topic: "Excretion", sub: "Kidneys, Nephron & Urine Formation",
        chapter: "Ch 4 — Excretion (The Wastage Disposing System)",
        whatToStudy: [
            "Excretory system: 2 kidneys, 2 ureters, urinary bladder, urethra",
            "Nephron: structural and functional unit of kidney",
            "Urine formation: Glomerular filtration → Tubular reabsorption → Secretion",
            "Glomerulus: filters blood (water, salts, glucose, urea pass through)",
            "Tubular reabsorption: useful substances (glucose, amino acids, water) reabsorbed",
            "Dialysis: artificial kidney for kidney failure patients",
            "Excretion in plants: transpiration, guttation, stored as resins/latex"
        ],
        problems: [
            "Draw and label the structure of a nephron.",
            "Explain the process of urine formation.",
            "What is dialysis? When is it needed?",
            "How do plants excrete their waste products?",
            "What is the role of Bowman's capsule?"
        ],
        formulas: [
            "Nephron = Glomerulus + Bowman's capsule + Tubules",
            "Urine formation: Filtration → Reabsorption → Secretion",
            "Daily urine output: ~1.5 litres",
            "Excretory products: urea (mammals), uric acid (birds/reptiles), ammonia (aquatic)"
        ],
        recallTask: [
            "Draw nephron with all labels — from memory",
            "Explain 3 steps of urine formation in detail — no book",
            "Compare dialysis and natural kidney function"
        ],
        quizFormulas: [
            { q: "Functional unit of kidney", a: "Nephron" },
            { q: "Steps of urine formation", a: "Filtration → Reabsorption → Secretion" },
            { q: "Dialysis is", a: "Artificial filtering of blood when kidneys fail" },
        ]
    },
    {
        topic: "🔁 REVISION DAY", sub: "Life Processes Ch 1-4",
        chapter: "Ch 1-4 Revision — Life Processes",
        whatToStudy: ["Photosynthesis & digestion", "Respiration equations", "Heart & circulation", "Nephron & excretion"],
        problems: [
            "Write photosynthesis and aerobic respiration equations.",
            "Draw heart diagram and trace blood flow.",
            "Draw nephron and explain urine formation.",
            "Compare arteries and veins.",
            "Name enzymes at each stage of digestion."
        ],
        formulas: ["Write ALL biology equations and diagrams on one page"],
        recallTask: ["Diagram dump: digestive system, heart, nephron — 10 min", "Solve all 5 — 30 min", "Mark weak areas"],
        quizFormulas: [
            { q: "Photosynthesis equation", a: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" },
            { q: "Functional unit of kidney", a: "Nephron" },
            { q: "Double circulation path", a: "Heart→Lungs→Heart→Body" },
        ]
    },
    {
        topic: "Coordination", sub: "Nervous System & Sense Organs",
        chapter: "Ch 5 — Coordination (The Linking System)",
        whatToStudy: [
            "Neuron: basic unit of nervous system (dendrite → cell body → axon)",
            "Synapse: gap between neurons, signal crosses via neurotransmitters",
            "Central nervous system: brain + spinal cord",
            "Peripheral nervous system: cranial + spinal nerves",
            "Brain parts: cerebrum (thinking), cerebellum (balance), medulla (involuntary)",
            "Reflex arc: stimulus → receptor → sensory neuron → spinal cord → motor neuron → effector",
            "Voluntary vs involuntary actions"
        ],
        problems: [
            "Draw and label the structure of a neuron.",
            "Explain reflex arc with diagram and example.",
            "What are the functions of cerebrum, cerebellum, and medulla?",
            "What is a synapse? How does signal cross it?",
            "Differentiate between voluntary and involuntary actions — 3 examples each."
        ],
        formulas: [
            "Neuron: Dendrite → Cell body → Axon → Axon terminal",
            "Reflex arc: Receptor → Sensory → CNS → Motor → Effector",
            "Brain: Cerebrum (thinking) | Cerebellum (balance) | Medulla (involuntary)"
        ],
        recallTask: [
            "Draw labelled neuron — from memory",
            "Draw reflex arc with labels — no book",
            "Name 3 functions each of cerebrum, cerebellum, medulla"
        ],
        quizFormulas: [
            { q: "Functional unit of nervous system", a: "Neuron" },
            { q: "Cerebellum controls", a: "Balance and posture" },
            { q: "Reflex arc path", a: "Receptor → Sensory → CNS → Motor → Effector" },
        ]
    },
    {
        topic: "Coordination in Life", sub: "Hormones & Endocrine System",
        chapter: "Ch 7 — Coordination in Life Processes",
        whatToStudy: [
            "Chemical coordination: hormones (endocrine system)",
            "Endocrine glands: pituitary, thyroid, adrenal, pancreas, gonads",
            "Pituitary: growth hormone (master gland)",
            "Thyroid: thyroxine (metabolism, needs iodine)",
            "Adrenal: adrenaline (fight or flight)",
            "Pancreas: insulin (lowers blood sugar), glucagon (raises blood sugar)",
            "Diabetes: insufficient insulin production",
            "Plant hormones: auxin (growth), gibberellin (elongation), cytokinin (division)"
        ],
        problems: [
            "Name the hormone and gland responsible for: growth, metabolism, fight-or-flight, blood sugar control.",
            "What is diabetes? Which hormone is involved?",
            "Compare nervous and hormonal control — 4 differences.",
            "What are plant hormones? Name 3 with their functions.",
            "Why is pituitary called the master gland?"
        ],
        formulas: [
            "Pituitary → Growth hormone (master gland)",
            "Thyroid → Thyroxine (metabolism, needs iodine)",
            "Adrenal → Adrenaline (fight or flight)",
            "Pancreas → Insulin (↓ blood sugar) + Glucagon (↑ blood sugar)",
            "Plant: Auxin (growth), Gibberellin (elongation), Cytokinin (cell division)"
        ],
        recallTask: [
            "List all endocrine glands, hormones, and functions — from memory",
            "Compare nervous vs hormonal coordination — 4 points",
            "Name 3 plant hormones and their roles — no book"
        ],
        quizFormulas: [
            { q: "Insulin is produced by", a: "Pancreas" },
            { q: "Master gland", a: "Pituitary gland" },
            { q: "Auxin promotes", a: "Growth (elongation of cells)" },
        ]
    },
    {
        topic: "Reproduction", sub: "Asexual & Sexual Reproduction",
        chapter: "Ch 6 — Reproduction (The Generating System)",
        whatToStudy: [
            "Asexual: fission, budding, fragmentation, regeneration, vegetative propagation, spore formation",
            "Sexual: involves fusion of male and female gametes",
            "Flower parts: sepal, petal, stamen (anther+filament), pistil (stigma+style+ovary)",
            "Pollination: self and cross (by wind, insects, water)",
            "Fertilisation in plants: pollen tube → ovule → zygote → seed",
            "Human male: testes → sperm → vas deferens → urethra",
            "Human female: ovary → egg → fallopian tube → uterus",
            "Menstrual cycle: ~28 days",
            "Contraception methods: barrier, chemical, surgical"
        ],
        problems: [
            "Draw and label a flower showing male and female parts.",
            "Explain the process of pollination and fertilisation in plants.",
            "Draw the male reproductive system and label it.",
            "Draw the female reproductive system and label it.",
            "Compare asexual and sexual reproduction — 4 differences."
        ],
        formulas: [
            "Asexual: binary fission (amoeba), budding (yeast/hydra), spores (bread mould)",
            "Flower: Stamen = Anther + Filament | Pistil = Stigma + Style + Ovary",
            "Fertilisation: Pollen grain → Pollen tube → Ovule → Zygote → Embryo → Seed"
        ],
        recallTask: [
            "Name 5 types of asexual reproduction with examples — from memory",
            "Draw labelled flower diagram — no book",
            "Draw male and female reproductive systems — from memory"
        ],
        quizFormulas: [
            { q: "Male reproductive organ in flower", a: "Stamen (Anther + Filament)" },
            { q: "Female reproductive organ in flower", a: "Pistil (Stigma + Style + Ovary)" },
            { q: "Binary fission occurs in", a: "Amoeba" },
        ]
    },
    {
        topic: "🔁 REVISION DAY", sub: "Coordination & Reproduction Ch 5-7",
        chapter: "Ch 5-7 Revision",
        whatToStudy: ["Neuron and reflex arc", "Endocrine glands and hormones", "Flower structure and reproduction"],
        problems: [
            "Draw neuron and label all parts.",
            "List all endocrine glands with hormones and functions.",
            "Draw flower and label male + female parts.",
            "Explain reflex arc with example.",
            "Compare nervous and hormonal control."
        ],
        formulas: ["Write ALL coordination and reproduction diagrams + key facts"],
        recallTask: ["Diagram dump — neuron, brain, flower, reproductive systems", "Solve all 5 — 30 min", "Mark weak areas"],
        quizFormulas: [
            { q: "Neuron path", a: "Dendrite → Cell body → Axon" },
            { q: "Insulin controls", a: "Blood sugar level" },
            { q: "Pistil has", a: "Stigma + Style + Ovary" },
        ]
    },
    {
        topic: "Heredity & Evolution", sub: "Mendel's Laws, DNA & Evolution",
        chapter: "Ch 8 — Heredity and Evolution",
        whatToStudy: [
            "Heredity: transmission of traits from parents to offspring",
            "Mendel's experiments with pea plants",
            "Dominant and recessive traits",
            "Monohybrid cross: Tt × Tt → TT:Tt:tt = 1:2:1 (phenotype 3:1)",
            "Dihybrid cross: 9:3:3:1 ratio",
            "Sex determination in humans: XX (female), XY (male)",
            "DNA: hereditary material, genes on chromosomes",
            "Evolution: natural selection, speciation, fossils as evidence",
            "Homologous organs vs Analogous organs"
        ],
        problems: [
            "Explain Mendel's monohybrid cross with Punnett square.",
            "In a cross between Tt and Tt, find ratio of tall to dwarf plants.",
            "How is sex of a child determined? Draw chart.",
            "What are homologous organs? Give 2 examples.",
            "Explain natural selection with an example."
        ],
        formulas: [
            "Monohybrid: Tt × Tt → 1TT : 2Tt : 1tt (Phenotype 3:1)",
            "Dihybrid: 9:3:3:1 ratio",
            "Sex: XX = female, XY = male",
            "Father determines sex of child (X or Y sperm)"
        ],
        recallTask: [
            "Draw Punnett square for Tt × Tt — from memory",
            "Draw sex determination chart — no book",
            "List 3 examples each of homologous and analogous organs"
        ],
        quizFormulas: [
            { q: "Monohybrid phenotype ratio", a: "3:1" },
            { q: "Dihybrid phenotype ratio", a: "9:3:3:1" },
            { q: "Sex determination: father gives", a: "X or Y chromosome" },
        ]
    },
    {
        topic: "Our Environment", sub: "Ecosystems, Food Chains & Ozone",
        chapter: "Ch 9 — Our Environment — Our Concern",
        whatToStudy: [
            "Ecosystem: biotic (living) + abiotic (non-living) components",
            "Producers, consumers (primary, secondary, tertiary), decomposers",
            "Food chain: Producer → Primary consumer → Secondary → Tertiary",
            "Food web: interconnected food chains",
            "10% energy law: only 10% energy transfers to next trophic level",
            "Ozone layer: O₃ protects from UV rays",
            "Ozone depletion: CFCs break down ozone",
            "Biodegradable vs Non-biodegradable waste"
        ],
        problems: [
            "Draw a food chain with 4 trophic levels and label each.",
            "Explain the 10% law with a food chain example.",
            "How is ozone formed? How is it destroyed?",
            "Compare biodegradable and non-biodegradable waste — 4 differences.",
            "What is bioaccumulation? Give an example."
        ],
        formulas: [
            "Food chain: Sun → Producer → Primary → Secondary → Tertiary",
            "10% law: only 10% energy passes to next level",
            "Ozone: O₂ + UV → O + O → O + O₂ → O₃",
            "CFC + UV → Cl + O₃ → ClO + O₂ (ozone depletion)"
        ],
        recallTask: [
            "Draw a food chain and food web — from memory",
            "Explain 10% law with numerical example — no book",
            "Write 3 causes and 3 effects of ozone depletion"
        ],
        quizFormulas: [
            { q: "10% law means", a: "Only 10% energy transfers to next trophic level" },
            { q: "Ozone formula", a: "O₃" },
            { q: "CFCs cause", a: "Ozone layer depletion" },
        ]
    },
    {
        topic: "Natural Resources", sub: "Conservation & Sustainability",
        chapter: "Ch 10 — Natural Resources",
        whatToStudy: [
            "Renewable: solar, wind, water | Non-renewable: coal, petroleum, natural gas",
            "Forest resources: deforestation effects, conservation",
            "Water resources: water cycle, pollution, rainwater harvesting",
            "Coal and petroleum: fossil fuels, formed over millions of years",
            "3Rs: Reduce, Reuse, Recycle",
            "Sustainable development: meeting present needs without compromising future",
            "Wildlife conservation: national parks, sanctuaries, biosphere reserves"
        ],
        problems: [
            "Compare renewable and non-renewable resources — 4 differences with examples.",
            "What are the effects of deforestation? List 5.",
            "Explain rainwater harvesting and its importance.",
            "What are the 3Rs? Give one example for each.",
            "Why are fossil fuels called non-renewable?"
        ],
        formulas: [
            "Renewable: can be replenished (solar, wind, water, biomass)",
            "Non-renewable: limited, takes millions of years (coal, petroleum, natural gas)",
            "3Rs: Reduce, Reuse, Recycle",
            "Water cycle: Evaporation → Condensation → Precipitation → Collection"
        ],
        recallTask: [
            "List 5 renewable and 5 non-renewable resources — from memory",
            "Write 5 effects of deforestation — no book",
            "Explain sustainable development in your own words"
        ],
        quizFormulas: [
            { q: "3Rs stand for", a: "Reduce, Reuse, Recycle" },
            { q: "Fossil fuels are", a: "Non-renewable (coal, petroleum, natural gas)" },
            { q: "Sustainable development means", a: "Meeting present needs without compromising future" },
        ]
    },
    {
        topic: "🔁 REVISION DAY", sub: "Heredity, Environment & Resources Ch 8-10",
        chapter: "Ch 8-10 Revision",
        whatToStudy: ["Mendelian genetics", "Food chains and 10% law", "Ozone depletion", "Natural resources"],
        problems: [
            "Draw Punnett square for Tt × Tt.",
            "Draw a 4-level food chain with energy at each level.",
            "Explain ozone formation and depletion.",
            "Compare renewable vs non-renewable resources.",
            "Draw sex determination chart."
        ],
        formulas: ["Write all heredity + environment key facts"],
        recallTask: ["Diagram dump — Punnett square, food chain, sex determination", "Solve all 5 — 30 min", "Mark weak areas"],
        quizFormulas: [
            { q: "3:1 ratio is from", a: "Monohybrid cross" },
            { q: "10% law", a: "Only 10% energy to next trophic level" },
            { q: "3Rs", a: "Reduce, Reuse, Recycle" },
        ]
    },
    {
        topic: "📝 MOCK EXAM 1", sub: "Full Biology Paper",
        chapter: "All 10 Chapters — Biological Science",
        whatToStudy: ["Exam conditions — 1.5 hours", "No phone, no book", "Answer all sections"],
        problems: [
            "Section A: Photosynthesis equation | Nephron function | Neuron parts | Monohybrid ratio | Ozone formula",
            "Section B: Draw heart diagram | Reflex arc | Punnett square Tt×Tt",
            "Section C: Digestion stages | Compare arteries/veins | Asexual vs sexual reproduction",
            "Section D: Human respiratory system | Endocrine glands | Food chain + 10% law",
            "Score yourself honestly"
        ],
        formulas: ["NO FORMULA SHEET — exam conditions"],
        recallTask: ["Complete paper in 1.5 hours", "Score yourself", "List weak chapters"],
        quizFormulas: [
            { q: "Aerobic respiration ATP", a: "38 ATP" },
            { q: "Master gland", a: "Pituitary" },
            { q: "Xylem transports", a: "Water and minerals" },
        ]
    },
    {
        topic: "🔧 ERROR ANALYSIS 1", sub: "Fix Mock 1 Mistakes",
        chapter: "Based on Mock 1 mistakes",
        whatToStudy: ["Re-do wrong questions", "Classify errors", "Re-study weak topics only"],
        problems: [
            "Re-solve wrong questions without solutions first",
            "Study solutions step by step for stuck ones",
            "Write corrected solutions neatly",
            "Create personal mistakes list",
            "Read list 3 times before sleeping"
        ],
        formulas: ["Your personal list — whatever you got wrong"],
        recallTask: ["Re-solve wrong questions", "Read mistakes list", "Self-test on weakest chapter"],
        quizFormulas: [
            { q: "Phloem transports", a: "Food (translocation)" },
            { q: "Insulin deficiency causes", a: "Diabetes" },
            { q: "Analogous organs have", a: "Different structure, same function" },
        ]
    },
    {
        topic: "Nutrition Deep Dive", sub: "Enzymes, Villi & Absorption",
        chapter: "Ch 1 — Nutrition (Advanced)",
        whatToStudy: [
            "Complete enzyme table: mouth to small intestine",
            "Villi structure: finger-like projections, increase surface area",
            "Role of liver: produces bile, stores glycogen",
            "Large intestine: absorbs water, forms faeces",
            "Peristalsis: wave-like muscle contractions"
        ],
        problems: [
            "Draw a villus and explain how it aids absorption.",
            "Complete table: Organ | Enzyme | Substrate | Product",
            "What is peristalsis? Where does it occur?",
            "Why is the small intestine so long?",
            "What happens if someone's gall bladder is removed?"
        ],
        formulas: ["Complete enzyme chart from mouth to small intestine"],
        recallTask: ["Complete enzyme table — from memory", "Draw villus with labels — no book", "Explain role of liver in 5 points"],
        quizFormulas: [
            { q: "Villi are found in", a: "Small intestine" },
            { q: "Bile is produced by", a: "Liver" },
            { q: "Peristalsis is", a: "Wave-like muscle contractions pushing food" },
        ]
    },
    {
        topic: "Respiration & Circulation Deep Dive", sub: "ATP, Gas Exchange & Blood Groups",
        chapter: "Ch 2-3 Advanced Topics",
        whatToStudy: [
            "ATP: Adenosine Triphosphate — energy currency of cells",
            "Haemoglobin: carries oxygen in RBCs",
            "Lymph: yellowish fluid, carries digested fats, immunity",
            "Blood groups: A, B, AB (universal recipient), O (universal donor)",
            "Rh factor: Rh+ can receive from Rh+ or Rh-",
            "Blood pressure: systolic/diastolic (~120/80 mm Hg)"
        ],
        problems: [
            "Why is haemoglobin important for oxygen transport?",
            "What is lymph? How does it differ from blood?",
            "Who is the universal donor? Universal recipient? Why?",
            "What is blood pressure? What is normal range?",
            "Explain why CO poisoning is dangerous."
        ],
        formulas: ["Blood groups compatibility chart", "Normal BP: 120/80 mm Hg"],
        recallTask: ["Draw blood group compatibility chart — from memory", "Compare blood and lymph — 4 points", "Explain haemoglobin role in 5 points"],
        quizFormulas: [
            { q: "Universal blood donor", a: "O group" },
            { q: "Universal blood recipient", a: "AB group" },
            { q: "Normal blood pressure", a: "120/80 mm Hg" },
        ]
    },
    {
        topic: "🔁 FULL REVISION DAY", sub: "All Life Processes",
        chapter: "Ch 1-7 Complete Review",
        whatToStudy: ["ALL diagrams: digestive, respiratory, heart, nephron, neuron, flower, reproductive systems"],
        problems: [
            "Draw and label ALL 7 major diagrams in 45 minutes.",
            "Write all enzyme tables from memory.",
            "Write all hormone tables from memory.",
            "Compare 3 pairs: arteries/veins, xylem/phloem, aerobic/anaerobic.",
            "Explain reflex arc with example."
        ],
        formulas: ["ALL biology diagrams and tables on 2 pages"],
        recallTask: ["Diagram marathon — all 7 diagrams", "Table dump — enzymes + hormones", "Identify final weak spots"],
        quizFormulas: [
            { q: "Pepsin acts on", a: "Proteins in stomach" },
            { q: "Cerebrum controls", a: "Thinking, memory, voluntary actions" },
            { q: "Stamen = ?", a: "Anther + Filament" },
        ]
    },
    {
        topic: "Heredity & Evolution Deep Dive", sub: "DNA, Speciation & Fossils",
        chapter: "Ch 8 — Advanced Topics",
        whatToStudy: [
            "DNA structure: double helix, base pairs (A-T, G-C)",
            "Gene: functional unit of heredity on chromosomes",
            "Humans: 23 pairs of chromosomes (46 total)",
            "Speciation: formation of new species through isolation",
            "Evidence of evolution: fossils, homologous organs, embryology",
            "Natural selection: survival of the fittest (Darwin)",
            "Human evolution timeline"
        ],
        problems: [
            "What is DNA? Draw a simple diagram.",
            "How many chromosomes do humans have? What determines sex?",
            "What is speciation? What factors lead to it?",
            "Give 3 evidences for evolution.",
            "Explain natural selection with an example (peppered moth)."
        ],
        formulas: ["DNA base pairing: A-T, G-C", "Humans: 23 pairs = 46 chromosomes", "XX=female, XY=male"],
        recallTask: ["Draw DNA structure — from memory", "Explain natural selection with example — no book", "List 3 evidences for evolution with examples"],
        quizFormulas: [
            { q: "DNA base pairs", a: "A-T and G-C" },
            { q: "Human chromosomes", a: "23 pairs (46 total)" },
            { q: "Natural selection was proposed by", a: "Charles Darwin" },
        ]
    },
    {
        topic: "Environment & Resources Deep Dive", sub: "Biogeochemical Cycles & Conservation",
        chapter: "Ch 9-10 — Advanced Topics",
        whatToStudy: [
            "Carbon cycle: photosynthesis ↔ respiration ↔ combustion",
            "Nitrogen cycle: fixation → nitrification → denitrification",
            "Water cycle: evaporation → condensation → precipitation",
            "Greenhouse effect and global warming",
            "Biomagnification: toxin concentration increases up food chain",
            "Conservation methods: afforestation, rainwater harvesting, using renewable energy"
        ],
        problems: [
            "Draw the carbon cycle with all processes labeled.",
            "Explain nitrogen fixation. What organisms do it?",
            "What is the greenhouse effect? Name 3 greenhouse gases.",
            "Explain biomagnification with a food chain example.",
            "What is the difference between wildlife sanctuary and national park?"
        ],
        formulas: [
            "Greenhouse gases: CO₂, CH₄, N₂O, CFCs",
            "Nitrogen fixation: N₂ → NH₃ (by Rhizobium bacteria)",
            "Carbon cycle: Photosynthesis absorbs CO₂, Respiration releases CO₂"
        ],
        recallTask: ["Draw carbon and nitrogen cycles — from memory", "List 3 greenhouse gases with sources", "Explain biomagnification with example"],
        quizFormulas: [
            { q: "Nitrogen fixation is done by", a: "Rhizobium bacteria" },
            { q: "Biomagnification means", a: "Toxin concentration increases up food chain" },
            { q: "Main greenhouse gas", a: "CO₂ (Carbon dioxide)" },
        ]
    },
    {
        topic: "📝 MOCK EXAM 2", sub: "Beat Mock 1 Score!",
        chapter: "All 10 Chapters — Biological Science",
        whatToStudy: ["Full exam — same conditions", "Focus on diagrams", "Time management"],
        problems: [
            "Section A: Respiration equation | Xylem function | Reflex arc | Dihybrid ratio | CFC effect",
            "Section B: Draw nephron | Sex determination chart | Food web example",
            "Section C: Enzyme table digestion | Hormones table | Compare sexual/asexual reproduction",
            "Section D: Double circulation | Mendel's experiments | Carbon cycle + greenhouse effect",
            "Target: beat Mock 1 score"
        ],
        formulas: ["NO FORMULA SHEET"],
        recallTask: ["Complete paper in 1.5 hours", "Compare with Mock 1", "Note improvements"],
        quizFormulas: [
            { q: "Dihybrid ratio", a: "9:3:3:1" },
            { q: "Transpiration is", a: "Loss of water from leaves as vapour" },
            { q: "Greenhouse effect causes", a: "Global warming" },
        ]
    },
    {
        topic: "🔧 ERROR ANALYSIS 2", sub: "Final Fix",
        chapter: "Based on Mock 2 mistakes",
        whatToStudy: ["Re-do Mock 2 wrong questions", "Compare Mock 1 and 2", "Focus on recurring errors"],
        problems: [
            "Re-solve Mock 2 wrong questions",
            "Compare Mock 1 and 2 — what improved?",
            "Create final formula/fact list",
            "5 questions from weakest chapter",
            "Read error list before sleeping"
        ],
        formulas: ["Final personal fact sheet"],
        recallTask: ["Re-solve wrong questions", "Final diagram practice", "Sleep early"],
        quizFormulas: [
            { q: "Bowman's capsule is part of", a: "Nephron" },
            { q: "Budding occurs in", a: "Yeast and Hydra" },
            { q: "Adrenaline is produced by", a: "Adrenal gland" },
        ]
    },
    {
        topic: "🔁 FULL REVISION", sub: "All 10 Chapters — Final Pass",
        chapter: "Complete Biology Revision",
        whatToStudy: ["ALL diagrams one last time", "ALL equations and facts", "Only weak areas"],
        problems: [
            "Draw ALL major diagrams — 30 min",
            "Write all equations (photosynthesis, respiration)",
            "Write all enzyme + hormone tables",
            "Solve 1 problem from each chapter — 10 problems, 40 min",
            "Read personal error list"
        ],
        formulas: ["TODAY = Draw ALL diagrams + Write ALL facts"],
        recallTask: ["Complete diagram sheet", "10 mixed problems", "Sleep by 10 PM"],
        quizFormulas: [
            { q: "Photosynthesis equation", a: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" },
            { q: "Nephron", a: "Functional unit of kidney" },
            { q: "Monohybrid ratio", a: "3:1" },
        ]
    },
    {
        topic: "📝 REVISION + DIAGRAMS", sub: "Diagram Marathon",
        chapter: "All Diagrams Practice",
        whatToStudy: ["This day is entirely for drawing every diagram from memory"],
        problems: [
            "Draw: Digestive system, Respiratory system, Heart, Nephron",
            "Draw: Neuron, Brain parts, Reflex arc",
            "Draw: Flower structure, Male reproductive system, Female reproductive system",
            "Draw: Punnett square, Sex determination, Food chain",
            "Draw: Carbon cycle, Nitrogen cycle, Water cycle"
        ],
        formulas: ["No formulas today — only diagrams"],
        recallTask: ["Draw all 15 diagrams — timed 60 min", "Check accuracy from textbook", "Re-draw any you got wrong"],
        quizFormulas: [
            { q: "Xylem vs Phloem", a: "Water up vs Food down" },
            { q: "DNA base pairs", a: "A-T and G-C" },
            { q: "Universal donor", a: "O blood group" },
        ]
    },
    {
        topic: "🎯 FINAL DAY", sub: "Mental Prep + Light Review",
        chapter: "Light revision — all chapters",
        whatToStudy: ["DO NOT study new topics", "Write key facts on ONE page", "Trust your preparation", "Sleep by 10 PM"],
        problems: [
            "Fact sheet: write ALL key equations and facts (~20 min)",
            "Read your error analysis list — just read",
            "5 quick diagrams from weakest topics",
            "Close eyes: mentally trace each system (digestive, respiratory, circulatory...)",
            "Pack bag: pen, pencil, admit card"
        ],
        formulas: ["TODAY = Final fact review. Trust your 31 days of work."],
        recallTask: ["Write final fact sheet", "5 quick diagrams", "Sleep by 10 PM — no exceptions!"],
        quizFormulas: [
            { q: "Photosynthesis equation", a: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" },
            { q: "Functional unit of kidney", a: "Nephron" },
            { q: "3:1 is", a: "Monohybrid phenotype ratio" },
        ]
    }
];

export const BIOLOGY_META = {
    id: "biology",
    name: "Biological Science",
    icon: "🌿",
    color: "#22c55e",
    examDate: "2026-04-07",
    chapters: 10
};
