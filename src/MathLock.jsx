import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const ROADMAP = [
  {
    topic: "Real Numbers", sub: "Euclid's Division & Fundamental Theorem",
    chapter: "Chapter 1 — Real Numbers",
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
    topic: "Polynomials", sub: "Zeros, Relationships & Division Algorithm",
    chapter: "Chapter 2 — Polynomials",
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
    chapter: "Chapter 3 — Pair of Linear Equations in Two Variables",
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
    chapter: "Chapter 4 — Quadratic Equations",
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
    topic: "Arithmetic Progressions", sub: "nth Term, Sum & Word Problems",
    chapter: "Chapter 5 — Arithmetic Progressions",
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
    topic: "🔁 REVISION DAY", sub: "Algebra Chapters 1-5 Full Recall",
    chapter: "Chapters 1–5 — Full Revision",
    whatToStudy: ["Review all formulas from Ch1-5", "Focus only on questions you got wrong", "Do NOT re-read theory — only solve"],
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
    topic: "Triangles", sub: "Similarity Criteria & BPT",
    chapter: "Chapter 6 — Triangles",
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
    chapter: "Chapter 7 — Coordinate Geometry",
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
    topic: "Introduction to Trigonometry", sub: "Ratios, Identities & Standard Angles",
    chapter: "Chapter 8 — Introduction to Trigonometry",
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
    chapter: "Chapter 9 — Some Applications of Trigonometry",
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
    topic: "🔁 REVISION DAY", sub: "Geometry + Trig Full Recall (Ch 6-9)",
    chapter: "Chapters 6–9 Full Revision",
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
    topic: "Circles", sub: "Tangents — Properties & Proofs",
    chapter: "Chapter 10 — Circles",
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
    topic: "Constructions", sub: "Line Division & Tangent Constructions",
    chapter: "Chapter 11 — Constructions",
    whatToStudy: [
      "Dividing line segment in ratio m:n",
      "Constructing triangle similar to given (scale factor)",
      "Tangent to circle from external point",
      "Write clear steps for every construction"
    ],
    problems: [
      "Divide AB=8cm in ratio 3:2 — write all steps",
      "Construct triangle 6,8,10cm. Then similar with scale factor 3/4",
      "Circle r=4cm. From point 7cm from centre, draw two tangents. Verify.",
      "Triangle BC=7cm, ∠B=45°, ∠A=105°. Similar with scale 4/3",
      "Tangents to circle r=5cm inclined at 60° to each other"
    ],
    formulas: [
      "Scale factor < 1 → smaller triangle",
      "Scale factor > 1 → larger triangle",
      "Tangent from external: join centre → midpoint → semicircle → intersections"
    ],
    recallTask: [
      "Write steps for dividing segment in ratio 3:5 — from memory",
      "Write steps for tangent from external point — from memory",
      "Draw triangle and construct similar with scale 2/3 — no textbook"
    ],
    quizFormulas: [
      { q: "Scale factor < 1 means?", a: "New triangle is smaller than original" },
      { q: "Scale factor > 1 means?", a: "New triangle is larger than original" },
      { q: "How many tangents from external point?", a: "2" },
    ]
  },
  {
    topic: "Areas Related to Circles", sub: "Sector, Segment & Combinations",
    chapter: "Chapter 12 — Areas Related to Circles",
    whatToStudy: [
      "Area of circle = πr², Circumference = 2πr",
      "Area of sector = (θ/360)×πr²",
      "Arc length = (θ/360)×2πr",
      "Area of segment = sector area - triangle area",
      "Combination figures: add/subtract areas carefully"
    ],
    problems: [
      "Sector: radius=4cm, angle=30°. Find area.",
      "Segment: radius=12cm, angle=120°. Find area.",
      "Horse tied to corner of square (15m side) with 5m rope. Find grazing area.",
      "Ring between concentric circles r=8cm and r=6cm.",
      "Square (14cm side) with semicircles inside on each side. Find remaining area."
    ],
    formulas: [
      "Area of sector = (θ/360) × πr²",
      "Arc length = (θ/360) × 2πr",
      "Area of minor segment = sector - triangle",
      "Area of major segment = πr² - minor segment"
    ],
    recallTask: [
      "Write all 4 circle area formulas from memory",
      "Solve blind: r=7cm, θ=90°. Area of sector.",
      "Solve blind: r=6cm, θ=60°. Area of segment. (Triangle is equilateral here)"
    ],
    quizFormulas: [
      { q: "Area of sector", a: "(θ/360) × πr²" },
      { q: "Arc length", a: "(θ/360) × 2πr" },
      { q: "Area of minor segment", a: "Area of sector - Area of triangle" },
    ]
  },
  {
    topic: "Surface Areas & Volumes", sub: "Combination of Solids & Conversion",
    chapter: "Chapter 13 — Surface Areas and Volumes",
    whatToStudy: [
      "Cylinder: CSA=2πrh, TSA=2πr(h+r), V=πr²h",
      "Cone: CSA=πrl, TSA=πr(l+r), V=⅓πr²h, l=√(r²+h²)",
      "Sphere: SA=4πr², V=⁴⁄₃πr³",
      "Hemisphere: CSA=2πr², TSA=3πr², V=⅔πr³",
      "Combined solids: add volumes; for SA, exclude joined faces"
    ],
    problems: [
      "Hemisphere on cylinder, r=7cm, h=13cm. Find TSA.",
      "Cone (h=24cm, r=6cm) melted into sphere. Find sphere radius.",
      "Toy: cone on hemisphere, r=3.5cm, cone h=12cm. Find SA.",
      "How many balls (r=0.5cm) from sphere (r=4.5cm)?",
      "Cylinder tank (r=7m, h=2m) emptied into conical tank (r=7m, h=3m). % filled?"
    ],
    formulas: [
      "Cylinder: V=πr²h, TSA=2πr(r+h)",
      "Cone: V=⅓πr²h, CSA=πrl, l=√(r²+h²)",
      "Sphere: V=⁴⁄₃πr³, SA=4πr²",
      "Hemisphere: V=⅔πr³, CSA=2πr², TSA=3πr²"
    ],
    recallTask: [
      "Write ALL formulas for all 4 solids from memory on one page",
      "Solve blind: Sphere r=3cm melted into cylinder r=3cm. Find cylinder height.",
      "Solve blind: TSA of hemisphere r=10.5cm"
    ],
    quizFormulas: [
      { q: "Volume of cone", a: "⅓πr²h" },
      { q: "Volume of sphere", a: "⁴⁄₃πr³" },
      { q: "TSA of hemisphere", a: "3πr²" },
    ]
  },
  {
    topic: "🔁 BIG REVISION", sub: "Ch 10-13 Full Recall",
    chapter: "Chapters 10–13 Full Revision",
    whatToStudy: ["All circle theorems and proofs", "Construction steps", "All area and volume formulas"],
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
    chapter: "Chapter 14 — Statistics",
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
    chapter: "Chapter 15 — Probability",
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
    chapter: "Full Syllabus — All 15 Chapters",
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
    chapter: "Full Syllabus — All 15 Chapters",
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
    chapter: "Light revision — all 15 chapters",
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

const PHASES = [
  { name: "📖 READ", full: "Read the concept carefully once", duration: 10 * 60, color: "#f0c040" },
  { name: "✏️ PRACTICE", full: "Solve problems with notes open", duration: 20 * 60, color: "#ff6b35" },
  { name: "🧠 RECALL BLIND", full: "Close notes. Solve from memory.", duration: 30 * 60, color: "#39ff7a" },
  { name: "🔁 REVIEW", full: "Check answers. Fix mistakes.", duration: 20 * 60, color: "#a78bfa" },
];

const EXAM_DATE = new Date("2026-03-28");
function getDaysLeft() { return Math.max(0, Math.ceil((EXAM_DATE - new Date()) / (1000 * 60 * 60 * 24))); }
function fmt(s) { return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; }

const C = {
  bg: "#0a0a0f", surface: "#13131a", surface2: "#1c1c28",
  border: "#2a2a3a", text: "#f0eee8", muted: "#7a7a8a",
  yellow: "#f0c040", orange: "#ff6b35", green: "#39ff7a",
  red: "#ff3366", purple: "#a78bfa", blue: "#38bdf8"
};

// Seed defaults once — so Day 1 is always pre-marked complete on first ever load
function seedDefaults() {
  try {
    if (!localStorage.getItem("ml_seeded")) {
      localStorage.setItem("ml_day", JSON.stringify(1));
      localStorage.setItem("ml_doneDays", JSON.stringify([0]));
      localStorage.setItem("ml_doneTasks", JSON.stringify({ "day_0": [0, 1, 2] }));
      localStorage.setItem("ml_streak", JSON.stringify(1));
      localStorage.setItem("ml_absent", JSON.stringify(0));
      localStorage.setItem("ml_scores", JSON.stringify({ "day_0": 8 }));
      localStorage.setItem("ml_mistakes", JSON.stringify([]));
      localStorage.setItem("ml_phaseDone", JSON.stringify([]));
      localStorage.setItem("ml_screen", JSON.stringify("welcome"));
      localStorage.setItem("ml_seeded", "true");
    }
  } catch { }
}
seedDefaults();

function loadState(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveState(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { } }

function Modal({ children, borderColor = "#2a2a3a" }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.93)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, overflowY: "auto" }}>
      <div style={{ background: C.surface, border: `1px solid ${borderColor}`, borderRadius: 16, padding: "28px 22px", maxWidth: 420, width: "100%", textAlign: "center", fontFamily: "system-ui,sans-serif", color: C.text, maxHeight: "90vh", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "2px", color, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 3, height: 14, background: color, borderRadius: 2 }} />{title}
      </div>
      {children}
    </div>
  );
}

