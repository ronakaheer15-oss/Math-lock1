// ─── MATHEMATICS ROADMAP (TS SSC 2026) ─────────────────────────────────────
// Exam Date: March 28, 2026 — 21-day roadmap
export const ROADMAP_MATH = [
    {
        topic: "Real Numbers", sub: "Euclid's Division & Fundamental Theorem",
        chapter: "Ch 1 — Real Numbers (TS SSC)",
        whatToStudy: [
            "Euclid's Division Lemma: For any two positive integers a and b, a = bq + r where 0 ≤ r < b",
            "Euclid's Division Algorithm (to find HCF step by step)",
            "Fundamental Theorem of Arithmetic: Every composite number = unique product of primes",
            "Proving irrationality of √2, √3, √5",
            "Rational numbers → terminating or repeating decimals only"
        ],
        problems: [
            "Find HCF of 135 and 225 using Euclid's Division Algorithm",
            "Find HCF of 867 and 255",
            "Prove √2 is irrational",
            "Prove √3 is irrational",
            "Check if 6/15 and 17/8 are terminating decimals — give reason"
        ],
        formulas: [
            "a = bq + r  (Euclid's Division Lemma, 0 ≤ r < b)",
            "HCF × LCM = Product of two numbers",
            "Terminating decimal: denominator must be of form 2^m × 5^n only"
        ],
        recallTask: [
            "Close book. Write Euclid's Division Lemma formula from memory",
            "Solve: Find HCF(96, 404) without opening notes",
            "Prove √5 is irrational — write full proof blind"
        ],
        quizFormulas: [
            { q: "Euclid's Division Lemma", a: "a = bq + r where 0 ≤ r < b" },
            { q: "HCF × LCM = ?", a: "Product of the two numbers" },
            { q: "When is a fraction a terminating decimal?", a: "When denominator is of the form 2^m × 5^n" },
        ]
    },
    {
        topic: "Sets", sub: "Types, Operations & Venn Diagrams",
        chapter: "Ch 2 — Sets (TS SSC)",
        whatToStudy: [
            "Set definition: a well-defined collection of objects",
            "Representation: Roster (listing) and Set-Builder (rule) form",
            "Types: Empty set (∅), Finite, Infinite, Equal sets, Subsets",
            "Universal set (U), Complement of a set (A')",
            "Operations: Union (A∪B), Intersection (A∩B), Difference (A-B)",
            "Venn Diagrams for all operations",
            "n(A∪B) = n(A) + n(B) - n(A∩B)"
        ],
        problems: [
            "If A={1,2,3,4,5} and B={3,4,5,6,7}, find A∪B, A∩B, A-B",
            "Draw Venn diagrams for A∪B and A∩B where A={2,4,6,8} and B={4,8,12}",
            "If n(A)=20, n(B)=15, n(A∩B)=8, find n(A∪B)",
            "If U={1,2,...,10}, A={1,3,5,7,9}, find A'",
            "In a class of 40, 25 play cricket, 20 play football, 10 play both. Find: only cricket, only football, neither."
        ],
        formulas: [
            "n(A∪B) = n(A) + n(B) - n(A∩B)",
            "A' = U - A (complement)",
            "A-B = A ∩ B' (set difference)"
        ],
        recallTask: [
            "Write all set operation symbols and their meanings from memory",
            "Draw Venn diagrams for Union, Intersection, Difference — no book",
            "Solve blind: n(A)=30, n(B)=25, n(A∪B)=45, find n(A∩B)"
        ],
        quizFormulas: [
            { q: "n(A∪B) = ?", a: "n(A) + n(B) - n(A∩B)" },
            { q: "A' (complement) = ?", a: "U - A" },
            { q: "A-B = ?", a: "A ∩ B'" }
        ]
    },
    {
        topic: "Polynomials", sub: "Zeros, Relationships & Division Algorithm",
        chapter: "Ch 3 — Polynomials (TS SSC)",
        whatToStudy: [
            "Geometric meaning of zeros — where graph cuts x-axis",
            "For quadratic ax²+bx+c: Sum of zeros = -b/a, Product of zeros = c/a",
            "For cubic: Sum = -b/a, Sum of products of pairs = c/a, Product = -d/a",
            "Division Algorithm: Dividend = Divisor × Quotient + Remainder",
            "Finding polynomials when zeros are given"
        ],
        problems: [
            "Find zeros of x²-2x-8 and verify sum/product relationship",
            "Find zeros of 6x²-3-7x and verify",
            "Find quadratic polynomial with zeros 1/4 and -1",
            "Divide 2x²+3x+1 by x+2 and verify Division Algorithm",
            "If zeros of x³-3x²+x+1 are (a-b), a, (a+b), find a and b"
        ],
        formulas: [
            "Sum of zeros (quadratic) = -b/a",
            "Product of zeros (quadratic) = c/a",
            "Quadratic from zeros α,β: x² - (α+β)x + αβ",
            "Dividend = Divisor × Quotient + Remainder"
        ],
        recallTask: [
            "Write sum and product of zeros formula for quadratic — from memory",
            "Find zeros of x²+7x+10 without notes and verify both relationships",
            "Write a quadratic polynomial whose zeros are 2 and -3 — from scratch"
        ],
        quizFormulas: [
            { q: "Sum of zeros of quadratic ax²+bx+c", a: "-b/a" },
            { q: "Product of zeros of quadratic ax²+bx+c", a: "c/a" },
            { q: "Quadratic with zeros α and β", a: "x² - (α+β)x + αβ" },
        ]
    },
    {
        topic: "Linear Equations", sub: "Pair of Linear Equations — All 3 Methods",
        chapter: "Ch 4 — Pair of Linear Equations (TS SSC)",
        whatToStudy: [
            "Graphical method: intersection point = solution",
            "Substitution method: express one variable from one equation, substitute in other",
            "Elimination method: multiply and add/subtract to eliminate one variable",
            "Consistency conditions using ratio of coefficients",
            "Word problems: age, coins, speed, mixture"
        ],
        problems: [
            "Solve: x+y=14, x-y=4 by substitution method",
            "Solve: 3x+4y=10, 2x-2y=2 by elimination method",
            "Solve: 2x+3y=11, 2x-4y=-24 by elimination",
            "Ages: Sum of ages of father and son is 40. 5 years ago father was 3× son. Find ages.",
            "Boat goes 30km upstream in 5hrs, downstream in 3hrs. Find speed of boat and stream."
        ],
        formulas: [
            "a1/a2 ≠ b1/b2 → unique solution (consistent)",
            "a1/a2 = b1/b2 = c1/c2 → infinite solutions",
            "a1/a2 = b1/b2 ≠ c1/c2 → no solution (inconsistent)"
        ],
        recallTask: [
            "Write all 3 consistency conditions from memory with their meaning",
            "Solve: 2x+y=6 and 4x-2y=4 by elimination — no notes",
            "Word problem blind: A boat goes 30km upstream in 5hrs, 30km downstream in 3hrs. Find speeds."
        ],
        quizFormulas: [
            { q: "Condition for unique solution", a: "a1/a2 ≠ b1/b2" },
            { q: "Condition for no solution", a: "a1/a2 = b1/b2 ≠ c1/c2" },
            { q: "Condition for infinite solutions", a: "a1/a2 = b1/b2 = c1/c2" },
        ]
    },
    {
        topic: "Quadratic Equations", sub: "Factorisation, Formula & Nature of Roots",
        chapter: "Ch 5 — Quadratic Equations (TS SSC)",
        whatToStudy: [
            "Standard form: ax²+bx+c=0",
            "Method 1: Factorisation — split middle term",
            "Method 2: Completing the square",
            "Method 3: Quadratic formula x = [-b ± √(b²-4ac)] / 2a",
            "Discriminant D = b²-4ac: D>0 (2 real roots), D=0 (equal roots), D<0 (no real roots)"
        ],
        problems: [
            "Solve x²-3x-10=0 by factorisation",
            "Solve 2x²+x-6=0 by factorisation",
            "Solve 2x²-7x+3=0 using quadratic formula",
            "Find discriminant and nature of roots: 2x²-4x+3=0",
            "Find value of k so that x²-kx+4=0 has equal roots"
        ],
        formulas: [
            "x = (-b ± √(b²-4ac)) / 2a",
            "D = b²-4ac",
            "D > 0: two distinct real roots | D = 0: equal roots | D < 0: no real roots"
        ],
        recallTask: [
            "Derive quadratic formula from ax²+bx+c=0 by completing the square — no notes",
            "Solve x²-5x+6=0 by both factorisation AND formula — check answers match",
            "Find k if kx²+2x+1=0 has equal roots — write full working blind"
        ],
        quizFormulas: [
            { q: "Quadratic Formula", a: "x = (-b ± √(b²-4ac)) / 2a" },
            { q: "Discriminant formula", a: "D = b²-4ac" },
            { q: "D = 0 means?", a: "Two equal real roots" },
        ]
    },
    {
        topic: "Progressions", sub: "AP — nth Term, Sum & Word Problems",
        chapter: "Ch 6 — Progressions (TS SSC)",
        whatToStudy: [
            "AP definition: constant difference 'd' between consecutive terms",
            "General form: a, a+d, a+2d, ...",
            "nth term: an = a + (n-1)d",
            "Sum of n terms: Sn = n/2 [2a + (n-1)d]",
            "Finding n when sum or nth term is given"
        ],
        problems: [
            "Find 30th term of AP: 10, 7, 4...",
            "How many terms of AP 3,5,7... sum to 120?",
            "Find 11th term of AP: -3, -1/2, 2...",
            "Find sum of first 22 terms of AP: 8, 3, -2...",
            "Find AP where 3rd term=4 and 9th term=-8. Find sum of first 12 terms."
        ],
        formulas: [
            "an = a + (n-1)d",
            "Sn = n/2 [2a + (n-1)d]",
            "Sn = n/2 [a + l]  (l = last term)",
            "d = a2 - a1"
        ],
        recallTask: [
            "Write both AP formulas from memory — explain every letter",
            "Solve blind: Find 20th term of 2, 7, 12, 17...",
            "Solve blind: Sum of first 16 terms of AP: 10, 6, 2..."
        ],
        quizFormulas: [
            { q: "nth term of AP", a: "an = a + (n-1)d" },
            { q: "Sum of n terms of AP", a: "Sn = n/2 [2a + (n-1)d]" },
            { q: "Common difference d = ?", a: "d = a2 - a1" },
        ]
    },
    {
        topic: "🔁 REVISION DAY", sub: "Algebra & Sets — Ch 1-6 Full Recall",
        chapter: "Ch 1–6 — Full Revision (TS SSC)",
        whatToStudy: ["Review all formulas from Ch 1-6", "Include Sets operations & Venn diagrams", "Focus only on questions you got wrong", "Do NOT re-read theory — only solve"],
        problems: [
            "Find HCF(26,91) and LCM(26,91) — verify HCF×LCM = product",
            "Find zeros of 4s²-4s+1 and verify sum/product",
            "Solve: 2x+3y=13, 5x-4y=-2",
            "Solve: x²-4x+3=0 by factorisation and formula",
            "Find sum of AP: 34+32+30+...+10"
        ],
        formulas: ["Write ALL formulas from Chapters 1-5 on one page first"],
        recallTask: ["5-min formula dump — Ch1-5 all formulas, no peeking", "Solve all 5 problems in 40 min timed", "Write WHY each wrong answer was wrong"],
        quizFormulas: [
            { q: "HCF × LCM = ?", a: "Product of the two numbers" },
            { q: "an = ?", a: "a + (n-1)d" },
            { q: "Quadratic formula", a: "x = (-b ± √(b²-4ac)) / 2a" },
        ]
    },
    {
        topic: "Similar Triangles", sub: "Similarity Criteria & BPT",
        chapter: "Ch 8 — Similar Triangles (TS SSC)",
        whatToStudy: [
            "BPT: Line || to one side divides other two sides proportionally",
            "Converse of BPT",
            "Similarity: AA, SAS, SSS criteria",
            "Area ratio of similar triangles = square of side ratio",
            "Pythagoras theorem and its converse"
        ],
        problems: [
            "In △ABC, DE||BC and AD/DB=3/5. Find AE/EC.",
            "Prove △ABD ~ △ABC if ∠A is common and ∠ADB=∠ABC",
            "Similar △s: AB=4, DE=6, area of △ABC=9. Find area of △DEF.",
            "Prove triangles formed by altitude on hypotenuse are similar to original",
            "Ladder 10m reaches wall 8m high. How far is foot from wall?"
        ],
        formulas: [
            "BPT: AD/DB = AE/EC (when DE || BC)",
            "Area ratio of similar Δs = (corresponding side ratio)²",
            "Pythagoras: AC² = AB² + BC²"
        ],
        recallTask: [
            "Write BPT statement and proof from memory — draw diagram",
            "Write all 3 similarity criteria with diagrams — no book",
            "Solve blind: Hypotenuse=5cm, one side=4cm. Find third side."
        ],
        quizFormulas: [
            { q: "BPT (Basic Proportionality Theorem)", a: "AD/DB = AE/EC when DE || BC" },
            { q: "Area ratio of similar triangles", a: "(ratio of corresponding sides)²" },
            { q: "Pythagoras theorem", a: "AC² = AB² + BC²" },
        ]
    },
    {
        topic: "Coordinate Geometry", sub: "Distance, Section & Area Formulas",
        chapter: "Ch 7 — Coordinate Geometry (TS SSC)",
        whatToStudy: [
            "Distance formula: d = √[(x2-x1)² + (y2-y1)²]",
            "Section formula: [(mx2+nx1)/(m+n), (my2+ny1)/(m+n)]",
            "Midpoint: [(x1+x2)/2, (y1+y2)/2]",
            "Area of triangle: ½|x1(y2-y3)+x2(y3-y1)+x3(y1-y2)|",
            "Collinear points: area = 0"
        ],
        problems: [
            "Distance between (2,3) and (4,1)",
            "Distance between (-5,7) and (-1,3)",
            "Point dividing (4,-3)→(8,5) in ratio 3:1",
            "Midpoint of (3,4) and (7,2)",
            "Area of triangle: (2,3), (-1,0), (2,-4)"
        ],
        formulas: [
            "Distance = √[(x2-x1)² + (y2-y1)²]",
            "Section = [(mx2+nx1)/(m+n), (my2+ny1)/(m+n)]",
            "Midpoint = [(x1+x2)/2, (y1+y2)/2]",
            "Area = ½|x1(y2-y3)+x2(y3-y1)+x3(y1-y2)|"
        ],
        recallTask: [
            "Derive distance formula from Pythagoras — draw and write",
            "Solve blind: Find point on x-axis equidistant from A(3,6) and B(-3,0)",
            "Solve blind: Area of triangle with vertices (0,0),(3,4),(4,3)"
        ],
        quizFormulas: [
            { q: "Distance formula", a: "√[(x2-x1)² + (y2-y1)²]" },
            { q: "Midpoint formula", a: "[(x1+x2)/2, (y1+y2)/2]" },
            { q: "Area of triangle (coordinate)", a: "½|x1(y2-y3)+x2(y3-y1)+x3(y1-y2)|" },
        ]
    },
    {
        topic: "Trigonometry", sub: "Ratios, Identities & Standard Angles",
        chapter: "Ch 11 — Trigonometry (TS SSC)",
        whatToStudy: [
            "6 ratios: sinθ=P/H, cosθ=B/H, tanθ=P/B, cosecθ=H/P, secθ=H/B, cotθ=B/P",
            "Reciprocal: cosec=1/sin, sec=1/cos, cot=1/tan",
            "Standard table: 0°,30°,45°,60°,90° for sin,cos,tan",
            "Identities: sin²θ+cos²θ=1, 1+tan²θ=sec²θ, 1+cot²θ=cosec²θ",
            "Complementary: sin(90-θ)=cosθ, tan(90-θ)=cotθ"
        ],
        problems: [
            "If sinA=3/4, find all other 5 trig ratios",
            "Evaluate: 2tan²45°+cos²30°-sin²60°",
            "Prove: (sinA+cosecA)²+(cosA+secA)²=7+tan²A+cot²A",
            "Prove: cosA/(1-sinA)+cosA/(1+sinA)=2secA",
            "If tanθ+sinθ=m and tanθ-sinθ=n, show m²-n²=4√mn"
        ],
        formulas: [
            "sinθ=P/H, cosθ=B/H, tanθ=P/B",
            "sin²θ+cos²θ=1 → 1+tan²θ=sec²θ → 1+cot²θ=cosec²θ",
            "sin30=1/2, sin45=1/√2, sin60=√3/2, sin90=1",
            "cos30=√3/2, cos45=1/√2, cos60=1/2, cos90=0",
            "tan30=1/√3, tan45=1, tan60=√3, tan90=undefined"
        ],
        recallTask: [
            "Write full standard angles table from memory (sin/cos/tan for 0,30,45,60,90)",
            "Write all 3 Pythagorean identities and derive 2nd and 3rd from 1st",
            "Prove blind: sinθ/(1-cosθ)+sinθ/(1+cosθ)=2cosecθ"
        ],
        quizFormulas: [
            { q: "sin²θ + cos²θ = ?", a: "1" },
            { q: "1 + tan²θ = ?", a: "sec²θ" },
            { q: "sin 60° = ?", a: "√3/2" },
        ]
    },
    {
        topic: "Trigonometry Applications", sub: "Heights and Distances",
        chapter: "Ch 12 — Applications of Trigonometry (TS SSC)",
        whatToStudy: [
            "Angle of elevation: from horizontal UP to object",
            "Angle of depression: from horizontal DOWN to object",
            "Always draw diagram first — this is the most critical step",
            "Steps: Read → Draw → Label → Write trig equation → Solve",
            "tan θ = height / horizontal distance (most used)"
        ],
        problems: [
            "Tower 100m high. Angle of elevation from ground = 30°. Find distance from base.",
            "Kite at 60m height. String at 60° to ground. Find length of string.",
            "From top of 7m building: elevation to tower top=60°, depression to foot=45°. Find tower height.",
            "Two poles 80m apart. Elevation of tops from each other's base = 60° and 30°. Find heights.",
            "Man on 200m cliff sees two boats at 30° and 45°. Find distance between boats."
        ],
        formulas: [
            "tan(angle) = opposite / adjacent = height / horizontal distance",
            "sin θ = opposite/hypotenuse",
            "cos θ = adjacent/hypotenuse"
        ],
        recallTask: [
            "Draw 3 heights & distances diagrams from memory — label all parts",
            "Solve blind: Sun elevation=60°, shadow=20m. Find height of pole.",
            "Solve blind: From top of 10m building, depression of car=30°. Find distance."
        ],
        quizFormulas: [
            { q: "tan(angle of elevation) = ?", a: "height / horizontal distance" },
            { q: "sin θ = ?", a: "opposite / hypotenuse" },
            { q: "cos θ = ?", a: "adjacent / hypotenuse" },
        ]
    },
    {
        topic: "🔁 REVISION DAY", sub: "Geometry + Trig Full Recall",
        chapter: "Ch 7,8,11,12 — Full Revision (TS SSC)",
        whatToStudy: ["All similarity criteria + BPT proofs", "All coord geometry formulas", "Full trig table + identities", "Heights & distances diagrams"],
        problems: [
            "Prove BPT theorem — full proof with diagram",
            "Distance between (-3,-4) and (3,4)",
            "Prove: tanA/(1-cotA)+cotA/(1-tanA)=1+secA.cosecA",
            "Tower 50m, angle of depression of boat=30°. Find distance.",
            "Two triangles with sides 4,6 and 6,9. Similar? Which criterion?"
        ],
        formulas: ["Formula dump first — write ALL Ch6-9 formulas on blank page before starting"],
        recallTask: ["10-min formula dump blind", "Solve all 5 in 45 min — timed, no notes", "Score yourself, list every mistake"],
        quizFormulas: [
            { q: "Distance formula", a: "√[(x2-x1)² + (y2-y1)²]" },
            { q: "BPT states", a: "AD/DB = AE/EC when DE || BC" },
            { q: "sin²θ + cos²θ = ?", a: "1" },
        ]
    },
    {
        topic: "Tangents & Secants to a Circle", sub: "Tangent Properties & Proofs",
        chapter: "Ch 9 — Tangents & Secants (TS SSC)",
        whatToStudy: [
            "Tangent touches circle at exactly one point",
            "Theorem 1: Tangent ⊥ radius at point of contact",
            "Theorem 2: Tangents from external point are equal",
            "Angle AOB + Angle APB = 180°",
            "PT² = PO² - r²"
        ],
        problems: [
            "Prove: Tangent ⊥ radius at point of contact",
            "Prove: Tangents from external point are equal",
            "P is 10cm from centre, radius=6cm. Find tangent length PT.",
            "Two tangents PA, PB from P. ∠APB=80°. Find ∠AOB.",
            "Triangle circumscribes circle (r=4cm). AB=6, BC=8. Find AC."
        ],
        formulas: [
            "Tangent ⊥ Radius at point of contact",
            "PA = PB (tangents from external point)",
            "PT² = PO² - r²",
            "∠AOB + ∠APB = 180°"
        ],
        recallTask: [
            "Write full proof: tangents from external point are equal — draw diagram",
            "Solve blind: Point 13cm from centre (r=5cm). Find tangent length.",
            "Solve blind: Angle between tangents=70°. Find angle at centre."
        ],
        quizFormulas: [
            { q: "PA = ? (tangents from external point)", a: "PA = PB" },
            { q: "PT² = ?", a: "PO² - r²" },
            { q: "∠AOB + ∠APB = ?", a: "180°" },
        ]
    },
    {
        topic: "Mensuration", sub: "Areas, Surface Areas & Volumes",
        chapter: "Ch 10 — Mensuration (TS SSC)",
        whatToStudy: [
            "Area of sector = (θ/360)×πr², Arc length = (θ/360)×2πr",
            "Area of segment = sector area - triangle area",
            "Cylinder: CSA=2πrh, TSA=2πr(h+r), V=πr²h",
            "Cone: CSA=πrl, TSA=πr(l+r), V=⅓πr²h, l=√(r²+h²)",
            "Sphere: SA=4πr², V=⁴⁄₃πr³",
            "Hemisphere: CSA=2πr², TSA=3πr², V=⅔πr³",
            "Combined solids: add volumes but exclude joined faces for SA"
        ],
        problems: [
            "Sector: r=7cm, θ=90°. Find area and arc length.",
            "Hemisphere on cylinder, r=7cm, h=13cm. Find TSA.",
            "Cone (h=24cm, r=6cm) melted into sphere. Find sphere radius.",
            "Horse tied to corner of square (15m side) with 5m rope. Find grazing area.",
            "How many balls (r=0.5cm) from sphere (r=4.5cm)?"
        ],
        formulas: [
            "Area of sector = (θ/360) × πr²",
            "Arc length = (θ/360) × 2πr",
            "Cylinder: V=πr²h, TSA=2πr(r+h)",
            "Cone: V=⅓πr²h, l=√(r²+h²)",
            "Sphere: V=⁴⁄₃πr³, SA=4πr²",
            "Hemisphere: V=⅔πr³, TSA=3πr²"
        ],
        recallTask: [
            "Write ALL sector + solid formulas on one page from memory",
            "Solve blind: Sphere r=3cm melted into cylinder r=3cm. Find height.",
            "Solve blind: r=6cm, θ=60°. Find area of segment."
        ],
        quizFormulas: [
            { q: "Area of sector", a: "(θ/360) × πr²" },
            { q: "Volume of cone", a: "⅓πr²h" },
            { q: "Volume of sphere", a: "⁴⁄₃πr³" },
        ]
    },
    {
        topic: "🔁 BIG REVISION", sub: "Ch 9-10 Full Recall",
        chapter: "Ch 9-10 — Full Revision (TS SSC)",
        whatToStudy: ["All tangent theorems and proofs", "All sector/segment formulas", "All solid SA and volume formulas"],
        problems: [
            "Prove tangents from external point are equal",
            "Sector: r=21cm, θ=120°. Find area.",
            "Cone (r=5,h=12) on cylinder (r=5,h=10). Find TSA of combined solid.",
            "External point 10cm from centre (r=6cm). Find tangent length.",
            "Segment: r=15cm, angle=60°. Find area."
        ],
        formulas: ["Write all Ch10-13 formulas FIRST before solving"],
        recallTask: ["10-min formula dump", "Solve all 5 in 40 min — no notes", "Mark & identify weak topics"],
        quizFormulas: [
            { q: "PT² = ?", a: "PO² - r²" },
            { q: "Volume of sphere", a: "⁴⁄₃πr³" },
            { q: "Area of sector", a: "(θ/360) × πr²" },
        ]
    },
    {
        topic: "Statistics", sub: "Mean, Median & Mode — Grouped Data",
        chapter: "Ch 14 — Statistics (TS SSC)",
        whatToStudy: [
            "Mean (direct): x̄ = Σfx/Σf",
            "Mean (assumed mean): x̄ = a + Σfd/Σf  (d=x-a)",
            "Mode = l + [(f1-f0)/(2f1-f0-f2)] × h",
            "Median = l + [(n/2-cf)/f] × h",
            "Ogive: less-than and more-than curves, find median graphically"
        ],
        problems: [
            "Mean by direct method: Class 0-10,10-20,20-30,30-40,40-50 | Freq 5,10,15,12,8",
            "Same data, assumed mean method (a=25)",
            "Mode: Class 10-20,20-30,30-40,40-50 | Freq 4,8,12,6",
            "Median: Class 0-10,10-20,20-30,30-40,40-50 | Freq 5,8,20,15,7",
            "Draw less-than ogive and find median graphically"
        ],
        formulas: [
            "Mean (direct) = Σfx / Σf",
            "Mean (assumed) = a + Σfd/Σf",
            "Mode = l + [(f1-f0)/(2f1-f0-f2)] × h",
            "Median = l + [(n/2-cf)/f] × h",
            "l=lower class boundary, f=frequency, h=class size, cf=preceding cumulative freq"
        ],
        recallTask: [
            "Write Mode and Median formulas — explain every letter",
            "Solve blind: Mode — modal class 30-40, f1=12, f0=8, f2=6, h=10, l=30",
            "Solve blind: Median — n=50, class 20-30, cf=22, f=16, l=20, h=10"
        ],
        quizFormulas: [
            { q: "Mode formula", a: "l + [(f1-f0)/(2f1-f0-f2)] × h" },
            { q: "Median formula", a: "l + [(n/2-cf)/f] × h" },
            { q: "Mean by direct method", a: "Σfx / Σf" },
        ]
    },
    {
        topic: "Probability", sub: "Classical Probability & Key Problems",
        chapter: "Ch 13 — Probability (TS SSC)",
        whatToStudy: [
            "P(E) = favourable outcomes / total outcomes",
            "P(E) + P(Ē) = 1",
            "0 ≤ P(E) ≤ 1",
            "Cards: 52 total, 4 suits×13 each, 12 face cards, 4 aces",
            "Two dice: 36 total outcomes"
        ],
        problems: [
            "Bag: 3 red, 4 black, 5 blue. P(red), P(not black), P(red or blue)",
            "52 cards: P(king), P(red card), P(face card), P(jack of hearts)",
            "Two dice: P(sum=7), P(sum=11), P(doublet)",
            "1-20 random: P(divisible by 3), P(prime), P(multiple of 5)",
            "Class: 23 passed, 7 failed. P(passed) and P(failed)."
        ],
        formulas: [
            "P(E) = favourable / total",
            "P(Ē) = 1 - P(E)",
            "Two dice: total = 36 outcomes",
            "Cards: total=52, face=12, aces=4, each suit=13"
        ],
        recallTask: [
            "Write probability formula + complementary rule with example",
            "Solve blind: Two dice. P(sum=8) — list all favourable outcomes",
            "Solve blind: Card drawn. P(black king), P(queen of diamonds), P(face card)"
        ],
        quizFormulas: [
            { q: "P(E) = ?", a: "favourable outcomes / total outcomes" },
            { q: "P(Ē) = ?", a: "1 - P(E)" },
            { q: "Total outcomes for two dice", a: "36" },
        ]
    },
    {
        topic: "📝 MOCK EXAM 1", sub: "Full 3-Hour Board Paper",
        chapter: "Full Syllabus — All 14 Chapters (TS SSC)",
        whatToStudy: ["Start 9:30 AM — real exam conditions", "Phone away. Only pen and blank paper.", "Attempt all sections"],
        problems: [
            "Section A (1 mark): HCF(135,225) | zeros of x²-2x-8 | D of 2x²-4x+3 | sin²45°+cos²45° | P(king)",
            "Section B (2 marks): 25th term of AP 5,8,11... | Prove √2 irrational | Sector area r=7,θ=90°",
            "Section C (3 marks): Solve 3x+4y=10, 2x-2y=2 | Prove tangents equal | Median of grouped data",
            "Section D (4 marks): 50m building, depression=30°, find distance | Sphere→cone | Prove Pythagoras",
            "Score: 80+=excellent | 60-80=good | Below 60=identify weak chapters"
        ],
        formulas: ["NO FORMULA SHEET — exam conditions"],
        recallTask: ["Complete full paper in 3 hours", "Score yourself honestly", "List chapters where you lost marks"],
        quizFormulas: [
            { q: "an = ?", a: "a + (n-1)d" },
            { q: "P(E) = ?", a: "favourable / total" },
            { q: "Area of sector", a: "(θ/360) × πr²" },
        ]
    },
    {
        topic: "🔧 ERROR ANALYSIS", sub: "Fix Every Weak Point from Mock 1",
        chapter: "Based on Mock Exam 1 mistakes",
        whatToStudy: ["Re-do every wrong question", "Classify error: formula forgotten? concept gap? careless?", "Re-study ONLY weak topics"],
        problems: [
            "Re-solve every wrong question from Mock 1 — without solution first",
            "If still stuck, study solution step-by-step",
            "Write corrected solutions neatly",
            "Make a personal 'formula mistakes' list",
            "Read mistakes list 3 times before sleeping"
        ],
        formulas: ["Your personal list — whatever YOU got wrong in Mock 1"],
        recallTask: ["Re-solve wrong questions without notes", "Read your mistakes list aloud", "10-question test on weakest chapter"],
        quizFormulas: [
            { q: "Mode formula", a: "l + [(f1-f0)/(2f1-f0-f2)] × h" },
            { q: "Volume of cone", a: "⅓πr²h" },
            { q: "Quadratic formula", a: "x = (-b ± √(b²-4ac)) / 2a" },
        ]
    },
    {
        topic: "📝 MOCK EXAM 2", sub: "Beat Mock 1 Score",
        chapter: "Full Syllabus — All 14 Chapters (TS SSC)",
        whatToStudy: ["Full exam — same conditions as Mock 1", "Focus on time management", "Section A first, Section D last"],
        problems: [
            "Section A: LCM(12,15,21) | Sum of zeros 3x²-5 | Roots x²+4x+5 | tan60°.sin30° | P(multiple of 3) from 1-15",
            "Section B: Sum of 24 terms AP -5,-2,1... | Collinear (1,5),(2,3),(-2,-11)? | TSA hemisphere r=4.2cm",
            "Section C: 2x+3y=11, 2x-4y=-24 | DE||BC, AD=1.5,DB=3,AE=1 find EC | Mean by step-deviation",
            "Section D: Prove BPT | Hemisphere on cylinder r=7,h=13 find TSA | Tangents from 13cm (r=5cm)",
            "Target: beat Mock 1 score"
        ],
        formulas: ["NO FORMULA SHEET — exam conditions"],
        recallTask: ["Complete full paper in 3 hours", "Compare score with Mock 1", "Write what improved and what still needs work"],
        quizFormulas: [
            { q: "BPT states", a: "AD/DB = AE/EC when DE || BC" },
            { q: "Median formula", a: "l + [(n/2-cf)/f] × h" },
            { q: "TSA of hemisphere", a: "3πr²" },
        ]
    },
    {
        topic: "🎯 FINAL DAY", sub: "Formula Consolidation + Mental Prep",
        chapter: "Light revision — all 14 chapters (TS SSC)",
        whatToStudy: ["DO NOT study new topics", "Write every formula on ONE page", "Trust your 22 days of hard work", "Sleep by 10 PM"],
        problems: [
            "Formula sheet: write ALL formulas for all 15 chapters (~30 min)",
            "Read your error analysis list — just read, don't solve",
            "5 quick problems from your 5 weakest topics only",
            "Close eyes: mentally name each chapter and its key formula",
            "Pack bag: pen, pencil, geometry box, admit card"
        ],
        formulas: ["TODAY = Write ALL formulas. This IS your revision."],
        recallTask: ["Write complete formula sheet — all chapters", "5 quick problems from weak areas only", "Sleep by 10 PM — no exceptions!"],
        quizFormulas: [
            { q: "an = ?", a: "a + (n-1)d" },
            { q: "sin²θ + cos²θ = ?", a: "1" },
            { q: "P(E) = ?", a: "favourable / total" },
        ]
    }
];

export const MATH_META = {
    id: "math",
    name: "Mathematics",
    icon: "📐",
    color: "#f0c040",
    examDate: "2026-03-28",
    chapters: 14
};
