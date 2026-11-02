// The marketplace's product taxonomy: Department → Equipment Type.
//
// Imported listings only carry a loose `category`/`subcategory` pair, and the
// two don't describe the same thing consistently — 60+ unrelated strength
// machines all share the catch-all "Weight Machines" subcategory, while
// "home-gym-equipment" and "commercial-gym-equipment" are used as categories
// even though they describe who the equipment is for, not what it is. That
// left category pages with one giant undifferentiated grid and the Home and
// Commercial pages showing a single product each.
//
// Rather than hand-recategorizing every row (and every future upload), each
// listing is classified here from the fields it already has — subcategory,
// muscle group and title — into exactly one department and one equipment
// type. Usage (Commercial / Home) stays an independent facet layered on top.

export type DepartmentSlug =
  | "strength-equipment"
  | "cardio-equipment"
  | "free-weights"
  | "gym-accessories"
  | "supplements";

export interface EquipmentType {
  slug: string;
  name: string;
  /** Short label for menus and chips. */
  short: string;
  department: DepartmentSlug;
  intro: string;
}

export interface Department {
  slug: DepartmentSlug;
  name: string;
  short: string;
  types: EquipmentType[];
}

type TypeDef = Omit<EquipmentType, "department">;

function dept(slug: DepartmentSlug, name: string, short: string, types: TypeDef[]): Department {
  return { slug, name, short, types: types.map((t) => ({ ...t, department: slug })) };
}

