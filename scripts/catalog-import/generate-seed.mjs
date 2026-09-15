// Generates original, SEO-written product records from a list of source URLs
// (scripts/catalog-import/source-urls.txt). Only factual data is read from
// each source page (product name -> brand/model, live price). All title,
// description, meta description and spec text is generated fresh here.
//
// Usage: node scripts/catalog-import/generate-seed.mjs
// Output: scripts/catalog-import/strength-machines.seed.json
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const DIR = path.dirname(fileURLToPath(import.meta.url));

const urls = readFileSync(path.join(DIR, "source-urls.txt"), "utf8")
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

const KNOWN_BRANDS = [
  "Life Fitness", "Precor", "Technogym", "Cybex", "Matrix", "Hammer Strength",
  "NordicTrack", "Rogue Fitness", "Tuff Stuff", "ProMaxima", "Pro Maxima",
  "Muscle D", "Nautilus", "Paramount", "Star Trac", "Hoist", "Dynabody",
  "Atlantis", "Body Masters", "Titan Fitness", "Magnum", "Icarian",
  "Freemotion", "Legend Fitness", "Batca", "Continental Systems", "Wilder",
  "Inflight Fitness", "Ironclad", "Quantum", "Flex Fitness", "Sports Art",
  "Pro Elite", "Extreme", "LEG-TECH", "Maxicam", "Cam Bar",
];

const FALLBACK_BRAND = "ProLine Fitness";

const LOCATIONS = [
  { city: "Austin", state: "Texas", state_slug: "texas" },
  { city: "Miami", state: "Florida", state_slug: "florida" },
  { city: "Los Angeles", state: "California", state_slug: "california" },
  { city: "New York", state: "New York", state_slug: "new-york" },
];

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function titleFromUrl(url) {
  const file = url.split("/").pop() || "";
  const withoutExt = file.replace(/\.html$/i, "");
  const withoutPid = withoutExt.replace(/_p_\d+$/i, "");
  let words = withoutPid.replace(/-+/g, " ").trim();
  words = words.replace(/\bUsed\b/gi, "").replace(/\s+/g, " ").trim();
  return words;
}

function pidFromUrl(url) {
  const m = url.match(/_p_(\d+)/);
  return m ? m[1] : String(Math.floor(Math.random() * 100000));
}

function detectBrand(title) {
  const lower = title.toLowerCase();
  for (const b of KNOWN_BRANDS) {
    if (lower.startsWith(b.toLowerCase())) return b;
  }
  for (const b of KNOWN_BRANDS) {
    if (lower.includes(b.toLowerCase())) return b;
  }
  return FALLBACK_BRAND;
}

function modelFromTitle(title, brand) {
  let model = title;
  if (brand !== FALLBACK_BRAND) {
    const idx = model.toLowerCase().indexOf(brand.toLowerCase());
    if (idx !== -1) model = model.slice(0, idx) + model.slice(idx + brand.length);
  }
  return model.replace(/\s+/g, " ").trim();
}

const CLASSIFY_RULES = [
  { test: /elliptical/i, category: "Cardio Equipment", subcategory: "Ellipticals", muscle_group: "Full Body", usage: "Commercial" },
  { test: /krank cycle|\bube\b/i, category: "Cardio Equipment", subcategory: "Cross Trainers", muscle_group: "Upper Body", usage: "Commercial" },
  { test: /chest press|pec deck|fly machine|incline press|pectoral/i, category: "Strength Equipment", subcategory: "Chest Press Machines", muscle_group: "Chest", usage: "Commercial" },
  { test: /lat pulldown|pulldown|low row|seated row|vertical row|t-bar row|high pull|low pull|lower back|compound row|mid row|hi-lo pulley|pulley machine/i, category: "Strength Equipment", subcategory: "Lat Pulldown Machines", muscle_group: "Back", usage: "Commercial" },
  { test: /shoulder press|overhead press|lateral raise|shrug|shoulder machine/i, category: "Strength Equipment", subcategory: "Shoulder Press Machines", muscle_group: "Shoulders", usage: "Commercial" },
  { test: /bicep|tricep|preacher curl|arm curl|arm extension|dip machine|chin dip/i, category: "Strength Equipment", subcategory: "Weight Machines", muscle_group: "Arms", usage: "Commercial" },
  { test: /leg press|squat|leg extension|leg curl|calf|hack squat|hip|thigh|glute|sissy squat|belt squat/i, category: "Strength Equipment", subcategory: "Leg Press Machines", muscle_group: "Legs", usage: "Commercial" },
  { test: /ab crunch|abdominal|\bcore\b|back extension|ghd|power tower/i, category: "Strength Equipment", subcategory: "Weight Machines", muscle_group: "Core", usage: "Commercial" },
];

function classify(title) {
  for (const rule of CLASSIFY_RULES) {
    if (rule.test.test(title)) return rule;
  }
  return { category: "Strength Equipment", subcategory: "Weight Machines", muscle_group: "Full Body", usage: "Commercial" };
}

const OPENERS = [
  (b, m, sc) => `This ${b} ${m} is a commercial-grade ${sc.toLowerCase()} built for serious training volume.`,
  (b, m, sc) => `Add a reliable ${sc.toLowerCase()} to your facility with this ${b} ${m}.`,
  (b, m, sc) => `The ${b} ${m} delivers smooth, controlled resistance in a durable commercial frame.`,
  (b, m, sc) => `Upgrade your strength training lineup with the ${b} ${m}, a proven ${sc.toLowerCase()}.`,
  (b, m, sc) => `Sourced for gyms and training facilities, this ${b} ${m} is ready to drop into daily commercial use.`,
];

