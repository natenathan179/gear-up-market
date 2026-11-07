import type { BlogPost } from "@/data/blog";

import supplementsImg from "@/assets/cat-supplements.jpg";
import { supplementNote } from "@/data/blog-protein";

const allProducts = {
  category: "supplements",
  heading: "Supplements for Sale",
  moreLink: { label: "View All Supplements", to: "/supplements" },
};

const allBanner = {
  heading: "Shop Supplements With Confidence",
  body: "Factory-sealed supplements from trusted brands, shipped with tracking.",
  buttonLabel: "Shop Supplements",
  to: "/supplements",
};

const allCta = { label: "Shop Supplements", to: "/supplements" };

/** Supplement quality, safety and stacking guides. Merged into `blogPosts` in blog.ts. */
export const supplementSafetyPosts: BlogPost[] = [
  // ── Quality & Safety ──────────────────────────────────────────────────
  {
    slug: "third-party-tested-supplements",
    title: "How to Choose a Safe Supplement: Third-Party Testing Explained",
    seoTitle: "Third Party Tested Supplements | How to Choose Safely",
    metaDescription:
      "What third party tested supplements are, how NSF Certified, Informed Sport and USP work, and a simple checklist for how to choose supplements safely.",
    excerpt:
      "Supplements aren't approved before they're sold. Third-party testing is how you know what's really in the bottle.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "8 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Why Third-Party Testing Matters",
        paragraphs: [
          "In the US, dietary supplements don't need FDA approval before they're sold. Manufacturers are responsible for safety and label accuracy, and problems often surface only after products reach shelves. Independent testing checks that a product contains what the label says and isn't contaminated with harmful or banned substances.",
        ],
      },
      {
        heading: "Major Certification Programs",
        paragraphs: [],
        table: {
          headers: ["Program", "What It Checks", "Best For"],
          rows: [
            [
              "NSF Certified for Sport",
              "Label accuracy, contaminants, banned substances, facility audits",
              "Tested athletes",
            ],
            [
              "Informed Sport",
              "Every batch tested for banned substances before release",
              "Tested athletes",
            ],
            [
              "Informed Choice",
              "Regular sampling for banned substances",
              "General users and athletes",
            ],
            [
              "USP Verified",
              "Identity, potency, purity, manufacturing practices",
              "Vitamins and general supplements",
            ],
            [
              "Clean Label Project / others",
              "Heavy metals and contaminants",
              "Contaminant-conscious shoppers",
            ],
          ],
        },
      },
      {
        heading: "Checklist for Choosing a Safe Supplement",
        list: [
          "Look for a recognized third-party certification seal and verify it on the certifier's website",
          "Choose fully disclosed labels without proprietary blends",
          "Avoid products promising drug-like results",
          "Buy from authorized retailers",
          "Check FDA warning lists for tainted products",
          "Talk to a healthcare provider about interactions with medications",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `Third party tested supplements give you independent confirmation that what's on the label is in the product and nothing harmful is hiding inside. Look for NSF, Informed Sport, Informed Choice or USP seals, verify them online, and buy from trusted sellers. ${supplementNote}`,
    faqs: [
      {
        q: "Does the FDA test supplements?",
        a: "No. The FDA doesn't approve supplements before sale; it acts mainly after problems arise.",
      },
      {
        q: "Are third-party tested supplements more expensive?",
        a: "Sometimes slightly, but the added assurance is often worth it.",
      },
    ],
    related: [
      "nsf-vs-informed-sport",
      "how-to-read-supplement-labels",
      "fake-supplements",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "nsf-vs-informed-sport",
    title: "NSF Certified for Sport vs Informed Sport: What's the Difference?",
    seoTitle: "NSF vs Informed Sport | Banned Substance Testing",
    metaDescription:
      "NSF Certified for Sport vs Informed Sport vs Informed Choice certification: how banned substance testing works, differences and which leagues recognize them.",
    excerpt:
      "Both programs protect athletes from contaminated supplements, but they work a little differently. Here's how.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "How the Programs Compare",
        paragraphs: [],
        table: {
          headers: ["Feature", "NSF Certified for Sport", "Informed Sport", "Informed Choice"],
          rows: [
            ["Banned substance testing", "Yes, hundreds of substances", "Yes", "Yes"],
            [
              "Batch testing",
              "Lot testing and ongoing monitoring",
              "Every batch before release",
              "Regular blind sampling",
            ],
            [
              "Label claim verification",
              "Yes",
              "Focus on banned substances",
              "Focus on banned substances",
            ],
            ["Facility audits", "Yes", "Yes", "Yes"],
            [
              "Common recognition",
              "Many US pro leagues and colleges",
              "Widely used internationally",
              "Consumer-focused",
            ],
          ],
        },
      },
      {
        heading: "Which Should Athletes Choose?",
        paragraphs: [
          "Both NSF Certified for Sport and Informed Sport are strong choices for tested athletes. Check which certifications your league, college or federation recognizes. No program can guarantee zero risk, but certified products dramatically reduce the chance of an inadvertent positive test.",
        ],
      },
      {
        heading: "How to Verify a Product",
        list: [
          "Search the product on the certifier's website",
          "Match the exact product name, flavor and size",
          "For Informed Sport, check the batch number",
          "Beware of seals on products not listed in the database",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `NSF Certified for Sport and Informed Sport both test for banned substances, with NSF also verifying label claims and Informed Sport testing every batch. Tested athletes should choose a program recognized by their sport and always verify products online. ${supplementNote}`,
    faqs: [
      {
        q: "Is NSF or Informed Sport better?",
        a: "Both are highly respected. Choose the one your sport recognizes.",
      },
      {
        q: "Can a certified supplement still cause a failed test?",
        a: "The risk is very low but never zero. Keep records of products and batch numbers.",
      },
    ],
    related: [
      "third-party-tested-supplements",
      "fake-supplements",
      "supplements-for-teenage-athletes",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "how-to-read-supplement-labels",
    title: "How to Read a Supplement Label (Proprietary Blends, Serving Sizes)",
    seoTitle: "How to Read Supplement Labels | Proprietary Blends",
    metaDescription:
      "How to read supplement labels: the supplement facts panel, serving sizes, proprietary blends, % daily value, other ingredients and red flags.",
    excerpt:
      "A supplement label tells you a lot if you know where to look. Here's how to decode one in under a minute.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Parts of the Supplement Facts Panel",
        paragraphs: [],
        table: {
          headers: ["Section", "What to Check"],
          rows: [
            ["Serving size", "How many scoops or capsules make one serving"],
            ["Servings per container", "Use it to calculate cost per serving"],
            ["Amount per serving", "Actual dose of each ingredient"],
            [
              "% Daily Value",
              "How much of your daily needs it covers; over 100% isn't always better",
            ],
            ["Proprietary blend", "Total weight only; individual doses hidden"],
            ["Other ingredients", "Fillers, sweeteners, colors, allergens"],
          ],
        },
      },
      {
        heading: "Why Proprietary Blends Are a Problem",
        paragraphs: [
          "A proprietary blend lists ingredients in descending order by weight but only gives the total amount. A '5 g performance blend' might contain mostly a cheap ingredient and only a sprinkle of the expensive ones. You can't compare products or know whether you're getting an effective dose.",
        ],
      },
      {
        heading: "Label Red Flags",
        list: [
          "Proprietary blends hiding key doses",
          "Serving sizes of 2 to 3 scoops that make the price look lower",
          "Megadoses far above upper limits",
          "Drug-like claims such as 'cures,' 'treats' or 'anabolic'",
          "No contact information or lot number",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `Learning how to read supplement labels helps you spot good value and avoid underdosed or risky products. Check serving sizes, individual doses and other ingredients, and avoid proprietary blends and drug-like claims. ${supplementNote}`,
    faqs: [
      {
        q: "What is a proprietary blend?",
        a: "A mix of ingredients listed with only a combined total weight, hiding individual doses.",
      },
      {
        q: "Is more than 100% daily value bad?",
        a: "Not always, but some nutrients have upper limits. Watch fat-soluble vitamins, iron and zinc.",
      },
    ],
    related: [
      "third-party-tested-supplements",
      "supplements-that-are-a-waste-of-money",
      "best-pre-workout",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplements-that-are-a-waste-of-money",
    title: "Supplements That Are a Waste of Money",
    seoTitle: "Supplements That Are a Waste of Money | Overrated List",
    metaDescription:
      "Supplements that are a waste of money for most people: overrated and useless supplements like BCAAs, test boosters, detox teas and fat burners, and what to buy instead.",
    excerpt:
      "The supplement industry sells plenty of hype. Here are the most overrated products and what to spend your money on instead.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "8 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Overrated Supplements",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Why It's Overrated", "Better Alternative"],
          rows: [
            ["BCAAs", "Little benefit with adequate protein", "Protein powder or EAAs"],
            [
              "Testosterone boosters",
              "Minimal effects in healthy men",
              "Sleep, lifting, healthy body fat",
            ],
            [
              "Detox teas and cleanses",
              "Often laxatives; your liver detoxes already",
              "Fiber, water, vegetables",
            ],
            [
              "Most fat burners",
              "Small effects, side effects",
              "Calorie deficit, protein, caffeine",
            ],
            ["Glutamine for muscle", "No muscle benefit in healthy lifters", "Protein"],
            ["HCG drops", "No legitimate weight loss evidence", "Structured nutrition plan"],
            ["Raspberry ketones, garcinia", "No meaningful human evidence", "Fiber, protein"],
            ["Alkaline water", "Body regulates pH tightly", "Regular water"],
          ],
        },
      },
      {
        heading: "Supplements That Are Worth It",
        list: [
          "Creatine monohydrate",
          "Protein powder (if you need it)",
          "Caffeine",
          "Vitamin D (if low)",
          "Omega-3 (if you don't eat fish)",
          "B12 (for vegans)",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `Many popular supplements, including BCAAs, test boosters, detox teas and most fat burners, are a waste of money for most people. Spend on the proven few, like creatine, protein, caffeine and nutrients you're actually low in, and put the rest toward good food and equipment. ${supplementNote}`,
    faqs: [
      {
        q: "What is the most useless supplement?",
        a: "Products like detox teas, raspberry ketones and HCG drops have little to no evidence.",
      },
      {
        q: "Which supplements are actually worth it?",
        a: "Creatine, protein powder, caffeine and correcting deficiencies like vitamin D.",
      },
    ],
    related: [
      "are-bcaas-worth-it",
      "do-fat-burners-work",
      "supplements-for-beginners",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "fake-supplements",
    title: "How to Spot Fake Supplements Online",
    seoTitle: "Fake Supplements | How to Spot Counterfeits Online",
    metaDescription:
      "How to spot fake supplements online: counterfeit supplements on Amazon and marketplaces, warning signs, how to verify authentic supplements and what to do if you're scammed.",
    excerpt:
      "Counterfeit supplements can contain the wrong ingredients or contaminants. Here's how to spot fakes and buy authentic products.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Why Fake Supplements Are Dangerous",
        paragraphs: [
          "Counterfeit supplements may contain less of the active ingredient, the wrong ingredients, contaminants or even undeclared drugs. They're often sold through third-party marketplace sellers at prices that look too good to be true.",
        ],
      },
      {
        heading: "Warning Signs of a Fake",
        list: [
          "Prices far below the brand's official price",
          "Spelling errors, blurry printing or different fonts",
          "Missing or mismatched lot numbers and expiration dates",
          "Broken, missing or loose safety seals",
          "Different color, smell, texture or taste than usual",
          "Seller with few reviews or recent account creation",
        ],
        paragraphs: [],
      },
      {
        heading: "How to Buy Authentic Supplements",
        paragraphs: [],
        table: {
          headers: ["Do", "Avoid"],
          rows: [
            ["Buy from the brand or authorized retailers", "Unknown third-party sellers"],
            [
              "Check the seller listed on marketplace orders",
              "Listings 'fulfilled' by unclear sellers",
            ],
            ["Verify lot numbers with the brand", "Products with scratched-off codes"],
            ["Look for intact factory seals", "Opened or resealed containers"],
          ],
        },
      },
      {
        heading: "If You Suspect a Fake",
        list: [
          "Stop using the product",
          "Contact the brand with photos and the lot number",
          "Request a refund from the seller or platform",
          "Report adverse effects to the FDA's MedWatch program",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `To avoid fake supplements online, buy from authorized sellers, check seals and lot numbers, and be suspicious of prices that seem too low. If something looks or tastes wrong, stop using it and contact the brand. ${supplementNote}`,
    faqs: [
      {
        q: "Are supplements on Amazon fake?",
        a: "Most aren't, but counterfeits exist. Buy from the brand's official storefront or authorized sellers.",
      },
      {
        q: "How can I check if a supplement is authentic?",
        a: "Verify the lot number and packaging with the manufacturer.",
      },
    ],
    related: [
      "third-party-tested-supplements",
      "creatine-gummies",
      "is-protein-powder-safe",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  // ── Stacks & Goals ────────────────────────────────────────────────────
  {
    slug: "supplement-stack-for-muscle-gain",
    title: "Best Supplement Stack for Muscle Gain",
    seoTitle: "Supplement Stack for Muscle Gain | Bulking Stack",
    metaDescription:
      "Build the best supplement stack for muscle gain: an evidence-based bulking stack with protein, creatine, caffeine and optional add-ons, with doses and timing.",
    excerpt:
      "A muscle building stack doesn't need ten products. Here's an evidence-based stack with doses and timing.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "The Core Muscle Building Stack",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Dose", "Timing"],
          rows: [
            ["Creatine monohydrate", "3 - 5 g", "Daily, any time"],
            ["Whey or plant protein", "20 - 40 g per serving", "To reach 1.6 g/kg/day"],
            ["Caffeine (optional)", "3 - 6 mg/kg", "30 - 60 min pre-workout"],
          ],
        },
      },
      {
        heading: "Optional Add-Ons",
        list: [
          "Mass gainer or carb powder if you struggle to eat enough",
          "Citrulline (6 - 8 g malate) for pump and volume",
          "Beta-alanine (3.2 - 6.4 g) for higher-rep training",
          "Vitamin D and omega-3 for general health",
        ],
        paragraphs: [],
      },
      {
        heading: "Sample Daily Bulking Stack",
        list: [
          "Breakfast: creatine in a protein smoothie",
          "Pre-workout: coffee or pre-workout with citrulline",
          "Post-workout: protein shake with a meal",
          "Evening: casein or Greek yogurt if needed to hit protein",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `The best supplement stack for muscle gain is simple: creatine, protein and optional caffeine, with add-ons like citrulline or a mass gainer if they fit your needs. Pair it with progressive training, a calorie surplus and sleep. ${supplementNote}`,
    faqs: [
      {
        q: "What is the best bulking stack?",
        a: "Creatine, protein powder and a calorie surplus, plus caffeine for training.",
      },
      {
        q: "Do I need a pre-workout in my stack?",
        a: "No. Coffee works for most people.",
      },
    ],
    related: [
      "supplements-to-build-muscle",
      "creatine-and-protein-together",
      "best-mass-gainer",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "cutting-stack",
    title: "Best Supplement Stack for Fat Loss (Cutting Stack)",
    seoTitle: "Cutting Stack | Supplement Stack for Weight Loss",
    metaDescription:
      "Build an evidence-based cutting stack: the best supplement stack for fat loss with protein, creatine, caffeine and fiber, with doses and what to avoid.",
    excerpt:
      "A smart cutting stack helps you keep muscle and control hunger. Here's what to include.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Goals of a Cutting Stack",
        list: [
          "Preserve muscle in a calorie deficit",
          "Control hunger",
          "Maintain training performance",
          "Fill nutrient gaps from eating less",
        ],
        paragraphs: [],
      },
      {
        heading: "Evidence-Based Fat Loss Stack",
        paragraphs: [],
        table: {
          headers: ["Supplement", "Dose", "Role"],
          rows: [
            ["Protein powder", "To reach 1.6 - 2.2 g/kg/day", "Fullness and muscle preservation"],
            ["Creatine", "3 - 5 g/day", "Maintain strength"],
            ["Caffeine", "3 - 6 mg/kg pre-workout", "Energy and performance"],
            ["Fiber (psyllium or glucomannan)", "3 - 10 g/day", "Fullness"],
            ["Multivitamin", "Daily", "Cover gaps"],
            ["Electrolytes (optional)", "As needed", "Hydration on low-carb diets"],
          ],
        },
      },
      {
        heading: "What to Avoid",
        list: [
          "Stacking multiple stimulant fat burners",
          "Diuretics and laxatives for quick scale drops",
          "Extreme deficits that cost muscle",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `The best cutting stack is protein, creatine, caffeine and fiber, with a multivitamin to cover gaps. It won't replace a calorie deficit, but it helps you keep muscle, control hunger and train well while you lose fat. ${supplementNote}`,
    faqs: [
      {
        q: "Should I take creatine while cutting?",
        a: "Yes. It helps maintain strength and muscle in a deficit.",
      },
      {
        q: "What's the best supplement for fat loss?",
        a: "Protein powder, because it helps you stay full and keep muscle.",
      },
    ],
    related: [
      "best-fat-burner",
      "protein-powder-for-weight-loss",
      "best-supplements-for-weight-loss",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "creatine-and-protein-together",
    title: "Creatine and Protein Together: Should You Stack Them?",
    seoTitle: "Creatine and Protein Together | Should You Stack Them?",
    metaDescription:
      "Can you take creatine and protein together? How to mix creatine with protein, the benefits of a creatine whey stack and the best timing.",
    excerpt:
      "Creatine and protein are the two most proven muscle supplements. Here's why taking them together is simple and effective.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "5 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Can You Mix Creatine With Protein?",
        paragraphs: [
          "Yes. There's no interaction that reduces the effect of either. Mixing creatine into your protein shake is one of the easiest ways to remember both, and taking creatine with a meal or shake containing protein and carbs may slightly improve uptake.",
        ],
      },
      {
        heading: "Benefits of the Creatine Whey Stack",
        list: [
          "Creatine increases training performance; protein supplies building blocks",
          "Studies combining them show good gains in strength and lean mass",
          "One simple daily habit",
        ],
        paragraphs: [],
      },
      {
        heading: "How to Take Them",
        paragraphs: [],
        table: {
          headers: ["Step", "Detail"],
          rows: [
            ["Dose creatine", "3 - 5 g"],
            ["Dose protein", "20 - 40 g"],
            ["Mix", "Water, milk or smoothie"],
            ["Timing", "Post-workout or any consistent time"],
          ],
        },
        cta: allCta,
      },
    ],
    finalThoughts: `Creatine and protein together make the simplest, most effective muscle-building stack. Add 3 to 5 g of creatine to your daily protein shake and focus on consistency. ${supplementNote}`,
    faqs: [
      {
        q: "Does protein reduce creatine absorption?",
        a: "No. Protein and carbs may slightly improve creatine uptake.",
      },
      {
        q: "Can I mix creatine in a hot drink?",
        a: "Yes, it dissolves well in warm liquids; drink it soon after mixing.",
      },
    ],
    related: [
      "when-to-take-creatine",
      "supplement-stack-for-muscle-gain",
      "best-creatine",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
  {
    slug: "supplement-schedule",
    title: "Supplement Schedule: What to Take Morning, Pre-Workout and Night",
    seoTitle: "Supplement Schedule | When to Take Supplements Chart",
    metaDescription:
      "Build a supplement schedule: when to take supplements in the morning, pre-workout and at night, with a supplement timing chart and absorption tips.",
    excerpt:
      "Timing helps some supplements work better and avoids interactions. Here's a simple daily schedule.",
    category: "Supplement Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-06",
    body: [
      {
        heading: "Supplement Timing Chart",
        paragraphs: [],
        table: {
          headers: ["Time", "Supplements", "Why"],
          rows: [
            [
              "Morning with breakfast",
              "Multivitamin, vitamin D/K2, omega-3",
              "Fat-soluble vitamins absorb best with food",
            ],
            [
              "Morning (empty stomach, if prescribed)",
              "Iron (with vitamin C), probiotics per label",
              "Iron absorbs better away from calcium and coffee",
            ],
            [
              "Pre-workout (30 - 60 min)",
              "Caffeine or pre-workout, citrulline",
              "Peak effect during training",
            ],
            ["Post-workout", "Protein, creatine", "Convenient habit for recovery"],
            ["With meals", "Fish oil, CoQ10, fiber before meals", "Absorption and fullness"],
            [
              "Evening / bedtime",
              "Magnesium, casein, glycine",
              "Relaxation and overnight recovery",
            ],
          ],
        },
      },
      {
        heading: "Timing Tips",
        list: [
          "Separate iron and calcium by a couple of hours",
          "Keep caffeine at least 6 hours before bed",
          "Take fiber supplements away from medications",
          "Consistency matters more than perfect timing for creatine and protein",
          "Use a pill organizer or phone reminders",
        ],
        paragraphs: [],
        cta: allCta,
      },
    ],
    finalThoughts: `A simple supplement schedule pairs vitamins with breakfast, stimulants before training, protein and creatine after, and calming supplements like magnesium at night. Focus on consistency, separate known interactions and check with your doctor or pharmacist about medications. ${supplementNote}`,
    faqs: [
      {
        q: "Can I take all my supplements at once?",
        a: "Many can be taken together, but iron and calcium, and stimulants before bed, are best separated.",
      },
      {
        q: "What supplements should I take at night?",
        a: "Magnesium, casein protein and glycine are common evening choices.",
      },
    ],
    related: [
      "when-to-take-creatine",
      "when-to-take-protein-powder",
      "how-long-does-pre-workout-last",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: allBanner,
  },
];