export const departments: Department[] = [
  dept("strength-equipment", "Strength Equipment", "Strength", [
    {
      slug: "chest-machines",
      name: "Chest Press & Fly Machines",
      short: "Chest Machines",
      intro:
        "Chest press, pec fly, pec deck and pullover machines — selectorized and plate loaded — for building pressing strength with a fixed, guided path that's safe to train hard without a spotter.",
    },
    {
      slug: "shoulder-machines",
      name: "Shoulder Press & Lateral Raise Machines",
      short: "Shoulder Machines",
      intro:
        "Shoulder press, overhead press and lateral raise machines that load the delts through a controlled range of motion, a staple of every commercial strength line.",
    },
    {
      slug: "lat-pulldown-machines",
      name: "Lat Pulldown & Assisted Pull-Up Machines",
      short: "Lat Pulldowns",
      intro:
        "Lat pulldown, pullover and assisted chin/dip machines for vertical pulling — the go-to back builders for members who can't yet do bodyweight pull-ups.",
    },
    {
      slug: "row-machines",
      name: "Seated Row & T-Bar Row Machines",
      short: "Row Machines",
      intro:
        "Seated row, low row, mid row, compound row and T-bar row machines for horizontal pulling, with chest support so the back does the work instead of the lower back.",
    },
    {
      slug: "arm-machines",
      name: "Bicep & Tricep Machines",
      short: "Arm Machines",
      intro:
        "Bicep curl, preacher curl, tricep extension and seated dip machines that isolate the arms with a fixed cam path and quick weight-stack changes.",
    },
    {
      slug: "leg-press-machines",
      name: "Leg Press & Hack Squat Machines",
      short: "Leg Press",
      intro:
        "Leg press, hack squat and squat machines — the heaviest-loaded lower-body stations on any gym floor, in 45-degree, horizontal and selectorized designs.",
    },
    {
      slug: "leg-machines",
      name: "Leg Extension, Leg Curl & Calf Machines",
      short: "Leg Ext & Curl",
      intro:
        "Leg extension, seated and prone leg curl, combo and calf raise machines for isolating quads, hamstrings and calves.",
    },
    {
      slug: "glute-hip-machines",
      name: "Glute, Hip & Thigh Machines",
      short: "Glute & Hip",
      intro:
        "Glute drive, hip thrust, glute kickback, hip abductor and adductor (inner/outer thigh) machines — some of the most requested stations in modern gyms.",
    },
    {
      slug: "ab-core-machines",
      name: "Ab & Core Machines",
      short: "Ab & Core",
      intro:
        "Abdominal crunch, rotary torso and core machines that add resistance to ab training with a supported, repeatable movement.",
    },
    {
      slug: "back-extension-machines",
      name: "Back Extension, GHD & Reverse Hyper",
      short: "Back Extension",
      intro:
        "Low back machines, back extension benches, glute-ham developers (GHD) and reverse hypers for training the posterior chain and lower back.",
    },
    {
      slug: "weight-benches",
      name: "Weight Benches",
      short: "Benches",
      intro:
        "Olympic flat, incline, decline and military press benches plus adjustable FID benches — commercial-gauge steel with built-in bar catches and plate storage on most models.",
    },
    {
      slug: "power-racks",
      name: "Power Racks, Squat Racks & Smith Machines",
      short: "Racks & Smith",
      intro:
        "Power racks, squat racks, half racks, Smith machines and power towers — the anchor of any free-weight strength area.",
    },
    {
      slug: "cable-machines",
      name: "Cable Machines & Functional Trainers",
      short: "Cable Machines",
      intro:
        "Cable crossovers, functional trainers, single and dual adjustable pulleys and hi/lo cable columns — one footprint for hundreds of exercises.",
    },
    {
      slug: "multi-gyms",
      name: "Multi-Gyms & Strength Circuits",
      short: "Multi-Gyms",
      intro:
        "Multi-station gyms and complete selectorized circuits that cover the whole body in one purchase — ideal for hotels, schools, apartments and home gyms.",
    },
    {
      slug: "specialty-strength",
      name: "Specialty Strength Machines",
      short: "Specialty",
      intro:
        "Shrug, deadlift, neck and other purpose-built strength machines that don't fit a standard muscle-group station.",
    },
  ]),
  dept("cardio-equipment", "Cardio Equipment", "Cardio", [
    {
      slug: "treadmills",
      name: "Treadmills",
      short: "Treadmills",
      intro:
        "Commercial and home treadmills, including AC-motor club treadmills, curved non-motorized treadmills and folding home models.",
    },
    {
      slug: "ellipticals",
      name: "Ellipticals & Arc Trainers",
      short: "Ellipticals",
      intro:
        "Elliptical cross trainers, adaptive motion trainers and Arc Trainers for low-impact, full-body cardio.",
    },
    {
      slug: "exercise-bikes",
      name: "Exercise Bikes",
      short: "Exercise Bikes",
      intro:
        "Upright, recumbent, indoor cycling and air bikes — from studio spin bikes to self-powered commercial uprights.",
    },
    {
      slug: "stair-climbers",
      name: "Stair Climbers & Steppers",
      short: "Stair Climbers",
      intro:
        "StairMasters, step mills, steppers and vertical climbers for high-intensity, low-impact conditioning.",
    },
    {
      slug: "rowing-machines",
      name: "Rowing Machines",
      short: "Rowers",
      intro: "Air, magnetic and water rowing machines for full-body cardio in a small footprint.",
    },
    {
      slug: "performance-trainers",
      name: "Sled & Performance Trainers",
      short: "Performance",
      intro:
        "Sled-push treadmills, performance trainers and HIIT machines built for athletic conditioning and small-group training.",
    },
    {
      slug: "specialty-cardio",
      name: "Specialty Cardio",
      short: "Specialty",
      intro:
        "Ski trainers, upper-body ergometers and other cardio machines outside the standard categories.",
    },
  ]),
  dept("free-weights", "Free Weights", "Free Weights", [
    {
      slug: "dumbbells",
      name: "Dumbbells",
      short: "Dumbbells",
      intro: "Rubber hex, urethane and chrome dumbbells — single pairs and full commercial sets.",
    },
    {
      slug: "barbells",
      name: "Barbells & Bars",
      short: "Barbells",
      intro: "Olympic barbells, curl bars, trap bars and specialty bars for every lift.",
    },
    {
      slug: "weight-plates",
      name: "Weight Plates & Bumper Plates",
      short: "Plates",
      intro: "Olympic iron plates, grip plates and bumper plates sold individually or as sets.",
    },
    {
      slug: "kettlebells",
      name: "Kettlebells",
      short: "Kettlebells",
      intro: "Cast iron, competition and vinyl kettlebells for swings, carries and conditioning.",
    },
  ]),
  dept("gym-accessories", "Gym Accessories", "Accessories", [
    {
      slug: "gym-storage",
      name: "Gym Storage & Racks",
      short: "Storage",
      intro:
        "Dumbbell racks, plate trees, ball holders and multi-tier storage to keep a gym floor organized and safe.",
    },
    {
      slug: "gym-flooring",
      name: "Gym Flooring",
      short: "Flooring",
      intro: "Rubber tiles, rolls and mats that protect floors and equipment and cut noise.",
    },
    {
      slug: "stretching-recovery",
      name: "Stretching & Recovery",
      short: "Stretching",
      intro: "Stretching stations, mats and recovery equipment for warm-ups and mobility areas.",
    },
    {
      slug: "training-accessories",
      name: "Training Accessories",
      short: "Accessories",
      intro:
        "Medicine balls, bands, handles, attachments and the other small gear every gym needs.",
    },
  ]),
  dept("supplements", "Supplements", "Supplements", [
    {
      slug: "pre-workout",
      name: "Pre-Workout & Pump Formulas",
      short: "Pre-Workout",
      intro:
        "Pre-workouts, pump and nitric oxide boosters and intra-workout carbs for energy and focus in the gym.",
    },
    {
      slug: "protein-powder",
      name: "Protein Powder",
      short: "Protein",
      intro: "Whey, isolate and blended protein powders for recovery and daily protein intake.",
    },
    {
      slug: "creatine-amino-acids",
      name: "Creatine & Amino Acids",
      short: "Creatine & Aminos",
      intro: "Creatine monohydrate, BCAAs and EAAs for strength, performance and recovery.",
    },
    {
      slug: "weight-management",
      name: "Weight Management",
      short: "Weight Management",
      intro: "Fat burners and weight-management support to pair with training and diet.",
    },
    {
      slug: "vitamins-health",
      name: "Vitamins & Health",
      short: "Vitamins & Health",
      intro:
        "Vitamins, minerals, omegas, greens and targeted support for joints, heart, liver, digestion and everyday health.",
    },
    {
      slug: "hgh",
      name: "HGH",
      short: "HGH",
      intro: "HGH products, sealed and shipped fast with tracking.",
    },
    {
      slug: "peptides",
      name: "Peptides",
      short: "Peptides",
      intro: "Research peptides, factory sealed and shipped nationwide with tracking.",
    },
    {
      slug: "injection-pens",
      name: "Injection Pens",
      short: "Injection Pens",
      intro: "Pre-filled and reusable injection pens.",
    },
    {
      slug: "injectable-oils",
      name: "Injectable Oils",
      short: "Injectable Oils",
      intro: "Injectable oils, sealed and shipped fast with tracking.",
    },
    {
      slug: "oral-tablets",
      name: "Oral Tablets",
      short: "Oral Tablets",
      intro: "Oral tablets, sealed and shipped fast with tracking.",
    },
    {
      slug: "supplies",
      name: "Supplies",
      short: "Supplies",
      intro: "Syringes, swabs, bacteriostatic water and other supplies.",
    },
  ]),
];

