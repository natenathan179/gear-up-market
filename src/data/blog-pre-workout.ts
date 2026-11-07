import type { BlogPost } from "@/data/blog";

import supplementsImg from "@/assets/cat-supplements.jpg";
import { supplementNote } from "@/data/blog-protein";

const caffeineNote =
  "Healthy adults are generally advised to keep total caffeine under about 400 mg a day from all sources. Avoid stimulant pre-workouts if you're pregnant, have a heart condition, high blood pressure or anxiety, or are sensitive to caffeine.";

const preProducts = {
  category: "supplements",
  search: ["pre-workout", "pre workout", "preworkout", "pump"],
  heading: "Pre-Workout Supplements",
  moreLink: { label: "View Pre-Workout", to: "/supplements/pre-workout" },
};

const preBanner = {
  heading: "Shop Pre-Workout",
  body: "Energy, pump and performance supplements from trusted brands.",
  buttonLabel: "Shop Pre-Workout",
  to: "/supplements/pre-workout",
};

const preCta = {
  label: "Shop Pre-Workout",
  to: "/supplements/$type",
  params: { type: "pre-workout" },
};

const aminoProducts = {
  category: "supplements",
  search: ["amino", "bcaa", "eaa", "glutamine", "electrolyte"],
  heading: "Amino Acids and Recovery",
  moreLink: { label: "View Creatine & Aminos", to: "/supplements/creatine-amino-acids" },
};

const aminoBanner = {
  heading: "Shop Amino Acids",
  body: "EAAs, BCAAs and recovery supplements from trusted brands.",
  buttonLabel: "Shop Aminos",
  to: "/supplements/creatine-amino-acids",
};

const aminoCta = {
  label: "Shop Amino Acids",
  to: "/supplements/$type",
  params: { type: "creatine-amino-acids" },
};

