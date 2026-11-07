import type { BlogPost } from "@/data/blog";

import supplementsImg from "@/assets/cat-supplements.jpg";

const nutritionNote =
  "This article is general nutrition information, not medical advice. If you have a medical condition, are pregnant or have a history of disordered eating, work with a doctor or registered dietitian.";

const allProducts = {
  category: "supplements",
  heading: "Nutrition Supplements",
  moreLink: { label: "View All Supplements", to: "/supplements" },
};

const proteinProducts = {
  category: "supplements",
  search: ["protein", "whey"],
  heading: "Protein Powders",
  moreLink: { label: "View Protein Powder", to: "/supplements/protein-powder" },
};

const nutritionBanner = {
  heading: "Support Your Nutrition",
  body: "Shop protein, creatine and supplements from trusted brands.",
  buttonLabel: "Shop Supplements",
  to: "/supplements",
};

const proteinCta = {
  label: "Shop Protein Powder",
  to: "/supplements/$type",
  params: { type: "protein-powder" },
};

/** Gym nutrition and diet guides. Merged into `blogPosts` in blog.ts. */
export const gymNutritionPosts: BlogPost[] = [
  {
    slug: "what-to-eat-before-a-workout",
    title: "What to Eat Before a Workout (and When)",
    seoTitle: "What to Eat Before a Workout | Pre Workout Meal & Snack",
    metaDescription:
      "What to eat before a workout: pre-workout meal and snack ideas, timing from 30 minutes to 3 hours before training, and what to avoid.",
    excerpt:
      "The right pre-workout meal gives you energy without weighing you down. Here's what and when to eat.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Timing Guide",
        paragraphs: [],
        table: {
          headers: ["Time Before Training", "What to Eat", "Examples"],
          rows: [
            [
              "2 - 3 hours",
              "Balanced meal: carbs, protein, some fat",
              "Chicken, rice and vegetables; oats with yogurt and fruit",
            ],
            [
              "1 - 2 hours",
              "Lighter meal: carbs and protein, low fat and fiber",
              "Turkey sandwich; Greek yogurt with banana",
            ],
            [
              "30 - 60 minutes",
              "Small, fast-digesting carbs",
              "Banana, rice cakes with honey, a small smoothie",
            ],
          ],
        },
      },
      {
        heading: "Why Carbs and Protein",
        list: [
          "Carbs top up energy stores for harder sessions",
          "Protein supports muscle repair and reduces breakdown",
          "Low fat and fiber close to training prevents stomach upset",
        ],
        paragraphs: [],
      },
      {
        heading: "What to Avoid Right Before Training",
        list: [
          "Large, high-fat meals",
          "Very high-fiber foods",
          "Lots of new or spicy foods",
          "Excess caffeine if you're sensitive",
        ],
        paragraphs: [],
      },
      {
        heading: "Can You Train Fasted?",
        paragraphs: [
          "Yes. Many people train well on an empty stomach, especially for shorter or moderate sessions. For long or intense training, eating beforehand usually improves performance.",
        ],
        cta: { label: "Shop Supplements", to: "/supplements" },
      },
    ],
    finalThoughts: `What to eat before a workout depends on timing: a balanced meal 2 to 3 hours before, a lighter carb-and-protein meal 1 to 2 hours before, or a quick carb snack within an hour. Experiment and find what works for your stomach and schedule. ${nutritionNote}`,
    faqs: [
      {
        q: "Is a banana a good pre-workout snack?",
        a: "Yes; it's easy to digest and provides quick carbs.",
      },
    ],
    related: [
      "what-to-eat-after-a-workout",
      "best-pre-workout",
      "how-to-calculate-macros",
      "supplements",
    ],
    products: allProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "what-to-eat-after-a-workout",
    title: "What to Eat After a Workout to Build Muscle",
    seoTitle: "What to Eat After a Workout | Post Workout Meal Ideas",
    metaDescription:
      "What to eat after a workout to build muscle: post-workout meal and snack ideas, how much protein and carbs, and how soon to eat.",
    excerpt:
      "Your post-workout meal supports recovery and growth. Here's what to eat and how soon.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "What Your Post-Workout Meal Needs",
        list: [
          "Protein: about 20 to 40 g to support muscle repair",
          "Carbs: to replenish glycogen, especially after long or intense sessions",
          "Fluids and electrolytes if you sweated a lot",
        ],
        paragraphs: [],
      },
      {
        heading: "Post-Workout Meal and Snack Ideas",
        paragraphs: [],
        table: {
          headers: ["Option", "Approx. Protein"],
          rows: [
            ["Protein shake and a banana", "25 g"],
            ["Chicken, rice and vegetables", "35 - 45 g"],
            ["Greek yogurt with granola and fruit", "25 g"],
            ["Eggs on toast with avocado", "20 - 25 g"],
            ["Salmon, potatoes and greens", "35 g"],
            ["Chocolate milk", "8 - 16 g"],
          ],
        },
      },
      {
        heading: "How Soon Should You Eat?",
        paragraphs: [
          "The window is wider than once thought. Eating within a couple of hours is a good guideline, especially if you trained fasted. Total daily protein matters most.",
        ],
        cta: proteinCta,
      },
    ],
    finalThoughts: `After a workout, aim for 20 to 40 g of protein with some carbs within a couple of hours. A shake works on the go; a balanced meal is even better. ${nutritionNote}`,
    faqs: [
      {
        q: "Is a protein shake enough after a workout?",
        a: "It covers protein; add carbs and a meal later.",
      },
    ],
    related: [
      "what-to-eat-before-a-workout",
      "when-to-take-protein-powder",
      "foods-for-muscle-growth",
      "supplements",
    ],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "how-to-calculate-macros",
    title: "How to Calculate Macros for Your Goal",
    seoTitle: "How to Calculate Macros | Macro Calculator Guide",
    metaDescription:
      "How to calculate macros step by step: estimate calories, set protein, fat and carbs for weight loss, maintenance or muscle gain, with a worked example.",
    excerpt:
      "Calculating macros is simpler than it looks. Here's the step-by-step method with an example.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "8 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Step 1: Estimate Your Calories",
        paragraphs: [
          "Estimate your basal metabolic rate with the Mifflin-St Jeor equation, then multiply by an activity factor to get maintenance calories.",
        ],
        table: {
          headers: ["Formula / Factor", "Value"],
          rows: [
            ["Men BMR", "10 x kg + 6.25 x cm - 5 x age + 5"],
            ["Women BMR", "10 x kg + 6.25 x cm - 5 x age - 161"],
            ["Sedentary", "x 1.2"],
            ["Lightly active", "x 1.375"],
            ["Moderately active", "x 1.55"],
            ["Very active", "x 1.725"],
          ],
        },
      },
      {
        heading: "Step 2: Adjust for Your Goal",
        list: [
          "Fat loss: subtract about 300 to 500 calories",
          "Maintenance: keep the same",
          "Muscle gain: add about 200 to 400 calories",
        ],
        paragraphs: [],
      },
      {
        heading: "Step 3: Set Macros",
        paragraphs: [],
        table: {
          headers: ["Macro", "Target", "Calories per Gram"],
          rows: [
            ["Protein", "1.6 - 2.2 g/kg", "4"],
            ["Fat", "About 20 - 35% of calories (at least ~0.6 g/kg)", "9"],
            ["Carbs", "Remaining calories", "4"],
          ],
        },
      },
      {
        heading: "Worked Example",
        paragraphs: [
          "An 80 kg moderately active man with maintenance of 2,700 calories who wants to lose fat: 2,200 calories. Protein 160 g (640 kcal). Fat 70 g (630 kcal). Carbs fill the remaining 930 kcal, about 230 g.",
        ],
        cta: { label: "Shop Supplements", to: "/supplements" },
      },
    ],
    finalThoughts: `To calculate macros, estimate maintenance calories, adjust for your goal, set protein first, then fat, then fill the rest with carbs. Treat the numbers as a starting point and adjust based on two to three weeks of results. ${nutritionNote}`,
    faqs: [
      {
        q: "Are macro calculators accurate?",
        a: "They're estimates; adjust based on real-world progress.",
      },
    ],
    related: ["macros-for-cutting", "calorie-deficit", "bodybuilding-diet", "supplements"],
    products: allProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "macros-for-cutting",
    title: "Macros for Cutting: How to Lose Fat and Keep Muscle",
    seoTitle: "Macros for Cutting | Cut Without Losing Muscle",
    metaDescription:
      "Macros for cutting: protein, fat and carb targets for a cutting diet, how fast to lose weight and how to cut without losing muscle.",
    excerpt:
      "A good cut keeps your muscle while the fat comes off. Here are the macro targets that make it work.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Cutting Macro Targets",
        paragraphs: [],
        table: {
          headers: ["Macro", "Target While Cutting"],
          rows: [
            ["Calories", "About 300 - 500 below maintenance"],
            ["Protein", "1.8 - 2.4 g/kg; higher end for leaner lifters"],
            ["Fat", "About 0.6 - 1.0 g/kg"],
            ["Carbs", "Remaining calories, prioritized around training"],
          ],
        },
      },
      {
        heading: "How Fast Should You Cut?",
        paragraphs: [
          "Aim to lose about 0.5 to 1 percent of bodyweight per week. Faster losses increase the risk of muscle loss, low energy and rebound weight gain.",
        ],
      },
      {
        heading: "How to Cut Without Losing Muscle",
        list: [
          "Keep lifting heavy; maintain intensity",
          "Eat high protein every day",
          "Keep a moderate deficit",
          "Sleep 7 to 9 hours",
          "Use creatine to support strength",
          "Add steps and cardio rather than slashing food",
        ],
        paragraphs: [],
        cta: proteinCta,
      },
    ],
    finalThoughts: `Good macros for cutting combine a moderate calorie deficit, high protein, adequate fat and carbs around training. Lose 0.5 to 1 percent of bodyweight per week and keep lifting heavy to keep your muscle. ${nutritionNote}`,
    faqs: [
      {
        q: "Should I cut carbs completely?",
        a: "No; carbs fuel training. Reduce them moderately if needed.",
      },
    ],
    related: ["how-to-calculate-macros", "cutting-stack", "reverse-dieting", "supplements"],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "calorie-deficit",
    title: "Calorie Deficit Explained: How Much to Eat to Lose Weight",
    seoTitle: "Calorie Deficit Explained | How Big a Deficit to Lose Weight",
    metaDescription:
      "Calorie deficit explained: how big of a calorie deficit you need to lose weight, how to calculate it and how to stay in a deficit without feeling starved.",
    excerpt:
      "Every weight loss plan works through a calorie deficit. Here's how to set one that's sustainable.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "What Is a Calorie Deficit?",
        paragraphs: [
          "A calorie deficit means eating fewer calories than your body burns. Your body then uses stored energy, mostly fat, to make up the difference.",
        ],
      },
      {
        heading: "How Big of a Calorie Deficit?",
        paragraphs: [],
        table: {
          headers: ["Deficit", "Approx. Weekly Loss", "Notes"],
          rows: [
            ["250 kcal/day", "About 0.25 - 0.5 lb", "Easy to sustain"],
            ["500 kcal/day", "About 0.5 - 1 lb", "Common recommendation"],
            ["750 kcal/day", "About 1 - 1.5 lb", "Harder; more muscle risk"],
            [
              "1,000+ kcal/day",
              "1.5 - 2+ lb",
              "Usually only for higher bodyweights, with guidance",
            ],
          ],
        },
      },
      {
        heading: "How to Calculate Your Deficit",
        list: [
          "Estimate maintenance with a calculator or two weeks of tracking",
          "Subtract 300 to 500 calories",
          "Track your weekly average weight",
          "Adjust by 100 to 200 calories if progress stalls for 2 to 3 weeks",
        ],
        paragraphs: [],
      },
      {
        heading: "Staying in a Deficit Without Starving",
        list: [
          "High protein at every meal",
          "Lots of vegetables and fruit for volume",
          "Limit liquid calories",
          "Get enough sleep",
          "Increase daily steps",
        ],
        paragraphs: [],
        cta: proteinCta,
      },
    ],
    finalThoughts: `A calorie deficit of about 300 to 500 calories a day is a sustainable way to lose weight for most people. Combine it with high protein, strength training and daily movement, and adjust based on your weekly trend. ${nutritionNote}`,
    faqs: [
      {
        q: "Why am I not losing weight in a calorie deficit?",
        a: "Often calories are underestimated or water retention is masking fat loss; track carefully for several weeks.",
      },
    ],
    related: [
      "how-to-calculate-macros",
      "macros-for-cutting",
      "walking-for-weight-loss",
      "supplements",
    ],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "intermittent-fasting-and-muscle",
    title: "Intermittent Fasting and Muscle Building",
    seoTitle: "Intermittent Fasting and Muscle | 16:8 & Lifting",
    metaDescription:
      "Can you build muscle with intermittent fasting? Research on fasting and lifting, 16:8 fasting for muscle, protein timing and practical tips.",
    excerpt:
      "Intermittent fasting can work for lifters, with a few adjustments. Here's what research shows.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "What Research Shows",
        paragraphs: [
          "Studies comparing intermittent fasting with regular eating show similar fat loss when calories are equal. For muscle building, results are mixed: some studies show slightly smaller gains with very short eating windows, possibly because it's harder to eat enough protein and calories.",
        ],
      },
      {
        heading: "16:8 Fasting for Lifters",
        list: [
          "Fit 3 protein-rich meals of 30 to 50 g into your eating window",
          "Schedule training near or within your eating window",
          "Break the fast with a protein-rich meal",
          "Use a protein shake if you struggle to hit your target",
        ],
        paragraphs: [],
      },
      {
        heading: "Who It Suits",
        paragraphs: [],
        table: {
          headers: ["Good Fit", "Less Ideal"],
          rows: [
            ["People cutting who like fewer meals", "Hardgainers trying to bulk"],
            ["Busy schedules", "Athletes training twice a day"],
            ["People who aren't hungry in the morning", "People prone to binge eating"],
          ],
        },
        cta: proteinCta,
      },
    ],
    finalThoughts: `Intermittent fasting and muscle building can coexist if you hit your protein and calorie targets within your eating window and train near your meals. If bulking is your priority, more frequent meals may be easier. ${nutritionNote}`,
    faqs: [
      {
        q: "Does fasting cause muscle loss?",
        a: "Not if total protein and calories are adequate and you keep lifting.",
      },
    ],
    related: [
      "calorie-deficit",
      "how-much-protein-to-build-muscle",
      "what-to-eat-before-a-workout",
      "supplements",
    ],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "carb-cycling",
    title: "Carb Cycling for Fat Loss: Beginner Guide",
    seoTitle: "Carb Cycling | Beginner Guide & Meal Plan",
    metaDescription:
      "Carb cycling for fat loss: how high carb and low carb days work, a beginner carb cycling meal plan, who it's for and what research says.",
    excerpt: "Carb cycling matches your carbs to your training. Here's how to start.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "How Carb Cycling Works",
        paragraphs: [
          "Carb cycling alternates higher-carb days on hard training days with lower-carb days on rest or easy days. Protein stays high every day. Weekly calories still determine fat loss.",
        ],
      },
      {
        heading: "Sample Week",
        paragraphs: [],
        table: {
          headers: ["Day", "Training", "Carbs"],
          rows: [
            ["Mon", "Lower body", "High (about 2.5 - 3 g/kg)"],
            ["Tue", "Upper body", "Moderate (about 1.5 - 2 g/kg)"],
            ["Wed", "Rest", "Low (about 0.75 - 1 g/kg)"],
            ["Thu", "Lower body", "High"],
            ["Fri", "Upper body", "Moderate"],
            ["Sat", "Cardio", "Moderate"],
            ["Sun", "Rest", "Low"],
          ],
        },
      },
      {
        heading: "Does It Work Better?",
        paragraphs: [
          "Research doesn't show carb cycling causes more fat loss than a regular deficit with equal calories. Some people like it because it aligns energy with training and adds flexibility.",
        ],
        cta: proteinCta,
      },
    ],
    finalThoughts: `Carb cycling can be a useful structure for fat loss, putting carbs where you need them most. It works because of total calories, not magic, so choose it if it suits your preferences. ${nutritionNote}`,
    faqs: [
      {
        q: "Is carb cycling good for beginners?",
        a: "It can be, but a simple calorie deficit is easier to start with.",
      },
    ],
    related: ["macros-for-cutting", "calorie-deficit", "cheat-meal-vs-refeed", "supplements"],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "high-protein-meal-prep",
    title: "High Protein Meal Prep for the Week",
    seoTitle: "High Protein Meal Prep | Meal Prep for Muscle Gain",
    metaDescription:
      "High protein meal prep for the week: a simple bodybuilding meal prep plan, shopping list, prep steps and storage tips for muscle gain.",
    excerpt: "Two hours of prep can set up a week of high-protein meals. Here's the plan.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Weekly Shopping List",
        list: [
          "Proteins: chicken breast or thighs, lean ground beef or turkey, salmon, eggs, Greek yogurt",
          "Carbs: rice, potatoes, oats, whole-grain wraps",
          "Vegetables: broccoli, peppers, spinach, green beans",
          "Extras: olive oil, sauces, spices, fruit",
        ],
        paragraphs: [],
      },
      {
        heading: "Prep Plan (About 2 Hours)",
        list: [
          "Bake 2 trays of seasoned chicken",
          "Brown lean ground beef or turkey with spices",
          "Cook a large batch of rice and roast potatoes",
          "Roast or steam vegetables",
          "Hard-boil a dozen eggs",
          "Portion into containers",
        ],
        paragraphs: [],
      },
      {
        heading: "Sample Meal Container",
        paragraphs: [],
        table: {
          headers: ["Component", "Amount", "Protein"],
          rows: [
            ["Chicken", "6 oz cooked", "45 g"],
            ["Rice", "1 cup cooked", "4 g"],
            ["Broccoli", "1 cup", "3 g"],
            ["Total", "About 500 kcal", "About 52 g"],
          ],
        },
      },
      {
        heading: "Storage Tips",
        paragraphs: [
          "Most cooked meals keep 3 to 4 days in the fridge. Freeze extra portions for later in the week.",
        ],
        cta: proteinCta,
      },
    ],
    finalThoughts: `High protein meal prep turns one session into a week of easy, muscle-building meals. Rotate proteins, sauces and vegetables to avoid boredom, and freeze extras. ${nutritionNote}`,
    faqs: [
      {
        q: "How long does meal prep last?",
        a: "About 3 to 4 days refrigerated.",
      },
    ],
    related: [
      "cheap-high-protein-foods",
      "foods-for-muscle-growth",
      "bodybuilding-diet",
      "supplements",
    ],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "foods-for-muscle-growth",
    title: "Best Foods for Muscle Growth",
    seoTitle: "Foods for Muscle Growth | Muscle Building Foods List",
    metaDescription:
      "The best foods for muscle growth: a high protein foods list, carbs and fats for muscle building, and how to build meals for gains.",
    excerpt: "Muscle is built from protein, energy and recovery. Here are the foods that deliver.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "7 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "High Protein Foods List",
        paragraphs: [],
        table: {
          headers: ["Food", "Approx. Protein"],
          rows: [
            ["Chicken breast (100 g cooked)", "31 g"],
            ["Lean beef (100 g cooked)", "26 g"],
            ["Salmon (100 g cooked)", "25 g"],
            ["Eggs (2 large)", "12 g"],
            ["Greek yogurt (200 g)", "18 - 20 g"],
            ["Cottage cheese (1 cup)", "25 g"],
            ["Tofu (150 g)", "15 - 20 g"],
            ["Lentils (1 cup cooked)", "18 g"],
            ["Milk (1 cup)", "8 g"],
          ],
        },
      },
      {
        heading: "Carbs and Fats for Muscle",
        list: [
          "Carbs: rice, oats, potatoes, pasta, fruit and whole grains for training energy",
          "Fats: olive oil, nuts, avocado and fatty fish for hormones and calories",
          "Vegetables: for micronutrients and fiber",
        ],
        paragraphs: [],
      },
      {
        heading: "Build a Muscle-Building Plate",
        paragraphs: [
          "Fill a quarter of your plate with protein, a quarter to a half with carbs (more on training days), and the rest with vegetables, plus a thumb of healthy fat.",
        ],
        cta: proteinCta,
      },
    ],
    finalThoughts: `The best foods for muscle growth are protein-rich staples like chicken, beef, fish, eggs and dairy, plus carbs for training and fats for calories. Build every meal around protein and eat enough total calories to grow. ${nutritionNote}`,
    faqs: [
      {
        q: "What is the best food for building muscle?",
        a: "There's no single food; prioritize protein-rich foods at every meal.",
      },
    ],
    related: [
      "cheap-high-protein-foods",
      "bodybuilding-diet",
      "how-much-protein-to-build-muscle",
      "supplements",
    ],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "how-much-water-to-drink-when-working-out",
    title: "Hydration for Athletes: How Much Water Do You Need?",
    seoTitle: "How Much Water Should I Drink When Working Out?",
    metaDescription:
      "How much water should you drink when working out? Hydration for athletes before, during and after exercise, daily water intake and signs of dehydration.",
    excerpt:
      "Hydration affects strength, endurance and focus. Here's how much water to drink around training.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Daily Water Intake",
        paragraphs: [
          "General guidelines suggest total daily water intake (including food) of roughly 2.7 liters for women and 3.7 liters for men, with more needed for heat and heavy training. Pale yellow urine is a simple sign you're well hydrated.",
        ],
      },
      {
        heading: "Hydration Around Workouts",
        paragraphs: [],
        table: {
          headers: ["Timing", "Guideline"],
          rows: [
            ["2 - 4 hours before", "About 5 - 7 ml/kg (roughly 1.5 - 2 cups for many adults)"],
            [
              "During exercise",
              "Sip regularly; about 0.4 - 0.8 L per hour for longer sessions, adjusted for sweat",
            ],
            ["After exercise", "About 1.25 - 1.5 L per kg of bodyweight lost"],
          ],
        },
      },
      {
        heading: "Signs of Dehydration",
        list: [
          "Dark urine",
          "Thirst, headache, dizziness",
          "Fatigue and reduced performance",
          "Muscle cramps",
        ],
        paragraphs: [],
      },
      {
        heading: "When to Add Electrolytes",
        paragraphs: [
          "For sessions longer than about an hour, hot conditions or heavy sweaters, add sodium-containing electrolytes. Drinking excessive plain water during long events can lead to dangerously low blood sodium.",
        ],
        cta: {
          label: "Shop Electrolytes & Aminos",
          to: "/supplements/$type",
          params: { type: "creatine-amino-acids" },
        },
      },
    ],
    finalThoughts: `How much water you should drink when working out depends on your size, sweat rate and conditions. Start hydrated, sip during training, replace losses afterward and add electrolytes for long or hot sessions. ${nutritionNote}`,
    faqs: [
      {
        q: "Can you drink too much water?",
        a: "Yes, very large amounts during long events can cause hyponatremia.",
      },
    ],
    related: [
      "best-electrolyte-powder",
      "muscle-cramps-during-workout",
      "intra-workout-supplement",
      "supplements",
    ],
    products: {
      category: "supplements",
      search: ["electrolyte", "hydration", "amino"],
      heading: "Hydration Supplements",
      moreLink: { label: "View Creatine & Aminos", to: "/supplements/creatine-amino-acids" },
    },
    ctaBanner: nutritionBanner,
  },
  {
    slug: "reverse-dieting",
    title: "Reverse Dieting After a Cut",
    seoTitle: "Reverse Dieting | Reverse Diet Plan After a Cut",
    metaDescription:
      "Reverse dieting explained: how to increase calories after a cut, a reverse diet plan, what happens to metabolism after dieting and whether it works.",
    excerpt:
      "Coming off a diet? Reverse dieting helps you increase calories without rapid fat regain. Here's how.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "What Is Reverse Dieting?",
        paragraphs: [
          "Reverse dieting means gradually increasing calories after a period of dieting rather than jumping straight back to old habits. It helps manage hunger, limit rapid fat regain and transition to maintenance.",
        ],
      },
      {
        heading: "Metabolism After Dieting",
        paragraphs: [
          "Metabolic rate drops during a diet, partly because you're smaller and partly due to adaptations like less spontaneous movement. Much of this reverses as calories and bodyweight return toward maintenance.",
        ],
      },
      {
        heading: "Reverse Diet Plan",
        list: [
          "Week 1: add about 100 to 200 calories, mostly carbs",
          "Each following week: add another 100 to 150 calories",
          "Keep protein high and training consistent",
          "Expect a small initial scale increase from water and glycogen",
          "Stop increasing once you reach estimated maintenance",
        ],
        paragraphs: [],
        cta: proteinCta,
      },
    ],
    finalThoughts: `Reverse dieting is a structured way to return to maintenance after a cut. Increase calories gradually, keep protein high and training consistent, and expect small, mostly water-related scale changes. ${nutritionNote}`,
    faqs: [
      {
        q: "Does reverse dieting boost metabolism?",
        a: "It helps metabolism recover as you eat more, but it doesn't create a 'faster' metabolism beyond normal.",
      },
    ],
    related: ["macros-for-cutting", "calorie-deficit", "cheat-meal-vs-refeed", "supplements"],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "bodybuilding-diet",
    title: "Bodybuilding Diet for Beginners",
    seoTitle: "Bodybuilding Diet for Beginners | Meal Plan & Nutrition",
    metaDescription:
      "A bodybuilding diet for beginners: calories, macros, a bodybuilding meal plan, food choices and supplements for beginner bodybuilding nutrition.",
    excerpt:
      "Bodybuilding nutrition isn't complicated. Here's a beginner-friendly diet and sample meal plan.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "8 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "The Basics",
        list: [
          "Calories: slight surplus to build, slight deficit to cut",
          "Protein: 1.6 to 2.2 g/kg daily",
          "Carbs: fuel training, adjusted to goals",
          "Fats: 20 to 35 percent of calories",
          "4 to 5 meals with 30 to 50 g protein each",
        ],
        paragraphs: [],
      },
      {
        heading: "Sample Bodybuilding Meal Plan (About 2,800 kcal)",
        paragraphs: [],
        table: {
          headers: ["Meal", "Food", "Approx. Protein"],
          rows: [
            ["Breakfast", "Oats, whey, berries, peanut butter", "40 g"],
            ["Lunch", "Chicken, rice, vegetables, olive oil", "45 g"],
            ["Pre-workout", "Greek yogurt, banana, granola", "25 g"],
            ["Post-workout dinner", "Lean beef, potatoes, salad", "45 g"],
            ["Evening", "Cottage cheese or casein shake", "30 g"],
          ],
        },
      },
      {
        heading: "Helpful Supplements",
        list: [
          "Protein powder for convenience",
          "Creatine monohydrate",
          "Vitamin D if low",
          "Omega-3 if you don't eat fish",
        ],
        paragraphs: [],
        cta: proteinCta,
      },
    ],
    finalThoughts: `A bodybuilding diet for beginners is built on consistent calories, high protein, carbs around training and mostly whole foods. Follow the sample plan, adjust portions to your goal and track progress every few weeks. ${nutritionNote}`,
    faqs: [
      {
        q: "How many meals a day for bodybuilding?",
        a: "Four to five is common, but total intake matters most.",
      },
    ],
    related: [
      "foods-for-muscle-growth",
      "how-to-calculate-macros",
      "high-protein-meal-prep",
      "supplements",
    ],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "cheat-meal-vs-refeed",
    title: "Cheat Meals vs Refeed Days",
    seoTitle: "Cheat Meal vs Refeed | Refeed Days & Cheat Days",
    metaDescription:
      "Cheat meal vs refeed day: the differences, whether refeeds help fat loss, how to do a refeed day and how cheat days affect weight loss.",
    excerpt:
      "Cheat meals are unstructured; refeeds are planned. Here's how they differ and when each makes sense.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Comparison",
        paragraphs: [],
        table: {
          headers: ["Factor", "Cheat Meal / Day", "Refeed Day"],
          rows: [
            ["Structure", "Eat freely", "Planned increase, mostly carbs"],
            ["Calories", "Often far above maintenance", "Around maintenance"],
            [
              "Purpose",
              "Psychological break",
              "Restore glycogen, training energy and diet adherence",
            ],
            ["Risk", "Can erase a week's deficit", "Minimal if planned"],
          ],
        },
      },
      {
        heading: "How to Do a Refeed Day",
        list: [
          "Raise calories to about maintenance",
          "Add mostly carbs; keep fat moderate",
          "Keep protein the same",
          "Schedule it on a hard training day",
          "Use it every 1 to 2 weeks during longer diets",
        ],
        paragraphs: [],
      },
      {
        heading: "Cheat Days and Weight Loss",
        paragraphs: [
          "A single large cheat day can add thousands of calories and cancel much of a week's deficit. A planned cheat meal is less disruptive.",
        ],
        cta: { label: "Shop Supplements", to: "/supplements" },
      },
    ],
    finalThoughts: `Cheat meals offer a mental break but can undo progress; refeed days are a structured way to boost energy and adherence during longer diets. Plan refeeds around training and keep protein steady. ${nutritionNote}`,
    faqs: [
      {
        q: "Do refeed days boost metabolism?",
        a: "Any effect is small; the main benefits are training energy and adherence.",
      },
    ],
    related: ["carb-cycling", "reverse-dieting", "calorie-deficit", "supplements"],
    products: allProducts,
    ctaBanner: nutritionBanner,
  },
  {
    slug: "cheap-high-protein-foods",
    title: "Budget Muscle-Building Grocery List",
    seoTitle: "Cheap High Protein Foods | Budget Bodybuilding Diet",
    metaDescription:
      "Cheap high protein foods for a budget bodybuilding diet: a grocery list of cheap protein sources, cost per gram of protein and money-saving tips.",
    excerpt:
      "You don't need a big budget to build muscle. Here are the cheapest high-protein foods.",
    category: "Nutrition Guides",
    heroImage: supplementsImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Cheap Protein Sources",
        paragraphs: [],
        table: {
          headers: ["Food", "Why It's Budget Friendly"],
          rows: [
            ["Eggs", "Low cost per gram, versatile"],
            ["Dried lentils and beans", "Very cheap; protein plus fiber"],
            ["Canned tuna or sardines", "Shelf-stable, high protein"],
            ["Whole chicken or chicken thighs", "Cheaper than breasts"],
            ["Milk", "Cheap protein and calories"],
            ["Cottage cheese and plain Greek yogurt (store brand)", "High protein per dollar"],
            ["Whey protein (bulk)", "Often one of the cheapest per gram"],
            ["Peanut butter", "Calories and some protein"],
            ["Tofu", "Affordable plant protein"],
          ],
        },
      },
      {
        heading: "Money-Saving Tips",
        list: [
          "Buy in bulk and freeze meat",
          "Choose store brands",
          "Cook in batches",
          "Compare cost per gram of protein, not price per package",
        ],
        paragraphs: [],
        cta: proteinCta,
      },
    ],
    finalThoughts: `Cheap high protein foods like eggs, beans, lentils, canned fish, chicken thighs, milk and bulk whey make a budget bodybuilding diet easy. Compare cost per gram of protein and cook in batches. ${nutritionNote}`,
    faqs: [
      {
        q: "What is the cheapest protein source?",
        a: "Dried legumes, eggs and bulk whey are usually among the cheapest per gram.",
      },
    ],
    related: [
      "foods-for-muscle-growth",
      "high-protein-meal-prep",
      "generic-vs-brand-name-supplements",
      "supplements",
    ],
    products: proteinProducts,
    ctaBanner: nutritionBanner,
  },
];