/** The departments that are gym equipment, i.e. everything but supplements. */
export const equipmentDepartments = departments.filter((d) => d.slug !== "supplements");

export const allTypes: EquipmentType[] = departments.flatMap((d) => d.types);

export const departmentBySlug = (slug: string) => departments.find((d) => d.slug === slug);

export const typeBySlug = (department: string, slug: string) =>
  departmentBySlug(department)?.types.find((t) => t.slug === slug);

export const isDepartmentSlug = (slug: string): slug is DepartmentSlug =>
  departments.some((d) => d.slug === slug);

/** Collections that group equipment by who it's for rather than what it is. */
export const usageCollections = {
  "commercial-gym-equipment": "Commercial",
  "home-gym-equipment": "Home",
} as const satisfies Record<string, "Commercial" | "Home">;

export type UsageCollectionSlug = keyof typeof usageCollections;

export function usageForCollection(slug: string): "Commercial" | "Home" | undefined {
  return (usageCollections as Record<string, "Commercial" | "Home">)[slug];
}

/**
 * Whether a product belongs on a category/collection page: departments match
 * on the classified department, Home/Commercial collections on usage.
 */
export function matchesCollection(
  product: { category: string; department?: string; usage?: string },
  slug: string,
): boolean {
  const usage = usageForCollection(slug);
  // Supplements carry a usage value but aren't home or commercial gym gear.
  if (usage) return product.usage === usage && product.department !== "supplements";
  return (product.department ?? product.category) === slug;
}

