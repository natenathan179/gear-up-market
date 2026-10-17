import type { BlogPost } from "@/data/blog";

import cardioImg from "@/assets/cat-cardio.jpg";
import commercialImg from "@/assets/cat-commercial.jpg";
import homeImg from "@/assets/cat-home.jpg";
import heroImg from "@/assets/hero-gym.webp";

/** Arc Trainer (Cybex / Life Fitness) and Life Fitness elliptical cluster. Merged into `blogPosts` in blog.ts. */
export const arcPosts: BlogPost[] = [
  {
    slug: "what-is-an-arc-trainer",
    title: "What Is an Arc Trainer? How the Arc Machine Works and What It Does",
    seoTitle: "What Is an Arc Trainer? | How the Arc Machine Works",
    metaDescription:
      "What is an Arc Trainer and what does it do? Learn how the Cybex Arc Trainer's arc-shaped motion works, which muscles it targets, and how it differs from an elliptical.",
    excerpt:
      "It looks like an elliptical, but it moves differently. Here's what the Arc Trainer is, how its arc-shaped motion works and why so many gyms keep a row of them.",
    category: "Equipment Reviews",
    heroImage: cardioImg,
    readTime: "8 min read",
    publishedAt: "2026-10-17",
    body: [
      {
        heading: "The Arc Trainer in One Sentence",
        paragraphs: [
          "The Arc Trainer is a low-impact cardio machine, originally developed by Cybex, that moves your feet along an arc-shaped path instead of the oval path of a traditional elliptical. That arc keeps the knees from travelling as far forward over the toes, and it lets you shift the emphasis between striding, elliptical-style motion and climbing simply by changing the incline.",
          'In most gyms you\'ll hear it called the arc machine, the arc trainer or simply "the Arc". It sits in the same cardio row as treadmills, ellipticals and bikes, and it has a loyal following among people who find ellipticals hard on their knees or treadmills hard on their joints.',
        ],
      },
      {
        heading: "Who Makes the Arc Trainer?",
        paragraphs: [
          "The Arc Trainer is a Cybex product, and Cybex built its commercial cardio reputation on it. Cybex is now part of the Life Fitness family of brands, which is why you'll also see Arc Trainers sold under the Life Fitness name — the home Life Fitness Club Series+ Total Body Arc Trainer is one example. Whether the badge says Cybex or Life Fitness, the defining feature is the same arc-shaped motion.",
        ],
        cta: { label: "Shop Cybex Equipment", to: "/brands/$slug", params: { slug: "cybex" } },
      },
      {
        heading: "How the Arc Motion Works",
        paragraphs: [
          "On an elliptical, your feet trace an oval and your knees tend to travel forward as you push. On an Arc Trainer, the pedals travel along a flatter, curved arc, and the geometry is designed to keep your knees more in line with your feet. Cybex has long promoted the motion as producing lower knee stress than a typical elliptical.",
          "The result feels like a cross between striding, skiing and stair climbing — smooth and low-impact, but with more of a push through the hips and glutes than many ellipticals.",
        ],
      },
      {
        heading: "Incline: Three Machines in One",
        paragraphs: [
          "Most commercial Arc Trainers let you adjust the incline (sometimes called the stride or arc position). That single setting changes the character of the workout dramatically.",
        ],
        table: {
          headers: ["Incline Setting", "Feels Like", "Main Emphasis"],
          rows: [
            ["Low", "Striding or cross-country skiing", "Hip flexors, quads, longer stride"],
            ["Middle", "A traditional elliptical", "Balanced lower-body cardio"],
            ["High", "Climbing stairs or a steep hill", "Glutes, hamstrings, higher intensity"],
          ],
        },
      },
      {
        heading: "Total Body vs. Lower Body Arc Trainers",
        paragraphs: [
          "Arc Trainers come in two main configurations. A total body Arc Trainer has moving arm handles that you push and pull, bringing the chest, back, shoulders and arms into the workout. A lower body Arc Trainer has fixed handles only, so the work is concentrated in the legs and glutes. Total body models are more common in gyms; lower body models suit users who want to focus on the legs or keep their upper body still.",
        ],
        cta: {
          label: "Read: Cybex Arc Trainer Models Explained",
          to: "/blog/$slug",
          params: { slug: "cybex-arc-trainer-models" },
        },
      },
      {
        heading: "What Does an Arc Trainer Do for You?",
        paragraphs: [
          "The Arc Trainer offers most of the benefits of an elliptical, with a few of its own.",
        ],
        list: [
          "Low-impact cardio — your feet never leave the pedals, so there's no pounding",
          "Knee-friendly motion — designed to reduce forward knee travel",
          "Strong glute and leg work — especially at higher incline settings",
          "Full-body option — total body models engage the upper body too",
          "High calorie burn — resistance and incline let you push hard without impact",
          "Easy for beginners — the motion is natural and simple to learn",
        ],
        cta: {
          label: "Read: Arc Trainer Workouts for Weight Loss",
          to: "/blog/$slug",
          params: { slug: "arc-trainer-workout-weight-loss" },
        },
      },
      {
        heading: "Arc Trainer vs. Elliptical at a Glance",
        paragraphs: [
          "The two machines are close cousins. An elliptical uses an oval path and usually a fixed incline; an Arc Trainer uses an arc path with adjustable incline. Many people find the Arc Trainer gentler on the knees and more demanding on the glutes, while the elliptical feels more familiar and is far more widely available for home use.",
        ],
        cta: {
          label: "Read: Arc Trainer vs. Elliptical",
          to: "/blog/$slug",
          params: { slug: "arc-trainer-vs-elliptical" },
        },
      },
    ],
    finalThoughts:
      "The Arc Trainer is a low-impact cardio machine with an arc-shaped motion that's designed to be easier on the knees than an elliptical, plus an adjustable incline that turns it into a strider, an elliptical or a climber. Developed by Cybex and now part of the Life Fitness family, it's a staple of commercial gyms — and a strong option for anyone who wants a hard, joint-friendly cardio workout.",
    faqs: [
      {
        q: "What is an Arc Trainer?",
        a: "A low-impact cardio machine, originally developed by Cybex, that moves your feet along an arc-shaped path rather than the oval path of an elliptical.",
      },
      {
        q: "What does an Arc Trainer work?",
        a: "Mainly the glutes, quads, hamstrings and calves. Total body models with moving arms also work the chest, back, shoulders and arms.",
      },
      {
        q: "Is the Arc Trainer made by Cybex or Life Fitness?",
        a: "The Arc Trainer was developed by Cybex. Cybex is part of the Life Fitness family, so Arc Trainers are also sold under the Life Fitness name.",
      },
      {
        q: "Is the Arc Trainer good for bad knees?",
        a: "Many people with sensitive knees find it comfortable, because the motion is low-impact and designed to reduce forward knee travel. Check with a medical professional if you have an injury.",
      },
      {
        q: "What's the difference between a total body and lower body Arc Trainer?",
        a: "Total body models have moving arm handles for upper-body work. Lower body models have fixed handles and focus on the legs.",
      },
      {
        q: "Is an Arc Trainer the same as an elliptical?",
        a: "No. Both are low-impact, but the Arc Trainer uses an arc-shaped path with adjustable incline, while an elliptical uses an oval path.",
      },
    ],
    related: [
      "arc-trainer-vs-elliptical",
      "cybex-arc-trainer-models",
      "elliptical-machine-alternatives",
      "cybex",
      "cardio-equipment",
    ],
    products: {
      category: "cardio-equipment",
      search: ["arc trainer", "elliptical"],
      heading: "Arc Trainers & Ellipticals for Sale",
      moreLink: { label: "View All Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Looking for an Arc Trainer?",
      body: "Browse Arc Trainers, ellipticals and commercial cardio from verified sellers.",
      buttonLabel: "Shop Cardio",
      to: "/cardio-equipment",
    },
  },
  {
    slug: "arc-trainer-vs-elliptical",
    title: "Arc Trainer vs. Elliptical: Key Differences, Benefits and Which One to Choose",
    seoTitle: "Arc Trainer vs Elliptical | Differences & Which Is Better",
    metaDescription:
      "Arc Trainer vs. elliptical: compare motion, knee stress, muscles worked, calorie burn and cost. Plus how cross trainers and adaptive motion trainers fit in.",
    excerpt:
      "They look alike, but the Arc Trainer and the elliptical move differently. Here's the real difference — and how cross trainers and AMTs compare too.",
    category: "Equipment Reviews",
    heroImage: cardioImg,
    readTime: "9 min read",
    publishedAt: "2026-10-17",
    body: [
      {
        heading: "The Short Answer",
        paragraphs: [
          "An elliptical moves your feet in an oval and usually has a fixed or limited incline. An Arc Trainer moves your feet along a flatter arc and lets you change the incline to shift between striding, elliptical-style and climbing motions. The Arc Trainer is designed to put less forward stress on the knees and tends to work the glutes harder; the elliptical is more familiar, more widely available and usually cheaper.",
        ],
      },
      {
        heading: "Side-by-Side Comparison",
        paragraphs: [],
        table: {
          headers: ["Feature", "Arc Trainer", "Elliptical"],
          rows: [
            ["Foot path", "Arc-shaped", "Oval"],
            ["Impact", "Low", "Low"],
            [
              "Knee travel",
              "Designed to minimize forward knee travel",
              "Knees can travel further forward",
            ],
            [
              "Incline",
              "Adjustable on most commercial models",
              "Often fixed; some models adjust ramp or stride",
            ],
            ["Main muscle emphasis", "Glutes, quads, hamstrings", "Quads, glutes, calves"],
            ["Upper body", "Total body models only", "Most models with moving arms"],
            ["Home availability", "Limited, mostly premium models", "Very wide, all price points"],
            ["Typical price", "Higher", "Wide range, lower entry point"],
          ],
        },
      },
      {
        heading: "Which Is Easier on the Knees?",
        paragraphs: [
          "Both machines are low-impact, because your feet stay on the pedals the whole time. The difference is in the angle of the knee. Cybex designed the Arc Trainer's motion to keep the knee from drifting forward past the toes, which many users find more comfortable than an elliptical. If ellipticals bother your knees, the Arc Trainer is well worth trying.",
        ],
      },
      {
        heading: "Which Burns More Calories?",
        paragraphs: [
          "Calorie burn depends mostly on how hard you work, not which machine you choose. That said, the Arc Trainer's adjustable incline and resistance make it easy to push into a very high-intensity effort, especially in climbing mode, while staying low-impact. On either machine, intervals and higher resistance burn more than a steady, easy pace.",
        ],
        cta: {
          label: "Read: Arc Trainer Workouts for Weight Loss",
          to: "/blog/$slug",
          params: { slug: "arc-trainer-workout-weight-loss" },
        },
      },
      {
        heading: "Arc Trainer vs. Cross Trainer",
        paragraphs: [
          '"Cross trainer" usually just means an elliptical with moving arm handles, so the comparison is the same as with an elliptical. Life Fitness, for example, calls its ellipticals cross-trainers. Elliptical cross trainer vs. elliptical is a naming difference rather than a different machine: a cross trainer has moving arms for a total-body workout, while some ellipticals have fixed handles only.',
        ],
        cta: {
          label: "Read: Life Fitness Ellipticals and Cross-Trainers",
          to: "/blog/$slug",
          params: { slug: "life-fitness-elliptical-guide" },
        },
      },
      {
        heading: "Adaptive Motion Trainer vs. Elliptical and Arc Trainer",
        paragraphs: [
          "The adaptive motion trainer, or AMT, is Precor's take on hybrid cardio. Instead of a fixed path, the AMT lets your stride adapt as you move, from a short step to a long run-like stride. Compared with an Arc Trainer, the AMT offers more freedom of movement; compared with an elliptical, it feels less guided. The Arc Trainer sits in between: a fixed path, but with adjustable incline.",
        ],
        cta: {
          label: "Read: Machines Similar to an Elliptical",
          to: "/blog/$slug",
          params: { slug: "elliptical-machine-alternatives" },
        },
      },
      {
        heading: "Which Should You Choose?",
        paragraphs: ["Use this as a quick guide."],
        list: [
          "Choose an Arc Trainer for knee comfort, glute focus and variety from adjustable incline",
          "Choose an elliptical for a familiar motion, a lower price and more home options",
          "Choose a cross trainer (elliptical with arms) for a simple total-body workout",
          "Choose an AMT if you want a stride that adapts to you",
        ],
        cta: { label: "Shop Cardio Equipment", to: "/cardio-equipment" },
      },
    ],
    finalThoughts:
      "Arc Trainer vs. elliptical isn't about which is better overall — it's about which motion suits your body. The Arc Trainer is designed to be easier on the knees, works the glutes harder and adds variety through adjustable incline. The elliptical is familiar, affordable and widely available. Try both if you can, and pick the one you'll actually enjoy using consistently.",
    faqs: [
      {
        q: "Is the Arc Trainer better than the elliptical?",
        a: "Neither is better for everyone. The Arc Trainer is often more comfortable for the knees and more glute-focused; the elliptical is more familiar and more affordable.",
      },
      {
        q: "What's the difference between an Arc Trainer and an elliptical?",
        a: "An elliptical moves your feet in an oval. An Arc Trainer moves them along an arc and usually lets you adjust the incline.",
      },
      {
        q: "Is an elliptical cross trainer different from an elliptical?",
        a: "Mostly in name. A cross trainer is an elliptical with moving arm handles for upper-body work.",
      },
      {
        q: "Does the Arc Trainer burn more calories than an elliptical?",
        a: "It depends on effort. The Arc Trainer makes high-intensity work easy to reach, but intensity matters more than the machine.",
      },
      {
        q: "What is an adaptive motion trainer?",
        a: "Precor's AMT is a hybrid cardio machine whose stride length adapts to how you move, from stepping to running-like strides.",
      },
    ],
    related: [
      "what-is-an-arc-trainer",
      "elliptical-machine-alternatives",
      "elliptical-vs-exercise-bike",
      "cardio-equipment",
    ],
    products: {
      category: "cardio-equipment",
      search: ["arc trainer", "elliptical", "amt"],
      heading: "Arc Trainers & Ellipticals for Sale",
      moreLink: { label: "View All Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Find Your Next Cardio Machine",
      body: "Compare Arc Trainers, ellipticals and AMTs from verified sellers.",
      buttonLabel: "Shop Cardio",
      to: "/cardio-equipment",
    },
  },
  {
    slug: "cybex-arc-trainer-models",
    title: "Cybex Arc Trainer Models Explained: Total Body, Lower Body, Commercial and Home",
    seoTitle: "Cybex Arc Trainer Models | 525AT, 625AT, 750AT & More",
    metaDescription:
      "Compare Cybex Arc Trainer models, from the home 525AT to the commercial 625AT, 750AT, 750A and 770AT. Learn what the model numbers mean and which Arc Trainer fits your needs.",
    excerpt:
      "AT, A, 525, 750, 770 — Cybex Arc Trainer model names follow a pattern. Here's how to decode them and which models suit home and commercial use.",
    category: "Equipment Reviews",
    heroImage: commercialImg,
    readTime: "9 min read",
    publishedAt: "2026-10-17",
    body: [
      {
        heading: "Decoding Cybex Arc Trainer Model Names",
        paragraphs: [
          'Cybex International has produced several generations of Arc Trainers, and the model names follow a simple pattern. The number indicates the series and positioning — higher numbers generally mean heavier-duty commercial machines with more features. The letters at the end tell you the configuration: "AT" usually indicates a total body Arc Trainer with moving arms, while "A" indicates a lower body Arc Trainer with fixed handles.',
          "Exact features vary by model year and console, so always confirm the details on the specific listing or the machine's serial label.",
        ],
      },
      {
        heading: "Common Cybex Arc Trainer Models",
        paragraphs: [
          "These are some of the Arc Trainer models you're most likely to see new or on the used market.",
        ],
        table: {
          headers: ["Model", "Configuration", "Positioning"],
          rows: [
            ["525AT", "Total body", "Home and light commercial"],
            ["625AT", "Total body", "Commercial, simpler feature set"],
            ["630A", "Lower body", "Commercial"],
            ["750AT", "Total body", "Commercial workhorse, adjustable incline"],
            ["750A", "Lower body", "Commercial, adjustable incline"],
            ["770AT / 772AT", "Total body", "Later premium commercial models"],
          ],
        },
      },
      {
        heading: "The 750AT: The Classic Gym Arc Trainer",
        paragraphs: [
          "If you've used an Arc Trainer in a health club, there's a good chance it was a 750-series machine. The Cybex 750AT total body Arc Trainer became one of the most common commercial Arc Trainers, with adjustable incline and resistance and moving arms for full-body work. Because so many were installed, used 750AT and 750A units appear regularly on the used market.",
        ],
        cta: {
          label: "Read: Arc Trainer for Sale — New vs. Used",
          to: "/blog/$slug",
          params: { slug: "arc-trainer-for-sale" },
        },
      },
      {
        heading: "Total Body vs. Lower Body: Which Model?",
        paragraphs: [
          "Pick a total body Arc Trainer (AT) if you want upper-body involvement and a higher overall calorie burn. Pick a lower body Arc Trainer (A) if you want to isolate the legs and glutes, prefer to hold steady handles for balance, or are working around an upper-body injury.",
        ],
      },
      {
        heading: "Home Arc Trainers",
        paragraphs: [
          "Most Arc Trainers are built for commercial floors, which makes them large and heavy for a home. The 525AT was Cybex's more home-friendly total body model, and Life Fitness now offers the Club Series+ Total Body Arc Trainer as a home Arc Trainer under its own name.",
        ],
        cta: {
          label: "Read: Life Fitness Club Series+ Arc Trainer and Cross-Trainer",
          to: "/blog/$slug",
          params: { slug: "life-fitness-club-series-elliptical-arc-trainer" },
        },
      },
      {
        heading: "Consoles and Power",
        paragraphs: [
          "Arc Trainer consoles range from simple LED displays to more advanced screens with programs and heart rate monitoring. Some Arc Trainers are self-powered by your pedaling, while others need an outlet, especially those with powered incline or larger consoles. Check the power requirements for the exact model before choosing a spot for it.",
        ],
      },
      {
        heading: "Other Cybex Ellipticals and Cardio",
        paragraphs: [
          "Cybex is best known for the Arc Trainer, but it has also produced treadmills, upright and recumbent bikes, and traditional elliptical machines. When people search for a Cybex elliptical machine, they're usually looking for an Arc Trainer — but it's worth confirming which machine a listing actually describes.",
        ],
        cta: { label: "Shop Cybex Equipment", to: "/brands/$slug", params: { slug: "cybex" } },
      },
    ],
    finalThoughts:
      'Cybex Arc Trainer models are easier to navigate once you know the pattern: the number signals the series and duty level, "AT" means total body and "A" means lower body. The 750-series is the classic commercial Arc Trainer and the most common used find, while the 525AT and Life Fitness\'s Club Series+ Total Body Arc Trainer suit home gyms. Confirm the exact model, console and power requirements before you buy.',
    faqs: [
      {
        q: "What does AT mean on a Cybex Arc Trainer?",
        a: "AT generally indicates a total body Arc Trainer with moving arm handles. A on its own generally indicates a lower body model with fixed handles.",
      },
      {
        q: "What is the most common Cybex Arc Trainer?",
        a: "The 750-series, including the 750AT total body and 750A lower body models, is one of the most common commercial Arc Trainers.",
      },
      {
        q: "Is there a home Arc Trainer?",
        a: "Yes. The Cybex 525AT is a more home-friendly model, and Life Fitness offers the Club Series+ Total Body Arc Trainer for home use.",
      },
      {
        q: "Does a Cybex Arc Trainer need to be plugged in?",
        a: "It depends on the model. Some are self-powered while others need an outlet, so check the manual or listing.",
      },
      {
        q: "Does Cybex make regular ellipticals?",
        a: "Cybex has made traditional ellipticals as well, but it's best known for the Arc Trainer.",
      },
    ],
    related: [
      "cybex",
      "what-is-an-arc-trainer",
      "arc-trainer-for-sale",
      "cybex-gym-equipment-for-sale",
    ],
    products: {
      category: "cardio-equipment",
      search: ["arc trainer", "cybex"],
      heading: "Cybex & Arc Trainer Equipment for Sale",
      moreLink: { label: "View All Cybex Equipment", to: "/brands/cybex" },
    },
    ctaBanner: {
      heading: "Shop Cybex Arc Trainers",
      body: "Find new and used Cybex Arc Trainers and cardio equipment from verified sellers.",
      buttonLabel: "Shop Cybex",
      to: "/brands/cybex",
    },
  },
  {
    slug: "arc-trainer-for-sale",
    title: "Arc Trainer for Sale: How to Buy a New or Used Cybex Arc Trainer",
    seoTitle: "Arc Trainer for Sale | Buying a New or Used Cybex Arc Trainer",
    metaDescription:
      "Shopping for an Arc Trainer for sale? Compare new and used Cybex Arc Trainers, home vs. commercial models, what to inspect and how to find the best Arc Trainer for your space.",
    excerpt:
      "Arc Trainers are premium machines, so buying smart matters. Here's how to choose between new and used, home and commercial, and what to check before you pay.",
    category: "Buying Guides",
    heroImage: commercialImg,
    readTime: "9 min read",
    publishedAt: "2026-10-17",
    body: [
      {
        heading: "Why Buy an Arc Trainer?",
        paragraphs: [
          "Arc Trainers offer something few other cardio machines do: a low-impact, knee-friendly motion with adjustable incline that can feel like striding, an elliptical or a stair climb. That versatility is why gyms keep them busy all day — and why more home gym owners are looking for an Arc Trainer of their own.",
        ],
        cta: {
          label: "Read: What Is an Arc Trainer?",
          to: "/blog/$slug",
          params: { slug: "what-is-an-arc-trainer" },
        },
      },
      {
        heading: "New vs. Used Arc Trainers",
        paragraphs: [
          "New Arc Trainers are premium machines, and commercial models in particular carry a high price. That's why the used market is so popular: Arc Trainers are built for heavy commercial use, so a well-maintained used unit retired from a gym can offer years of service for a fraction of the new price.",
        ],
        table: {
          headers: ["Option", "Best For", "Trade-Offs"],
          rows: [
            ["New commercial", "Gyms and facilities wanting full warranty", "Highest cost"],
            [
              "New home (e.g. Club Series+ Arc Trainer)",
              "Home users wanting a new machine and warranty",
              "Premium home price",
            ],
            [
              "Refurbished commercial",
              "Home or facility buyers wanting reliability for less",
              "Moderate cost, shorter warranty",
            ],
            [
              "Used as-is commercial",
              "Budget buyers comfortable inspecting",
              "Lowest cost, no warranty",
            ],
          ],
        },
      },
      {
        heading: "Home vs. Commercial Arc Trainers",
        paragraphs: [
          "Commercial Arc Trainers are large and heavy, so measure your space, ceiling height and doorways before buying one for the house. Remember that you'll stand higher on the pedals than on the floor, especially at high incline. Home-focused models like the Cybex 525AT or the Life Fitness Club Series+ Total Body Arc Trainer are designed to fit domestic spaces more easily.",
        ],
        cta: {
          label: "Read: Cybex Arc Trainer Models",
          to: "/blog/$slug",
          params: { slug: "cybex-arc-trainer-models" },
        },
      },
      {
        heading: "What to Inspect on a Used Arc Trainer",
        paragraphs: [
          "Spend at least ten minutes on the machine across a range of incline and resistance settings.",
        ],
        list: [
          "Motion — smooth and quiet; clicking or knocking can mean worn bearings or bushings",
          "Incline — run it from lowest to highest and back; it should move smoothly",
          "Resistance — test every level and confirm it changes evenly",
          "Arms (total body models) — check for side-to-side play in the moving handles",
          "Pedals — check for cracks and worn grip surfaces",
          "Console — confirm it powers on and every button and heart rate sensor works",
          "Serial label — note the model and serial number for parts and manuals",
        ],
        cta: {
          label: "See the Full Inspection Checklist",
          to: "/fitness-equipment-guide/$slug",
          params: { slug: "how-to-inspect-used-gym-equipment" },
        },
      },
      {
        heading: "What Makes the Best Arc Trainer?",
        paragraphs: [
          "The best Arc Trainer is the one that matches your space and use. For a busy facility, a commercial 750-series or later model offers durability and adjustable incline. For a home, a home-rated model or a refurbished commercial unit that fits your room gives you the Arc motion without overbuying. Reviews from Arc Trainer owners consistently praise the knee comfort and workout variety; the most common complaints are size and price.",
        ],
      },
      {
        heading: "Delivery and Setup",
        paragraphs: [
          "Arc Trainers are heavy and awkward to move. Plan for professional delivery or several helpers with proper dollies, and confirm whether delivery and assembly are included before you pay.",
        ],
        cta: { label: "Shipping Information", to: "/shipping-information" },
      },
    ],
    finalThoughts:
      "An Arc Trainer for sale is a worthwhile find for anyone who wants knee-friendly, high-intensity cardio. Decide between new, refurbished and used based on your budget and comfort with inspections, match the model to your space, and test the motion, incline and resistance before buying. A well-chosen Arc Trainer can be the most-used machine in your gym.",
    faqs: [
      {
        q: "Where can I buy an Arc Trainer?",
        a: "New Arc Trainers are sold through Cybex and Life Fitness dealers. Used and refurbished units are available through used equipment marketplaces, refurbishers and gym liquidations.",
      },
      {
        q: "Is a used Arc Trainer worth it?",
        a: "Often, yes. Commercial Arc Trainers are built for heavy use, so a well-maintained used unit can offer years of service for much less than new.",
      },
      {
        q: "Can I put an Arc Trainer in my home?",
        a: "Yes, but measure carefully. Commercial models are large, so consider home-rated models like the 525AT or Life Fitness Club Series+ Total Body Arc Trainer.",
      },
      {
        q: "What's the best Arc Trainer?",
        a: "For facilities, commercial 750-series and later models are popular for durability and adjustable incline. For homes, choose a home-rated model or a refurbished commercial unit that fits your space.",
      },
    ],
    related: [
      "cybex-arc-trainer-models",
      "used-cardio-equipment-for-sale",
      "how-to-inspect-used-gym-equipment",
      "cardio-equipment",
    ],
    products: {
      category: "cardio-equipment",
      search: ["arc trainer", "elliptical"],
      heading: "Arc Trainers & Ellipticals for Sale",
      moreLink: { label: "View All Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Shop Arc Trainers",
      body: "Browse new and used Arc Trainers and commercial cardio from verified sellers.",
      buttonLabel: "Shop Cardio",
      to: "/cardio-equipment",
    },
  },
  {
    slug: "arc-trainer-workout-weight-loss",
    title: "Arc Trainer Workouts for Weight Loss: How to Use the Arc Trainer",
    seoTitle: "Arc Trainer Workout for Weight Loss | How to Use It",
    metaDescription:
      "Learn how to use the Arc Trainer, with beginner, interval and hill workouts for weight loss. Includes incline and resistance settings, form tips and common mistakes.",
    excerpt:
      "New to the arc machine? Here's how to set it up, use good form and follow three Arc Trainer workouts built for fat loss.",
    category: "Fitness Tips",
    heroImage: heroImg,
    readTime: "8 min read",
    publishedAt: "2026-10-17",
    body: [
      {
        heading: "How to Use the Arc Trainer",
        paragraphs: [
          "Using the Arc Trainer is simple once you know the two main controls: incline (or stride) and resistance. Incline changes the shape of the movement; resistance changes how hard each stride is.",
        ],
        list: [
          "Step onto the pedals while holding the fixed handles, then start pedaling to wake the console",
          "Choose a quick start or a program and enter your weight for better calorie estimates",
          "Start at a low to middle incline and low resistance for a five-minute warm-up",
          "Stand tall with your weight over your heels and midfoot, not your toes",
          "Push through your whole foot and keep your knees in line with your feet",
          "On total body models, push and pull the moving arms; on lower body models, hold lightly for balance",
        ],
      },
      {
        heading: "Incline and Resistance Settings",
        paragraphs: [
          "Use incline to target different muscles and resistance to set your effort. Higher incline brings in more glutes and hamstrings and feels more like climbing.",
        ],
        table: {
          headers: ["Goal", "Incline", "Resistance"],
          rows: [
            ["Warm-up / cool-down", "Low to middle", "Low"],
            ["Steady fat-burning cardio", "Middle", "Moderate"],
            ["Glute and leg focus", "High", "Moderate to high"],
            ["Sprint intervals", "Low to middle", "High"],
          ],
        },
      },
      {
        heading: "Workout 1: Beginner Steady State (25 Minutes)",
        paragraphs: [
          "Warm up for five minutes at low incline and resistance. Then spend 15 minutes at a middle incline and a resistance where you can talk in short sentences. Cool down for five minutes. Do this two to three times a week, adding a few minutes each week.",
        ],
      },
      {
        heading: "Workout 2: Fat-Burning Intervals (24 Minutes)",
        paragraphs: [
          "Warm up for five minutes. Then alternate one minute hard (high resistance, fast pace) with two minutes easy for five rounds. Cool down for four minutes. Intervals raise your heart rate quickly and are a time-efficient way to burn calories.",
        ],
      },
      {
        heading: "Workout 3: Hill Climb for Glutes (30 Minutes)",
        paragraphs: [
          "Warm up for five minutes. Then raise the incline a step every three minutes for 12 minutes, hold the top incline for three minutes and step back down over the next five minutes. Cool down for five minutes. This builds leg and glute endurance while keeping impact low.",
        ],
      },
      {
        heading: "Is the Arc Trainer Good for Weight Loss?",
        paragraphs: [
          "Yes. The Arc Trainer lets you work at high intensity without the pounding of running, which makes it easier to train frequently and consistently — the real key to fat loss. Combine regular Arc Trainer sessions with strength training and a sensible diet for the best results.",
        ],
        cta: {
          label: "Read: Best Home Gym Equipment for Weight Loss",
          to: "/blog/$slug",
          params: { slug: "best-home-gym-equipment-for-weight-loss" },
        },
      },
      {
        heading: "Common Arc Trainer Mistakes",
        paragraphs: [],
        list: [
          "Leaning heavily on the handles, which takes work away from your legs",
          "Pushing through your toes instead of your whole foot",
          "Using high resistance with a very slow, grinding stride",
          "Staying at one incline every session instead of mixing it up",
          "Skipping the warm-up and cool-down",
        ],
      },
    ],
    finalThoughts:
      "The Arc Trainer is easy to learn and one of the most joint-friendly ways to train hard. Learn the incline and resistance controls, keep your weight over your heels and midfoot, and rotate between steady sessions, intervals and hill climbs. Done consistently, Arc Trainer workouts are an effective tool for weight loss and leg and glute conditioning.",
    faqs: [
      {
        q: "Is the Arc Trainer good for losing weight?",
        a: "Yes. It allows high-intensity, low-impact cardio, which makes consistent training easier. Pair it with strength training and good nutrition.",
      },
      {
        q: "How long should I use the Arc Trainer?",
        a: "Beginners can start with 20 to 25 minutes, two to three times a week, and build up from there. Interval sessions can be shorter.",
      },
      {
        q: "What incline should I use on the Arc Trainer?",
        a: "Use low to middle incline for warm-ups and steady cardio, and higher incline to target the glutes and hamstrings.",
      },
      {
        q: "Should I hold the handles on the Arc Trainer?",
        a: "On total body models, push and pull the moving arms. On lower body models, hold lightly for balance without leaning on them.",
      },
    ],
    related: [
      "what-is-an-arc-trainer",
      "elliptical-workout-benefits-guide",
      "best-home-gym-equipment-for-weight-loss",
      "cardio-equipment",
    ],
    products: {
      category: "cardio-equipment",
      search: ["arc trainer", "elliptical"],
      heading: "Arc Trainers & Ellipticals for Sale",
      moreLink: { label: "View All Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Train Low-Impact at Home",
      body: "Browse Arc Trainers and ellipticals from verified sellers.",
      buttonLabel: "Shop Cardio",
      to: "/cardio-equipment",
    },
  },
  {
    slug: "arc-trainer-planet-fitness",
    title: "The Arc Machine at Planet Fitness: How to Use the Arc Trainer at Your Gym",
    seoTitle: "Arc Trainer at Planet Fitness | How to Use the Arc Machine",
    metaDescription:
      "Spotted the arc machine at Planet Fitness or your local gym? Learn what the Arc Trainer is, how to use it, beginner settings and how it compares with the elliptical next to it.",
    excerpt:
      "That elliptical-looking machine with the arc motion is an Arc Trainer. Here's how to use it at Planet Fitness or any gym — and how to get one for home.",
    category: "Fitness Tips",
    heroImage: commercialImg,
    readTime: "7 min read",
    publishedAt: "2026-10-17",
    body: [
      {
        heading: "What Is the Arc Machine at the Gym?",
        paragraphs: [
          "If you've seen a machine that looks like an elliptical but moves your feet in a flatter, curved path, it's almost certainly an Arc Trainer. Many gyms, including many Planet Fitness locations, keep Arc Trainers in their cardio area alongside treadmills, ellipticals and bikes. Members often call it the arc machine or simply \"the Arc\".",
          "Note: we're an independent marketplace and aren't affiliated with Planet Fitness. Equipment varies by club, so the exact Arc Trainer model at your gym may differ.",
        ],
        cta: {
          label: "Read: What Is an Arc Trainer?",
          to: "/blog/$slug",
          params: { slug: "what-is-an-arc-trainer" },
        },
      },
      {
        heading: "How to Use the Arc Trainer at Planet Fitness",
        paragraphs: ["The steps are the same on almost every gym Arc Trainer."],
        list: [
          "Hold the fixed handles and step onto the pedals one foot at a time",
          "Start pedaling to turn on the console, then press quick start",
          "Begin at a low to middle incline and low resistance for a five-minute warm-up",
          "Stand tall with your weight over your heels and midfoot",
          "Use the moving arms if your machine has them; otherwise hold the fixed handles lightly",
          "Raise resistance or incline gradually once you're warm",
          "Slow down gradually for a cool-down before stepping off",
        ],
      },
      {
        heading: "A Simple 20-Minute Arc Machine Workout",
        paragraphs: [
          "Warm up for five minutes at low incline and resistance. For the next ten minutes, alternate two minutes at a moderate pace with one minute at higher resistance. Finish with a five-minute cool-down. It's an easy way to try the Arc Trainer without guessing at the settings.",
        ],
        cta: {
          label: "More Arc Trainer Workouts",
          to: "/blog/$slug",
          params: { slug: "arc-trainer-workout-weight-loss" },
        },
      },
      {
        heading: "Arc Trainer vs. the Elliptical Next to It",
        paragraphs: [
          "The elliptical moves your feet in an oval; the Arc Trainer moves them along an arc designed to keep your knees from drifting forward. Many people find the Arc Trainer gentler on the knees and harder on the glutes. If one bothers your joints, try the other.",
        ],
        cta: {
          label: "Read: Arc Trainer vs. Elliptical",
          to: "/blog/$slug",
          params: { slug: "arc-trainer-vs-elliptical" },
        },
      },
      {
        heading: "Getting an Arc Trainer for Home",
        paragraphs: [
          "If you love the Arc Trainer at your gym, you can get one for home. Options include home-rated models such as the Life Fitness Club Series+ Total Body Arc Trainer, or used and refurbished commercial Arc Trainers retired from gyms. Commercial machines are large, so measure your space first.",
        ],
        cta: {
          label: "Read: Arc Trainer for Sale",
          to: "/blog/$slug",
          params: { slug: "arc-trainer-for-sale" },
        },
      },
    ],
    finalThoughts:
      "The arc machine at Planet Fitness and other gyms is an Arc Trainer — a low-impact, knee-friendly cardio machine with an adjustable incline. Start with low settings, keep your weight over your heels and midfoot, and build up with simple intervals. If it becomes your favorite machine, home and used Arc Trainers make it possible to train on one at home.",
    faqs: [
      {
        q: "What is the arc machine at Planet Fitness?",
        a: "It's an Arc Trainer, a low-impact cardio machine that moves your feet in an arc-shaped path. Equipment varies by club.",
      },
      {
        q: "Is the Arc Trainer at Planet Fitness good for weight loss?",
        a: "Yes. It allows hard, low-impact cardio sessions that are easy to repeat consistently, which supports weight loss.",
      },
      {
        q: "How long should I use the arc machine?",
        a: "Beginners can start with 15 to 20 minutes and build up. Many gyms set time limits on cardio machines at busy times.",
      },
      {
        q: "Can I buy the same Arc Trainer my gym uses?",
        a: "Often, yes. Commercial Arc Trainers regularly appear on the used market when gyms refresh their cardio floors.",
      },
      {
        q: "Are you affiliated with Planet Fitness?",
        a: "No. We're an independent marketplace with no affiliation with Planet Fitness.",
      },
    ],
    related: [
      "what-is-an-arc-trainer",
      "arc-trainer-workout-weight-loss",
      "used-planet-fitness-equipment-for-sale",
      "cardio-equipment",
    ],
    products: {
      category: "cardio-equipment",
      search: ["arc trainer", "elliptical"],
      heading: "Arc Trainers & Ellipticals for Sale",
      moreLink: { label: "View All Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Bring the Arc Trainer Home",
      body: "Browse used and new Arc Trainers and ellipticals from verified sellers.",
      buttonLabel: "Shop Cardio",
      to: "/cardio-equipment",
    },
  },
  {
    slug: "life-fitness-elliptical-guide",
    title: "Life Fitness Ellipticals: Cross-Trainer Models, Prices and Buyer's Guide",
    seoTitle: "Life Fitness Elliptical | Models, Prices & Buyer's Guide",
    metaDescription:
      "Compare Life Fitness elliptical cross-trainers, from home X and E series models to the commercial 95X, Integrity and Platinum Club series. Learn typical prices and what to look for new or used.",
    excerpt:
      "Life Fitness calls its ellipticals cross-trainers, and the range runs from home models to club workhorses. Here's how the lineup compares, what they cost and how to buy one.",
    category: "Equipment Reviews",
    heroImage: cardioImg,
    readTime: "10 min read",
    publishedAt: "2026-10-17",
    body: [
      {
        heading: "Life Fitness Ellipticals at a Glance",
        paragraphs: [
          "Life Fitness is one of the biggest names in commercial cardio, and its ellipticals are a fixture in health clubs, hotels and universities. Life Fitness calls them elliptical cross-trainers, because most models have moving arms for a total-body workout. The range spans home models, heavy-duty commercial machines and, through the wider Life Fitness family, the Arc Trainer.",
        ],
        cta: {
          label: "Shop Life Fitness Equipment",
          to: "/brands/$slug",
          params: { slug: "life-fitness" },
        },
      },
      {
        heading: "Life Fitness Elliptical Models",
        paragraphs: [
          "Life Fitness pairs the same base machine with different consoles, so the series name tells you the frame and the console name tells you the screen and features.",
        ],
        table: {
          headers: ["Series", "Type", "Positioning"],
          rows: [
            [
              "X-series and E-series (e.g. X1, X3, X5, E1, E3, E5)",
              "Home cross-trainers",
              "Home gyms, entry to premium",
            ],
            [
              "Club Series+ Elliptical Cross-Trainer",
              "Home cross-trainer",
              "Commercial feel for the home",
            ],
            ["95X", "Commercial cross-trainer", "Long-running club workhorse"],
            ["Integrity Series", "Commercial cross-trainer", "Clubs and facilities"],
            [
              "Elevation and Platinum Club Series",
              "Premium commercial",
              "High-traffic health clubs",
            ],
            ["Total Body Arc Trainer", "Arc Trainer", "Home (Club Series+) and commercial"],
          ],
        },
      },
      {
        heading: "Home Life Fitness Ellipticals",
        paragraphs: [
          "Life Fitness home ellipticals bring the brand's commercial motion into a smaller, lighter frame. Most offer moving arms, a smooth stride and a choice of consoles. The Club Series+ Elliptical Cross-Trainer sits at the top of the home range, designed to deliver a club-style feel at home.",
        ],
        cta: {
          label: "Read: Life Fitness Club Series+ Cross-Trainer and Arc Trainer",
          to: "/blog/$slug",
          params: { slug: "life-fitness-club-series-elliptical-arc-trainer" },
        },
      },
      {
        heading: "Commercial Life Fitness Ellipticals",
        paragraphs: [
          "Commercial Life Fitness cross-trainers such as the 95X, Integrity, Elevation and Platinum Club series are built for many users a day. Heavier frames and components rated for constant use make them the most popular Life Fitness ellipticals on the used market, where they offer commercial durability at a fraction of the new price.",
        ],
        cta: {
          label: "Read: Commercial Elliptical Machines for Sale",
          to: "/blog/$slug",
          params: { slug: "commercial-elliptical-machines-for-sale" },
        },
      },
      {
        heading: "How Much Does a Life Fitness Elliptical Cost?",
        paragraphs: [
          "Life Fitness elliptical prices vary widely by series, console and condition. As a rough guide, new home cross-trainers typically cost a few thousand dollars, new commercial cross-trainers cost considerably more, and used commercial units often sell for a fraction of their original price. Premium consoles add to the price of any model.",
        ],
        table: {
          headers: ["Option", "Relative Price", "Notes"],
          rows: [
            ["New home cross-trainer", "Moderate to high", "Price rises with console and series"],
            ["New commercial cross-trainer", "Highest", "Built for multi-user facilities"],
            ["Refurbished commercial", "Moderate", "Replaced wear parts, often a warranty"],
            ["Used commercial as-is", "Lowest", "Best value if inspected carefully"],
          ],
        },
        cta: {
          label: "Read: How Much Does Gym Equipment Cost?",
          to: "/fitness-equipment-guide/$slug",
          params: { slug: "how-much-does-gym-equipment-cost" },
        },
      },
      {
        heading: "Buying a Used Life Fitness Elliptical",
        paragraphs: [
          "A used Life Fitness elliptical is one of the best-value cardio buys around. Pedal slowly and quickly, forward and backward, and listen for clicks or knocks. Check the moving arms for play, test every resistance level and confirm the console works. Note the model and serial number from the frame label for parts and manuals.",
        ],
        cta: {
          label: "Read: Used Life Fitness Equipment for Sale",
          to: "/blog/$slug",
          params: { slug: "used-life-fitness-equipment-for-sale" },
        },
      },
      {
        heading: "Other Life Fitness Cardio Equipment",
        paragraphs: [
          "Beyond ellipticals, Life Fitness cardio equipment includes treadmills, upright and recumbent Lifecycle bikes, and stair climbers, while the Life Fitness family adds Cybex Arc Trainers and ICG indoor cycles. Life Fitness has also made the Flexibility Trainer, a stretching station that guides users through supported stretches — a useful companion to a cardio area.",
        ],
        cta: { label: "Shop Cardio Equipment", to: "/cardio-equipment" },
      },
    ],
    finalThoughts:
      "Life Fitness ellipticals — or cross-trainers, as Life Fitness calls them — range from home X and E series machines and the Club Series+ to commercial 95X, Integrity and Platinum Club models. Match the series to how hard the machine will be used, factor in the console you want, and consider a used commercial unit for the best value. Inspect the motion, arms and resistance before buying.",
    faqs: [
      {
        q: "Are Life Fitness ellipticals good?",
        a: "Yes. Life Fitness is one of the most established commercial cardio brands, and its cross-trainers are known for a smooth motion and durability.",
      },
      {
        q: "What's the difference between a Life Fitness elliptical and a cross-trainer?",
        a: "Nothing, in practice. Life Fitness calls its ellipticals cross-trainers because most models have moving arms.",
      },
      {
        q: "How much does a Life Fitness elliptical cost?",
        a: "New home models typically cost a few thousand dollars, commercial models cost more, and used commercial units sell for a fraction of the new price.",
      },
      {
        q: "Which Life Fitness elliptical is best for home?",
        a: "The home X and E series cover a range of budgets, and the Club Series+ Elliptical Cross-Trainer is the premium home option.",
      },
      {
        q: "Does Life Fitness make an Arc Trainer?",
        a: "Yes. The Arc Trainer comes from Cybex, part of the Life Fitness family, and Life Fitness sells the Club Series+ Total Body Arc Trainer.",
      },
      {
        q: "What is the Life Fitness Flexibility Trainer?",
        a: "A stretching station that supports and guides users through a series of stretches.",
      },
    ],
    related: [
      "life-fitness",
      "used-life-fitness-equipment-for-sale",
      "commercial-elliptical-machines-for-sale",
      "cardio-equipment",
    ],
    products: {
      category: "cardio-equipment",
      search: ["life fitness", "elliptical", "cross trainer", "cross-trainer"],
      heading: "Life Fitness & Elliptical Machines for Sale",
      moreLink: { label: "View All Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Shop Life Fitness Ellipticals",
      body: "Find new and used Life Fitness cross-trainers from verified sellers.",
      buttonLabel: "Shop Life Fitness",
      to: "/brands/life-fitness",
    },
  },
  {
    slug: "life-fitness-club-series-elliptical-arc-trainer",
    title: "Life Fitness Club Series+ Elliptical Cross-Trainer and Total Body Arc Trainer Guide",
    seoTitle: "Life Fitness Club Series+ Elliptical & Arc Trainer Guide",
    metaDescription:
      "Compare the Life Fitness Club Series+ Elliptical Cross-Trainer and Club Series+ Total Body Arc Trainer. Learn how they differ, who each suits and what to know before buying.",
    excerpt:
      "Life Fitness's Club Series+ brings club-style cardio home. Here's how the Club Series+ Elliptical Cross-Trainer and Total Body Arc Trainer compare.",
    category: "Equipment Reviews",
    heroImage: homeImg,
    readTime: "8 min read",
    publishedAt: "2026-10-17",
    body: [
      {
        heading: "What Is Life Fitness Club Series+?",
        paragraphs: [
          "Club Series+ is Life Fitness's premium home cardio line, designed to bring a health-club feel into the home. It includes a treadmill, bikes, an Elliptical Cross-Trainer and a Total Body Arc Trainer. Older Life Fitness Club Series machines came before it, and you'll still see them on the used market.",
        ],
        cta: {
          label: "Shop Life Fitness Equipment",
          to: "/brands/$slug",
          params: { slug: "life-fitness" },
        },
      },
      {
        heading: "Club Series+ Elliptical Cross-Trainer",
        paragraphs: [
          "The Club Series+ Elliptical Cross-Trainer is a traditional Life Fitness elliptical with moving arms, built to a higher standard than entry-level home ellipticals. It suits users who like the familiar oval elliptical motion and want a total-body, low-impact workout at home.",
        ],
      },
      {
        heading: "Club Series+ Total Body Arc Trainer",
        paragraphs: [
          "The Club Series+ Total Body Arc Trainer brings the Arc Trainer motion — originally developed by Cybex, part of the Life Fitness family — into a home-rated machine. Its arc-shaped path is designed to reduce forward knee travel, and moving arms add upper-body work. It suits users who find ellipticals hard on the knees or want more glute emphasis.",
        ],
        cta: {
          label: "Read: What Is an Arc Trainer?",
          to: "/blog/$slug",
          params: { slug: "what-is-an-arc-trainer" },
        },
      },
      {
        heading: "Cross-Trainer vs. Arc Trainer: Which Club Series+ Machine?",
        paragraphs: [],
        table: {
          headers: ["Feature", "Club Series+ Cross-Trainer", "Club Series+ Total Body Arc Trainer"],
          rows: [
            ["Motion", "Oval elliptical path", "Arc-shaped path"],
            ["Knee comfort", "Low impact", "Low impact, designed to reduce forward knee travel"],
            [
              "Muscle emphasis",
              "Balanced lower body plus arms",
              "More glutes and hamstrings plus arms",
            ],
            ["Feel", "Familiar elliptical", "Striding, elliptical or climbing feel"],
            ["Best for", "Fans of the classic elliptical", "Knee-sensitive users, glute focus"],
          ],
        },
        cta: {
          label: "Read: Arc Trainer vs. Elliptical",
          to: "/blog/$slug",
          params: { slug: "arc-trainer-vs-elliptical" },
        },
      },
      {
        heading: "Consoles and Features",
        paragraphs: [
          "Club Series+ machines are offered with a choice of consoles, from simpler displays to touchscreens with workouts and entertainment. Features vary by console and model year, so confirm what's included on the specific machine or listing.",
        ],
      },
      {
        heading: "Buying Club Series+ New or Used",
        paragraphs: [
          "New Club Series+ machines come with Life Fitness's home warranty and the latest consoles. Used Club Series+ and older Club Series ellipticals can be excellent value, since they were built for home use and often see relatively light wear. Inspect the motion, arms, resistance and console, and note the serial number for parts and support.",
        ],
        cta: {
          label: "See the Full Inspection Checklist",
          to: "/fitness-equipment-guide/$slug",
          params: { slug: "how-to-inspect-used-gym-equipment" },
        },
      },
    ],
    finalThoughts:
      "The Life Fitness Club Series+ Elliptical Cross-Trainer and Total Body Arc Trainer both deliver club-style, low-impact cardio at home. Choose the cross-trainer if you love the classic elliptical motion; choose the Total Body Arc Trainer if you want a knee-friendly arc path with more glute work. Either way, confirm the console and features, and inspect any used machine carefully.",
    faqs: [
      {
        q: "What is the Life Fitness Club Series+?",
        a: "Life Fitness's premium home cardio line, including a treadmill, bikes, an Elliptical Cross-Trainer and a Total Body Arc Trainer.",
      },
      {
        q: "What's the difference between the Club Series+ cross-trainer and Arc Trainer?",
        a: "The cross-trainer uses an oval elliptical path. The Total Body Arc Trainer uses an arc-shaped path designed to reduce forward knee travel and emphasize the glutes.",
      },
      {
        q: "Is the Life Fitness Club Series+ Arc Trainer good for home?",
        a: "Yes. It's designed for home use and brings the Arc Trainer motion into a home-rated machine.",
      },
      {
        q: "Is a used Life Fitness Club Series elliptical worth buying?",
        a: "Often, yes. Home machines often see lighter use. Inspect the motion, arms, resistance and console before buying.",
      },
    ],
    related: [
      "life-fitness-elliptical-guide",
      "what-is-an-arc-trainer",
      "life-fitness",
      "home-gym-equipment",
    ],
    products: {
      category: "cardio-equipment",
      search: ["life fitness", "arc trainer", "elliptical", "cross trainer"],
      heading: "Life Fitness, Arc Trainer & Elliptical Machines for Sale",
      moreLink: { label: "View All Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Bring Club-Style Cardio Home",
      body: "Browse Life Fitness ellipticals and Arc Trainers from verified sellers.",
      buttonLabel: "Shop Life Fitness",
      to: "/brands/life-fitness",
    },
  },
];
