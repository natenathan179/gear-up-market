import type { BlogPost } from "@/data/blog";

import cardioImg from "@/assets/cat-cardio.jpg";
import strengthImg from "@/assets/cat-strength.avif";
import accessoriesImg from "@/assets/cat-accessories.webp";

/** Equipment how-to and fix guides: setup, maintenance and troubleshooting. Merged into `blogPosts` in blog.ts. */
export const equipmentHowToPosts: BlogPost[] = [
  {
    slug: "how-to-use-a-smith-machine",
    title: "How to Use a Smith Machine Safely (Beginner Guide)",
    seoTitle: "How to Use a Smith Machine Safely | Beginner Guide",
    metaDescription:
      "Learn how to use a Smith machine safely: racking and unracking, setting safety stops, Smith machine squat form, bar weight and the best Smith machine exercises.",
    excerpt:
      "The Smith machine is one of the easiest ways to lift heavy alone, once you know how the hooks and safeties work. Here's a step-by-step guide.",
    category: "Fitness Tips",
    heroImage: strengthImg,
    readTime: "8 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "How a Smith Machine Works",
        paragraphs: [
          "A Smith machine fixes a barbell inside steel rails so it can only move up and down. Hooks on the bar let you rack it at almost any height by rotating your wrists, and adjustable safety stops catch the bar if you fail a rep. That makes it one of the safest ways to train heavy without a spotter.",
        ],
      },
      {
        heading: "Step-by-Step: Racking and Unracking",
        list: [
          "Set the safety stops just below the lowest point of your rep",
          "Set the bar hooks at a height you can reach from your start position",
          "Grip the bar, get into position and brace",
          "Rotate your wrists to turn the hooks off the pegs",
          "Perform your reps along the fixed path",
          "To rack, rotate the hooks back over the nearest peg and lower the bar onto it",
        ],
        paragraphs: [],
      },
      {
        heading: "Smith Machine Squat Form",
        paragraphs: [
          "Because the bar path is fixed, foot position matters more than on a free squat. Most people do best with feet slightly in front of the bar, so they can sit back without the knees shooting forward. Keep your chest up, brace your core and push through your whole foot.",
        ],
        list: [
          "Feet shoulder-width, 6 to 12 inches in front of the bar",
          "Bar across the upper back, not the neck",
          "Descend to a depth you can control with a neutral spine",
          "Drive up while keeping your hips and shoulders rising together",
        ],
      },
      {
        heading: "How Much Does the Smith Machine Bar Weigh?",
        paragraphs: [
          "It depends on the machine. Many commercial Smith bars are counterbalanced and feel like 10 to 25 lb, while others weigh 30 to 45 lb. Check the sticker on the frame or ask the gym, and log your lifts on the same machine for consistency.",
        ],
      },
      {
        heading: "Best Smith Machine Exercises",
        paragraphs: [],
        table: {
          headers: ["Exercise", "Muscles", "Tip"],
          rows: [
            ["Squat", "Quads, glutes", "Feet slightly forward"],
            ["Incline bench press", "Upper chest, shoulders", "Bench at 30 - 45 degrees"],
            ["Split squat", "Quads, glutes", "Front foot well forward"],
            ["Hip thrust", "Glutes", "Pad the bar; bench behind you"],
            ["Shoulder press (seated)", "Shoulders, triceps", "Bar just in front of the face"],
            ["Calf raise", "Calves", "Stand on a plate or step"],
            ["Inverted row", "Back, biceps", "Lock the bar at hip height"],
          ],
        },
        cta: {
          label: "Shop Smith Machines",
          to: "/strength-equipment/$type",
          params: { type: "power-racks" },
        },
      },
    ],
    finalThoughts:
      "To use a Smith machine safely, set the safety stops first, learn to rotate the hooks on and off the pegs and position your feet for the fixed bar path. It's a great tool for squats, presses and hip thrusts, especially when you train without a spotter.",
    faqs: [
      {
        q: "Is a Smith machine good for beginners?",
        a: "Yes. The guided path and built-in safeties make it a confidence-building way to learn to lift.",
      },
      {
        q: "Should my feet be in front of the bar on Smith squats?",
        a: "Usually slightly in front, so you can sit back comfortably.",
      },
    ],
    related: [
      "best-smith-machine",
      "smith-machine-vs-free-weights",
      "smith-machine-bar-weight",
      "strength-equipment",
    ],
    products: {
      search: ["smith"],
      heading: "Smith Machines for Sale",
      moreLink: { label: "View Strength Equipment", to: "/strength-equipment" },
    },
    ctaBanner: {
      heading: "Train Safely Alone",
      body: "Shop new and used Smith machines from top brands.",
      buttonLabel: "Shop Smith Machines",
      to: "/strength-equipment/power-racks",
    },
  },
  {
    slug: "treadmill-belt-slipping",
    title: "Treadmill Belt Slipping? How to Fix and Adjust It",
    seoTitle: "Treadmill Belt Slipping? | How to Tighten & Adjust It",
    metaDescription:
      "Treadmill belt slipping? Learn why it happens, how to tighten a treadmill belt, center it with the rear roller bolts and when the belt or drive belt needs replacing.",
    excerpt:
      "A slipping treadmill belt is usually a quick fix with an Allen wrench. Here's how to diagnose it and adjust it safely.",
    category: "Fitness Tips",
    heroImage: cardioImg,
    readTime: "7 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Why Treadmill Belts Slip",
        paragraphs: [],
        table: {
          headers: ["Cause", "Sign", "Fix"],
          rows: [
            [
              "Running belt too loose",
              "Hesitation or slip with each foot strike",
              "Tighten rear roller bolts",
            ],
            ["Dry or worn deck", "Belt drags, motor strains", "Lubricate or replace belt and deck"],
            ["Worn drive belt (motor belt)", "Motor runs, belt stutters", "Replace drive belt"],
            ["Worn running belt", "Glazed, frayed or stretched belt", "Replace running belt"],
          ],
        },
      },
      {
        heading: "How to Tighten a Treadmill Belt",
        list: [
          "Unplug the treadmill",
          "Find the two adjustment bolts at the rear roller, one on each side",
          "Turn both bolts clockwise a quarter turn at a time, equally on each side",
          "Plug in and run the belt at 3 mph, then walk on it to test",
          "Repeat until the slip stops; don't overtighten",
        ],
        paragraphs: [],
      },
      {
        heading: "How Tight Should the Belt Be?",
        paragraphs: [
          "Most manufacturers recommend you can lift the belt edge about 2 to 3 inches at the middle of the deck. Too tight strains the motor and rollers; too loose slips. Check your manual for the exact spec.",
        ],
      },
      {
        heading: "Treadmill Belt Adjustment for Centering",
        paragraphs: [
          "If the belt drifts to one side, run it at 3 mph. If it drifts left, turn the left bolt a quarter turn clockwise (or the right bolt counterclockwise). Wait a minute for the belt to settle before adjusting again.",
        ],
        cta: {
          label: "Shop Treadmills",
          to: "/cardio-equipment/$type",
          params: { type: "treadmills" },
        },
      },
    ],
    finalThoughts:
      "A slipping treadmill belt is usually fixed by tightening the rear roller bolts evenly, a quarter turn at a time. If it still slips, check deck lubrication and the drive belt. Regular maintenance prevents most belt problems.",
    faqs: [
      {
        q: "Why does my treadmill belt slip when I step on it?",
        a: "Usually the running belt is too loose or the drive belt is worn.",
      },
      {
        q: "Can I overtighten a treadmill belt?",
        a: "Yes. Overtightening stresses the motor, bearings and rollers.",
      },
    ],
    related: [
      "how-to-lubricate-a-treadmill",
      "used-treadmill",
      "best-treadmill-for-home",
      "cardio-equipment",
    ],
    products: {
      search: ["treadmill"],
      heading: "Treadmills for Sale",
      moreLink: { label: "View Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Time for an Upgrade?",
      body: "Shop new and refurbished treadmills from top brands.",
      buttonLabel: "Shop Treadmills",
      to: "/cardio-equipment/treadmills",
    },
  },
  {
    slug: "how-to-lubricate-a-treadmill",
    title: "How to Lubricate a Treadmill (and How Often)",
    seoTitle: "How to Lubricate a Treadmill | Lubricant & Schedule",
    metaDescription:
      "How to lubricate a treadmill step by step, which treadmill lubricant to use (silicone vs wax), how often to lube and signs your belt needs it.",
    excerpt:
      "A few minutes of lubrication can add years to your treadmill's motor and belt. Here's exactly how to do it.",
    category: "Fitness Tips",
    heroImage: cardioImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Why Lubrication Matters",
        paragraphs: [
          "Friction between the belt and deck makes the motor work harder, heats up the electronics and wears the belt. A properly lubricated treadmill runs quieter, smoother and lasts longer.",
        ],
      },
      {
        heading: "Which Treadmill Lubricant to Use",
        paragraphs: [],
        table: {
          headers: ["Type", "Used On", "Notes"],
          rows: [
            [
              "100% silicone",
              "Most home treadmills",
              "Most common; use a non-aerosol bottle with an applicator",
            ],
            ["Wax", "Some commercial treadmills", "Only if your manual specifies it"],
            ["Maintenance-free decks", "Some models", "Pre-waxed; don't add lube"],
          ],
        },
      },
      {
        heading: "How to Lubricate a Treadmill",
        list: [
          "Unplug the treadmill",
          "Loosen the belt slightly if needed to lift the edge",
          "Lift one side of the belt and apply silicone in a thin line down the center of the deck",
          "Repeat on the other side",
          "Plug in and walk at 2 to 3 mph for 3 to 5 minutes to spread it",
          "Re-tighten the belt if you loosened it",
        ],
        paragraphs: [],
      },
      {
        heading: "How Often to Lubricate",
        list: [
          "Light home use: every 3 to 6 months or every 150 miles",
          "Heavy home use: every 1 to 3 months",
          "Always follow the manufacturer's schedule",
          "Check when the belt feels dry or the motor sounds strained",
        ],
        paragraphs: [],
        cta: {
          label: "Shop Treadmills",
          to: "/cardio-equipment/$type",
          params: { type: "treadmills" },
        },
      },
    ],
    finalThoughts:
      "To lubricate a treadmill, unplug it, apply 100 percent silicone under the belt along the deck center and walk it in for a few minutes. Do it every 3 to 6 months for home use, and always check your manual first.",
    faqs: [
      {
        q: "Can I use WD-40 on my treadmill?",
        a: "No. Use 100 percent silicone or the lubricant your manufacturer recommends.",
      },
      {
        q: "What happens if you don't lubricate a treadmill?",
        a: "Friction increases, the motor works harder and the belt and deck wear out faster.",
      },
    ],
    related: [
      "treadmill-belt-slipping",
      "how-to-move-a-treadmill",
      "gym-equipment-maintenance-guide",
      "cardio-equipment",
    ],
    products: {
      search: ["treadmill"],
      heading: "Treadmills for Sale",
      moreLink: { label: "View Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Find Your Next Treadmill",
      body: "Shop new and used treadmills with nationwide delivery.",
      buttonLabel: "Shop Treadmills",
      to: "/cardio-equipment/treadmills",
    },
  },
  {
    slug: "how-to-assemble-a-power-rack",
    title: "How to Assemble a Power Rack: Step-by-Step",
    seoTitle: "How to Assemble a Power Rack | Step-by-Step Guide",
    metaDescription:
      "How to assemble a power rack step by step: tools, power rack assembly order, squat rack installation tips, leveling and safety checks before you lift.",
    excerpt:
      "Most power racks go together in two to four hours with two people. Here's the order, tools and checks that make it painless.",
    category: "Fitness Tips",
    heroImage: strengthImg,
    readTime: "7 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Tools You'll Need",
        list: [
          "Socket set and wrenches (often 19 mm / 3/4 in for rack hardware)",
          "Rubber mallet",
          "Level",
          "Tape measure",
          "A second person",
          "Drill and anchors if you're bolting it down",
        ],
        paragraphs: [],
      },
      {
        heading: "Power Rack Assembly: Step by Step",
        list: [
          "Lay out all parts and hardware and check them against the manual",
          "Assemble the base: attach the feet or floor crossmembers",
          "Stand the uprights and hand-tighten them to the base",
          "Attach the top crossmembers and pull-up bar",
          "Square the frame and check the uprights are level and plumb",
          "Fully tighten all bolts in a cross pattern",
          "Add J-hooks, safeties and attachments",
          "Anchor the rack to the floor if required",
        ],
        paragraphs: [],
      },
      {
        heading: "Squat Rack Installation Tips",
        paragraphs: [
          "Hand-tighten everything until the frame is fully assembled; it's much easier to align holes that way. Measure ceiling height first, because tall racks often need to be assembled lying down and tilted up. Stand the rack on a flat floor or platform.",
        ],
      },
      {
        heading: "Safety Checks Before Lifting",
        list: [
          "Every bolt fully tightened",
          "Rack doesn't rock or shift when you shake it",
          "J-hooks and safeties seat fully with pins locked",
          "Test with an empty bar, then light weight",
          "Re-check bolts after the first week",
        ],
        paragraphs: [],
        cta: {
          label: "Shop Power Racks",
          to: "/strength-equipment/$type",
          params: { type: "power-racks" },
        },
      },
    ],
    finalThoughts:
      "To assemble a power rack, build the base, stand and hand-tighten the uprights, add crossmembers, square everything up and then fully tighten. Finish with J-hooks, safeties and a test with an empty bar, and re-check the bolts after a week of training.",
    faqs: [
      {
        q: "How long does it take to assemble a power rack?",
        a: "Usually 2 to 4 hours with two people.",
      },
      {
        q: "Can one person assemble a power rack?",
        a: "Some smaller racks, but uprights are heavy and awkward, so two people is safer.",
      },
    ],
    related: [
      "bolt-down-squat-rack",
      "power-rack-attachments",
      "power-racks-cages-towers-for-home-gyms",
      "strength-equipment",
    ],
    products: {
      search: ["rack"],
      heading: "Power Racks for Sale",
      moreLink: { label: "View Strength Equipment", to: "/strength-equipment" },
    },
    ctaBanner: {
      heading: "Find Your Rack",
      body: "Shop power racks, half racks and squat stands.",
      buttonLabel: "Shop Racks",
      to: "/strength-equipment/power-racks",
    },
  },
  {
    slug: "bolt-down-squat-rack",
    title: "Do You Need to Bolt Down a Squat Rack?",
    seoTitle: "Bolt Down Squat Rack? | When to Anchor a Power Rack",
    metaDescription:
      "Do you need to bolt down a squat rack? When to anchor a power rack, how to improve squat rack stability without drilling and how to anchor to concrete.",
    excerpt:
      "Some racks must be bolted down; others are stable on their own. Here's how to tell and what to do if you can't drill.",
    category: "Fitness Tips",
    heroImage: strengthImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "When You Should Anchor a Power Rack",
        list: [
          "The manufacturer requires it for the warranty or safety",
          "You do kipping pull-ups, muscle-ups or band work",
          "The rack is tall and narrow with a small footprint",
          "It's a wall-mounted or folding rack",
          "You notice tipping or walking during use",
        ],
        paragraphs: [],
      },
      {
        heading: "Rack Types and Stability",
        paragraphs: [],
        table: {
          headers: ["Rack Type", "Bolt Down?"],
          rows: [
            ["Flat-foot power rack", "Recommended, especially for pull-ups"],
            ["Rack with rear extension or plate storage", "Often stable without anchoring"],
            ["Squat stands", "Usually not; keep plates on weight horns"],
            ["Wall-mounted / folding rack", "Always"],
          ],
        },
      },
      {
        heading: "Squat Rack Stability Without Drilling",
        list: [
          "Add plate storage horns and keep heavy plates loaded on them",
          "Build or buy a platform and bolt the rack to the platform",
          "Use a rack with a wider base or rear extension",
          "Avoid kipping and swinging movements",
        ],
        paragraphs: [],
      },
      {
        heading: "How to Anchor to Concrete",
        paragraphs: [
          "Use concrete wedge anchors or sleeve anchors, typically 1/2 inch, through the rack's foot holes. Drill with a hammer drill and masonry bit, blow out the dust, insert the anchors and tighten. Check that your slab is thick enough and avoid in-floor heating or utilities.",
        ],
        cta: {
          label: "Shop Power Racks",
          to: "/strength-equipment/$type",
          params: { type: "power-racks" },
        },
      },
    ],
    finalThoughts:
      "You don't always need to bolt down a squat rack, but it's the best option for flat-foot racks, pull-ups and dynamic movements. If you can't drill, use loaded plate storage or a platform to add stability.",
    faqs: [
      {
        q: "Can I bolt a rack to rubber mats?",
        a: "Bolt through the mats into the concrete, or bolt the rack to a platform.",
      },
      {
        q: "Will a power rack tip over?",
        a: "Unanchored racks can rock during pull-ups or uneven loading. Anchor or weigh them down.",
      },
    ],
    related: [
      "how-to-assemble-a-power-rack",
      "folding-squat-rack",
      "garage-gym-ideas",
      "strength-equipment",
    ],
    products: {
      search: ["rack"],
      heading: "Racks for Sale",
      moreLink: { label: "View Strength Equipment", to: "/strength-equipment" },
    },
    ctaBanner: {
      heading: "Build a Solid Setup",
      body: "Shop racks, platforms and strength equipment.",
      buttonLabel: "Shop Racks",
      to: "/strength-equipment/power-racks",
    },
  },
  {
    slug: "how-to-clean-rubber-gym-mats",
    title: "How to Clean and Disinfect Rubber Gym Mats",
    seoTitle: "How to Clean Rubber Gym Mats | Remove Smell & Disinfect",
    metaDescription:
      "How to clean rubber gym mats and gym flooring: daily, weekly and deep cleaning steps, safe disinfectants and how to get rid of rubber mat smell.",
    excerpt:
      "Rubber flooring lasts for decades if you clean it right. Here's how to clean, disinfect and de-smell your gym mats.",
    category: "Fitness Tips",
    heroImage: accessoriesImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Cleaning Schedule",
        paragraphs: [],
        table: {
          headers: ["Frequency", "Task"],
          rows: [
            ["Daily", "Sweep or vacuum chalk, dust and debris"],
            ["Weekly", "Damp mop with mild pH-neutral soap and water"],
            ["Monthly", "Deep clean; lift tiles and clean underneath if possible"],
            ["As needed", "Spot-clean sweat and spills"],
          ],
        },
      },
      {
        heading: "How to Clean Rubber Gym Mats",
        list: [
          "Vacuum or sweep loose debris",
          "Mix a few drops of mild dish soap or a pH-neutral cleaner in warm water",
          "Mop or scrub with a soft brush",
          "Rinse with clean water",
          "Let the floor dry fully before training",
        ],
        paragraphs: [],
      },
      {
        heading: "Safe Disinfectants",
        paragraphs: [
          "Use a disinfectant labeled safe for rubber, or a diluted hydrogen peroxide or quaternary ammonium cleaner used per the label. Avoid bleach, ammonia, oil-based cleaners and harsh solvents, which can dry and crack rubber or leave a slippery residue.",
        ],
      },
      {
        heading: "How to Get Rid of Rubber Mat Smell",
        list: [
          "Wash with soap and water, then rinse well",
          "Air the mats outdoors in shade or a ventilated garage for a few days",
          "Run fans and a dehumidifier indoors",
          "Sprinkle baking soda, leave overnight and vacuum",
          "Be patient: the smell from new recycled rubber fades over weeks",
        ],
        paragraphs: [],
        cta: {
          label: "Shop Gym Flooring",
          to: "/gym-accessories/$type",
          params: { type: "gym-flooring" },
        },
      },
    ],
    finalThoughts:
      "To clean rubber gym mats, sweep daily, mop weekly with mild pH-neutral soap and avoid harsh chemicals. Air out new mats to reduce the smell, and your flooring will stay safe and grippy for years.",
    faqs: [
      {
        q: "Can I use bleach on rubber gym mats?",
        a: "Avoid it. Bleach can dry out and degrade rubber.",
      },
      {
        q: "How long does rubber mat smell last?",
        a: "Usually a few weeks, faster with ventilation and washing.",
      },
    ],
    related: [
      "best-home-gym-flooring",
      "commercial-gym-flooring",
      "garage-gym-ideas",
      "gym-accessories",
    ],
    products: {
      search: ["floor", "mat", "tile"],
      heading: "Gym Flooring for Sale",
      moreLink: { label: "View Gym Accessories", to: "/gym-accessories" },
    },
    ctaBanner: {
      heading: "Upgrade Your Floor",
      body: "Shop rubber mats, tiles and gym flooring.",
      buttonLabel: "Shop Flooring",
      to: "/gym-accessories/gym-flooring",
    },
  },
  {
    slug: "rowing-machine-damper-setting",
    title: "Rowing Machine Damper Setting Explained",
    seoTitle: "Rowing Machine Damper Setting | Best Setting Explained",
    metaDescription:
      "Rowing machine damper setting explained: what the damper does on air rowers like the Concept2, the best damper setting for your goal and the drag factor.",
    excerpt:
      "Setting the damper to 10 doesn't make you fitter. Here's what the damper actually does and the best setting for you.",
    category: "Fitness Tips",
    heroImage: cardioImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "What the Damper Does",
        paragraphs: [
          "On an air rower, the damper is a lever on the flywheel housing that controls how much air enters the fan. A higher setting lets more air in, so the flywheel slows faster between strokes and each stroke feels heavier, like rowing a slow, heavy boat. A lower setting feels lighter and faster, like a sleek racing shell.",
        ],
      },
      {
        heading: "Damper Settings Compared",
        paragraphs: [],
        table: {
          headers: ["Setting", "Feel", "Best For"],
          rows: [
            ["1 - 3", "Light, fast", "Technique, high stroke rates, beginners"],
            ["3 - 5", "Moderate, efficient", "Most workouts and training"],
            ["5 - 7", "Heavier", "Power work, larger rowers"],
            ["8 - 10", "Very heavy", "Short power strokes; tires the back quickly"],
          ],
        },
      },
      {
        heading: "Drag Factor: The Better Number",
        paragraphs: [
          "Because dust and air conditions change resistance, the same damper number can feel different on two machines. Concept2 monitors show a drag factor that measures actual resistance. Many coaches recommend a drag factor of roughly 110 to 130 for most rowers, slightly lower for lighter rowers.",
        ],
      },
      {
        heading: "The Best Damper Setting",
        paragraphs: [
          "For most people, 3 to 5 is the sweet spot. Your effort, not the damper, determines intensity: you can work just as hard at 4 by pulling with more power. High settings mainly lead to early fatigue and poor technique.",
        ],
        cta: {
          label: "Shop Rowing Machines",
          to: "/cardio-equipment/$type",
          params: { type: "rowing-machines" },
        },
      },
    ],
    finalThoughts:
      "The rowing machine damper setting controls how heavy each stroke feels, not how hard the workout is. Most people should row between 3 and 5, use drag factor for consistency and let their effort drive intensity.",
    faqs: [
      {
        q: "Is a higher damper setting better?",
        a: "No. It feels heavier but doesn't automatically mean a better workout.",
      },
      {
        q: "What damper setting do Olympic rowers use?",
        a: "Many elite rowers train at moderate settings, often 3 to 5.",
      },
    ],
    related: [
      "rowing-machine-workout",
      "best-rowing-machine",
      "concept2-vs-hydrow",
      "cardio-equipment",
    ],
    products: {
      search: ["row"],
      heading: "Rowing Machines for Sale",
      moreLink: { label: "View Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Row Smarter",
      body: "Shop air, water and magnetic rowers.",
      buttonLabel: "Shop Rowers",
      to: "/cardio-equipment/rowing-machines",
    },
  },
  {
    slug: "elliptical-squeaking",
    title: "Why Is My Elliptical Squeaking? Fixes That Work",
    seoTitle: "Elliptical Squeaking? | Noise Fixes That Work",
    metaDescription:
      "Elliptical squeaking or clicking? Find the source of the noise, tighten bolts, lubricate pivot points and follow an elliptical maintenance routine that keeps it quiet.",
    excerpt:
      "Most elliptical squeaks come from a loose bolt or dry pivot point. Here's how to find and fix the noise.",
    category: "Fitness Tips",
    heroImage: cardioImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Common Causes of Elliptical Noise",
        paragraphs: [],
        table: {
          headers: ["Noise", "Likely Source", "Fix"],
          rows: [
            [
              "Squeak every stride",
              "Dry pivot points or arm linkages",
              "Lubricate with silicone or white lithium grease",
            ],
            ["Clicking or clunking", "Loose bolts or pedal arms", "Tighten all hardware"],
            ["Grinding", "Worn bearings or rollers", "Replace bearings or wheels"],
            ["Thumping", "Dirty or flat-spotted rails/rollers", "Clean rails and inspect rollers"],
            ["Rubbing", "Belt or flywheel issue", "Inspect drive belt and alignment"],
          ],
        },
      },
      {
        heading: "How to Find the Squeak",
        list: [
          "Pedal slowly and listen at each joint",
          "Have someone pedal while you listen up close",
          "Pedal with legs only, then arms only, to isolate the area",
          "Check whether it happens under load or only when moving freely",
        ],
        paragraphs: [],
      },
      {
        heading: "Elliptical Maintenance Routine",
        list: [
          "Weekly: wipe rails and rollers with a damp cloth",
          "Monthly: check and tighten bolts",
          "Every few months: lubricate pivot points as the manual directs",
          "Level the machine so it doesn't rock",
          "Use an equipment mat to keep dust out",
        ],
        paragraphs: [],
        cta: {
          label: "Shop Ellipticals",
          to: "/cardio-equipment/$type",
          params: { type: "ellipticals" },
        },
      },
    ],
    finalThoughts:
      "Elliptical squeaking is usually fixed by tightening bolts, cleaning the rails and lubricating pivot points. Regular maintenance keeps it quiet, and grinding noises that persist usually mean bearings need replacing.",
    faqs: [
      {
        q: "What lubricant should I use on an elliptical?",
        a: "Silicone spray or white lithium grease on pivots, as your manual recommends. Don't lube rails unless instructed.",
      },
      {
        q: "Why does my elliptical click?",
        a: "Usually loose pedal arm bolts or a worn bearing.",
      },
    ],
    related: [
      "best-elliptical-machine",
      "where-to-buy-an-elliptical",
      "gym-equipment-maintenance-guide",
      "cardio-equipment",
    ],
    products: {
      search: ["elliptical", "cross trainer"],
      heading: "Ellipticals for Sale",
      moreLink: { label: "View Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Upgrade to a Quieter Elliptical",
      body: "Shop commercial-grade ellipticals, new and used.",
      buttonLabel: "Shop Ellipticals",
      to: "/cardio-equipment/ellipticals",
    },
  },
  {
    slug: "treadmill-motor-horsepower",
    title: "Treadmill Motor Horsepower: How Much Do You Need?",
    seoTitle: "Treadmill Motor Horsepower | How Much CHP Do You Need?",
    metaDescription:
      "Treadmill motor horsepower explained: continuous duty HP vs peak HP, treadmill motor size for walking, jogging and running, AC vs DC motors and user weight.",
    excerpt:
      "Peak horsepower is marketing; continuous horsepower is what matters. Here's how much motor you actually need.",
    category: "Buying Guides",
    heroImage: cardioImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Continuous Duty HP vs Peak HP",
        paragraphs: [
          "Continuous duty horsepower (CHP) is the power a motor can sustain over a long workout. Peak horsepower is a brief maximum and often inflated in marketing. Always compare treadmills by CHP.",
        ],
      },
      {
        heading: "Treadmill Motor Size Guide",
        paragraphs: [],
        table: {
          headers: ["Use", "Recommended CHP"],
          rows: [
            ["Walking (under 4 mph)", "2.0 - 2.5 CHP"],
            ["Jogging (4 - 6 mph)", "2.5 - 3.0 CHP"],
            ["Running (6+ mph)", "3.0 - 3.5 CHP"],
            ["Heavy users or multiple users", "3.5 - 4.0+ CHP"],
            ["Commercial", "3.0 - 5.0 HP AC motors"],
          ],
        },
      },
      {
        heading: "AC vs DC Motors",
        list: [
          "DC motors: common on home treadmills, quieter, work on standard outlets",
          "AC motors: common on commercial treadmills, built for continuous use, often need a dedicated circuit",
        ],
        paragraphs: [],
      },
      {
        heading: "Other Factors",
        paragraphs: [
          "Heavier users, frequent incline training and multiple users all increase motor load. If you're over 250 lb or plan to run daily, size up. Motor warranty length is also a good indicator of quality.",
        ],
        cta: {
          label: "Shop Treadmills",
          to: "/cardio-equipment/$type",
          params: { type: "treadmills" },
        },
      },
    ],
    finalThoughts:
      "Choose treadmill motor horsepower by continuous duty rating: about 2.0 to 2.5 CHP for walking, 3.0 CHP or more for running, and more for heavier or multiple users. A strong motor with a long warranty means a treadmill that lasts.",
    faqs: [
      {
        q: "Is 2.5 HP enough for a treadmill?",
        a: "For walking and light jogging, yes. Runners should look for 3.0 CHP or more.",
      },
      {
        q: "Are commercial treadmill motors better?",
        a: "Commercial AC motors are built for all-day use and typically last longer.",
      },
    ],
    related: [
      "best-treadmill-for-home",
      "treadmill-for-heavy-person",
      "cheap-vs-expensive-treadmill",
      "cardio-equipment",
    ],
    products: {
      search: ["treadmill"],
      heading: "Treadmills for Sale",
      moreLink: { label: "View Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Power Your Runs",
      body: "Shop treadmills with motors built to last.",
      buttonLabel: "Shop Treadmills",
      to: "/cardio-equipment/treadmills",
    },
  },
  {
    slug: "how-to-move-a-treadmill",
    title: "How to Move a Treadmill Without Damaging It",
    seoTitle: "How to Move a Treadmill | Upstairs & Transport Tips",
    metaDescription:
      "How to move a treadmill safely: preparing it, moving a treadmill upstairs, treadmill transport in a truck and tips to avoid damage and injury.",
    excerpt:
      "Treadmills are heavy, awkward and easy to damage. Here's how to move one safely, including up and down stairs.",
    category: "Fitness Tips",
    heroImage: cardioImg,
    readTime: "6 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Before You Move It",
        list: [
          "Check the weight in the manual: many weigh 200 to 350 lb, commercial units 400+",
          "Unplug it and remove the safety key",
          "Lower the incline fully",
          "Fold and lock the deck if it folds",
          "Remove the console if the manual allows, especially for stairs",
          "Measure doorways and stairwells",
        ],
        paragraphs: [],
      },
      {
        heading: "Equipment to Use",
        paragraphs: [],
        table: {
          headers: ["Tool", "Why"],
          rows: [
            ["Furniture dolly or appliance dolly", "Takes the weight on flat ground"],
            ["Moving blankets", "Protect the console and frame"],
            ["Ratchet straps", "Secure it in a truck"],
            ["Stair-climbing dolly or extra helpers", "For stairs"],
            ["Gloves", "Better grip"],
          ],
        },
      },
      {
        heading: "Moving a Treadmill Upstairs",
        paragraphs: [
          "Use at least two strong people, ideally three. Partially disassemble it if possible. Move it with the motor end higher, take one step at a time and communicate before each move. For heavy commercial treadmills, hire movers with stair experience.",
        ],
      },
      {
        heading: "Treadmill Transport in a Vehicle",
        list: [
          "Transport it upright or as the manual directs",
          "Strap it securely to prevent sliding",
          "Don't stack items on the deck or console",
          "Protect the console with blankets",
        ],
        paragraphs: [],
        cta: {
          label: "Shop Treadmills",
          to: "/cardio-equipment/$type",
          params: { type: "treadmills" },
        },
      },
    ],
    finalThoughts:
      "To move a treadmill without damaging it, unplug and fold it, use a dolly and blankets, recruit helpers for stairs and strap it securely in transit. For heavy commercial units, professional movers or white-glove delivery are worth the cost.",
    faqs: [
      {
        q: "Can one person move a treadmill?",
        a: "Some folding models on wheels can be rolled by one person on flat floors. Stairs need help.",
      },
      {
        q: "Should I lay a treadmill flat to move it?",
        a: "Follow your manual. Many are moved upright or folded to protect the motor and console.",
      },
    ],
    related: [
      "gym-equipment-delivery",
      "cost-to-ship-gym-equipment",
      "best-folding-treadmill",
      "cardio-equipment",
    ],
    products: {
      search: ["treadmill"],
      heading: "Treadmills for Sale",
      moreLink: { label: "View Cardio Equipment", to: "/cardio-equipment" },
    },
    ctaBanner: {
      heading: "Delivered and Installed",
      body: "Shop treadmills with nationwide freight options.",
      buttonLabel: "Shop Treadmills",
      to: "/cardio-equipment/treadmills",
    },
  },
  {
    slug: "how-to-use-a-cable-machine",
    title: "How to Use a Cable Machine: Attachments and Settings",
    seoTitle: "How to Use a Cable Machine | Attachments & Settings",
    metaDescription:
      "How to use a cable machine: adjusting pulley height, choosing cable machine attachments, understanding the cable pulley ratio and safe technique.",
    excerpt:
      "Cable machines look complicated but are simple once you know the three settings. Here's how to set one up for any exercise.",
    category: "Fitness Tips",
    heroImage: strengthImg,
    readTime: "7 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "The Three Settings",
        list: [
          "Pulley height: pull the pin and slide the carriage high, middle or low",
          "Weight: move the pin in the stack",
          "Attachment: clip a handle, rope or bar to the carabiner",
        ],
        paragraphs: [],
      },
      {
        heading: "Cable Machine Attachments",
        paragraphs: [],
        table: {
          headers: ["Attachment", "Common Exercises"],
          rows: [
            ["Single D-handle", "Single-arm rows, flyes, lateral raises, presses"],
            ["Rope", "Triceps pushdowns, face pulls, hammer curls, crunches"],
            ["Straight bar", "Curls, pushdowns, upright rows"],
            ["Lat bar", "Lat pulldowns"],
            ["V-bar / close-grip handle", "Seated rows, close-grip pulldowns"],
            ["Ankle strap", "Kickbacks, hip abduction, leg curls"],
          ],
        },
      },
      {
        heading: "Cable Pulley Ratio",
        paragraphs: [
          "Many functional trainers use a 2:1 ratio, meaning the resistance you feel is about half the stack weight, with twice the cable travel. Single-stack stations often run 1:1. Don't compare numbers between machines; track progress on the same one.",
        ],
      },
      {
        heading: "Technique Tips",
        list: [
          "Step far enough away that the weight stack doesn't touch down between reps",
          "Brace your core and stagger your stance for standing moves",
          "Control the return; don't let the stack slam",
          "Keep the cable aligned with the direction of the movement",
        ],
        paragraphs: [],
        cta: {
          label: "Shop Cable Machines",
          to: "/strength-equipment/$type",
          params: { type: "cable-machines" },
        },
      },
    ],
    finalThoughts:
      "Using a cable machine comes down to pulley height, weight and attachment. Learn what each attachment is for, know your machine's pulley ratio and control every rep, and you'll unlock hundreds of exercises.",
    faqs: [
      {
        q: "Why does the cable weight feel lighter?",
        a: "Many machines use a 2:1 pulley ratio, which halves the felt resistance.",
      },
      {
        q: "Are cable machines good for beginners?",
        a: "Yes. They're smooth, adjustable and safe.",
      },
    ],
    related: [
      "cable-machine-exercises",
      "best-functional-trainer",
      "face-pulls",
      "strength-equipment",
    ],
    products: {
      search: ["cable", "functional trainer", "crossover"],
      heading: "Cable Machines for Sale",
      moreLink: { label: "View Strength Equipment", to: "/strength-equipment" },
    },
    ctaBanner: {
      heading: "Add Cables to Your Gym",
      body: "Shop functional trainers and cable machines.",
      buttonLabel: "Shop Cable Machines",
      to: "/strength-equipment/cable-machines",
    },
  },
  {
    slug: "smith-machine-bar-weight",
    title: "How Much Does the Bar Weigh on a Smith Machine or Leg Press?",
    seoTitle: "Smith Machine Bar Weight & Leg Press Sled Weight",
    metaDescription:
      "How much does a Smith machine bar weigh? Typical Smith machine bar weight, leg press sled weight, hack squat starting weight and how to find your machine's number.",
    excerpt:
      "Machines don't start at zero. Here's how much Smith bars and leg press sleds typically weigh, and how to find yours.",
    category: "Fitness Tips",
    heroImage: strengthImg,
    readTime: "5 min read",
    publishedAt: "2026-11-07",
    body: [
      {
        heading: "Typical Machine Starting Weights",
        paragraphs: [],
        table: {
          headers: ["Machine", "Typical Starting Weight"],
          rows: [
            ["Counterbalanced Smith bar", "About 6 - 25 lb effective"],
            ["Non-counterbalanced Smith bar", "About 25 - 45 lb"],
            ["45-degree leg press sled", "About 75 - 120 lb, varies widely"],
            ["Hack squat sled", "About 30 - 100 lb"],
            ["Plate-loaded chest press arms", "Often 10 - 30 lb per side"],
          ],
        },
      },
      {
        heading: "Why the Numbers Vary",
        paragraphs: [
          "Machine geometry changes how much of the sled or bar weight you actually move. Angles, pulleys, counterbalances and pivot points all matter. That's why the 'starting weight' of a leg press isn't the same as lifting that weight with a barbell.",
        ],
      },
      {
        heading: "How to Find Your Machine's Weight",
        list: [
          "Check the label on the frame, often near the bar or sled",
          "Look up the model's manual online",
          "Ask gym staff",
          "If unknown, log only the added plates and stay consistent",
        ],
        paragraphs: [],
        cta: { label: "Shop Strength Equipment", to: "/strength-equipment" },
      },
    ],
    finalThoughts:
      "Smith machine bars and leg press sleds have very different starting weights depending on the model. Check the label, stay consistent with the same machine and don't compare machine numbers directly with free-weight lifts.",
    faqs: [
      {
        q: "Do you count the Smith bar weight?",
        a: "You can, if you know it. Most important is tracking the same way each time.",
      },
      {
        q: "How much does a leg press sled weigh?",
        a: "Often 75 to 120 lb, but it varies widely by machine.",
      },
    ],
    related: [
      "how-to-use-a-smith-machine",
      "how-much-does-a-barbell-weigh",
      "leg-press-foot-placement",
      "strength-equipment",
    ],
    products: {
      search: ["smith", "leg press"],
      heading: "Smith Machines and Leg Presses",
      moreLink: { label: "View Strength Equipment", to: "/strength-equipment" },
    },
    ctaBanner: {
      heading: "Shop Strength Machines",
      body: "Smith machines, leg presses and more from top brands.",
      buttonLabel: "Shop Strength",
      to: "/strength-equipment",
    },
  },
];