// ---------------------------------------------------------------------------
// Classification

export interface ClassifyInput {
  title: string;
  category: string;
  subcategory: string;
  muscleGroup: string;
}

export interface Classification {
  department: DepartmentSlug;
  type: string;
}

type Rule = [RegExp, DepartmentSlug, string];

// Ordered: the first match wins, so narrow, unambiguous patterns come before
// broad ones (e.g. "preacher curl bench" must land in arms before the generic
// bench rule, and "ab crunch / back extension" in core before back extension).
const rules: Rule[] = [
  // Cardio — checked first so e.g. a "Matrix S-Drive" filed under strength
  // still lands with the other performance trainers.
  [
    /\bs[\s-]?(drive|force)\b|(?<!leg )sled|performance trainer/,
    "cardio-equipment",
    "performance-trainers",
  ],
  [/treadmill|\brun\b|woodway|curve/, "cardio-equipment", "treadmills"],
  [
    /elliptical|cross ?trainer|arc trainer|\befx\b|adaptive motion|\bamt\b/,
    "cardio-equipment",
    "ellipticals",
  ],
  [
    /stair|stepper|step ?mill|climber|jacobs ladder|power ?mill/,
    "cardio-equipment",
    "stair-climbers",
  ],
  [/\brower\b|rowing machine|rowing/, "cardio-equipment", "rowing-machines"],
  [/ski ?erg|ski trainer|ergometer|\bube\b|krank/, "cardio-equipment", "specialty-cardio"],
  [
    /bike|cycle|cycling|spin|ryder|recumbent|upright|air ?dyne/,
    "cardio-equipment",
    "exercise-bikes",
  ],

  // Accessories
  [/flooring|floor tile|rubber tile|gym mat|\bmats?\b/, "gym-accessories", "gym-flooring"],
  [/stretch|foam roll|recovery|massage/, "gym-accessories", "stretching-recovery"],
  [
    /holder|(?<!with weight )storage|plate tree|dumbbell rack|ball rack|\d ?tier/,
    "gym-accessories",
    "gym-storage",
  ],

  // Free weights
  [/kettlebell/, "free-weights", "kettlebells"],
  [/dumbbell/, "free-weights", "dumbbells"],
  [/barbell|curl bar|\bez bar|trap bar|hex bar|olympic bar\b/, "free-weights", "barbells"],
  [
    /bumper|weight plates?|olympic plates?|iron plates?|grip plates?/,
    "free-weights",
    "weight-plates",
  ],

  // Strength
  [/circuit|multi[\s-]?(gym|station)|\d+ piece|modular/, "strength-equipment", "multi-gyms"],
  [
    /smith|power rack|squat rack|half rack|power tower|\brig\b/,
    "strength-equipment",
    "power-racks",
  ],
  [/\bab\b|abdominal|crunch|\bcore\b|torso|oblique/, "strength-equipment", "ab-core-machines"],
  [
    /back extension|\bghd\b|glute ham|low(er)? back|reverse hyper/,
    "strength-equipment",
    "back-extension-machines",
  ],
  [
    /leg press|hack squat|squat machine|pendulum|v[\s-]?squat|belt squat/,
    "strength-equipment",
    "leg-press-machines",
  ],
  [/leg extension|leg curl|hamstring|calf/, "strength-equipment", "leg-machines"],
  [/glute|\bhip\b|thigh|butt|abduct|adduct|kickback/, "strength-equipment", "glute-hip-machines"],
  [
    /lat pull|pulldown|pull[\s-]?down|\bchin\b|pull[\s-]?up/,
    "strength-equipment",
    "lat-pulldown-machines",
  ],
  [
    /bicep|tricep|preacher|spider curl|arm curl|arm extension|\bdip\b/,
    "strength-equipment",
    "arm-machines",
  ],
  [
    /cable|crossover|pulley|functional trainer|high pull|low pull|hi ?\/ ?lo/,
    "strength-equipment",
    "cable-machines",
  ],
  [/\brows?\b|t[\s-]?bar/, "strength-equipment", "row-machines"],
  [/bench/, "strength-equipment", "weight-benches"],
  [
    /chest|\bpec|fly\b|pullover|incline press|decline press/,
    "strength-equipment",
    "chest-machines",
  ],
  [
    /shoulder|lateral raise|deltoid|overhead press|military press/,
    "strength-equipment",
    "shoulder-machines",
  ],
  [/shrug|deadlift|neck/, "strength-equipment", "specialty-strength"],
];