// ─── AI ANSWER CHECKER ────────────────────────────────────────────────────
async function checkAnswerWithAI(question, userAnswer, chapter, apiKey) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are a 10th class Mathematics teacher checking a student's answer.

Chapter: ${chapter}
Question: ${question}
Student's Answer: ${userAnswer}

Check if the student's answer is correct. Respond in this exact JSON format only, no extra text:
{
  "correct": true or false,
  "score": "X/10",
  "verdict": "one short line verdict",
  "what_is_right": "what the student got right (be specific)",
  "mistakes": "specific mistakes if any, or 'None' if perfect",
  "correct_approach": "the correct method/answer in brief",
  "tip": "one encouraging tip for improvement"
}`
      }]
    })
  });
  const data = await response.json();
  const text = data.content.map(i => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function MathLock() {
  const [screen, setScreen] = useState(() => loadState("ml_screen", "welcome"));
  const [currentDay, setCurrentDay] = useState(() => loadState("ml_day", 1));
  const [doneDays, setDoneDays] = useState(() => loadState("ml_doneDays", [0]));
  const [doneTasks, setDoneTasks] = useState(() => loadState("ml_doneTasks", { "day_0": [0, 1, 2] }));
  const [streak, setStreak] = useState(() => loadState("ml_streak", 1));
  const [absent, setAbsent] = useState(() => loadState("ml_absent", 0));
  const [phaseDone, setPhaseDone] = useState(() => loadState("ml_phaseDone", []));
  const [dayScores, setDayScores] = useState(() => loadState("ml_scores", {}));
  const [mistakes, setMistakes] = useState(() => loadState("ml_mistakes", []));

  const [phase, setPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);
  const [running, setRunning] = useState(false);
  const [modal, setModal] = useState(null);
  const [breakSec, setBreakSec] = useState(600);
  const [activeTab, setActiveTab] = useState("guide");

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [quizDone, setQuizDone] = useState([]);

  // AI checker state
  const [checkerQ, setCheckerQ] = useState("");
  const [checkerA, setCheckerA] = useState("");
  const [checkerRes, setCheckerRes] = useState(null);
  const [checkerLoading, setCheckerLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => loadState("ml_apikey", ""));

  // Mistake notebook
  const [newMistake, setNewMistake] = useState("");
  const [mistakeChap, setMistakeChap] = useState("");

  // Score modal
  const [pendingScore, setPendingScore] = useState(null);

  const timerRef = useRef(null);
  const breakRef = useRef(null);
  const checkRef = useRef(null);

  const day = ROADMAP[currentDay];
  const myTasks = doneTasks[`day_${currentDay}`] || [];
  const progress = Math.round((doneDays.length / 23) * 100);
  const circ = 2 * Math.PI * 48;
  const phaseFrac = 1 - timeLeft / PHASES[phase].duration;

  useEffect(() => saveState("ml_screen", screen), [screen]);
  useEffect(() => saveState("ml_day", currentDay), [currentDay]);
  useEffect(() => saveState("ml_doneDays", doneDays), [doneDays]);
  useEffect(() => saveState("ml_doneTasks", doneTasks), [doneTasks]);
  useEffect(() => saveState("ml_streak", streak), [streak]);
  useEffect(() => saveState("ml_absent", absent), [absent]);
  useEffect(() => saveState("ml_phaseDone", phaseDone), [phaseDone]);
  useEffect(() => saveState("ml_scores", dayScores), [dayScores]);
  useEffect(() => saveState("ml_mistakes", mistakes), [mistakes]);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); setRunning(false); setPhaseDone(p => [...new Set([...p, phase])]); if (phase < 3) setTimeout(() => goPhase(phase + 1), 500); return 0; }
          return t - 1;
        });
      }, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running, phase]);

  useEffect(() => {
    if (modal === "break") {
      breakRef.current = setInterval(() => setBreakSec(t => t <= 1 ? (clearInterval(breakRef.current), 0) : t - 1), 1000);
    } else clearInterval(breakRef.current);
    return () => clearInterval(breakRef.current);
  }, [modal]);

  useEffect(() => {
    if (screen !== "app") return;
    checkRef.current = setInterval(() => { if (running) { setRunning(false); setModal("checkIn"); } }, 8 * 60 * 1000);
    return () => clearInterval(checkRef.current);
  }, [screen, running]);

  useEffect(() => {
    const h = () => { if (document.hidden && running) { setRunning(false); setAbsent(a => a + 1); setModal("checkIn"); } };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [running]);

  function goPhase(i) { setPhase(i); setTimeLeft(PHASES[i].duration); setRunning(false); }

  function toggleTask(di, ti) {
    setDoneTasks(prev => {
      const k = `day_${di}`, arr = [...(prev[k] || [])], pos = arr.indexOf(ti);
      pos > -1 ? arr.splice(pos, 1) : arr.push(ti);
      const next = { ...prev, [k]: arr };
      if (arr.length === ROADMAP[di].recallTask.length) setTimeout(() => {
        setDoneDays(d => d.includes(di) ? d : [...d, di]);
        setStreak(s => s + 1);
        setPendingScore(di);
      }, 300);
      return next;
    });
  }

  function submitScore(di, score) {
    setDayScores(prev => ({ ...prev, [`day_${di}`]: score }));
    setPendingScore(null);
    setModal("dayDone");
  }

  function addMistake() {
    if (!newMistake.trim()) return;
    setMistakes(prev => [{ id: Date.now(), text: newMistake, chapter: mistakeChap || day.chapter, day: currentDay + 1, date: new Date().toLocaleDateString() }, ...prev].slice(0, 50));
    setNewMistake(""); setMistakeChap("");
  }

  function deleteMistake(id) { setMistakes(prev => prev.filter(m => m.id !== id)); }

  async function runChecker() {
    if (!checkerQ.trim() || !checkerA.trim()) return;
    setCheckerLoading(true); setCheckerRes(null);
    try {
      const res = await checkAnswerWithAI(checkerQ, checkerA, day.chapter, apiKey);
      setCheckerRes(res);
    } catch (e) { setCheckerRes({ correct: false, score: "?/10", verdict: "Could not check — try again", mistakes: "API error", correct_approach: "", tip: "Please try again", what_is_right: "" }); }
    setCheckerLoading(false);
  }

  // Quiz helpers
  const quizSet = day.quizFormulas || [];
  function nextQuiz() {
    setQuizIdx(i => (i + 1) % quizSet.length);
    setQuizAnswer(""); setQuizResult(null);
  }
  function checkQuiz() {
    const correct = quizSet[quizIdx].a.toLowerCase().replace(/\s/g, "");
    const given = quizAnswer.toLowerCase().replace(/\s/g, "");
    const isCorrect = correct.includes(given) || given.includes(correct) || given.length > 2 && correct.includes(given.slice(0, Math.floor(given.length * .7)));
    setQuizResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) setQuizDone(d => [...new Set([...d, quizIdx])]);
  }

  function resetAllData() {
    ["ml_screen", "ml_day", "ml_doneDays", "ml_doneTasks", "ml_streak", "ml_absent", "ml_phaseDone", "ml_scores", "ml_mistakes", "ml_seeded"]
      .forEach(k => localStorage.removeItem(k));
    window.location.reload();
  }

  // ── WELCOME ────────────────────────────────────────────
  if (screen === "welcome") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "system-ui,sans-serif", color: C.text, textAlign: "center" }}>
      <div style={{ background: C.yellow, color: "#000", fontSize: "10px", fontWeight: 900, letterSpacing: "4px", padding: "5px 16px", borderRadius: 2, marginBottom: 24 }}>MATHLOCK v3.0</div>
      <h1 style={{ fontSize: "clamp(48px,13vw,84px)", fontWeight: 900, lineHeight: .88, marginBottom: 14 }}>STUDY.<br /><span style={{ color: C.yellow }}>NO</span> ESCAPE.</h1>
      <p style={{ color: C.muted, fontSize: "11px", letterSpacing: "3px", marginBottom: 28, fontFamily: "monospace" }}>// AI-powered guided study system //</p>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.orange}`, padding: "18px 36px", borderRadius: 8, marginBottom: 24 }}>
        <div style={{ fontSize: 58, fontWeight: 900, color: C.orange, lineHeight: 1 }}>{getDaysLeft()}</div>
        <div style={{ color: C.muted, fontSize: "10px", letterSpacing: "3px", marginTop: 4 }}>DAYS UNTIL EXAM</div>
        <div style={{ fontSize: 12, marginTop: 8 }}>📅 Mathematics Board Exam — 28 March 2026</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24, width: "100%", maxWidth: 340 }}>
        {[["📊", "Score Tracker", "Rate each day's performance"], ["⚡", "Formula Quiz", "Flash card memory training"], ["📝", "Mistake Notebook", "Save & review your errors"], ["🤖", "AI Answer Check", "Write answer, AI checks it"]].map(([icon, title, desc]) => (
          <div key={title} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", textAlign: "left" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
            <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 2 }}>{title}</div>
            <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{desc}</div>
          </div>
        ))}
      </div>

      {doneDays.length > 0 && (
        <div style={{ background: "rgba(57,255,122,.08)", border: `1px solid ${C.green}`, borderRadius: 8, padding: "10px 20px", marginBottom: 16, fontSize: 13 }}>
          ✅ Welcome back! <strong style={{ color: C.green }}>{doneDays.length} days</strong> done. Progress saved!
        </div>
      )}
      <button onClick={() => setScreen("app")} style={{ background: C.yellow, color: "#000", border: "none", padding: "16px 52px", fontSize: 17, fontWeight: 900, cursor: "pointer", borderRadius: 4, marginBottom: 10 }}>
        {doneDays.length > 0 ? `▶ CONTINUE (Day ${currentDay + 1})` : "🔒 LOCK IN & START"}
      </button>
      {doneDays.length > 0 && <button onClick={resetAllData} style={{ background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: "7px 20px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 4 }}>Reset All Progress</button>}
    </div>
  );

  // ── MAIN APP ───────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "system-ui,sans-serif", padding: 14, maxWidth: 540, margin: "0 auto", paddingBottom: 40 }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>Math<span style={{ color: C.yellow }}>Lock</span> <span style={{ fontSize: 10, color: C.muted }}>v3</span></div>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          {absent > 0 && <div style={{ background: "rgba(255,51,102,.15)", border: `1px solid ${C.red}`, color: C.red, padding: "3px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>⚠️ {absent}x</div>}
          <div style={{ background: "rgba(255,107,53,.15)", border: `1px solid ${C.orange}`, color: C.orange, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>🔥 {streak}</div>
          <button onClick={() => setScreen("welcome")} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, padding: "3px 9px", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>⌂</button>
        </div>
      </div>

      {/* PROGRESS */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginBottom: 5 }}>
          <span>PROGRESS</span>
          <span style={{ color: C.yellow }}>{doneDays.length}/23 · {progress}%</span>
        </div>
        <div style={{ height: 5, background: C.surface2, borderRadius: 3 }}>
          <div style={{ height: "100%", background: C.yellow, borderRadius: 3, width: `${progress}%`, transition: "width .5s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 10, color: C.muted }}>
          <span style={{ color: C.text, fontWeight: 700 }}>Day {currentDay + 1}: {day.chapter}</span>
          <span style={{ color: getDaysLeft() <= 5 ? C.red : C.muted }}>{getDaysLeft()} days left</span>
        </div>
      </div>

      {/* TIMER */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
            <svg width="96" height="96" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="48" cy="48" r="44" fill="none" stroke={C.surface2} strokeWidth="6" />
              <circle cx="48" cy="48" r="44" fill="none" stroke={PHASES[phase].color} strokeWidth="6"
                strokeDasharray={circ} strokeDashoffset={circ * (1 - phaseFrac)} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: PHASES[phase].color }}>{fmt(timeLeft)}</div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: "2px", marginBottom: 3 }}>{PHASES[phase].name}</div>
            <div style={{ fontSize: 12, marginBottom: 10, lineHeight: 1.3 }}>{PHASES[phase].full}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setRunning(r => !r)} style={{ flex: 2, background: running ? C.red : C.yellow, color: "#000", border: "none", padding: "9px 6px", borderRadius: 7, fontWeight: 900, cursor: "pointer", fontSize: 12 }}>{running ? "⏸ PAUSE" : "▶ START"}</button>
              <button onClick={() => { setModal("break"); setBreakSec(600); setRunning(false); }} style={{ flex: 1, background: C.surface2, color: C.text, border: `1px solid ${C.border}`, padding: 9, borderRadius: 7, cursor: "pointer", fontSize: 12 }}>☕</button>
              <button onClick={() => setModal("hardProblem")} style={{ flex: 1, background: C.surface2, color: C.text, border: `1px solid ${C.border}`, padding: 9, borderRadius: 7, cursor: "pointer", fontSize: 12 }}>🆘</button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 12 }}>
          {PHASES.map((p, i) => (
            <button key={i} onClick={() => goPhase(i)} style={{ padding: "4px 10px", borderRadius: 20, border: `1px solid ${i === phase ? p.color : phaseDone.includes(i) ? C.green : C.border}`, background: i === phase ? `${p.color}22` : phaseDone.includes(i) ? "rgba(57,255,122,.08)" : "transparent", color: i === phase ? p.color : phaseDone.includes(i) ? C.green : C.muted, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
              {phaseDone.includes(i) && "✓ "}{p.name}
            </button>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 5, marginBottom: 12 }}>
        {[["guide", "📚"], ["tasks", "✅"], ["quiz", "⚡"], ["checker", "🤖"], ["mistakes", "📝"], ["roadmap", "🗓"]].slice(0, 6).map(([id, icon]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "8px 4px", borderRadius: 7, border: `1px solid ${activeTab === id ? C.yellow : C.border}`, background: activeTab === id ? "rgba(240,192,64,.1)" : C.surface, color: activeTab === id ? C.yellow : C.muted, fontSize: 18, cursor: "pointer" }}>
            {icon}
          </button>
        ))}
      </div>

      {/* ── STUDY GUIDE ── */}
      {activeTab === "guide" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: "2px", marginBottom: 3 }}>DAY {currentDay + 1} OF 23</div>
            <div style={{ fontSize: 17, fontWeight: 900, marginBottom: 2 }}>{day.topic}</div>
            <div style={{ fontSize: 12, color: C.yellow }}>📌 {day.chapter}</div>
          </div>
          <Section title="WHAT TO STUDY TODAY" color={C.blue}>
            {day.whatToStudy.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 12, lineHeight: 1.5 }}>
                <span style={{ color: C.blue, fontWeight: 900, flexShrink: 0 }}>{i + 1}.</span><span>{item}</span>
              </div>
            ))}
          </Section>
          <Section title="PROBLEMS TO SOLVE TODAY" color={C.orange}>
            {day.problems.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 12, lineHeight: 1.5, background: C.surface2, padding: "8px 10px", borderRadius: 6, border: `1px solid ${C.border}` }}>
                <span style={{ color: C.orange, fontWeight: 900, flexShrink: 0, minWidth: 20 }}>Q{i + 1}</span><span>{p}</span>
              </div>
            ))}
          </Section>
          <Section title="FORMULAS FOR TODAY" color={C.purple}>
            {day.formulas.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12, fontFamily: "monospace", background: "rgba(167,139,250,.08)", padding: "7px 10px", borderRadius: 5, border: `1px solid rgba(167,139,250,.2)` }}>
                <span style={{ color: C.purple, fontWeight: 900 }}>f{i + 1}</span><span style={{ color: "#e2d9fa" }}>{f}</span>
              </div>
            ))}
          </Section>
        </div>
      )}

      {/* ── RECALL TASKS ── */}
      {activeTab === "tasks" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 900 }}>RECALL TASKS</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Close your book first!</div>
            </div>
            <div style={{ background: C.red, color: "#fff", fontSize: "9px", padding: "4px 10px", borderRadius: 20, fontWeight: 800 }}>📕 NOTES CLOSED</div>
          </div>
          {day.recallTask.map((t, i) => {
            const done = myTasks.includes(i);
            return (
              <div key={i} onClick={() => toggleTask(currentDay, i)}
                style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", borderRadius: 9, border: `1px solid ${done ? C.green : C.border}`, background: done ? "rgba(57,255,122,.06)" : C.surface2, marginBottom: i < day.recallTask.length - 1 ? "10px" : 0, cursor: "pointer" }}>
                <div style={{ width: 24, height: 24, borderRadius: 5, border: `2px solid ${done ? C.green : C.border}`, background: done ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{done ? "✓" : ""}</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "2px", color: done ? C.green : C.muted, marginBottom: 3, fontWeight: 700 }}>TASK {i + 1}{done ? " — DONE ✓" : ""}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.4, color: done ? "rgba(240,238,232,.5)" : C.text }}>{t}</div>
                </div>
              </div>
            );
          })}
          {/* Day score display */}
          {dayScores[`day_${currentDay}`] && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(240,192,64,.08)", border: `1px solid rgba(240,192,64,.3)`, borderRadius: 8, fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: C.muted }}>Today's Self Score</span>
              <span style={{ color: C.yellow, fontWeight: 900, fontSize: 18 }}>{dayScores[`day_${currentDay}`]}/10</span>
            </div>
          )}
          <div style={{ marginTop: 12, padding: "10px 12px", background: "rgba(240,192,64,.06)", border: `1px solid rgba(240,192,64,.2)`, borderRadius: 8, fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
            💡 <strong style={{ color: C.yellow }}>Remember:</strong> Tick only after genuinely solving blind. That discomfort is memory being built.
          </div>
        </div>
      )}

      {/* ── FORMULA QUIZ ── */}
      {activeTab === "quiz" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 900 }}>⚡ FORMULA QUIZ</div>
            <div style={{ fontSize: 10, color: C.muted }}>{quizDone.length}/{quizSet.length} mastered</div>
          </div>
          {quizSet.length > 0 ? (
            <>
              <div style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 16px", marginBottom: 14, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.muted, letterSpacing: "2px", marginBottom: 8 }}>WHAT IS THIS FORMULA?</div>
                <div style={{ fontSize: 17, fontWeight: 900, color: C.yellow, lineHeight: 1.4 }}>{quizSet[quizIdx].q}</div>
              </div>
              <input
                value={quizAnswer}
                onChange={e => setQuizAnswer(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !quizResult && checkQuiz()}
                placeholder="Type your answer..."
                style={{ width: "100%", background: C.surface2, border: `1px solid ${quizResult ? (quizResult === "correct" ? C.green : C.red) : C.border}`, borderRadius: 8, padding: "12px 14px", color: C.text, fontSize: 14, fontFamily: "monospace", outline: "none", boxSizing: "border-box", marginBottom: 10 }}
              />
              {quizResult && (
                <div style={{ padding: "12px 14px", borderRadius: 8, background: quizResult === "correct" ? "rgba(57,255,122,.1)" : "rgba(255,51,102,.1)", border: `1px solid ${quizResult === "correct" ? C.green : C.red}`, marginBottom: 10, fontSize: 12 }}>
                  <div style={{ fontWeight: 900, color: quizResult === "correct" ? C.green : C.red, marginBottom: 4 }}>{quizResult === "correct" ? "✅ CORRECT!" : "❌ NOT QUITE"}</div>
                  <div style={{ color: C.muted }}>Answer: <span style={{ color: C.text, fontFamily: "monospace" }}>{quizSet[quizIdx].a}</span></div>
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                {!quizResult ?
                  <button onClick={checkQuiz} style={{ flex: 2, background: C.yellow, color: "#000", border: "none", padding: "11px", borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>CHECK ANSWER</button> :
                  <button onClick={nextQuiz} style={{ flex: 2, background: C.yellow, color: "#000", border: "none", padding: "11px", borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>NEXT FORMULA →</button>
                }
                <button onClick={() => { setQuizResult("wrong"); }} style={{ flex: 1, background: C.surface2, color: C.muted, border: `1px solid ${C.border}`, padding: 11, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>SHOW</button>
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 6, justifyContent: "center" }}>
                {quizSet.map((_, i) => (
                  <div key={i} onClick={() => { setQuizIdx(i); setQuizAnswer(""); setQuizResult(null); }}
                    style={{ width: 10, height: 10, borderRadius: "50%", cursor: "pointer", background: quizDone.includes(i) ? C.green : i === quizIdx ? C.yellow : C.border }} />
                ))}
              </div>
            </>
          ) : <div style={{ color: C.muted, textAlign: "center", padding: 20 }}>No quiz formulas for this day.</div>}
        </div>
      )}

      {/* ── AI CHECKER ── */}
      {activeTab === "checker" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 4 }}>🤖 AI ANSWER CHECKER</div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 12 }}>Write any question + your answer. AI will check it and give detailed feedback.</div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: "2px", color: C.muted, marginBottom: 5, fontWeight: 700 }}>YOUR ANTHROPIC API KEY <span style={{ color: C.red }}>*</span></div>
            <input
              value={apiKey}
              onChange={e => { setApiKey(e.target.value); saveState("ml_apikey", e.target.value); }}
              placeholder="sk-ant-api03-..."
              type="password"
              style={{ width: "100%", background: C.surface2, border: `1px solid ${apiKey ? "#39ff7a" : C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 12, fontFamily: "monospace", outline: "none", boxSizing: "border-box", marginBottom: 4 }}
            />
            <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.5 }}>Get your key at <strong style={{ color: C.yellow }}>console.anthropic.com</strong> → API Keys. It's saved locally on your device only.</div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: "2px", color: C.muted, marginBottom: 6, fontWeight: 700 }}>QUESTION</div>
            <textarea
              value={checkerQ}
              onChange={e => setCheckerQ(e.target.value)}
              placeholder="e.g. Find HCF of 96 and 404 using Euclid's Division Algorithm"
              rows={2}
              style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13, fontFamily: "system-ui", outline: "none", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: "2px", color: C.muted, marginBottom: 6, fontWeight: 700 }}>YOUR ANSWER / WORKING</div>
            <textarea
              value={checkerA}
              onChange={e => setCheckerA(e.target.value)}
              placeholder="Write your complete answer here, including steps..."
              rows={4}
              style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13, fontFamily: "system-ui", outline: "none", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
          <button onClick={runChecker} disabled={checkerLoading || !checkerQ || !checkerA}
            style={{ width: "100%", background: checkerLoading ? "rgba(240,192,64,.4)" : C.yellow, color: "#000", border: "none", padding: "13px", borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14, marginBottom: 14 }}>
            {checkerLoading ? "🤖 Checking your answer..." : "🤖 CHECK MY ANSWER"}
          </button>

          {checkerRes && (
            <div style={{ background: checkerRes.correct ? "rgba(57,255,122,.08)" : "rgba(255,51,102,.08)", border: `1px solid ${checkerRes.correct ? C.green : C.red}`, borderRadius: 10, padding: "16px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontWeight: 900, fontSize: 15, color: checkerRes.correct ? C.green : C.red }}>{checkerRes.correct ? "✅ CORRECT!" : "❌ NEEDS WORK"}</div>
                <div style={{ background: checkerRes.correct ? C.green : C.orange, color: "#000", fontWeight: 900, padding: "4px 12px", borderRadius: 20, fontSize: 13 }}>{checkerRes.score}</div>
              </div>
              <div style={{ fontSize: 12, color: C.text, marginBottom: 8, fontWeight: 700 }}>{checkerRes.verdict}</div>
              {checkerRes.what_is_right && <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}><strong style={{ color: C.green }}>✓ Right:</strong> {checkerRes.what_is_right}</div>}
              {checkerRes.mistakes !== "None" && <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}><strong style={{ color: C.red }}>✗ Mistake:</strong> {checkerRes.mistakes}</div>}
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}><strong style={{ color: C.blue }}>Correct approach:</strong> {checkerRes.correct_approach}</div>
              <div style={{ fontSize: 11, background: "rgba(240,192,64,.1)", border: `1px solid rgba(240,192,64,.2)`, padding: "8px 10px", borderRadius: 6, color: C.yellow }}>💡 {checkerRes.tip}</div>
              {!checkerRes.correct && (
                <button onClick={() => setMistakes(prev => [{ id: Date.now(), text: `Q: ${checkerQ} | Mistake: ${checkerRes.mistakes}`, chapter: day.chapter, day: currentDay + 1, date: new Date().toLocaleDateString() }, ...prev])}
                  style={{ marginTop: 10, width: "100%", background: "transparent", border: `1px solid ${C.border}`, color: C.muted, padding: "8px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
                  📝 Save to Mistake Notebook
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── MISTAKE NOTEBOOK ── */}
      {activeTab === "mistakes" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 4 }}>📝 MISTAKE NOTEBOOK</div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>Save errors here. Review before every exam. This is your most powerful study tool.</div>
          <textarea
            value={newMistake}
            onChange={e => setNewMistake(e.target.value)}
            placeholder="Describe your mistake or what you forgot..."
            rows={2}
            style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 8, fontFamily: "system-ui" }}
          />
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input value={mistakeChap} onChange={e => setMistakeChap(e.target.value)} placeholder="Chapter (optional)"
              style={{ flex: 1, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 7, padding: "9px 12px", color: C.text, fontSize: 12, outline: "none", fontFamily: "system-ui" }} />
            <button onClick={addMistake} style={{ background: C.red, color: "#fff", border: "none", padding: "9px 18px", borderRadius: 7, fontWeight: 900, cursor: "pointer", fontSize: 13 }}>+ ADD</button>
          </div>
          {mistakes.length === 0 ? (
            <div style={{ textAlign: "center", color: C.muted, padding: "24px 0", fontSize: 13 }}>No mistakes saved yet. Great job — or start adding them! 😄</div>
          ) : (
            <div style={{ maxHeight: 340, overflowY: "auto" }}>
              {mistakes.map(m => (
                <div key={m.id} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div>
                      <span style={{ fontSize: 9, background: "rgba(255,51,102,.15)", color: C.red, padding: "2px 8px", borderRadius: 10, fontWeight: 700, marginRight: 6 }}>Day {m.day}</span>
                      <span style={{ fontSize: 9, color: C.muted }}>{m.date}</span>
                    </div>
                    <button onClick={() => deleteMistake(m.id)} style={{ background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 14, padding: 0 }}>✕</button>
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.5, marginBottom: 4 }}>{m.text}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{m.chapter}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ROADMAP ── */}
      {activeTab === "roadmap" && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, fontSize: 10, fontWeight: 700, letterSpacing: "3px", color: C.muted }}>23-DAY ROADMAP</div>
          <div style={{ maxHeight: 420, overflowY: "auto", padding: 8 }}>
            {ROADMAP.map((d, i) => {
              const done = doneDays.includes(i), active = i === currentDay, score = dayScores[`day_${i}`];
              return (
                <div key={i} onClick={() => { setCurrentDay(i); goPhase(0); setPhaseDone([]); setActiveTab("guide"); }}
                  style={{ display: "flex", gap: 10, padding: "10px", borderRadius: 7, cursor: "pointer", background: active ? "rgba(240,192,64,.08)" : "transparent", border: active ? `1px solid rgba(240,192,64,.3)` : "1px solid transparent", marginBottom: 3, opacity: done ? .6 : 1 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: active ? C.yellow : done ? C.green : C.muted, minWidth: 28, paddingTop: 2, fontWeight: 700 }}>D{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.topic}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>{d.chapter}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                    {score && <div style={{ fontSize: 11, fontWeight: 900, color: score >= 7 ? C.green : score >= 5 ? C.yellow : C.red }}>{score}/10</div>}
                    {done && <div style={{ color: C.green, fontWeight: 900, fontSize: 14 }}>✓</div>}
                    {active && !done && <div style={{ color: C.yellow, fontWeight: 700, fontSize: 10 }}>NOW</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── MODALS ── */}
      {modal === "checkIn" && (
        <Modal>
          <div style={{ fontSize: 48, marginBottom: 10 }}>👀</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, color: C.yellow }}>STILL STUDYING?</h2>
          <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>{absent > 0 ? `Absent ${absent} time(s). Exam in ${getDaysLeft()} days!` : "8 minutes done. Confirm you're at your desk."}</p>
          <button onClick={() => { setModal(null); setRunning(true); }} style={{ width: "100%", background: C.green, color: "#000", border: "none", padding: 14, borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14, marginBottom: 8 }}>✅ YES, I AM STUDYING</button>
          <button onClick={() => { setModal(null); setAbsent(a => a + 1); }} style={{ width: "100%", background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: 11, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>😔 I wandered off...</button>
        </Modal>
      )}

      {modal === "break" && (
        <Modal>
          <div style={{ fontSize: 48, marginBottom: 10 }}>☕</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>BREAK TIME</h2>
          <p style={{ color: C.muted, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>10 minutes. Stand up, drink water. Your brain consolidates memory right now!</p>
          <div style={{ fontFamily: "monospace", fontSize: 48, fontWeight: 900, color: breakSec > 0 ? C.yellow : C.red, marginBottom: 20 }}>{fmt(breakSec)}</div>
          <button onClick={() => setModal(null)} style={{ width: "100%", background: C.yellow, color: "#000", border: "none", padding: 14, borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14 }}>💪 BACK TO STUDYING</button>
        </Modal>
      )}

      {pendingScore !== null && (
        <Modal borderColor={C.yellow}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>📊</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 6 }}>RATE TODAY!</h2>
          <p style={{ color: C.muted, fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>How well did you solve today's recall tasks? Be honest — this is for your improvement!</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 16 }}>
            {[...Array(10)].map((_, i) => {
              const v = i + 1;
              return (
                <button key={v} onClick={() => submitScore(pendingScore, v)}
                  style={{ padding: "12px 6px", borderRadius: 8, border: `1px solid ${v <= 3 ? C.red : v <= 6 ? C.orange : C.green}`, background: `rgba(${v <= 3 ? "255,51,102" : v <= 6 ? "255,107,53" : "57,255,122"},.1)`, color: v <= 3 ? C.red : v <= 6 ? C.orange : C.green, fontWeight: 900, fontSize: 16, cursor: "pointer" }}>
                  {v}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginBottom: 4 }}>
            <span>😰 Very Hard</span><span>😊 Perfect</span>
          </div>
        </Modal>
      )}

      {modal === "dayDone" && (
        <Modal borderColor={C.green}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🎯</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>DAY {currentDay + 1} COMPLETE!</h2>
          <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>All recall tasks done + scored! Real memory built — not just recognition. Progress saved automatically!</p>
          <button onClick={() => { setModal(null); if (currentDay < 22) setCurrentDay(d => d + 1); goPhase(0); setPhaseDone([]); setActiveTab("guide"); setCheckerQ(""); setCheckerA(""); setCheckerRes(null); setQuizDone([]); setQuizIdx(0); }}
            style={{ width: "100%", background: C.green, color: "#000", border: "none", padding: 14, borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 14, marginBottom: 8 }}>→ NEXT DAY</button>
          <button onClick={() => setModal(null)} style={{ width: "100%", background: "transparent", color: C.muted, border: `1px solid ${C.border}`, padding: 11, borderRadius: 8, cursor: "pointer", fontSize: 12 }}>STAY ON THIS DAY</button>
        </Modal>
      )}

      {modal === "hardProblem" && (
        <Modal>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🆘</div>
          <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 12, color: C.yellow }}>STUCK? USE THIS:</h2>
          {[["1️⃣", "READ TWICE", "Underline what's given and what's asked."], ["2️⃣", "WRITE ANYTHING", "Diagram, formula, known values. Pen moving = brain unlocking."], ["3️⃣", "WORK BACKWARDS", "What do I need? Do I already know it?"], ["4️⃣", "TRY SIMPLER NUMBERS", "Replace big numbers with 2 and 3."], ["5️⃣", "SKIP & RETURN", "Brain works on it in background!"]].map(([n, t, d]) => (
            <div key={t} style={{ display: "flex", gap: 8, marginBottom: 9, textAlign: "left" }}>
              <div style={{ fontSize: 12, minWidth: 22, flexShrink: 0 }}>{n}</div>
              <div><div style={{ fontSize: 12, fontWeight: 800, marginBottom: 2, color: C.yellow }}>{t}</div><div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{d}</div></div>
            </div>
          ))}
          <button onClick={() => setModal(null)} style={{ width: "100%", background: C.yellow, color: "#000", border: "none", padding: 13, borderRadius: 8, fontWeight: 900, cursor: "pointer", fontSize: 13, marginTop: 6 }}>BACK TO WORK 💪</button>
        </Modal>
      )}
    </div>
  );
}
