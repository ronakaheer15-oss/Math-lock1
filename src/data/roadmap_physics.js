// ─── PHYSICAL SCIENCE ROADMAP (TS SSC 2026) ─────────────────────────────────
// Exam Date: April 2, 2026 — 26-day roadmap
// 12 Chapters: Light, Chemistry, Electricity, Magnetism, Metallurgy, Carbon
export const ROADMAP_PHYSICS = [
    {
        topic: "Reflection of Light", sub: "Curved Surfaces — Concave & Convex Mirrors",
        chapter: "Ch 1 — Reflection of Light at Curved Surfaces",
        whatToStudy: [
            "Concave mirror: converging, uses — shaving, headlights, solar furnace",
            "Convex mirror: diverging, uses — rear-view mirror",
            "Terms: Pole (P), Centre of Curvature (C), Focus (F), Principal axis, Radius (R), Focal length (f)",
            "R = 2f relationship",
            "Mirror formula: 1/f = 1/v + 1/u",
            "Magnification: m = -v/u = h'/h",
            "Sign convention: distances measured from pole, along principal axis"
        ],
        problems: [
            "Object at 30cm from concave mirror, f=15cm. Find image position and nature.",
            "Object at 10cm from convex mirror, f=15cm. Find image position.",
            "An object 5cm high is at 25cm from a concave mirror of f=15cm. Find image height.",
            "A convex mirror has radius 40cm. Where should object be placed to get image at infinity?",
            "Explain with ray diagram: image formed when object is between F and P of concave mirror."
        ],
        formulas: [
            "1/f = 1/v + 1/u (Mirror formula)",
            "m = -v/u = h'/h (Magnification)",
            "R = 2f",
            "Concave: f is negative | Convex: f is positive"
        ],
        recallTask: [
            "Write mirror formula and sign conventions from memory",
            "Draw ray diagrams for all 6 positions of object in concave mirror",
            "Solve blind: f=-10cm, u=-15cm. Find v and m."
        ],
        quizFormulas: [
            { q: "Mirror formula", a: "1/f = 1/v + 1/u" },
            { q: "Magnification (mirror)", a: "m = -v/u" },
            { q: "R = ?", a: "2f" },
        ]
    },
    {
        topic: "Chemical Equations", sub: "Balancing & Types of Reactions",
        chapter: "Ch 2 — Chemical Equations and Reactions",
        whatToStudy: [
            "Writing chemical equations from word equations",
            "Balancing chemical equations by hit and trial",
            "Types: Combination, Decomposition, Displacement, Double displacement",
            "Oxidation and Reduction (redox reactions)",
            "Exothermic vs Endothermic reactions",
            "Corrosion and Rancidity"
        ],
        problems: [
            "Balance: Fe + H₂O → Fe₃O₄ + H₂",
            "Balance: Na + H₂O → NaOH + H₂",
            "Identify type: CaO + H₂O → Ca(OH)₂",
            "Identify type: 2FeSO₄ → Fe₂O₃ + SO₂ + SO₃",
            "What is a redox reaction? Give example with oxidation and reduction identified."
        ],
        formulas: [
            "Combination: A + B → AB",
            "Decomposition: AB → A + B",
            "Displacement: A + BC → AC + B",
            "Double displacement: AB + CD → AD + CB",
            "Oxidation = gain of oxygen / loss of hydrogen",
            "Reduction = loss of oxygen / gain of hydrogen"
        ],
        recallTask: [
            "Write all 4 types of reactions with one example each — from memory",
            "Balance: Al + HCl → AlCl₃ + H₂ — without notes",
            "Define oxidation and reduction with one redox example"
        ],
        quizFormulas: [
            { q: "Combination reaction pattern", a: "A + B → AB" },
            { q: "Oxidation means", a: "Gain of oxygen or loss of hydrogen" },
            { q: "Reduction means", a: "Loss of oxygen or gain of hydrogen" },
        ]
    },
    {
        topic: "Acids, Bases & Salts", sub: "Properties, Indicators & pH",
        chapter: "Ch 3 — Acids, Bases and Salts",
        whatToStudy: [
            "Acids: sour taste, turn blue litmus red, pH < 7",
            "Bases: bitter/soapy, turn red litmus blue, pH > 7",
            "pH scale: 0-14, neutral=7",
            "Indicators: litmus, phenolphthalein, methyl orange",
            "Neutralisation: Acid + Base → Salt + Water",
            "Strong vs Weak acids/bases",
            "Common salts: NaCl, NaHCO₃, Na₂CO₃, CaOCl₂ (bleaching powder)"
        ],
        problems: [
            "What happens when HCl reacts with NaOH? Write balanced equation.",
            "Why does a bee sting hurt? What is the remedy?",
            "What is pH of pure water? What happens to pH when acid is added?",
            "Write the reaction for preparation of Plaster of Paris from gite.",
            "Explain how antacids work to relieve indigestion."
        ],
        formulas: [
            "Acid + Base → Salt + Water (Neutralisation)",
            "Acid + Metal → Salt + H₂↑",
            "Acid + Metal Carbonate → Salt + H₂O + CO₂↑",
            "pH < 7 = acidic | pH = 7 = neutral | pH > 7 = basic"
        ],
        recallTask: [
            "Write 3 properties each of acids and bases from memory",
            "Write neutralisation reaction with example — no book",
            "Explain pH scale with 5 examples of common substances and their pH"
        ],
        quizFormulas: [
            { q: "Neutralisation reaction", a: "Acid + Base → Salt + Water" },
            { q: "pH of pure water", a: "7" },
            { q: "pH < 7 means?", a: "Acidic" },
        ]
    },
    {
        topic: "Refraction of Light", sub: "Lenses — Concave & Convex",
        chapter: "Ch 4 — Refraction of Light at Curved Surfaces",
        whatToStudy: [
            "Snell's law: n₁ sinθ₁ = n₂ sinθ₂",
            "Refractive index: n = speed in vacuum / speed in medium",
            "Convex lens: converging | Concave lens: diverging",
            "Lens formula: 1/f = 1/v - 1/u",
            "Magnification: m = v/u = h'/h",
            "Power of lens: P = 1/f (in metres), unit = Dioptre (D)"
        ],
        problems: [
            "Object at 30cm from convex lens, f=20cm. Find image position.",
            "A concave lens has f=-15cm. Object at 30cm. Find image.",
            "Find power of a lens with f=50cm.",
            "Draw ray diagram: object at 2F of convex lens.",
            "Explain total internal reflection with example."
        ],
        formulas: [
            "1/f = 1/v - 1/u (Lens formula)",
            "m = v/u = h'/h (Magnification)",
            "P = 1/f(m) = 100/f(cm) (Power in Dioptres)",
            "n = sin i / sin r (Snell's law simplified)"
        ],
        recallTask: [
            "Write lens formula vs mirror formula — note the difference",
            "Draw ray diagrams for all positions of object in convex lens",
            "Solve blind: f=+10cm, u=-15cm. Find v, m, nature of image."
        ],
        quizFormulas: [
            { q: "Lens formula", a: "1/f = 1/v - 1/u" },
            { q: "Power of lens", a: "P = 1/f (in metres)" },
            { q: "Unit of power of lens", a: "Dioptre (D)" },
        ]
    },
    {
        topic: "Human Eye & Colourful World", sub: "Eye Defects & Dispersion",
        chapter: "Ch 5 — Human Eye and Colourful World",
        whatToStudy: [
            "Structure: cornea, iris, pupil, lens, retina, optic nerve",
            "Power of accommodation: lens changing focal length",
            "Near point (D) = 25cm, Far point = infinity",
            "Myopia: image before retina, corrected by concave lens",
            "Hypermetropia: image behind retina, corrected by convex lens",
            "Presbyopia: loss of accommodation with age",
            "Dispersion of white light through prism → VIBGYOR",
            "Scattering of light: why sky is blue, sun red at sunrise/sunset"
        ],
        problems: [
            "Explain myopia with diagram and its correction.",
            "A person cannot see beyond 5m. What lens is needed? Find power.",
            "Why does sky appear blue? Explain using scattering.",
            "Why does the sun appear red during sunrise/sunset?",
            "What is dispersion? Draw the prism diagram showing VIBGYOR."
        ],
        formulas: [
            "Myopia correction: concave lens, f = far point distance",
            "Hypermetropia correction: convex lens",
            "Least distance of distinct vision = 25cm",
            "VIBGYOR: Violet, Indigo, Blue, Green, Yellow, Orange, Red"
        ],
        recallTask: [
            "Draw labelled diagram of human eye from memory",
            "Explain myopia and hypermetropia with correction — draw both",
            "Explain why sky is blue in 5 lines — no book"
        ],
        quizFormulas: [
            { q: "Myopia corrected by", a: "Concave lens" },
            { q: "Hypermetropia corrected by", a: "Convex lens" },
            { q: "Near point of normal eye", a: "25 cm" },
        ]
    },
    {
        topic: "🔁 REVISION DAY", sub: "Light Chapters 1-5 Full Recall",
        chapter: "Ch 1-5 Revision — Optics & Light",
        whatToStudy: ["Mirror + Lens formulas side by side", "All ray diagrams", "Eye defects and corrections", "Chemical equations balancing"],
        problems: [
            "Mirror: u=-20cm, f=-15cm. Find v and m.",
            "Lens: u=-30cm, f=+20cm. Find v and m.",
            "Balance: Mg + O₂ → MgO",
            "Draw ray diagram of concave mirror, object at C.",
            "Explain scattering of light with 2 examples."
        ],
        formulas: ["Write ALL mirror, lens, and pH formulas on one page"],
        recallTask: ["Formula dump: all optics formulas — 5 min", "Solve all 5 problems — 30 min timed", "Mark weak areas"],
        quizFormulas: [
            { q: "Mirror formula", a: "1/f = 1/v + 1/u" },
            { q: "Lens formula", a: "1/f = 1/v - 1/u" },
            { q: "pH of acidic solution", a: "Less than 7" },
        ]
    },
    {
        topic: "Structure of Atom", sub: "Bohr's Model, Orbits & Quantum Numbers",
        chapter: "Ch 6 — Structure of Atom",
        whatToStudy: [
            "Thomson's model: plum pudding model",
            "Rutherford's model: nucleus with electrons orbiting",
            "Bohr's model: fixed orbits (shells) K, L, M, N",
            "Max electrons in shell: 2n²",
            "Atomic number (Z) = number of protons",
            "Mass number (A) = protons + neutrons",
            "Isotopes: same Z, different A",
            "Isobars: same A, different Z"
        ],
        problems: [
            "Draw Bohr model for Sodium (Z=11).",
            "Find electronic configuration of Calcium (Z=20).",
            "Max electrons in 3rd shell (M)?",
            "Give 2 examples each of isotopes and isobars.",
            "Why was Rutherford's model rejected? What was the limitation?"
        ],
        formulas: [
            "Max electrons in nth shell = 2n²",
            "Atomic number (Z) = protons = electrons (neutral atom)",
            "Mass number (A) = protons + neutrons",
            "Valency from outermost shell electrons"
        ],
        recallTask: [
            "Write electronic configurations for first 20 elements — from memory",
            "Draw Bohr model for Chlorine (Z=17) — no notes",
            "Compare Thomson, Rutherford, Bohr models — 3 key differences each"
        ],
        quizFormulas: [
            { q: "Max electrons in nth shell", a: "2n²" },
            { q: "Mass number A = ?", a: "Protons + Neutrons" },
            { q: "Isotopes have same", a: "Atomic number (Z)" },
        ]
    },
    {
        topic: "Periodic Table", sub: "Classification of Elements",
        chapter: "Ch 7 — Classification of Elements — The Periodic Table",
        whatToStudy: [
            "Mendeleev's periodic table: elements arranged by atomic mass",
            "Modern periodic table: elements arranged by atomic number",
            "Period = number of shells",
            "Group = number of valence electrons",
            "Trends: atomic radius decreases across period, increases down group",
            "Trends: metallic character decreases across period, increases down group",
            "Electronegativity and ionisation energy trends"
        ],
        problems: [
            "An element has Z=12. Find period, group, and metallic/non-metallic nature.",
            "Why do elements in same group have similar properties?",
            "Arrange Na, Mg, Al in decreasing order of atomic radius. Give reason.",
            "What was the limitation of Mendeleev's periodic table?",
            "Explain why noble gases are in Group 18."
        ],
        formulas: [
            "Period number = number of electron shells",
            "Group number (main) = valence electrons",
            "Atomic radius: decreases → across period, increases ↓ down group",
            "Metallic character: decreases → across period, increases ↓ down group"
        ],
        recallTask: [
            "Write first 20 elements with Z, shells, and period/group — from memory",
            "List all periodic trends with direction — no book",
            "Solve: Z=17. Find period, group, metal/non-metal, valency."
        ],
        quizFormulas: [
            { q: "Period number = ?", a: "Number of electron shells" },
            { q: "Atomic radius trend across period", a: "Decreases" },
            { q: "Metallic character trend down group", a: "Increases" },
        ]
    },
    {
        topic: "Chemical Bonding", sub: "Ionic, Covalent & Metallic Bonds",
        chapter: "Ch 8 — Chemical Bonding",
        whatToStudy: [
            "Octet rule: atoms tend to have 8 electrons in outermost shell",
            "Ionic bond: transfer of electrons (metal + non-metal)",
            "Covalent bond: sharing of electrons (non-metal + non-metal)",
            "Single, Double, Triple bonds",
            "Properties of ionic compounds: high MP, conduct electricity in molten/solution",
            "Properties of covalent compounds: low MP, poor conductors",
            "Lewis dot structures"
        ],
        problems: [
            "Draw Lewis dot structure for NaCl formation.",
            "Draw Lewis dot structure for H₂O, NH₃, CH₄.",
            "Why does NaCl conduct electricity in molten state but not solid?",
            "Explain formation of MgO using electron transfer.",
            "Compare ionic and covalent compounds — 4 differences."
        ],
        formulas: [
            "Ionic bond = electron transfer (metal → non-metal)",
            "Covalent bond = electron sharing",
            "Ionic compounds: high MP, soluble in water, conduct in solution",
            "Covalent compounds: low MP, insoluble, poor conductors"
        ],
        recallTask: [
            "Draw Lewis structures for NaCl, MgO, CaCl₂ — from memory",
            "Draw Lewis structures for O₂, N₂, H₂O — show shared pairs",
            "Write 4 differences between ionic and covalent compounds — no notes"
        ],
        quizFormulas: [
            { q: "Ionic bond involves", a: "Transfer of electrons" },
            { q: "Covalent bond involves", a: "Sharing of electrons" },
            { q: "Ionic compounds conduct electricity when", a: "Molten or in solution" },
        ]
    },
    {
        topic: "🔁 REVISION DAY", sub: "Chemistry Ch 2-3 & 6-8 Full Recall",
        chapter: "Chemistry Chapters Revision",
        whatToStudy: ["All reaction types", "pH scale", "Atomic structure", "Periodic trends", "Bond types"],
        problems: [
            "Balance: Fe₂O₃ + Al → Al₂O₃ + Fe. Identify reaction type.",
            "Draw Bohr model for Argon (Z=18).",
            "Z=19. Find period, group, name, metal/non-metal.",
            "Draw Lewis structure for CaCl₂.",
            "What is the pH of lemon juice? Is it acid or base?"
        ],
        formulas: ["Write all chemistry formulas on one page"],
        recallTask: ["Chemistry formula dump — 5 min", "Solve all 5 — 30 min", "Identify weakest chemistry chapter"],
        quizFormulas: [
            { q: "Displacement reaction", a: "A + BC → AC + B" },
            { q: "Max electrons in 2nd shell", a: "8" },
            { q: "Covalent bond involves", a: "Sharing of electrons" },
        ]
    },
    {
        topic: "Electric Current", sub: "Ohm's Law, Resistance & Circuits",
        chapter: "Ch 9 — Electric Current",
        whatToStudy: [
            "Current I = Q/t (Ampere = Coulomb/second)",
            "Potential difference V = W/Q (Volt = Joule/Coulomb)",
            "Ohm's law: V = IR",
            "Resistance: R = ρL/A",
            "Series: R = R₁+R₂+R₃, same current, voltage divides",
            "Parallel: 1/R = 1/R₁+1/R₂+1/R₃, same voltage, current divides",
            "Power P = VI = I²R = V²/R",
            "Energy E = Pt = VIt"
        ],
        problems: [
            "V=12V, R=4Ω. Find I.",
            "Three resistors 2Ω, 3Ω, 6Ω in series. Find total R and I if V=22V.",
            "Same resistors in parallel. Find equivalent R.",
            "A device of 5Ω carries 4A for 10 min. Find heat produced.",
            "Explain why household circuits are connected in parallel."
        ],
        formulas: [
            "V = IR (Ohm's law)",
            "R = ρL/A (Resistivity formula)",
            "Series: R = R₁ + R₂ + R₃",
            "Parallel: 1/R = 1/R₁ + 1/R₂ + 1/R₃",
            "P = VI = I²R = V²/R",
            "E = VIt (Energy = Power × time)"
        ],
        recallTask: [
            "Write Ohm's law, series and parallel formulas — from memory",
            "Solve blind: 3Ω and 6Ω in parallel. Find R, then I if V=12V.",
            "Write 3 advantages of parallel circuits over series."
        ],
        quizFormulas: [
            { q: "Ohm's Law", a: "V = IR" },
            { q: "Resistors in series", a: "R = R₁ + R₂ + R₃" },
            { q: "P = ?", a: "VI or I²R or V²/R" },
        ]
    },
    {
        topic: "Electromagnetism", sub: "Magnetic Effects of Electric Current",
        chapter: "Ch 10 — Electromagnetism",
        whatToStudy: [
            "Magnetic field due to straight conductor: concentric circles",
            "Right-hand thumb rule for direction of field",
            "Solenoid: coil acting as a magnet",
            "Fleming's left-hand rule: Force on current-carrying conductor in magnetic field",
            "Electric motor: principle and working",
            "Electromagnetic induction: Faraday's experiments",
            "Fleming's right-hand rule: direction of induced current",
            "Electric generator (AC and DC): principle and working"
        ],
        problems: [
            "State right-hand thumb rule. Draw magnetic field around straight conductor.",
            "State Fleming's left-hand rule. In which device is it used?",
            "Explain working of electric motor with diagram.",
            "What is electromagnetic induction? Who discovered it?",
            "Explain working of AC generator with diagram."
        ],
        formulas: [
            "Right-hand thumb rule: thumb = current, curled fingers = magnetic field",
            "Fleming's left hand: Fore finger=Field, Middle=Current, Thumb=Force (motion)",
            "Fleming's right hand: Thumb=Motion, Fore=Field, Middle=Induced Current",
            "Motor: electrical → mechanical energy",
            "Generator: mechanical → electrical energy"
        ],
        recallTask: [
            "Draw electric motor diagram with labels — from memory",
            "Draw AC generator diagram with labels — from memory",
            "State both Fleming's rules with hand diagram — no book"
        ],
        quizFormulas: [
            { q: "Fleming's left hand rule is used in", a: "Electric motor" },
            { q: "Fleming's right hand rule is used in", a: "Electric generator" },
            { q: "Motor converts", a: "Electrical energy to mechanical energy" },
        ]
    },
    {
        topic: "🔁 REVISION DAY", sub: "Electric Current & Electromagnetism",
        chapter: "Ch 9-10 Revision — Electricity & Magnetism",
        whatToStudy: ["All circuit formulas", "Series vs Parallel", "Both Fleming's rules", "Motor and Generator diagrams"],
        problems: [
            "4Ω and 6Ω in parallel, then in series with 3Ω. V=24V. Find I.",
            "A 100W bulb runs for 5 hours. Find energy consumed in kWh.",
            "Draw AC generator with labels. State principle.",
            "Solve: R=ρL/A. ρ=1.7×10⁻⁸, L=10m, A=1mm². Find R.",
            "Why is an electric fuse made of low melting point material?"
        ],
        formulas: ["Write ALL electricity and magnetism formulas"],
        recallTask: ["Formula dump — 5 min", "Solve all 5 — 35 min", "Draw motor + generator from memory"],
        quizFormulas: [
            { q: "Ohm's Law", a: "V = IR" },
            { q: "Generator converts", a: "Mechanical energy to electrical energy" },
            { q: "Energy formula", a: "E = VIt" },
        ]
    },
    {
        topic: "Principles of Metallurgy", sub: "Extraction & Refining of Metals",
        chapter: "Ch 11 — Principles of Metallurgy",
        whatToStudy: [
            "Occurrence: minerals, ores, gangue",
            "Activity series: K, Na, Ca, Mg, Al, Zn, Fe, Pb, Cu, Ag, Au",
            "Extraction based on reactivity: electrolysis (high), reduction (medium), heating (low)",
            "Steps: Mining → Crushing → Concentration → Roasting/Calcination → Reduction → Refining",
            "Roasting: heating in air (sulphide ores)",
            "Calcination: heating without air (carbonate ores)",
            "Corrosion: rusting of iron, prevention methods"
        ],
        problems: [
            "Arrange Cu, Al, Fe, Au in order of reactivity.",
            "How is copper extracted from copper sulphide ore?",
            "What is the difference between roasting and calcination?",
            "What is corrosion? How can rusting of iron be prevented?",
            "Why is aluminium extracted by electrolysis and not by carbon reduction?"
        ],
        formulas: [
            "Activity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > Cu > Ag > Au",
            "Roasting: 2ZnS + 3O₂ → 2ZnO + 2SO₂",
            "Calcination: ZnCO₃ → ZnO + CO₂",
            "Reduction: ZnO + C → Zn + CO"
        ],
        recallTask: [
            "Write activity series from K to Au — from memory",
            "Write roasting, calcination, reduction with examples — no book",
            "Compare roasting vs calcination — 3 differences"
        ],
        quizFormulas: [
            { q: "Roasting is", a: "Heating ore in presence of air" },
            { q: "Calcination is", a: "Heating ore without air" },
            { q: "Most reactive metal", a: "Potassium (K)" },
        ]
    },
    {
        topic: "Carbon & Its Compounds", sub: "Organic Chemistry Basics",
        chapter: "Ch 12 — Carbon and its Compounds",
        whatToStudy: [
            "Carbon: tetravalent (valency 4), forms covalent bonds",
            "Catenation: carbon-carbon bonding to form chains/rings",
            "Homologous series: CnH₂n+₂ (alkanes), CnH₂n (alkenes), CnH₂n-₂ (alkynes)",
            "Functional groups: -OH (alcohol), -COOH (acid), -CHO (aldehyde), -CO- (ketone)",
            "IUPAC naming: meth(1), eth(2), prop(3), but(4), pent(5)...",
            "Properties: combustion, oxidation, addition, substitution",
            "Ethanol and Ethanoic acid: properties and reactions"
        ],
        problems: [
            "Write structural formula of butane, butanol, butanoic acid.",
            "What is a homologous series? Give example with 3 members.",
            "Write the chemical reaction of ethanol with sodium.",
            "What happens when ethanol is heated with conc. H₂SO₄? Write equation.",
            "Why is carbon tetravalent? Explain with electronic configuration."
        ],
        formulas: [
            "Alkanes: CnH₂n+₂ (single bonds only, saturated)",
            "Alkenes: CnH₂n (one double bond, unsaturated)",
            "Alkynes: CnH₂n-₂ (one triple bond, unsaturated)",
            "Meth=1C, Eth=2C, Prop=3C, But=4C, Pent=5C"
        ],
        recallTask: [
            "Write general formulas for alkanes, alkenes, alkynes — from memory",
            "Write structural formulas for methane to pentane — no book",
            "List 5 functional groups with names and structures"
        ],
        quizFormulas: [
            { q: "General formula of alkanes", a: "CnH₂n+₂" },
            { q: "General formula of alkenes", a: "CnH₂n" },
            { q: "Catenation means", a: "Carbon atoms bonding to each other to form chains" },
        ]
    },
    {
        topic: "🔁 REVISION DAY", sub: "Metallurgy & Carbon Compounds",
        chapter: "Ch 11-12 Revision",
        whatToStudy: ["Activity series", "Extraction methods", "Organic naming", "Functional groups"],
        problems: [
            "Arrange in reactivity: Ag, Fe, Al, Cu, Na.",
            "Write structural formula of propanol and propanoic acid.",
            "What is electrolytic refining? Draw diagram.",
            "Write 3 properties of ethanoic acid.",
            "Why are alkenes called unsaturated hydrocarbons?"
        ],
        formulas: ["Write all metallurgy + organic chemistry formulas"],
        recallTask: ["Chemistry formula dump — 5 min", "Solve all 5 in 25 min", "Identify weak areas"],
        quizFormulas: [
            { q: "CnH₂n+₂ is", a: "Alkane (saturated)" },
            { q: "Roasting vs Calcination", a: "Roasting = with air, Calcination = without air" },
            { q: "Carbon valency", a: "4 (tetravalent)" },
        ]
    },
    {
        topic: "📝 MOCK EXAM 1", sub: "Full Physical Science Paper",
        chapter: "All 12 Chapters — Physical Science",
        whatToStudy: ["Exam conditions — 1.5 hours", "No phone, no book", "Answer all sections"],
        problems: [
            "Section A: Mirror formula | pH of HCl | Max electrons in M shell | V=IR find I | Alkane formula",
            "Section B: Ray diagram concave mirror | Balance equation | Lewis structure NaCl",
            "Section C: Series-parallel problem | Explain myopia with correction | Roasting vs Calcination",
            "Section D: AC generator working | Compare ionic/covalent | Carbon compounds naming",
            "Score yourself honestly"
        ],
        formulas: ["NO FORMULA SHEET — exam conditions"],
        recallTask: ["Complete paper in 1.5 hours", "Score yourself", "List weak chapters"],
        quizFormulas: [
            { q: "Mirror formula", a: "1/f = 1/v + 1/u" },
            { q: "Ohm's Law", a: "V = IR" },
            { q: "Motor converts", a: "Electrical to mechanical energy" },
        ]
    },
    {
        topic: "🔧 ERROR ANALYSIS 1", sub: "Fix Mistakes from Mock 1",
        chapter: "Based on Mock 1 mistakes",
        whatToStudy: ["Re-do every wrong question", "Classify: forgotten formula? concept gap? careless?", "Re-study weak topics only"],
        problems: [
            "Re-solve every wrong question — without looking at solutions first",
            "Study solutions step by step for still-stuck ones",
            "Write corrected solutions neatly",
            "Create personal 'formula mistakes' list",
            "Read list 3 times before sleeping"
        ],
        formulas: ["Your personal list — whatever you got wrong"],
        recallTask: ["Re-solve wrong questions", "Read mistakes list", "10-question self-test on weakest chapter"],
        quizFormulas: [
            { q: "Lens formula", a: "1/f = 1/v - 1/u" },
            { q: "Reduction means", a: "Loss of oxygen or gain of hydrogen" },
            { q: "Activity series starts with", a: "K (Potassium)" },
        ]
    },
    {
        topic: "🔁 FULL FORMULA REVISION", sub: "All 12 Chapters Formula Drill",
        chapter: "All Physics + Chemistry Formulas",
        whatToStudy: ["Write every formula from all 12 chapters", "Group by: Optics, Chemistry, Electricity, Organic"],
        problems: [
            "Solve 2 problems from each: Mirrors, Lenses, Circuits, Reactions, Organic.",
            "Draw: motor diagram, generator diagram, Bohr model Na, Lewis NaCl.",
            "Write activity series and periodic trends.",
            "Balance 3 equations from memory.",
            "Power and energy calculation."
        ],
        formulas: ["ALL formulas — this IS the revision"],
        recallTask: ["15-min full formula dump", "Solve 10 mixed problems — 45 min timed", "Score and identify final weak spots"],
        quizFormulas: [
            { q: "P = VI = ?", a: "I²R or V²/R" },
            { q: "n = ?", a: "sin i / sin r (Snell's law)" },
            { q: "Neutralisation", a: "Acid + Base → Salt + Water" },
        ]
    },
    {
        topic: "📝 MOCK EXAM 2", sub: "Beat Mock 1 Score!",
        chapter: "All 12 Chapters — Physical Science",
        whatToStudy: ["Full exam — same conditions", "Focus on time management", "Start with easy sections"],
        problems: [
            "Section A: Lens power | Combination reaction | Group of Z=17 | Parallel R | Ethanol formula",
            "Section B: Human eye diagram | pH examples | Solenoid field | Homologous series",
            "Section C: Lens problem | Extraction of iron | Motor working | Redox example",
            "Section D: Compare series/parallel | Periodic trends | Corrosion prevention | AC generator",
            "Target: beat Mock 1 score"
        ],
        formulas: ["NO FORMULA SHEET"],
        recallTask: ["Complete paper in 1.5 hours", "Compare with Mock 1", "Note improvements"],
        quizFormulas: [
            { q: "1/f = 1/v - 1/u is", a: "Lens formula" },
            { q: "Corrosion of iron is called", a: "Rusting" },
            { q: "Fleming's left hand rule: thumb =", a: "Force/Motion" },
        ]
    },
    {
        topic: "🔧 ERROR ANALYSIS 2", sub: "Final Weak Point Fix",
        chapter: "Based on Mock 2 mistakes",
        whatToStudy: ["Re-do Mock 2 wrong questions", "Compare Mock 1 and 2 mistakes", "Focus only on recurring errors"],
        problems: [
            "Re-solve Mock 2 wrong questions without solutions",
            "Compare: what was wrong in Mock 1 that was fixed? What's still wrong?",
            "Write final formula list of frequently forgotten formulas",
            "Solve 5 questions from YOUR weakest chapter",
            "Read your complete error list before sleeping"
        ],
        formulas: ["Final personal formula sheet"],
        recallTask: ["Re-solve wrong questions", "Final formula dump — full syllabus", "Sleep early!"],
        quizFormulas: [
            { q: "R = ρL/A means", a: "Resistance depends on length, area, and resistivity" },
            { q: "CnH₂n is", a: "Alkene (unsaturated, one double bond)" },
            { q: "Refractive index n = ?", a: "Speed in vacuum / Speed in medium" },
        ]
    },
    {
        topic: "🔁 FULL SYLLABUS REVISION", sub: "Everything — One Last Time",
        chapter: "All 12 Chapters Final Pass",
        whatToStudy: ["ALL formulas one page", "ALL diagrams: motor, generator, eye, Bohr, Lewis", "Only weak areas — do NOT re-read strong chapters"],
        problems: [
            "Write ALL formulas for 12 chapters — 20 min",
            "Draw 5 key diagrams: motor, generator, human eye, Bohr Na, convex lens ray diagram",
            "Solve 1 problem from each chapter — 12 problems, 45 min",
            "Read your personal error list one final time",
            "Review mistake notebook if available"
        ],
        formulas: ["TODAY = Write ALL formulas. This IS your revision."],
        recallTask: ["Complete formula sheet — all chapters", "5 diagrams from memory", "Sleep by 10 PM!"],
        quizFormulas: [
            { q: "1/f = 1/v + 1/u is", a: "Mirror formula" },
            { q: "Acid + Base →", a: "Salt + Water" },
            { q: "V = IR is", a: "Ohm's Law" },
        ]
    },
    {
        topic: "🎯 FINAL DAY", sub: "Mental Prep + Light Review",
        chapter: "Light revision — all chapters",
        whatToStudy: ["DO NOT study new topics", "Write key formulas on ONE page", "Trust your preparation", "Sleep by 10 PM"],
        problems: [
            "Formula sheet: write ALL key formulas (~20 min)",
            "Read your error analysis list — just read, don't solve",
            "5 quick problems from 5 weakest topics only",
            "Close eyes: mentally name each chapter and its key concept",
            "Pack bag: pen, pencil, calculator (if allowed), admit card"
        ],
        formulas: ["TODAY = Final formula review. This IS your revision."],
        recallTask: ["Write final formula sheet", "5 quick problems from weak areas", "Sleep by 10 PM — no exceptions!"],
        quizFormulas: [
            { q: "Mirror formula", a: "1/f = 1/v + 1/u" },
            { q: "Ohm's Law", a: "V = IR" },
            { q: "Alkane formula", a: "CnH₂n+₂" },
        ]
    }
];

export const PHYSICS_META = {
    id: "physics",
    name: "Physical Science",
    icon: "🔬",
    color: "#39ff7a",
    examDate: "2026-04-02",
    chapters: 12
};