// Fallbacks by the listing's own subcategory, used when the title is too
// generic for any rule above (e.g. "Used Commercial Weight Machine").
const subcategoryFallback: Record<string, Classification> = {
  "chest press machines": { department: "strength-equipment", type: "chest-machines" },
  "shoulder press machines": { department: "strength-equipment", type: "shoulder-machines" },
  "lat pulldown machines": { department: "strength-equipment", type: "lat-pulldown-machines" },
  "leg press machines": { department: "strength-equipment", type: "leg-press-machines" },
  "power racks": { department: "strength-equipment", type: "power-racks" },
  "squat racks": { department: "strength-equipment", type: "power-racks" },
  "smith machines": { department: "strength-equipment", type: "power-racks" },
  "cable machines": { department: "strength-equipment", type: "cable-machines" },
  "functional trainers": { department: "strength-equipment", type: "cable-machines" },
  benches: { department: "strength-equipment", type: "weight-benches" },
  "multi-gyms": { department: "strength-equipment", type: "multi-gyms" },
  treadmills: { department: "cardio-equipment", type: "treadmills" },
  ellipticals: { department: "cardio-equipment", type: "ellipticals" },
  "cross trainers": { department: "cardio-equipment", type: "ellipticals" },
  "exercise bikes": { department: "cardio-equipment", type: "exercise-bikes" },
  "spin bikes": { department: "cardio-equipment", type: "exercise-bikes" },
  "stair climbers": { department: "cardio-equipment", type: "stair-climbers" },
  "rowing machines": { department: "cardio-equipment", type: "rowing-machines" },
  dumbbells: { department: "free-weights", type: "dumbbells" },
  "dumbbell sets": { department: "free-weights", type: "dumbbells" },
  barbells: { department: "free-weights", type: "barbells" },
  "weight plates": { department: "free-weights", type: "weight-plates" },
  "bumper plates": { department: "free-weights", type: "weight-plates" },
  kettlebells: { department: "free-weights", type: "kettlebells" },
  storage: { department: "gym-accessories", type: "gym-storage" },
  "gym flooring": { department: "gym-accessories", type: "gym-flooring" },
  stretching: { department: "gym-accessories", type: "stretching-recovery" },
};

// Last resort for strength machines with a generic title: their muscle group.
const muscleFallback: Record<string, string> = {
  chest: "chest-machines",
  shoulders: "shoulder-machines",
  back: "row-machines",
  biceps: "arm-machines",
  triceps: "arm-machines",
  arms: "arm-machines",
  legs: "leg-machines",
  hamstrings: "leg-machines",
  glutes: "glute-hip-machines",
  abs: "ab-core-machines",
  core: "ab-core-machines",
};