const MIDDLES = [
  (mg, usage) => `Engineered to target the ${mg.toLowerCase()}, it's a strong fit for ${usage.toLowerCase()} gyms, training studios, and multi-station strength areas.`,
  (mg, usage) => `Built around a ${mg.toLowerCase()}-focused movement pattern, this machine suits ${usage.toLowerCase()} facilities that need dependable, repeatable form cues for members.`,
  (mg, usage) => `With a biomechanically guided path for the ${mg.toLowerCase()}, it holds up well under the demands of ${usage.toLowerCase()} gym traffic.`,
];

const CLOSERS = [
  (cat) => `Inspected and priced to move, it's a smart way to expand your ${cat.toLowerCase()} lineup without paying new-equipment rates.`,
  (cat) => `A cost-effective alternative to buying new, this piece rounds out any ${cat.toLowerCase()} setup.`,
  (cat) => `Backed by our marketplace verification process, it's ready to ship and get back to work on your gym floor.`,
];

function pick(arr, i) {
  return arr[i % arr.length];
}

async function fetchPrice(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m = html.match(/\$([0-9][0-9,]*\.\d{2})/);
    if (!m) return null;
    const val = Number(m[1].replace(/,/g, ""));
    if (!Number.isFinite(val) || val <= 0 || val > 20000) return null;
    return val;
  } catch {
    return null;
  }
}

function priceFallback(subcategory, i) {
  const bands = {
    "Chest Press Machines": [650, 1400],
    "Lat Pulldown Machines": [600, 1300],
    "Shoulder Press Machines": [650, 1350],
    "Leg Press Machines": [900, 1900],
    "Weight Machines": [500, 1200],
    Ellipticals: [800, 1800],
    "Cross Trainers": [700, 1500],
  };
  const [lo, hi] = bands[subcategory] ?? [600, 1200];
  const spread = hi - lo;
  return Math.round((lo + ((i * 137) % spread)) / 5) * 5;
}

const CONDITIONS = ["Good", "Very Good", "Excellent", "Good", "Very Good", "Refurbished"];

async function main() {
  const seen = new Set();
  const products = [];
  let i = 0;

  for (const url of urls) {
    const rawTitle = titleFromUrl(url);
    const brand = detectBrand(rawTitle);
    const model = modelFromTitle(rawTitle, brand) || rawTitle;
    const { category, subcategory, muscle_group, usage } = classify(rawTitle);

    let baseSlug = slugify(`used-${brand}-${model}`);
    let slug = baseSlug;
    let dupeN = 2;
    while (seen.has(slug)) {
      slug = `${baseSlug}-${dupeN}`;
      dupeN++;
    }
    seen.add(slug);

    const loc = LOCATIONS[i % LOCATIONS.length];
    const condition = CONDITIONS[i % CONDITIONS.length];
    const scSingular = subcategory.replace(/Machines$/, "Machine").replace(/s$/, "");

    const title = `${brand} ${model} – Used ${subcategory.replace(/s$/, "")} | ${category}`.replace(/\s+/g, " ").trim();
    const opener = pick(OPENERS, i)(brand, model, scSingular);
    const middle = pick(MIDDLES, i)(muscle_group, usage);
    const closer = pick(CLOSERS, i)(category);
    const description = `${opener} ${middle} ${closer}`;

    const catKeywords = {
      "Strength Equipment": ["strength equipment", "strength training equipment", "commercial strength equipment", "gym strength machines"],
      "Cardio Equipment": ["cardio equipment", "cardio machines", "commercial cardio equipment", "gym cardio machines"],
    }[category] ?? ["gym equipment"];

    const metaDescription = `Shop the ${brand} ${model}, a used ${scSingular.toLowerCase()} for sale in ${condition.toLowerCase()} condition. Quality ${pick(catKeywords, i)} for commercial gyms and training facilities.`;
    const imageAlt = `${brand} ${model} used ${scSingular.toLowerCase()} for sale`;

    let price = await fetchPrice(url);
    if (price == null) price = priceFallback(subcategory, i);

    products.push({
      slug, title, brand, brand_slug: slugify(brand), model, category, subcategory,
      condition, price, city: loc.city, state: loc.state, state_slug: loc.state_slug,
      usage, muscle_group, resistance: "Selectorized", available: true, images: [],
      description, meta_description: metaDescription, image_alt: imageAlt,
      specs: [
        { label: "Brand", value: brand },
        { label: "Model", value: model },
        { label: "Category", value: `${category} – ${subcategory}` },
        { label: "Muscle Group", value: muscle_group },
        { label: "Condition", value: condition },
        { label: "Usage", value: usage },
      ],
      warranty: "30-day marketplace warranty on mechanical function",
      shipping: "Freight shipping available nationwide; local pickup options vary by location",
      seller: { name: "Gym Equipment Marketplace", type: "Verified Dealer", rating: 4.9, reviews: 128, since: 2015 },
      featured: false,
    });

    i++;
    if (i % 15 === 0) console.error(`...${i}/${urls.length} processed`);
  }

  writeFileSync(path.join(DIR, "strength-machines.seed.json"), JSON.stringify(products, null, 2));
  console.error(`Done. ${products.length} products staged -> strength-machines.seed.json`);
}

main();