/** Pre-workout and amino acid cluster. Merged into `blogPosts` in blog.ts. */
export const preWorkoutPosts: BlogPost[] = [
  // ── Pre-Workout ───────────────────────────────────────────────────────
  {
    slug: "best-pre-workout",
    title: "Best Pre-Workout Supplements",
    seoTitle: "Best Pre-Workout Supplements | What Actually Works",
    metaDescription:
      "How to choose the best pre workout: effective ingredient doses for energy and pump, the strongest pre workout ingredients, and what to avoid on the label.",
    excerpt:
      "The best pre-workouts use proven ingredients at real doses. Here's how to read the label and pick one that works.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "9 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Ingredients That Actually Work",
        paragraphs: [],
        table: {
          headers: ["Ingredient", "Effective Dose", "What It Does"],
          rows: [
            ["Caffeine", "150 - 300 mg (about 3 - 6 mg/kg)", "Energy, focus, performance"],
            [
              "L-citrulline / citrulline malate",
              "6 - 8 g malate or 3 - 6 g L-citrulline",
              "Blood flow, pump, endurance",
            ],
            ["Beta-alanine", "3.2 - 6.4 g", "Buffers fatigue in 1 - 4 minute efforts"],
            ["Creatine", "3 - 5 g", "Strength and power over time"],
            ["Betaine", "2.5 g", "Possible power and endurance support"],
            ["L-theanine", "100 - 200 mg", "Smoother energy with caffeine"],
            ["Sodium / electrolytes", "Varies", "Hydration and pump"],
          ],
        },
      },
      {
        heading: "Red Flags on Pre-Workout Labels",
        list: [
          "Proprietary blends that hide individual doses",
          "Very high caffeine (over 350 mg per scoop)",
          "Banned or questionable stimulants such as DMAA or DMHA",
          "Lots of ingredients at tiny 'label dressing' doses",
          "No third-party testing if you're a tested athlete",
        ],
        paragraphs: [],
      },
      {
        heading: "Choosing by Goal",
        paragraphs: [],
        table: {
          headers: ["Goal", "Look For"],
          rows: [
            ["Energy and focus", "Moderate caffeine plus L-theanine"],
            ["Pump", "High citrulline, glycerol, nitrates"],
            ["Endurance and HIIT", "Beta-alanine, citrulline, electrolytes"],
            ["Evening training", "Stim-free formula"],
          ],
        },
        cta: preCta,
      },
    ],
    finalThoughts: `The best pre-workout lists every dose, uses proven ingredients like caffeine, citrulline and beta-alanine at effective amounts, and avoids proprietary blends and sketchy stimulants. Match the formula to your goal and caffeine tolerance. ${caffeineNote} ${supplementNote}`,
    faqs: [
      {
        q: "What is the strongest pre-workout ingredient?",
        a: "Caffeine has the strongest and most consistent evidence for performance.",
      },
      {
        q: "Is pre-workout necessary?",
        a: "No, but it can improve energy and performance for some people.",
      },
    ],
    related: [
      "what-does-pre-workout-do",
      "stim-free-pre-workout",
      "pre-workout-side-effects",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "what-does-pre-workout-do",
    title: "What Does Pre-Workout Do? Ingredients Explained",
    seoTitle: "What Does Pre-Workout Do? | Ingredients Explained",
    metaDescription:
      "What does pre workout do? Common pre workout ingredients explained, how they affect energy, pump and endurance, and is pre workout bad for you.",
    excerpt:
      "Pre-workout can boost energy, focus and pump. Here's what each common ingredient actually does.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "8 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "What Pre-Workout Is Designed to Do",
        paragraphs: [
          "Pre-workout supplements are blends designed to help you train harder. Most aim to increase energy and focus, improve blood flow and muscle pump, and delay fatigue. The effects depend entirely on the ingredients and doses.",
        ],
      },
      {
        heading: "Common Pre-Workout Ingredients",
        paragraphs: [],
        table: {
          headers: ["Ingredient", "Purpose", "Evidence"],
          rows: [
            ["Caffeine", "Energy, alertness, strength and endurance", "Strong"],
            [
              "Beta-alanine",
              "Buffers acid in muscles; causes tingling",
              "Strong for 1 - 4 min efforts",
            ],
            ["Citrulline", "Nitric oxide and blood flow", "Moderate"],
            ["Creatine", "Strength and power over weeks", "Strong"],
            ["Betaine", "Power and body composition", "Moderate"],
            ["Tyrosine", "Focus under stress", "Limited"],
            ["Nitrates (beetroot)", "Blood flow and endurance", "Moderate"],
            ["Electrolytes and glycerol", "Hydration and pump", "Moderate"],
          ],
        },
      },
      {
        heading: "Is Pre-Workout Bad for You?",
        paragraphs: [
          "For healthy adults who use reasonable doses, most pre-workouts are safe. Problems come from excessive caffeine, combining multiple stimulant products, hidden stimulants in poorly regulated products and taking pre-workout too late in the day. People with heart conditions, high blood pressure or anxiety should talk to a doctor first.",
        ],
        cta: preCta,
      },
    ],
    finalThoughts: `Pre-workout gives you energy, focus and pump through ingredients like caffeine, beta-alanine and citrulline. It works best when doses are transparent and appropriate for your tolerance. ${caffeineNote} ${supplementNote}`,
    faqs: [
      {
        q: "Does pre-workout actually work?",
        a: "The key ingredients, especially caffeine, are proven to improve performance for many people.",
      },
      {
        q: "Why does pre-workout make you itch?",
        a: "Beta-alanine causes a harmless tingling sensation called paresthesia.",
      },
    ],
    related: [
      "best-pre-workout",
      "beta-alanine-benefits",
      "caffeine-in-pre-workout",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "stim-free-pre-workout",
    title: "Best Stim-Free Pre-Workouts",
    seoTitle: "Stim Free Pre Workout | Caffeine Free Options",
    metaDescription:
      "Choose the best stim free pre workout: caffeine free pre workout ingredients that work, who should use non stim pre workout and how to stack it.",
    excerpt:
      "Train late or sensitive to caffeine? A stim-free pre-workout can still boost pump and endurance.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Who Should Use Stim-Free Pre-Workout",
        list: [
          "People who train in the evening and want to protect sleep",
          "Anyone sensitive to caffeine or who gets jitters",
          "People already drinking coffee who want to avoid stacking stimulants",
          "Those taking a caffeine break to reset tolerance",
        ],
        paragraphs: [],
      },
      {
        heading: "Effective Non-Stim Ingredients",
        paragraphs: [],
        table: {
          headers: ["Ingredient", "Dose", "Benefit"],
          rows: [
            ["L-citrulline", "6 - 8 g citrulline malate", "Pump, blood flow"],
            ["Beta-alanine", "3.2 - 6.4 g", "Muscular endurance"],
            ["Creatine", "3 - 5 g", "Strength over time"],
            ["Betaine", "2.5 g", "Power support"],
            ["Glycerol", "1 - 3 g", "Hydration and pump"],
            ["Beetroot / nitrates", "Varies", "Endurance"],
            ["Electrolytes", "Varies", "Hydration"],
          ],
        },
        cta: preCta,
      },
    ],
    finalThoughts: `A stim-free pre-workout can still deliver real benefits: bigger pumps, better endurance and steady strength gains, without hurting your sleep or causing jitters. Look for full doses of citrulline, beta-alanine and creatine. ${supplementNote}`,
    faqs: [
      {
        q: "Does caffeine-free pre-workout work?",
        a: "Yes, for pump and endurance. You won't feel the same energy kick as stimulant formulas.",
      },
      {
        q: "Can I take stim-free pre-workout at night?",
        a: "Yes. That's one of its main advantages.",
      },
    ],
    related: [
      "best-pump-supplement",
      "pre-workout-for-beginners",
      "citrulline-malate-vs-l-citrulline",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "pre-workout-for-beginners",
    title: "Best Pre-Workout for Beginners",
    seoTitle: "Pre Workout for Beginners | Mild Options & Tips",
    metaDescription:
      "Choosing a pre workout for beginners: mild pre workout options, first time pre workout dosing, what to expect and how to avoid side effects.",
    excerpt:
      "Trying pre-workout for the first time? Start mild, start small and learn how your body responds.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Do Beginners Need Pre-Workout?",
        paragraphs: [
          "No. Sleep, food and a good program matter far more. But if you want an energy boost before training, a mild pre-workout can help, as long as you start carefully.",
        ],
      },
      {
        heading: "What a Beginner Pre-Workout Should Look Like",
        list: [
          "Moderate caffeine: 100 to 200 mg per serving",
          "Transparent label with no proprietary blends",
          "Moderate beta-alanine to limit tingling",
          "No unusual stimulants",
          "Third-party testing if possible",
        ],
        paragraphs: [],
      },
      {
        heading: "First Time Pre-Workout Tips",
        paragraphs: [],
        table: {
          headers: ["Tip", "Why"],
          rows: [
            ["Start with half a scoop", "Gauge your tolerance"],
            ["Take it 20 - 30 minutes before training", "Effects peak around then"],
            ["Avoid other caffeine that day", "Prevent overdoing stimulants"],
            ["Don't take it within 6 hours of bed", "Protect sleep"],
            ["Drink plenty of water", "Reduce side effects"],
          ],
        },
        cta: preCta,
      },
    ],
    finalThoughts: `The best pre-workout for beginners is mild, transparently dosed and easy to tolerate. Start with half a scoop, avoid stacking caffeine and keep it away from bedtime. ${caffeineNote} ${supplementNote}`,
    faqs: [
      {
        q: "How much pre-workout should a beginner take?",
        a: "Start with half a scoop to test tolerance.",
      },
      {
        q: "Is pre-workout safe for teens?",
        a: "Most experts advise teens to avoid high-stimulant pre-workouts.",
      },
    ],
    related: [
      "supplements-for-beginners",
      "pre-workout-side-effects",
      "best-pre-workout",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "pre-workout-for-women",
    title: "Best Pre-Workout for Women",
    seoTitle: "Pre Workout for Women | Low Caffeine Options",
    metaDescription:
      "Choosing a pre workout for women: whether womens pre workout is different, low caffeine pre workout options, effective ingredients and safety tips.",
    excerpt:
      "Women's pre-workouts are often just lower-caffeine formulas. Here's what to look for in any pre-workout.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Is Women's Pre-Workout Different?",
        paragraphs: [
          "Most pre-workouts marketed to women contain similar ingredients with lower caffeine or added extras like collagen or biotin. Because caffeine dosing works best by bodyweight, a lower dose often makes sense for smaller people of any gender.",
        ],
      },
      {
        heading: "Recommended Ingredients for Women",
        paragraphs: [],
        table: {
          headers: ["Ingredient", "Suggested Dose", "Why"],
          rows: [
            [
              "Caffeine",
              "About 3 mg/kg (around 150 - 200 mg for many women)",
              "Energy without jitters",
            ],
            ["L-citrulline", "3 - 6 g", "Pump and endurance"],
            ["Beta-alanine", "2 - 3.2 g", "Endurance with less tingling"],
            ["Creatine", "3 - 5 g", "Strength and lean mass"],
            ["L-theanine", "100 - 200 mg", "Smoother focus"],
          ],
        },
      },
      {
        heading: "Safety Tips",
        list: [
          "Avoid stimulant pre-workouts during pregnancy and breastfeeding",
          "Watch total daily caffeine from coffee, tea and energy drinks",
          "Skip 'fat burning' pre-workouts with multiple stimulants",
          "Avoid training late with caffeine if sleep suffers",
        ],
        paragraphs: [],
        cta: preCta,
      },
    ],
    finalThoughts: `The best pre-workout for women is simply a well-dosed formula with caffeine matched to your bodyweight and tolerance, plus proven ingredients like citrulline and creatine. Start low and adjust. ${caffeineNote} ${supplementNote}`,
    faqs: [
      {
        q: "How much caffeine should women have in pre-workout?",
        a: "Around 3 mg per kg of bodyweight is a good starting point for most.",
      },
      {
        q: "Will pre-workout make women gain weight?",
        a: "No. Creatine-containing products may add a little water weight in muscle.",
      },
    ],
    related: [
      "supplements-for-women",
      "stim-free-pre-workout",
      "creatine-for-women",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "pre-workout-side-effects",
    title: "Pre-Workout Side Effects: Tingling, Jitters and Crashes",
    seoTitle: "Pre Workout Side Effects | Tingling, Jitters & Crash",
    metaDescription:
      "Pre workout side effects explained: beta alanine tingles, jitters, pre workout crash, stomach upset and sleep problems, with causes and fixes.",
    excerpt:
      "Itchy face, racing heart, afternoon crash? Here's what causes common pre-workout side effects and how to avoid them.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Common Side Effects and Fixes",
        paragraphs: [],
        table: {
          headers: ["Side Effect", "Cause", "Fix"],
          rows: [
            ["Tingling or itching", "Beta-alanine", "Harmless; split doses or use less"],
            ["Jitters, anxiety", "Too much caffeine", "Lower the dose; add L-theanine"],
            ["Crash afterward", "Caffeine wearing off", "Lower caffeine, eat a meal, sleep well"],
            [
              "Stomach upset",
              "Concentrated powders, magnesium, sugar alcohols",
              "Mix with more water; take with a light snack",
            ],
            ["Headaches", "Dehydration, nitric oxide boosters, caffeine", "Hydrate; reduce dose"],
            ["Poor sleep", "Caffeine too late", "Stop caffeine 6+ hours before bed"],
            ["Racing heart", "Stimulant overload", "Stop and seek medical advice if severe"],
          ],
        },
      },
      {
        heading: "Why Beta-Alanine Tingles",
        paragraphs: [
          "Beta-alanine activates nerve receptors in the skin, causing a pins-and-needles feeling called paresthesia. It's harmless and fades within about an hour. Smaller split doses or sustained-release forms reduce it.",
        ],
      },
      {
        heading: "When to Stop and Get Help",
        paragraphs: [
          "Stop taking pre-workout and seek medical attention if you have chest pain, a very fast or irregular heartbeat, fainting, severe headache or shortness of breath.",
        ],
        cta: preCta,
      },
    ],
    finalThoughts: `Most pre-workout side effects come from beta-alanine tingling or too much caffeine. Lower the dose, hydrate, avoid late-day stimulants and choose transparent labels. ${caffeineNote} ${supplementNote}`,
    faqs: [
      {
        q: "Is the pre-workout tingle dangerous?",
        a: "No. Beta-alanine tingling is harmless.",
      },
      {
        q: "How do I stop a pre-workout crash?",
        a: "Use less caffeine, eat well and get enough sleep.",
      },
    ],
    related: [
      "beta-alanine-benefits",
      "caffeine-in-pre-workout",
      "stim-free-pre-workout",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "how-long-does-pre-workout-last",
    title: "How Long Does Pre-Workout Last and When to Take It",
    seoTitle: "How Long Does Pre-Workout Last? | When to Take It",
    metaDescription:
      "How long does pre workout last? When to take pre workout for peak effect, caffeine half-life, timing before evening workouts and sleep.",
    excerpt:
      "Most pre-workouts kick in within 30 minutes and last a few hours. Here's how to time yours.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "5 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Pre-Workout Timeline",
        paragraphs: [],
        table: {
          headers: ["Time After Taking", "What Happens"],
          rows: [
            ["10 - 20 minutes", "Tingling from beta-alanine; caffeine begins working"],
            ["30 - 60 minutes", "Peak caffeine effects and pump"],
            ["2 - 4 hours", "Energy gradually fades"],
            ["About 5 hours", "Roughly half the caffeine is still in your system"],
            ["8+ hours", "Caffeine can still affect sleep in sensitive people"],
          ],
        },
      },
      {
        heading: "When to Take Pre-Workout",
        paragraphs: [
          "Take pre-workout about 20 to 45 minutes before training so the effects peak as you start your hardest work. On an empty stomach it may hit faster; with a meal it may be gentler.",
        ],
      },
      {
        heading: "Evening Workouts and Sleep",
        paragraphs: [
          "Caffeine's half-life averages around 5 hours but varies widely. If you train within 6 hours of bedtime, choose a stim-free pre-workout or reduce your caffeine dose.",
        ],
        cta: preCta,
      },
    ],
    finalThoughts: `Pre-workout typically kicks in within 30 minutes and lasts 2 to 4 hours, but caffeine can linger much longer. Take it 20 to 45 minutes before training and switch to stim-free formulas for evening sessions. ${caffeineNote} ${supplementNote}`,
    faqs: [
      {
        q: "How long before a workout should I take pre-workout?",
        a: "About 20 to 45 minutes before.",
      },
      {
        q: "Can pre-workout keep me up at night?",
        a: "Yes, if it contains caffeine and you take it late in the day.",
      },
    ],
    related: [
      "caffeine-in-pre-workout",
      "stim-free-pre-workout",
      "supplement-schedule",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "best-pump-supplement",
    title: "Best Pump Supplements (Nitric Oxide Boosters)",
    seoTitle: "Best Pump Supplement | Nitric Oxide Boosters",
    metaDescription:
      "Choose the best pump supplement: nitric oxide supplement ingredients like citrulline, nitrates and glycerol, effective doses and what to expect.",
    excerpt:
      "Pump supplements aim to increase blood flow to working muscles. Here's which ingredients actually work.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "What Pump Supplements Do",
        paragraphs: [
          "Pump supplements, often called nitric oxide boosters, aim to widen blood vessels and increase blood flow during training. That creates the full, tight 'pump' feeling and may slightly improve endurance. They don't directly build muscle, but many lifters enjoy the training experience.",
        ],
      },
      {
        heading: "Ingredients That Work",
        paragraphs: [],
        table: {
          headers: ["Ingredient", "Dose", "Evidence"],
          rows: [
            ["L-citrulline", "3 - 6 g", "Good; raises arginine and nitric oxide"],
            ["Citrulline malate", "6 - 8 g", "Good"],
            ["Dietary nitrates (beetroot)", "About 400 - 800 mg nitrate", "Good for endurance"],
            ["Glycerol", "1 - 3 g plus water", "Hydration and muscle fullness"],
            ["L-arginine", "Varies", "Weak; poorly absorbed compared with citrulline"],
            ["Agmatine", "Varies", "Limited"],
          ],
        },
        cta: preCta,
      },
    ],
    finalThoughts: `The best pump supplement is built around a full dose of citrulline, often paired with nitrates and glycerol. Skip L-arginine-heavy formulas and proprietary blends. Stay hydrated and enjoy the pump. ${supplementNote}`,
    faqs: [
      {
        q: "Do pump supplements build muscle?",
        a: "Not directly. They may help training quality and endurance.",
      },
      {
        q: "Is citrulline better than arginine?",
        a: "Yes. Citrulline raises blood arginine levels more effectively than arginine itself.",
      },
    ],
    related: [
      "citrulline-malate-vs-l-citrulline",
      "stim-free-pre-workout",
      "best-pre-workout",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "citrulline-malate-vs-l-citrulline",
    title: "L-Citrulline vs Citrulline Malate",
    seoTitle: "Citrulline Malate vs L-Citrulline | Dosage & Benefits",
    metaDescription:
      "Citrulline malate vs L-citrulline: differences, citrulline dosage for each, citrulline benefits for pump and endurance, and which to choose.",
    excerpt:
      "Both raise nitric oxide, but the doses differ. Here's how to compare L-citrulline and citrulline malate.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "5 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "The Difference",
        paragraphs: [
          "L-citrulline is pure citrulline. Citrulline malate combines citrulline with malic acid, commonly in a 2:1 ratio, so 6 g of citrulline malate provides about 4 g of citrulline. Malate may play a small role in energy production, but evidence for added benefit is limited.",
        ],
      },
      {
        heading: "Dosage Compared",
        paragraphs: [],
        table: {
          headers: ["Form", "Typical Dose", "Citrulline Delivered"],
          rows: [
            ["L-citrulline", "3 - 6 g", "3 - 6 g"],
            ["Citrulline malate 2:1", "6 - 8 g", "4 - 5.3 g"],
            ["Citrulline malate 1:1", "6 - 8 g", "3 - 4 g"],
          ],
        },
      },
      {
        heading: "Citrulline Benefits",
        list: [
          "Increases blood arginine and nitric oxide",
          "Supports blood flow and muscle pump",
          "May improve reps to failure and reduce soreness in some studies",
          "May support endurance performance",
        ],
        paragraphs: [],
        cta: preCta,
      },
    ],
    finalThoughts: `L-citrulline and citrulline malate both work; just match the dose. Take about 3 to 6 g of L-citrulline or 6 to 8 g of 2:1 citrulline malate around 60 minutes before training. ${supplementNote}`,
    faqs: [
      {
        q: "Which is better, L-citrulline or citrulline malate?",
        a: "Both are effective at proper doses. Most research on performance used citrulline malate.",
      },
      {
        q: "When should I take citrulline?",
        a: "About 30 to 60 minutes before training.",
      },
    ],
    related: ["best-pump-supplement", "best-pre-workout", "beta-alanine-benefits", "supplements"],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "beta-alanine-benefits",
    title: "Beta-Alanine Benefits and Dosage",
    seoTitle: "Beta Alanine Benefits & Dosage | Tingles Explained",
    metaDescription:
      "Beta alanine benefits for endurance and high-intensity training, beta alanine dosage, loading and why beta alanine tingles happen.",
    excerpt:
      "Beta-alanine helps you push through burning sets and intervals. Here's how it works and how to take it.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "How Beta-Alanine Works",
        paragraphs: [
          "Beta-alanine raises levels of carnosine in muscle. Carnosine buffers the acid that builds up during intense exercise, helping delay the burning fatigue that ends hard sets and intervals. It works by building up over weeks, not as an immediate boost.",
        ],
      },
      {
        heading: "Beta-Alanine Benefits",
        list: [
          "Improved performance in efforts lasting roughly 1 to 4 minutes",
          "More reps in high-rep sets",
          "Better repeated sprint and HIIT performance",
          "Possible benefits for older adults' work capacity",
        ],
        paragraphs: [],
      },
      {
        heading: "Beta-Alanine Dosage",
        paragraphs: [],
        table: {
          headers: ["Approach", "Dose"],
          rows: [
            ["Standard", "3.2 - 6.4 g/day"],
            ["To reduce tingling", "Split into 0.8 - 1.6 g doses through the day"],
            ["Time to benefit", "About 2 - 4 weeks of daily use"],
          ],
        },
      },
      {
        heading: "Beta-Alanine Tingles",
        paragraphs: [
          "The tingling, called paresthesia, is harmless and usually fades within about an hour. Smaller split doses, sustained-release beta-alanine and taking it with meals all reduce it.",
        ],
        cta: preCta,
      },
    ],
    finalThoughts: `Beta-alanine is one of the few pre-workout ingredients with strong evidence, especially for efforts lasting 1 to 4 minutes. Take 3.2 to 6.4 g daily, split it to reduce tingling and give it a few weeks to work. ${supplementNote}`,
    faqs: [
      {
        q: "Do I need to take beta-alanine every day?",
        a: "Yes. Benefits come from building up carnosine over weeks.",
      },
      {
        q: "Is beta-alanine safe?",
        a: "Research shows it's safe for healthy people at recommended doses.",
      },
    ],
    related: [
      "pre-workout-side-effects",
      "what-does-pre-workout-do",
      "supplements-for-runners",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "caffeine-in-pre-workout",
    title: "How Much Caffeine Is in Pre-Workout? Safe Limits",
    seoTitle: "Caffeine in Pre-Workout | How Much Is Safe?",
    metaDescription:
      "How much caffeine is in pre workout? Typical pre workout caffeine content, high stim pre workout doses, safe daily limits and how to dose by bodyweight.",
    excerpt:
      "Pre-workouts range from 0 to 400 mg of caffeine per scoop. Here's how much you actually need and where the limits are.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Typical Caffeine Content",
        paragraphs: [],
        table: {
          headers: ["Product", "Caffeine"],
          rows: [
            ["Stim-free pre-workout", "0 mg"],
            ["Mild pre-workout", "100 - 175 mg"],
            ["Standard pre-workout", "200 - 300 mg"],
            ["High-stim pre-workout", "300 - 400 mg+"],
            ["Cup of brewed coffee (8 oz)", "About 80 - 100 mg"],
            ["Energy drink (16 oz)", "About 150 - 300 mg"],
          ],
        },
      },
      {
        heading: "How Much Caffeine Do You Need?",
        paragraphs: [
          "Research shows performance benefits at about 3 to 6 mg of caffeine per kilogram of bodyweight, taken 30 to 60 minutes before exercise. For a 154 lb (70 kg) person, that's 210 to 420 mg, but many people get a meaningful boost at the lower end, around 3 mg/kg, with fewer side effects.",
        ],
      },
      {
        heading: "Safe Limits",
        list: [
          "About 400 mg per day total is considered safe for most healthy adults",
          "Count coffee, tea, soda and energy drinks too",
          "Pregnant people are usually advised to stay under about 200 mg a day",
          "Avoid high-stim products if you have heart issues or anxiety",
        ],
        paragraphs: [],
        cta: preCta,
      },
    ],
    finalThoughts: `Most pre-workouts contain 150 to 300 mg of caffeine per scoop. Start around 3 mg per kg of bodyweight, keep your daily total under about 400 mg, and avoid stacking multiple caffeinated products. ${caffeineNote} ${supplementNote}`,
    faqs: [
      {
        q: "Is 300 mg of caffeine in pre-workout too much?",
        a: "It's a high single dose for many people. Start lower and assess tolerance.",
      },
      {
        q: "Can I build a tolerance to pre-workout caffeine?",
        a: "Yes. Periodic lower-caffeine weeks can help reset sensitivity.",
      },
    ],
    related: [
      "pre-workout-vs-coffee",
      "pre-workout-side-effects",
      "how-long-does-pre-workout-last",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  {
    slug: "pre-workout-vs-coffee",
    title: "Pre-Workout vs Coffee: Which Is Better Before the Gym?",
    seoTitle: "Pre Workout vs Coffee | Which Is Better Before the Gym?",
    metaDescription:
      "Pre workout vs coffee before a workout: caffeine, extra ingredients, cost and side effects compared, plus how energy drinks stack up.",
    excerpt:
      "Coffee is cheap and effective. Pre-workout adds extra ingredients. Here's which one makes sense for you.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "5 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Comparing Your Options",
        paragraphs: [],
        table: {
          headers: ["Factor", "Coffee", "Pre-Workout", "Energy Drink"],
          rows: [
            ["Caffeine", "80 - 200 mg per cup", "0 - 400 mg", "80 - 300 mg"],
            [
              "Other active ingredients",
              "Antioxidants",
              "Citrulline, beta-alanine, creatine",
              "Taurine, B vitamins, sugar",
            ],
            ["Cost per serving", "Low", "Moderate", "Moderate"],
            ["Dose consistency", "Varies by brew", "Consistent", "Consistent"],
            ["Pump and endurance extras", "No", "Yes", "No"],
          ],
        },
      },
      {
        heading: "When Coffee Is Enough",
        paragraphs: [
          "If your main goal is energy and focus, coffee before a workout works well. Caffeine is the most effective ingredient in most pre-workouts anyway. Drink it 30 to 60 minutes before training.",
        ],
      },
      {
        heading: "When Pre-Workout Makes Sense",
        paragraphs: [
          "Pre-workout makes sense if you want added ingredients like citrulline for pump or beta-alanine for endurance, or a precise caffeine dose. Stim-free pre-workout plus coffee is a popular combination for controlling caffeine.",
        ],
        cta: preCta,
      },
    ],
    finalThoughts: `Coffee is a cheap, effective pre-workout for energy. Pre-workout adds ingredients for pump and endurance and offers precise dosing. Choose based on your goals, and don't double up on caffeine. ${caffeineNote} ${supplementNote}`,
    faqs: [
      {
        q: "Is coffee a good pre-workout?",
        a: "Yes. Caffeine from coffee improves performance much like caffeine in supplements.",
      },
      {
        q: "Can I drink coffee and take pre-workout?",
        a: "Be careful. Combined caffeine can easily exceed safe limits.",
      },
    ],
    related: [
      "caffeine-in-pre-workout",
      "creatine-and-caffeine",
      "best-pre-workout",
      "supplements",
    ],
    products: preProducts,
    ctaBanner: preBanner,
  },
  // ── Amino Acids ───────────────────────────────────────────────────────
  {
    slug: "bcaa-vs-eaa",
    title: "BCAA vs EAA: Which Amino Acid Supplement Is Better?",
    seoTitle: "BCAA vs EAA | Which Amino Acid Supplement Is Better?",
    metaDescription:
      "BCAA vs EAA: what essential amino acids are, BCAA benefits and limits, which builds more muscle and when amino acid supplements make sense.",
    excerpt:
      "BCAAs are three amino acids; EAAs are all nine essentials. Here's why that difference matters for muscle.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "The Difference",
        paragraphs: [
          "Your body needs nine essential amino acids (EAAs) from food to build muscle protein. Three of these, leucine, isoleucine and valine, are the branched-chain amino acids (BCAAs). Leucine triggers muscle protein synthesis, but you need all nine EAAs to actually build new muscle.",
        ],
      },
      {
        heading: "BCAA vs EAA Compared",
        paragraphs: [],
        table: {
          headers: ["Factor", "BCAAs", "EAAs"],
          rows: [
            ["Amino acids", "3", "All 9 essentials"],
            ["Can build muscle alone", "No; missing building blocks", "Yes"],
            ["Research for muscle growth", "Weak when protein intake is adequate", "Better"],
            [
              "Best use",
              "Flavor and hydration during training",
              "Fasted training, low protein diets",
            ],
          ],
        },
      },
      {
        heading: "Do You Need Either?",
        paragraphs: [
          "If you eat enough protein, neither is necessary. Whey protein contains all EAAs plus plenty of leucine and is usually cheaper per gram. EAAs make the most sense if you train fasted, follow a plant-based diet or struggle to eat enough protein.",
        ],
        cta: aminoCta,
      },
    ],
    finalThoughts: `EAAs beat BCAAs because they provide all the building blocks for muscle. But for most people eating enough protein, a protein shake is a better value than either. ${supplementNote}`,
    faqs: [
      {
        q: "Are EAAs better than BCAAs?",
        a: "Yes. EAAs contain all essential amino acids needed to build muscle.",
      },
      {
        q: "Can I take EAAs instead of protein powder?",
        a: "You can, but protein powder usually provides more total protein per dollar.",
      },
    ],
    related: [
      "best-eaa-supplement",
      "are-bcaas-worth-it",
      "how-much-protein-to-build-muscle",
      "supplements",
    ],
    products: aminoProducts,
    ctaBanner: aminoBanner,
  },
  {
    slug: "best-eaa-supplement",
    title: "Best EAA Supplements",
    seoTitle: "Best EAA Supplement | Essential Amino Acid Guide",
    metaDescription:
      "How to choose the best EAA supplement: essential amino acid supplement doses, leucine content, EAA powder vs capsules and who benefits most.",
    excerpt:
      "An EAA supplement can fill gaps when protein intake is low. Here's how to choose an effective one.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "5 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "What to Look For",
        list: [
          "All nine essential amino acids listed with individual doses",
          "About 8 to 15 g of total EAAs per serving",
          "At least 2 to 3 g of leucine",
          "No proprietary blends",
          "Third-party testing for athletes",
        ],
        paragraphs: [],
      },
      {
        heading: "Who Benefits From EAAs",
        paragraphs: [],
        table: {
          headers: ["Situation", "Why EAAs Help"],
          rows: [
            ["Fasted training", "Amino acids without a full meal"],
            ["Plant-based diets", "Complements lower-leucine protein sources"],
            ["Low appetite or older adults", "Concentrated amino acids in a small drink"],
            ["Long training sessions", "Intra-workout amino acids"],
          ],
        },
        cta: aminoCta,
      },
    ],
    finalThoughts: `The best EAA supplement lists all nine essential amino acids, provides 8 to 15 g per serving with 2 to 3 g of leucine and uses no proprietary blends. It's most useful for fasted training, plant-based diets and low appetites. ${supplementNote}`,
    faqs: [
      {
        q: "When should I take EAAs?",
        a: "Before or during training, or between meals if protein intake is low.",
      },
      {
        q: "Do EAAs break a fast?",
        a: "Technically yes, since they contain calories and stimulate metabolic responses.",
      },
    ],
    related: ["bcaa-vs-eaa", "intra-workout-supplement", "vegan-supplements", "supplements"],
    products: aminoProducts,
    ctaBanner: aminoBanner,
  },
  {
    slug: "are-bcaas-worth-it",
    title: "Are BCAAs Worth It?",
    seoTitle: "Are BCAAs Worth It? | Do BCAAs Work?",
    metaDescription:
      "Are BCAAs worth it? What research says about BCAA benefits for muscle growth, soreness and fatigue, and when BCAAs might still make sense.",
    excerpt:
      "BCAAs were a gym staple for years. Research now tells a more nuanced story. Here's whether they're worth buying.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "5 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "What BCAAs Claim to Do",
        list: [
          "Increase muscle growth",
          "Reduce muscle soreness",
          "Reduce fatigue during exercise",
          "Prevent muscle breakdown",
        ],
        paragraphs: [],
      },
      {
        heading: "What Research Shows",
        paragraphs: [],
        table: {
          headers: ["Claim", "Evidence"],
          rows: [
            ["Muscle growth", "Little benefit when daily protein intake is adequate"],
            ["Soreness", "Some studies show a modest reduction"],
            ["Fatigue", "Mixed; small effects in long endurance events"],
            ["Muscle breakdown", "Possible benefit in fasted training or very low protein diets"],
          ],
        },
      },
      {
        heading: "When BCAAs Might Make Sense",
        paragraphs: [
          "BCAAs can be a flavorful, low-calorie way to sip something during training. If you train fasted or eat little protein, EAAs or a protein shake are better choices.",
        ],
        cta: aminoCta,
      },
    ],
    finalThoughts: `For most people eating enough protein, BCAAs aren't worth the money for muscle growth. They may modestly reduce soreness, but EAAs or a protein shake offer more benefit per dollar. ${supplementNote}`,
    faqs: [
      {
        q: "Do BCAAs build muscle?",
        a: "Not on their own. You need all essential amino acids for muscle building.",
      },
      {
        q: "Are BCAAs a waste of money?",
        a: "For people with adequate protein intake, mostly yes.",
      },
    ],
    related: [
      "bcaa-vs-eaa",
      "supplements-that-are-a-waste-of-money",
      "best-eaa-supplement",
      "supplements",
    ],
    products: aminoProducts,
    ctaBanner: aminoBanner,
  },
  {
    slug: "glutamine-benefits",
    title: "Glutamine Benefits for Gut Health and Recovery",
    seoTitle: "Glutamine Benefits | L-Glutamine for Gut Health",
    metaDescription:
      "L-glutamine benefits explained: research on glutamine for gut health, recovery and immunity, typical doses and whether lifters need it.",
    excerpt:
      "Glutamine is the most abundant amino acid in the body. Here's what supplementing actually does.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "What Is Glutamine?",
        paragraphs: [
          "L-glutamine is a conditionally essential amino acid: your body usually makes enough, but needs may rise during severe illness, injury or extreme stress. It fuels cells of the gut lining and immune system.",
        ],
      },
      {
        heading: "Glutamine Benefits: What's Supported",
        paragraphs: [],
        table: {
          headers: ["Claim", "Evidence"],
          rows: [
            [
              "Gut health",
              "Promising research on gut barrier function, mostly in clinical or stressed populations",
            ],
            ["Muscle growth", "Little to no benefit in healthy lifters"],
            ["Recovery and soreness", "Some studies show small reductions in soreness"],
            ["Immune support", "Mixed; possible benefit in very heavy endurance training"],
          ],
        },
      },
      {
        heading: "Glutamine Dosage",
        paragraphs: [
          "Studies commonly use 5 to 15 g a day split into doses, and sometimes higher in clinical settings. It's generally well tolerated by healthy adults. People with liver or kidney disease should consult a doctor.",
        ],
        cta: aminoCta,
      },
    ],
    finalThoughts: `Glutamine benefits are strongest for gut health in stressed or clinical populations; for building muscle in healthy lifters, evidence is weak. If you're curious about gut support, discuss it with your healthcare provider. ${supplementNote}`,
    faqs: [
      {
        q: "Does glutamine help build muscle?",
        a: "Research in healthy people doesn't show meaningful muscle-building benefits.",
      },
      {
        q: "Is glutamine good for gut health?",
        a: "It shows promise for gut barrier function, especially under stress.",
      },
    ],
    related: ["best-probiotic", "supplements-for-muscle-recovery", "bcaa-vs-eaa", "supplements"],
    products: aminoProducts,
    ctaBanner: aminoBanner,
  },
  {
    slug: "intra-workout-supplement",
    title: "Best Intra-Workout Supplements",
    seoTitle: "Intra Workout Supplement | Carbs, EAAs & Electrolytes",
    metaDescription:
      "Do you need an intra workout supplement? Intra workout carbs, EAAs and electrolytes compared, plus who benefits from a during workout drink.",
    excerpt:
      "For long or intense sessions, what you drink during training can matter. Here's when intra-workout supplements help.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Who Needs an Intra-Workout Drink?",
        list: [
          "Sessions longer than 60 to 90 minutes",
          "Endurance athletes and team sport players",
          "Twice-a-day training",
          "Hot environments and heavy sweaters",
          "People training fasted",
        ],
        paragraphs: [],
      },
      {
        heading: "Common Intra-Workout Ingredients",
        paragraphs: [],
        table: {
          headers: ["Ingredient", "Purpose", "Typical Dose"],
          rows: [
            [
              "Carbohydrates (cyclic dextrin, maltodextrin)",
              "Energy for long sessions",
              "30 - 60 g per hour",
            ],
            ["Electrolytes (sodium, potassium)", "Hydration", "300 - 600+ mg sodium per hour"],
            ["EAAs", "Amino acids when training fasted", "8 - 15 g"],
            ["Caffeine (optional)", "Alertness", "Varies"],
          ],
        },
        cta: aminoCta,
      },
    ],
    finalThoughts: `For typical one-hour gym sessions, water is enough. For long, hot or fasted training, an intra-workout supplement with carbs, electrolytes and possibly EAAs can help performance. ${supplementNote}`,
    faqs: [
      {
        q: "Are intra-workout carbs useful for lifting?",
        a: "Mostly for long, high-volume sessions. Short workouts don't need them.",
      },
      {
        q: "What should I drink during a workout?",
        a: "Water for most sessions; add electrolytes and carbs for long or sweaty ones.",
      },
    ],
    related: ["best-electrolyte-powder", "carb-supplement", "best-eaa-supplement", "supplements"],
    products: aminoProducts,
    ctaBanner: aminoBanner,
  },
  {
    slug: "best-electrolyte-powder",
    title: "Best Electrolyte Powders for Workouts",
    seoTitle: "Best Electrolyte Powder | Sugar Free Electrolytes",
    metaDescription:
      "Choose the best electrolyte powder for workouts: sodium and potassium amounts, sugar free electrolytes vs electrolyte drink mix with carbs, and who needs them.",
    excerpt:
      "Sodium is the key ingredient most people overlook. Here's how to choose an electrolyte powder that fits your training.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Why Electrolytes Matter",
        paragraphs: [
          "When you sweat, you lose water and electrolytes, mostly sodium. Replacing sodium helps you retain fluid, maintain performance and reduce the risk of cramping and low blood sodium in long events.",
        ],
      },
      {
        heading: "What to Look For",
        paragraphs: [],
        table: {
          headers: ["Electrolyte", "Typical Amount per Serving", "Role"],
          rows: [
            ["Sodium", "300 - 1,000 mg", "Fluid balance, most lost in sweat"],
            ["Potassium", "100 - 400 mg", "Muscle and nerve function"],
            ["Magnesium", "50 - 100 mg", "Muscle function"],
            ["Calcium", "Small amounts", "Muscle contraction"],
          ],
        },
      },
      {
        heading: "Sugar-Free vs With Carbs",
        list: [
          "Sugar-free electrolytes: everyday hydration, low-carb diets, short workouts",
          "Electrolyte drink mix with carbs: endurance sessions over 60 to 90 minutes",
          "High-sodium formulas: heavy or salty sweaters, hot climates",
        ],
        paragraphs: [],
        cta: aminoCta,
      },
    ],
    finalThoughts: `The best electrolyte powder has enough sodium for your sweat rate, some potassium and magnesium, and carbs only if you train long. Most gym sessions need just water, but hot, long or sweaty workouts benefit from electrolytes. People with high blood pressure or kidney disease should check with a doctor about sodium. ${supplementNote}`,
    faqs: [
      {
        q: "Do I need electrolytes for a gym workout?",
        a: "Usually not for an hour or less. They help in heat or longer sessions.",
      },
      {
        q: "Are sugar-free electrolytes effective?",
        a: "Yes for hydration. Carbs are only needed for long endurance efforts.",
      },
    ],
    related: [
      "intra-workout-supplement",
      "supplements-for-runners",
      "best-magnesium-for-sleep",
      "supplements",
    ],
    products: aminoProducts,
    ctaBanner: aminoBanner,
  },
];