// Supplement listings are classified by subcategory alone; anything not
// listed here falls back to vitamins & health.
const supplementTypes: Record<string, string> = {
  "pre-workout": "pre-workout",
  "pump & nitric oxide": "pre-workout",
  "intra-workout & carbs": "pre-workout",
  "protein powder": "protein-powder",
  creatine: "creatine-amino-acids",
  "amino acids": "creatine-amino-acids",
  "weight management": "weight-management",
  hgh: "hgh",
  peptides: "peptides",
  "injection pens": "injection-pens",
  "injectable oils": "injectable-oils",
  "oral tablets": "oral-tablets",
  supplies: "supplies",
};

const departmentFallbackType: Record<DepartmentSlug, string> = {
  "strength-equipment": "specialty-strength",
  "cardio-equipment": "specialty-cardio",
  "free-weights": "dumbbells",
  "gym-accessories": "training-accessories",
  supplements: "vitamins-health",
};

export function classifyProduct(input: ClassifyInput): Classification {
  // Equipment title rules ("bench", "press"…) would misfile supplements.
  if (input.category === "supplements") {
    const type = supplementTypes[input.subcategory.trim().toLowerCase()];
    return { department: "supplements", type: type ?? departmentFallbackType.supplements };
  }

  // Only the part before the importer's " – Commercial X Machine" suffix
  // describes the product itself; the suffix repeats the (often wrong)
  // subcategory and would otherwise drive matches.
  const title = (input.title.split(" – ")[0] ?? input.title).toLowerCase();
  for (const [pattern, department, type] of rules) {
    if (pattern.test(title)) return { department, type };
  }

  const bySub = subcategoryFallback[input.subcategory.trim().toLowerCase()];
  if (bySub) return bySub;

  const department: DepartmentSlug = isDepartmentSlug(input.category)
    ? input.category
    : "strength-equipment";
  if (department === "strength-equipment") {
    const byMuscle = muscleFallback[input.muscleGroup.trim().toLowerCase()];
    if (byMuscle) return { department, type: byMuscle };
  }
  return { department, type: departmentFallbackType[department] };
}

// ---------------------------------------------------------------------------
// Facet normalization

// Imported muscle groups are free text ("Glutes & Hamstrings", "Upper Body",
// "Traps"…). Collapse them to a fixed, filterable set.
export const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Legs",
  "Glutes",
  "Core",
  "Full Body",
] as const;
export type MuscleGroup = (typeof muscleGroups)[number];

const muscleMap: Record<string, MuscleGroup> = {
  chest: "Chest",
  back: "Back",
  traps: "Back",
  shoulders: "Shoulders",
  biceps: "Arms",
  triceps: "Arms",
  arms: "Arms",
  legs: "Legs",
  hamstrings: "Legs",
  quads: "Legs",
  glutes: "Glutes",
  "glutes & hamstrings": "Glutes",
  abs: "Core",
  core: "Core",
  "full body": "Full Body",
  "upper body": "Full Body",
};

export function normalizeMuscleGroup(value: string): MuscleGroup | "" {
  return muscleMap[value.trim().toLowerCase()] ?? "";
}

// Same brand imported under different spellings/casing ("FreeMotion" and
// "Freemotion", "LEG TECH"). Keyed by brand slug, which is already consistent.
const brandNameOverrides: Record<string, string> = {
  freemotion: "FreeMotion",
  "leg-tech": "Leg Tech",
  "sports-art": "SportsArt",
  scifit: "SciFit",
  "star-trac": "Star Trac",
  matrix: "Matrix Fitness",
};

export function normalizeBrandName(slug: string, name: string): string {
  return brandNameOverrides[slug] ?? name;
}

/** Placeholder "brands" that mean "unbranded" — never given a brand page. */
export const unbrandedSlugs = new Set(["commercial-grade", ""]);
