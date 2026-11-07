import type { BlogPost } from "@/data/blog";

import supplementsImg from "@/assets/cat-supplements.jpg";
import { supplementNote } from "@/data/blog-protein";

const allProducts = {
  category: "supplements",
  heading: "Supplements for Sale",
  moreLink: { label: "View All Supplements", to: "/supplements" },
};

const allBanner = {
  heading: "Shop Supplements",
  body: "Protein, creatine, vitamins and performance supplements from trusted brands.",
  buttonLabel: "Shop Supplements",
  to: "/supplements",
};

const allCta = { label: "Shop Supplements", to: "/supplements" };

const gainerProducts = {
  category: "supplements",
  search: ["gainer", "mass", "protein", "carb"],
  heading: "Mass Gainers and Protein",
  moreLink: { label: "View Protein Powder", to: "/supplements/protein-powder" },
};

const gainerBanner = {
  heading: "Fuel Your Bulk",
  body: "Shop mass gainers, protein and muscle-building supplements.",
  buttonLabel: "Shop Protein",
  to: "/supplements/protein-powder",
};

const gainerCta = {
  label: "Shop Protein & Gainers",
  to: "/supplements/$type",
  params: { type: "protein-powder" },
};

/** Audience-specific supplement guides plus bulking and mass gainers. Merged into `blogPosts` in blog.ts. */
export const supplementAudiencePosts: BlogPost[] = [
  // ── Specific Audiences ────────────────────────────────────────────────
  {
    slug: "supplements-for-beginners",
    title: "Best Supplements for Beginners at the Gym",
    seoTitle: "Supplements for Beginners | What Should I Take?",
    metaDescription:
      "What supplements should I take as a gym beginner? The few supplements for beginners that are worth it, what to skip and how to prioritize your budget.",
    excerpt:
      "New to the gym? You need far fewer supplements than ads suggest. Here's the short list that's actually worth it.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Fundamentals First",
        paragraphs: [
          "Supplements only add a few percent on top of the basics: consistent training, enough protein and calories, and good sleep. Get those right first. Then a small number of proven supplements can help.",
        ],
      },
      {
        heading: "Beginner Gym Supplements Worth Buying",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Why", "Dose"],
          rows: [
            ["Protein powder", "Makes hitting protein targets easy", "1 - 2 scoops as needed"],
            ["Creatine monohydrate", "Proven for strength and muscle", "3 - 5 g/day"],
            ["Vitamin D (if low)", "Common deficiency", "As advised"],
            ["Caffeine / coffee (optional)", "Energy and performance", "Moderate"],
          ],
        },
      },
      {
        heading: "What Beginners Can Skip",
        list: [
          "BCAAs, if you eat enough protein",
          "Testosterone boosters",
          "Fat burners",
          "Proprietary 'anabolic' blends",
          "Expensive pre-workouts with long ingredient lists",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `The best supplements for beginners are protein powder and creatine, with vitamin D if you're low and coffee for energy. Skip the hype products and invest in training, food and sleep. ${supplementNote}`,
    faqs: [
      {
        q: "What supplements should I take as a beginner?",
        a: "Protein powder if you struggle to eat enough protein, and creatine monohydrate.",
      },
      {
        q: "Do beginners need pre-workout?",
        a: "No. Coffee works fine if you want an energy boost.",
      },
    ],
    related: [
      "best-protein-powder",
      "best-creatine",
      "supplements-that-are-a-waste-of-money",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplements-for-women",
    title: "Best Supplements for Women Who Lift",
    seoTitle: "Supplements for Women Who Lift | Over 40 Too",
    metaDescription:
      "The best supplements for women who lift: protein, creatine, iron, vitamin D and omega-3, plus the best supplements for women over 40 and what to skip.",
    excerpt:
      "Women who lift have a few unique nutrient needs. Here's which supplements are worth considering at every age.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "8 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Core Supplements for Women Who Lift",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Why", "Notes"],
          rows: [
            ["Protein powder", "Helps reach 1.6 g/kg protein", "Whey or plant"],
            ["Creatine", "Strength, lean mass, emerging brain benefits", "3 - 5 g/day"],
            ["Iron (if low)", "Menstruation raises needs", "Test ferritin before supplementing"],
            ["Vitamin D", "Bone and muscle health", "Test levels"],
            ["Omega-3", "Heart, joints, recovery", "250 mg - 2 g EPA + DHA"],
            ["Calcium (if diet is low)", "Bone health", "Food first"],
          ],
        },
      },
      {
        heading: "Best Supplements for Women Over 40",
        list: [
          "Creatine to support muscle and strength through perimenopause",
          "Protein at every meal to slow age-related muscle loss",
          "Vitamin D and calcium for bone health",
          "Magnesium for sleep and muscle function",
          "Omega-3 for heart and joint health",
        ],
        paragraphs: [],
      },
      {
        heading: "What to Skip",
        list: [
          "'Fat burning' and 'toning' supplements",
          "Hormone-balancing blends without evidence",
          "High-dose iron without a blood test",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `The best supplements for women who lift are protein, creatine, vitamin D, omega-3 and iron if blood tests show you need it. After 40, prioritize creatine, protein and bone-supporting nutrients alongside heavy strength training. ${supplementNote}`,
    faqs: [
      {
        q: "Should women take creatine?",
        a: "Yes, research supports creatine for women's strength and lean mass.",
      },
      {
        q: "Do women who lift need iron?",
        a: "Only if they're low. Get ferritin tested first.",
      },
    ],
    related: [
      "creatine-for-women",
      "protein-powder-for-women",
      "supplements-for-menopause",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplements-for-men-over-40",
    title: "Best Supplements for Men Over 40",
    seoTitle: "Supplements for Men Over 40 | Men's Health Guide",
    metaDescription:
      "The best supplements for men over 40: creatine, protein, vitamin D, omega-3 and magnesium for muscle, heart and men's health over 40, plus what to avoid.",
    excerpt:
      "After 40, the goal shifts to keeping muscle, heart health and energy. Here's which supplements support that.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Priorities After 40",
        list: [
          "Preserve muscle and strength",
          "Protect heart and metabolic health",
          "Maintain bone density and joint health",
          "Support sleep and recovery",
        ],
        paragraphs: [],
      },
      {
        heading: "Supplements Worth Considering",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Why"],
          rows: [
            ["Creatine", "Strength and muscle with training; possible brain benefits"],
            ["Protein powder", "Higher protein needs as muscle becomes less responsive"],
            ["Vitamin D", "Common deficiency; bone and muscle"],
            ["Omega-3", "Heart health and triglycerides"],
            ["Magnesium", "Sleep and muscle function"],
            ["Fiber (psyllium)", "Cholesterol and digestion"],
          ],
        },
      },
      {
        heading: "Be Careful With",
        list: [
          "Testosterone boosters with unproven or hidden ingredients",
          "Prostate blends making drug-like claims",
          "Supplements that interact with blood pressure or cholesterol medications",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `The best supplements for men over 40 focus on muscle, heart and bone health: creatine, protein, vitamin D, omega-3, magnesium and fiber. Get regular checkups and blood work, and pair supplements with strength training and cardio. ${supplementNote}`,
    faqs: [
      {
        q: "Should men over 40 take creatine?",
        a: "Yes, it's safe and effective for most healthy men, especially with strength training.",
      },
      {
        q: "Do men over 40 need a testosterone booster?",
        a: "Most don't. If you suspect low testosterone, get tested by a doctor.",
      },
    ],
    related: [
      "creatine-for-seniors",
      "natural-testosterone-booster",
      "heart-health-supplements",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplements-for-menopause",
    title: "Best Supplements for Women in Menopause Who Exercise",
    seoTitle: "Supplements for Menopause | Creatine, Protein & More",
    metaDescription:
      "The best supplements for menopause for active women: creatine and menopause research, protein, vitamin D, calcium, magnesium and menopause weight gain support.",
    excerpt:
      "Menopause changes how your body builds muscle and bone. Here's which supplements can support active women through it.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "8 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "What Changes in Menopause",
        paragraphs: [
          "Falling estrogen speeds up loss of muscle and bone, shifts fat storage toward the midsection and can affect sleep and mood. Strength training is the single most effective tool to counter these changes, and some supplements can support it.",
        ],
      },
      {
        heading: "Supplements to Consider",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Why", "Evidence"],
          rows: [
            ["Protein (1.2 - 1.6 g/kg)", "Preserves muscle", "Strong"],
            ["Creatine", "Muscle, strength, possibly bone and mood", "Growing"],
            ["Vitamin D", "Bone and muscle", "Strong if deficient"],
            ["Calcium (if diet is low)", "Bone health", "Supportive"],
            ["Magnesium", "Sleep and muscle function", "Moderate"],
            ["Omega-3", "Heart health", "Moderate"],
          ],
        },
      },
      {
        heading: "Menopause Weight Gain",
        paragraphs: [
          "No supplement reverses menopause weight gain on its own. Protein, strength training, daily walking, sleep and a modest calorie deficit are the foundation. Be wary of 'menopause belly' products with unproven herbal blends.",
        ],
        cta: allCta,
      },
    ],
    finalThoughts: `The best supplements for menopause for women who exercise are protein, creatine, vitamin D, calcium if needed, magnesium and omega-3. Combine them with strength training, and talk to your doctor about hormone therapy and other options. ${supplementNote}`,
    faqs: [
      {
        q: "Is creatine good for menopause?",
        a: "Research suggests it may help preserve muscle and strength with training.",
      },
      {
        q: "What helps menopause weight gain?",
        a: "Strength training, high protein, daily activity, good sleep and a modest calorie deficit.",
      },
    ],
    related: [
      "creatine-for-women",
      "supplements-for-women",
      "vitamin-d3-k2-benefits",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplements-for-runners",
    title: "Best Supplements for Runners and Endurance Athletes",
    seoTitle: "Supplements for Runners | Endurance & Running Recovery",
    metaDescription:
      "The best supplements for runners and endurance athletes: caffeine, electrolytes, carbs, beetroot nitrates, iron and running recovery supplements reviewed.",
    excerpt:
      "Endurance athletes have different needs from lifters. Here's which supplements support running performance and recovery.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Endurance Supplements With Evidence",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Benefit", "How to Use"],
          rows: [
            [
              "Carbohydrate gels / drinks",
              "Fuel for long efforts",
              "30 - 90 g/hour in races over 60 - 90 min",
            ],
            ["Caffeine", "Improves endurance", "3 - 6 mg/kg before or during"],
            ["Electrolytes (sodium)", "Hydration, cramp prevention", "Based on sweat rate"],
            ["Beetroot / nitrates", "Efficiency and endurance", "Taken 2 - 3 hours before"],
            ["Beta-alanine", "Helps 1 - 4 minute efforts", "Daily for weeks"],
            ["Iron (if low)", "Oxygen transport", "Test ferritin first"],
          ],
        },
      },
      {
        heading: "Running Recovery",
        list: [
          "Protein (20 to 40 g) plus carbs after long or hard runs",
          "Tart cherry juice may help soreness in heavy training blocks",
          "Omega-3 for general recovery support",
          "Sleep is the most important recovery tool",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `The best supplements for runners are carbs, caffeine, electrolytes and nitrates for performance, plus protein and iron (if low) for recovery and health. Practice fueling in training before race day. ${supplementNote}`,
    faqs: [
      {
        q: "Should runners take creatine?",
        a: "It may help sprint and strength work but can add water weight, which some distance runners prefer to avoid.",
      },
      {
        q: "Do runners need electrolytes?",
        a: "For long or hot runs, yes, especially sodium.",
      },
    ],
    related: [
      "best-electrolyte-powder",
      "beta-alanine-benefits",
      "intra-workout-supplement",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "vegan-supplements",
    title: "Best Supplements for Vegans and Vegetarians Who Train",
    seoTitle: "Vegan Supplements | Vegan Creatine, B12 & More",
    metaDescription:
      "The best vegan supplements for people who train: vegan B12, vegan creatine, plant based protein, algae omega-3, iron, vitamin D and more.",
    excerpt: "Plant-based athletes can thrive with a few key supplements. Here's what to consider.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Key Supplements for Plant-Based Athletes",
        paragraphs: [],
        table: {
          headers: ["Nutrient", "Why", "Notes"],
          rows: [
            ["Vitamin B12", "Not reliably available from plants", "Essential for all vegans"],
            [
              "Creatine",
              "Vegans have lower muscle stores, so they may benefit more",
              "Creatine monohydrate is synthetic and vegan",
            ],
            ["Plant protein powder", "Helps reach protein targets", "Pea + rice or soy blends"],
            [
              "Algae omega-3 (EPA/DHA)",
              "Plants provide ALA, which converts poorly",
              "250 - 500 mg",
            ],
            ["Vitamin D", "Limited dietary sources", "D3 from lichen is vegan"],
            ["Iron and zinc (if low)", "Lower absorption from plants", "Test first"],
            ["Iodine", "Low in some plant diets", "Iodized salt or supplement"],
          ],
        },
      },
      {
        heading: "Protein Tips",
        list: [
          "Aim slightly higher, around 1.6 to 2.0 g/kg",
          "Combine legumes, grains, soy, seeds and nuts",
          "Use plant protein blends for convenience",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `The best vegan supplements for people who train are B12, creatine, plant protein, algae omega-3 and vitamin D, plus iron, zinc and iodine if tests show you need them. With smart planning, plant-based athletes can build muscle and perform at a high level. ${supplementNote}`,
    faqs: [
      {
        q: "Is creatine vegan?",
        a: "Most creatine monohydrate is made synthetically and is vegan. Check capsules for gelatin.",
      },
      {
        q: "Do vegans need B12 supplements?",
        a: "Yes. B12 is essential and not reliably found in plant foods.",
      },
    ],
    related: [
      "best-vegan-protein-powder",
      "what-does-creatine-do",
      "best-fish-oil-supplement",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplements-for-teenage-athletes",
    title: "Best Supplements for Teens Who Play Sports: What's Safe",
    seoTitle: "Supplements for Teenage Athletes | What's Safe?",
    metaDescription:
      "Supplements for teenage athletes: what's safe, is creatine safe for teens, protein for teens, what to avoid and why food comes first for young athletes.",
    excerpt:
      "Teens are not small adults. Here's what parents and young athletes should know about supplements.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Food First for Young Athletes",
        paragraphs: [
          "Growing athletes need enough total calories, protein, carbohydrates, calcium, iron and fluids. Most of that should come from regular meals and snacks. The American Academy of Pediatrics discourages the use of performance-enhancing supplements by children and adolescents.",
        ],
      },
      {
        heading: "What's Generally Reasonable",
        paragraphs: [],
        table: {
          headers: ["Product", "Notes"],
          rows: [
            ["Protein powder", "Can help a busy teen meet needs, but food usually covers it"],
            ["Multivitamin", "Reasonable if diet is limited"],
            ["Vitamin D or iron", "Only if a doctor finds a deficiency"],
            ["Sports drinks", "For long, intense practices or heat"],
          ],
        },
      },
      {
        heading: "Is Creatine Safe for Teens?",
        paragraphs: [
          "Research in adolescents is limited compared with adults. Some sports medicine organizations say it may be considered for older, mature teen athletes under supervision, while pediatric groups generally advise against it. Teens should talk to their doctor or a sports dietitian before using creatine.",
        ],
      },
      {
        heading: "What Teens Should Avoid",
        list: [
          "High-stimulant pre-workouts and energy drinks",
          "Fat burners",
          "Testosterone boosters and 'prohormones'",
          "Any product with proprietary blends or banned substances",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `For teenage athletes, food comes first: regular meals, enough protein and carbs, hydration and sleep. Protein powder and a basic multivitamin can be reasonable, but stimulant products, fat burners and testosterone boosters should be avoided. Always involve a parent and doctor. ${supplementNote}`,
    faqs: [
      {
        q: "Can teens drink protein shakes?",
        a: "Yes, as part of a balanced diet, though most teens can meet protein needs from food.",
      },
      {
        q: "Is pre-workout safe for teenagers?",
        a: "High-stimulant pre-workouts are not recommended for teens.",
      },
    ],
    related: [
      "supplements-for-beginners",
      "how-much-protein-to-build-muscle",
      "third-party-tested-supplements",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplements-to-build-muscle",
    title: "Best Supplements for Building Muscle Fast",
    seoTitle: "Supplements to Build Muscle | What Actually Works",
    metaDescription:
      "The best supplements to build muscle: protein, creatine, caffeine and more ranked by evidence, plus what muscle building supplements to skip.",
    excerpt:
      "Only a handful of muscle building supplements have strong evidence. Here they are, ranked.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "8 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Muscle Building Supplements Ranked",
        paragraphs: [],
        table: {
          headers: ["Tier", "Supplement", "Why"],
          rows: [
            ["Top", "Creatine monohydrate", "Most proven for strength and lean mass"],
            ["Top", "Protein powder", "Helps hit protein targets"],
            ["Useful", "Caffeine", "Better training performance"],
            ["Useful", "Mass gainer (for hardgainers)", "Helps reach a calorie surplus"],
            ["Situational", "Beta-alanine, citrulline", "Training volume and endurance"],
            ["Situational", "Vitamin D (if low)", "Corrects deficiency"],
            ["Skip", "BCAAs, test boosters, HMB for trained lifters", "Little added benefit"],
          ],
        },
      },
      {
        heading: "How Fast Can You Build Muscle?",
        paragraphs: [
          "Beginners can often gain about 0.5 to 1 kg (1 to 2 lb) of lean mass per month in their first year with good training and nutrition. Progress slows with experience. No legal supplement dramatically speeds this up, but creatine and protein help you get the most from your training.",
        ],
      },
      {
        heading: "The Muscle-Building Formula",
        list: [
          "Progressive overload: add weight or reps over time",
          "10 to 20 hard sets per muscle per week",
          "1.6 g/kg protein daily",
          "A small calorie surplus",
          "7 to 9 hours of sleep",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `The best supplements to build muscle are creatine and protein, with caffeine and mass gainers as useful extras. The real driver is progressive training, enough food and sleep. Supplements just help you make the most of it. ${supplementNote}`,
    faqs: [
      {
        q: "What is the best supplement for muscle growth?",
        a: "Creatine monohydrate, followed by protein powder to meet protein needs.",
      },
      {
        q: "Can supplements build muscle without training?",
        a: "No. Muscle growth requires resistance training.",
      },
    ],
    related: [
      "supplement-stack-for-muscle-gain",
      "best-creatine",
      "best-protein-powder",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplements-for-muscle-recovery",
    title: "Best Supplements for Recovery and Muscle Soreness",
    seoTitle: "Supplements for Muscle Recovery | DOMS Relief",
    metaDescription:
      "The best supplements for muscle recovery and DOMS relief: protein, creatine, omega-3, tart cherry, caffeine and more, with what research shows.",
    excerpt:
      "Sore after leg day? These recovery supplements have evidence, though sleep and food matter most.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Recovery Supplements Compared",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Effect", "Evidence"],
          rows: [
            ["Protein", "Repairs and builds muscle", "Strong"],
            ["Creatine", "May speed recovery between sessions", "Moderate"],
            ["Omega-3", "May reduce soreness", "Moderate"],
            ["Tart cherry", "May reduce soreness and strength loss", "Moderate"],
            ["Caffeine", "Can reduce perceived soreness", "Modest"],
            ["Curcumin", "May reduce DOMS", "Modest"],
            ["Magnesium", "Supports sleep and muscle function", "Situational"],
          ],
        },
      },
      {
        heading: "What Is DOMS?",
        paragraphs: [
          "Delayed onset muscle soreness peaks 24 to 72 hours after new or intense exercise. It's normal and fades as your body adapts. Soreness isn't required for progress, and it isn't a reliable measure of a good workout.",
        ],
      },
      {
        heading: "Recovery Habits That Matter Most",
        list: [
          "7 to 9 hours of sleep",
          "Enough protein and total calories",
          "Light movement on rest days",
          "Gradual increases in training volume",
          "Hydration",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `The best supplements for muscle recovery are protein and creatine, with omega-3, tart cherry and curcumin offering modest soreness relief. Sleep, food and smart training progression remain the biggest recovery factors. ${supplementNote}`,
    faqs: [
      {
        q: "What helps sore muscles fastest?",
        a: "Light movement, sleep, protein and time. Some supplements offer modest relief.",
      },
      {
        q: "Should I train when sore?",
        a: "Light to moderate training is usually fine and can ease soreness.",
      },
    ],
    related: ["best-massage-gun", "cold-plunge-benefits", "supplements-for-sleep", "supplements"],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplements-for-energy",
    title: "Best Supplements for Energy and Focus",
    seoTitle: "Supplements for Energy & Focus | What Works",
    metaDescription:
      "The best supplements for energy and focus: caffeine, L-theanine, creatine, B12 and iron when deficient, plus natural energy supplements and lifestyle fixes.",
    excerpt:
      "Tired all the time? Here's which energy and focus supplements work, and when low energy needs a doctor instead.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Energy and Focus Supplements",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Effect", "Notes"],
          rows: [
            ["Caffeine", "Alertness, focus", "Most reliable; watch timing"],
            ["Caffeine + L-theanine", "Smoother focus, fewer jitters", "Common 1:2 ratio"],
            ["Creatine", "Possible cognitive benefits under sleep deprivation", "Emerging"],
            ["Vitamin B12", "Corrects deficiency fatigue", "Helps only if low"],
            ["Iron", "Corrects anemia fatigue", "Only if tested low"],
            ["Rhodiola", "May reduce fatigue under stress", "Limited evidence"],
          ],
        },
      },
      {
        heading: "Common Causes of Low Energy",
        list: [
          "Poor or short sleep",
          "Under-eating, especially carbs around training",
          "Dehydration",
          "Overtraining",
          "Iron, B12 or vitamin D deficiency",
          "Thyroid or other medical conditions",
        ],
        paragraphs: [],
      },
      {
        heading: "When to See a Doctor",
        paragraphs: [
          "Persistent fatigue lasting weeks, especially with weight changes, shortness of breath or low mood, needs medical evaluation. Blood tests can identify common, treatable causes.",
        ],
        cta: allCta,
      },
    ],
    finalThoughts: `The best supplements for energy and focus are caffeine, ideally paired with L-theanine, plus B12 or iron if you're deficient. Natural energy comes first from sleep, food and hydration, and ongoing fatigue deserves a check-up. ${supplementNote}`,
    faqs: [
      {
        q: "What is the best natural energy supplement?",
        a: "Caffeine from coffee or tea, often paired with L-theanine.",
      },
      {
        q: "Do B vitamins give you energy?",
        a: "Only if you're deficient. Extra B vitamins don't boost energy in well-nourished people.",
      },
    ],
    related: [
      "pre-workout-vs-coffee",
      "multivitamin-for-athletes",
      "supplements-for-sleep",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  // ── Bulking & Mass Gainers ────────────────────────────────────────────
  {
    slug: "best-mass-gainer",
    title: "Best Mass Gainers for Skinny Guys (Hardgainers)",
    seoTitle: "Best Mass Gainer for Skinny Guys | Weight Gainer Guide",
    metaDescription:
      "How to choose the best mass gainer for skinny guys and hardgainers: calories, protein, carb sources, sugar and how to use a weight gainer effectively.",
    excerpt:
      "If you struggle to eat enough, a mass gainer can help. Here's how to pick one that doesn't just pile on sugar.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Who Needs a Mass Gainer?",
        paragraphs: [
          "Mass gainers are high-calorie powders combining protein, carbohydrates and sometimes fats. They're designed for hardgainers: people with fast metabolisms or small appetites who struggle to eat enough food to gain weight.",
        ],
      },
      {
        heading: "What to Look For",
        paragraphs: [],
        table: {
          headers: ["Feature", "Good Target"],
          rows: [
            ["Calories per serving", "500 - 1,000+"],
            ["Protein", "30 - 50 g"],
            ["Carb sources", "Oats, maltodextrin, cyclic dextrin, sweet potato"],
            ["Sugar", "Under 15 - 20 g if possible"],
            ["Healthy fats", "MCTs, nut powders"],
            ["Serving flexibility", "Easy to use half servings"],
          ],
        },
      },
      {
        heading: "How to Use a Mass Gainer",
        list: [
          "Start with half a serving to avoid digestive issues",
          "Use it between meals, not instead of them",
          "Blend with milk, banana and peanut butter for extra calories",
          "Track bodyweight weekly and aim for about 0.25 to 0.5 percent gain per week",
        ],
        paragraphs: [],
        cta: gainerCta,
      },
    ],
    finalThoughts: `The best mass gainer for skinny guys provides plenty of calories with quality protein and complex carbs, without excessive sugar. Use it to supplement meals, not replace them, and combine it with consistent strength training to make sure the weight you gain is muscle. ${supplementNote}`,
    faqs: [
      {
        q: "Do mass gainers make you fat?",
        a: "Only if your overall surplus is too large. Aim for steady, moderate weight gain.",
      },
      {
        q: "When should I drink a mass gainer?",
        a: "Between meals or after training.",
      },
    ],
    related: [
      "mass-gainer-vs-whey",
      "how-to-gain-weight-fast",
      "homemade-mass-gainer",
      "supplements",
    ],
    products: gainerProducts,
    ctaBanner: gainerBanner,
  },
  {
    slug: "mass-gainer-vs-whey",
    title: "Mass Gainer vs Whey Protein: Which Do You Need?",
    seoTitle: "Mass Gainer vs Whey | Weight Gainer vs Protein Powder",
    metaDescription:
      "Mass gainer vs whey protein: calories, protein, carbs and cost compared, and how to choose between a weight gainer and protein powder for your goal.",
    excerpt: "A mass gainer adds calories; whey adds protein. Here's which one fits your goal.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "5 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Side-by-Side Comparison",
        paragraphs: [],
        table: {
          headers: ["Factor", "Mass Gainer", "Whey Protein"],
          rows: [
            ["Calories per serving", "500 - 1,250", "100 - 150"],
            ["Protein", "30 - 60 g", "20 - 27 g"],
            ["Carbs", "80 - 250 g", "1 - 5 g"],
            ["Best for", "Hardgainers who can't eat enough", "Anyone needing more protein"],
            ["Cost per serving", "Higher", "Lower"],
          ],
        },
      },
      {
        heading: "Which Should You Choose?",
        list: [
          "Choose a mass gainer if you struggle to eat enough calories to gain weight",
          "Choose whey if you eat enough food but fall short on protein",
          "Choose whey if you're cutting or maintaining weight",
          "Make your own gainer with whey, oats, milk and nut butter for better control and lower cost",
        ],
        paragraphs: [],
        cta: gainerCta,
      },
    ],
    finalThoughts: `Mass gainer vs whey comes down to calories. If you can't eat enough to gain weight, a mass gainer helps. If you just need more protein, whey is cheaper and more flexible. Many lifters get the best of both by blending whey with whole-food carbs. ${supplementNote}`,
    faqs: [
      {
        q: "Is a mass gainer better than whey for bulking?",
        a: "Only if you struggle to eat enough calories. Otherwise whey plus food works well.",
      },
      {
        q: "Can I mix mass gainer and whey?",
        a: "Yes, but watch total calories.",
      },
    ],
    related: ["best-mass-gainer", "homemade-mass-gainer", "best-protein-powder", "supplements"],
    products: gainerProducts,
    ctaBanner: gainerBanner,
  },
  {
    slug: "how-to-gain-weight-fast",
    title: "How to Gain Weight Fast as a Skinny Person",
    seoTitle: "How to Gain Weight Fast | Weight Gain Diet for Skinny People",
    metaDescription:
      "How to gain weight fast as a skinny person: calorie surplus, weight gain diet tips, high-calorie foods, how to bulk with strength training and realistic rates.",
    excerpt:
      "Gaining weight is hard when you're naturally thin. Here's a step-by-step plan to gain healthy weight and muscle.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "9 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Step 1: Eat in a Calorie Surplus",
        paragraphs: [
          "To gain weight, you need to eat more calories than you burn. Start by adding about 300 to 500 calories a day above your maintenance. If the scale doesn't move after two weeks, add another 200 to 300.",
        ],
      },
      {
        heading: "Step 2: Set a Realistic Rate",
        paragraphs: [
          "Aim to gain about 0.25 to 0.5 percent of your bodyweight per week, or roughly 0.5 to 1 lb a week for most people. Beginners can lean toward the faster end. Gaining much faster usually means more fat.",
        ],
      },
      {
        heading: "Step 3: Lift Weights",
        paragraphs: [
          "Strength training directs extra calories toward muscle. Train each muscle group 2 to 3 times a week with compound lifts like squats, deadlifts, presses, rows and pull-ups, and aim to add weight or reps over time.",
        ],
      },
      {
        heading: "High-Calorie Foods for Weight Gain",
        paragraphs: [],
        table: {
          headers: ["Food", "Approx. Calories"],
          rows: [
            ["Peanut butter (2 tbsp)", "190"],
            ["Whole milk (1 cup)", "150"],
            ["Oats (1 cup dry)", "300"],
            ["Rice (1 cup cooked)", "200"],
            ["Avocado (1 medium)", "240"],
            ["Trail mix (1/2 cup)", "350"],
            ["Olive oil (1 tbsp)", "120"],
          ],
        },
      },
      {
        heading: "Tips for Small Appetites",
        list: [
          "Eat 4 to 6 times a day",
          "Drink some of your calories: shakes and milk",
          "Add calorie-dense toppings like oil, nut butter and cheese",
          "Keep easy snacks on hand",
          "Use a homemade or commercial mass gainer",
        ],
        paragraphs: [],
        cta: gainerCta,
      },
    ],
    finalThoughts: `To gain weight fast as a skinny person, eat in a steady calorie surplus, lift weights consistently and use calorie-dense foods and shakes to make it easier. Aim for about 0.5 to 1 lb a week so most of the weight is muscle. If you can't gain despite eating more, check with a doctor. ${supplementNote}`,
    faqs: [
      {
        q: "How many calories do I need to gain weight?",
        a: "About 300 to 500 above maintenance, adjusted based on weekly progress.",
      },
      {
        q: "Can I gain weight without getting fat?",
        a: "A slow surplus with strength training keeps fat gain minimal.",
      },
    ],
    related: [
      "clean-bulk-vs-dirty-bulk",
      "best-mass-gainer",
      "homemade-mass-gainer",
      "supplements",
    ],
    products: gainerProducts,
    ctaBanner: gainerBanner,
  },
  {
    slug: "clean-bulk-vs-dirty-bulk",
    title: "Clean Bulk vs Dirty Bulk",
    seoTitle: "Clean Bulk vs Dirty Bulk | How to Lean Bulk",
    metaDescription:
      "Clean bulk vs dirty bulk: calorie surplus size, fat gain, health effects and how to clean bulk or lean bulk effectively.",
    excerpt:
      "A dirty bulk gains weight fast; a clean bulk gains better weight. Here's how they compare.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Clean Bulk vs Dirty Bulk Compared",
        paragraphs: [],
        table: {
          headers: ["Factor", "Clean / Lean Bulk", "Dirty Bulk"],
          rows: [
            ["Calorie surplus", "About 200 - 500/day", "Often 1,000+/day"],
            ["Food quality", "Mostly whole foods", "Anything goes"],
            ["Rate of gain", "0.25 - 0.5% bodyweight/week", "Much faster"],
            ["Fat gain", "Lower", "Higher"],
            ["Cutting needed afterward", "Shorter", "Longer"],
            ["Health markers", "Better", "Can worsen cholesterol and blood sugar"],
          ],
        },
      },
      {
        heading: "How to Clean Bulk",
        list: [
          "Eat 200 to 500 calories above maintenance",
          "Get 1.6 to 2.2 g/kg protein",
          "Build meals around lean proteins, grains, potatoes, fruit, vegetables and healthy fats",
          "Allow some flexibility: 80 to 90 percent whole foods",
          "Track bodyweight and waist size weekly",
        ],
        paragraphs: [],
      },
      {
        heading: "When a Dirtier Approach Can Help",
        paragraphs: [
          "Very underweight beginners with tiny appetites sometimes benefit from more calorie-dense foods to get the scale moving. Even then, prioritize protein and keep most food nutritious.",
        ],
        cta: gainerCta,
      },
    ],
    finalThoughts: `In the clean bulk vs dirty bulk debate, a clean or lean bulk wins for most people: steadier muscle gain, less fat and better health. Use a moderate surplus, plenty of protein and mostly whole foods. ${supplementNote}`,
    faqs: [
      {
        q: "How long should a lean bulk last?",
        a: "Often 3 to 6 months or longer, followed by a short cut if needed.",
      },
      {
        q: "Is dirty bulking bad?",
        a: "It typically leads to excess fat gain and may hurt health markers.",
      },
    ],
    related: [
      "how-to-gain-weight-fast",
      "supplement-stack-for-muscle-gain",
      "best-mass-gainer",
      "supplements",
    ],
    products: gainerProducts,
    ctaBanner: gainerBanner,
  },
  {
    slug: "homemade-mass-gainer",
    title: "Homemade Mass Gainer Shake Recipes",
    seoTitle: "Homemade Mass Gainer | Weight Gain Shake Recipes",
    metaDescription:
      "Make a homemade mass gainer with these weight gain shake recipes: high calorie smoothie ideas from 700 to 1,300 calories with macros.",
    excerpt:
      "Skip the expensive tub. These homemade mass gainer shakes use simple ingredients and pack serious calories.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Homemade Mass Gainer Recipes",
        paragraphs: ["Blend all ingredients until smooth. Macros are approximate."],
        table: {
          headers: ["Shake", "Ingredients", "Calories / Protein"],
          rows: [
            [
              "Classic PB banana",
              "2 cups whole milk, 1 scoop whey, 1 banana, 2 tbsp peanut butter, 1/2 cup oats",
              "950 / 55 g",
            ],
            [
              "Chocolate oat monster",
              "2 cups whole milk, 2 scoops chocolate whey, 1 cup oats, 1 tbsp honey, 1 tbsp cocoa",
              "1,150 / 80 g",
            ],
            [
              "Berry Greek yogurt",
              "1 cup Greek yogurt, 1 cup milk, 1 scoop whey, 1 cup berries, 1/2 cup granola",
              "800 / 70 g",
            ],
            [
              "Tropical coconut",
              "1 cup coconut milk, 1 cup mango, 1 banana, 1 scoop vanilla whey, 2 tbsp chia",
              "850 / 35 g",
            ],
            [
              "Coffee almond",
              "1 cup cold coffee, 1 cup milk, 1 scoop whey, 2 tbsp almond butter, 1/2 cup oats, 2 dates",
              "900 / 45 g",
            ],
          ],
        },
      },
      {
        heading: "Tips",
        list: [
          "Blend oats first into a fine powder for a smoother shake",
          "Use whole milk or add olive or MCT oil to raise calories",
          "Split a big shake into two servings if it's too filling",
          "Adjust honey and fruit to control sugar",
        ],
        paragraphs: [],
        cta: gainerCta,
      },
    ],
    finalThoughts: `A homemade mass gainer gives you control over calories, protein and sugar for a fraction of the cost of commercial gainers. Start with one of these weight gain shake recipes and adjust ingredients to match your goals and appetite. ${supplementNote}`,
    faqs: [
      {
        q: "Is a homemade mass gainer better than store-bought?",
        a: "It's usually cheaper and lets you control ingredients and sugar.",
      },
      {
        q: "How many weight gain shakes a day?",
        a: "One a day is a good start; add a second if weight isn't increasing.",
      },
    ],
    related: [
      "protein-shake-recipes",
      "best-mass-gainer",
      "how-to-gain-weight-fast",
      "supplements",
    ],
    products: gainerProducts,
    ctaBanner: gainerBanner,
  },
  {
    slug: "carb-supplement",
    title: "Best Carb Supplements for Bulking and Performance",
    seoTitle: "Carb Supplement | Cyclic Dextrin & HBCD Explained",
    metaDescription:
      "Carb supplements explained: cyclic dextrin and highly branched cyclic dextrin, maltodextrin, dextrose and how to use carb powders for bulking and performance.",
    excerpt:
      "Carb powders fuel long sessions and make bulking easier. Here's how the main types compare.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Types of Carb Supplements",
        paragraphs: [],
        table: {
          headers: ["Type", "Digestion", "Stomach Comfort", "Best For"],
          rows: [
            [
              "Highly branched cyclic dextrin (HBCD)",
              "Fast gastric emptying, steady energy",
              "Very good",
              "Intra-workout, endurance",
            ],
            ["Maltodextrin", "Fast", "Good", "Budget carbs, gainers"],
            ["Dextrose", "Very fast", "Can cause sloshing in large amounts", "Post-workout"],
            ["Waxy maize", "Fast", "Good", "Intra-workout"],
            ["Oat flour / whole-food carbs", "Slower", "Good", "Homemade gainers"],
          ],
        },
      },
      {
        heading: "How to Use Carb Powders",
        list: [
          "During long or high-volume sessions: 30 to 60 g per hour",
          "After training: pair with protein to refuel",
          "For bulking: add to shakes to raise calories without more food volume",
        ],
        paragraphs: [],
      },
      {
        heading: "Who Doesn't Need Them",
        paragraphs: [
          "If you train under an hour, eat regular meals and aren't trying to gain weight, a carb supplement adds little. Whole-food carbs like rice, potatoes, oats and fruit do the job.",
        ],
        cta: gainerCta,
      },
    ],
    finalThoughts: `Carb supplements like cyclic dextrin and maltodextrin are useful for long training sessions, endurance events and hardgainers who need easy calories. For most gym-goers, whole-food carbs are enough. ${supplementNote}`,
    faqs: [
      {
        q: "Is cyclic dextrin worth it?",
        a: "For long or intense sessions and sensitive stomachs, many athletes find it worthwhile.",
      },
      {
        q: "Do carb supplements cause fat gain?",
        a: "Only if they push you into a larger calorie surplus than you need.",
      },
    ],
    related: [
      "intra-workout-supplement",
      "best-mass-gainer",
      "supplements-for-runners",
      "supplements",
    ],
    products: gainerProducts,
    ctaBanner: gainerBanner,
  },
];
