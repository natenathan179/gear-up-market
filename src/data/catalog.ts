import strengthImg from "@/assets/cat-strength.jpg";
import cardioImg from "@/assets/cat-cardio.jpg";
import homeImg from "@/assets/cat-home.jpg";
import commercialImg from "@/assets/cat-commercial.jpg";
import weightsImg from "@/assets/cat-weights.jpg";
import accessoriesImg from "@/assets/cat-accessories.jpg";

export type Condition = "New" | "Excellent" | "Very Good" | "Good" | "Refurbished";

export interface Category {
  slug: string;
  name: string;
  navLabel: string;
  blurb: string;
  h1: string;
  intro: string;
  image: string;
  subcategories: string[];
  keywords: string[];
}

export const categories: Category[] = [
  {
    slug: "strength-equipment",
    name: "Strength Equipment",
    navLabel: "Strength",
    blurb: "Weight Machines, Racks, Benches and More",
    h1: "Strength Equipment for Sale – New & Used",
    intro:
      "Browse commercial and home strength training equipment from trusted sellers: power racks, smith machines, cable machines, functional trainers, plate loaded machines and benches. Compare new, refurbished and used strength machines by brand, condition, price and location.",
    image: strengthImg,
    subcategories: [
      "Weight Machines",
      "Smith Machines",
      "Power Racks",
      "Squat Racks",
      "Cable Machines",
      "Functional Trainers",
      "Benches",
      "Plate Loaded Machines",
      "Leg Press Machines",
      "Chest Press Machines",
      "Lat Pulldown Machines",
      "Shoulder Press Machines",
    ],
    keywords: [
      "strength equipment",
      "strength training equipment",
      "commercial strength equipment",
      "gym strength machines",
      "weight training equipment",
    ],
  },
  {
    slug: "cardio-equipment",
    name: "Cardio Equipment",
    navLabel: "Cardio",
    blurb: "Treadmills, Bikes, Ellipticals and More",
    h1: "Cardio Equipment for Sale – Treadmills, Bikes & Ellipticals",
    intro:
      "Shop cardio machines for gyms, studios and home setups. Find commercial treadmills, exercise bikes, spin bikes, ellipticals, rowing machines, stair climbers and cross trainers in new, refurbished and used condition.",
    image: cardioImg,
    subcategories: [
      "Treadmills",
      "Commercial Treadmills",
      "Exercise Bikes",
      "Spin Bikes",
      "Ellipticals",
      "Rowing Machines",
      "Stair Climbers",
      "Cross Trainers",
    ],
    keywords: [
      "cardio equipment",
      "cardio machines",
      "commercial cardio equipment",
      "gym cardio machines",
      "fitness cardio equipment",
    ],
  },
  {
    slug: "home-gym-equipment",
    name: "Home Gym Equipment",
    navLabel: "Home Gym",
    blurb: "Build Your Home Gym",
    h1: "Home Gym Equipment for Sale",
    intro:
      "Everything you need to build a home gym in a garage, basement or spare room. Compact multi-gyms, adjustable dumbbells, folding treadmills, benches, racks and home fitness accessories at new and used prices.",
    image: homeImg,
    subcategories: [
      "Multi-Gyms",
      "Adjustable Dumbbells",
      "Folding Treadmills",
      "Home Benches",
      "Compact Racks",
      "Home Cardio",
    ],
    keywords: [
      "home gym equipment",
      "home workout equipment",
      "home fitness equipment",
      "home gym machines",
      "home weight equipment",
    ],
  },
  {
    slug: "commercial-gym-equipment",
    name: "Commercial Gym Equipment",
    navLabel: "Commercial",
    blurb: "For Gyms, Hotels, Schools and More",
    h1: "Commercial Gym Equipment for Sale",
    intro:
      "Outfit a gym, fitness center, hotel, school or corporate facility with commercial-grade fitness equipment. Buy full gym packages or single machines from verified sellers, with shipping assistance and installation support across the United States.",
    image: commercialImg,
    subcategories: [
      "Commercial Cardio",
      "Commercial Strength",
      "Selectorized Machines",
      "Plate Loaded",
      "Free Weight Packages",
      "Full Gym Packages",
    ],
    keywords: [
      "commercial gym equipment",
      "commercial fitness equipment",
      "professional gym equipment",
      "fitness center equipment",
      "gym equipment for commercial gyms",
    ],
  },
  {
    slug: "free-weights",
    name: "Free Weights",
    navLabel: "Free Weights",
    blurb: "Dumbbells, Barbells, Plates and More",
    h1: "Free Weights for Sale – Dumbbells, Barbells & Plates",
    intro:
      "Dumbbell sets, barbells, bumper plates, kettlebells, weight trees and storage racks. Buy new sets or save on used commercial free weights from gyms that are upgrading.",
    image: weightsImg,
    subcategories: [
      "Dumbbell Sets",
      "Barbells",
      "Weight Plates",
      "Bumper Plates",
      "Kettlebells",
      "Storage Racks",
    ],
    keywords: ["free weights", "dumbbells for sale", "used dumbbells", "weight plates", "barbells"],
  },
  {
    slug: "gym-accessories",
    name: "Gym Accessories",
    navLabel: "Accessories",
    blurb: "Belts, Bands, Mats and More",
    h1: "Gym Accessories for Sale",
    intro:
      "Finish your setup with gym flooring, mats, resistance bands, lifting belts, medicine balls, storage and studio accessories for home and commercial facilities.",
    image: accessoriesImg,
    subcategories: [
      "Gym Flooring",
      "Mats",
      "Resistance Bands",
      "Lifting Belts",
      "Medicine Balls",
      "Storage",
    ],
    keywords: ["gym accessories", "gym flooring", "fitness accessories", "gym mats"],
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export interface Brand {
  slug: string;
  name: string;
  intro: string;
  popularModels: string[];
  faqs: { q: string; a: string }[];
}

export const brands: Brand[] = [
  {
    slug: "life-fitness",
    name: "Life Fitness",
    intro:
      "Life Fitness is one of the most widely used commercial fitness brands in the world, found in health clubs, hotels and corporate gyms. Its cardio and strength lines are built for high-traffic use, which is why used Life Fitness equipment holds up well on the secondary market.",
    popularModels: ["Treadmill 95T", "Integrity Series Treadmill", "Multi Gym G7", "Signature Leg Press"],
    faqs: [
      {
        q: "Is used Life Fitness equipment reliable?",
        a: "Commercial Life Fitness machines are engineered for thousands of hours of use, so a well-maintained used unit often outlasts a new home-grade machine. Always check belt, deck and console condition before buying.",
      },
      {
        q: "Are parts still available for older Life Fitness models?",
        a: "Parts for most Life Fitness commercial series remain available through the manufacturer and third-party suppliers, though very old consoles can be harder to source.",
      },
    ],
  },
  {
    slug: "precor",
    name: "Precor",
    intro:
      "Precor built its reputation on elliptical cross trainers and low-impact cardio. Its EFX line is a fixture in commercial gyms, and refurbished Precor cardio is a popular way to equip a facility on a smaller budget.",
    popularModels: ["EFX 885", "EFX 546i", "TRM 833 Treadmill", "Discovery Series Racks"],
    faqs: [
      {
        q: "What is Precor best known for?",
        a: "Elliptical cross trainers. The EFX series is the brand's signature product and the most common Precor machine on the used market.",
      },
    ],
  },
  {
    slug: "technogym",
    name: "Technogym",
    intro:
      "Technogym is an Italian premium fitness brand used in luxury clubs, hotels and boutique studios. Its Excite and Selection lines combine design-led styling with connected training features.",
    popularModels: ["Excite Run", "Excite Bike", "Selection Pro Leg Press", "Skillmill"],
    faqs: [
      {
        q: "Is Technogym worth buying used?",
        a: "Yes, particularly for hotels and boutique studios where appearance matters. Confirm that connected consoles are unlocked and serviceable before purchase.",
      },
    ],
  },
  {
    slug: "cybex",
    name: "Cybex",
    intro:
      "Cybex is known for biomechanically researched strength machines and the Arc Trainer. Its selectorized lines are common in university, hospital and commercial gym settings.",
    popularModels: ["Arc Trainer 770A", "Eagle Chest Press", "VR3 Lat Pulldown", "Bravo Functional Trainer"],
    faqs: [
      { q: "What is the Cybex Arc Trainer?", a: "A low-impact cardio machine that combines an elliptical-style path with adjustable incline and resistance." },
    ],
  },
  {
    slug: "matrix",
    name: "Matrix Fitness",
    intro:
      "Matrix Fitness supplies cardio, strength and functional equipment to gyms, hotels and multi-family facilities, with a strong reputation for durable consoles and quiet drives.",
    popularModels: ["Exercise Bike IC7", "T7x Treadmill", "Ultra Series Leg Press", "Versa Functional Trainer"],
    faqs: [
      { q: "Is Matrix good for apartment gyms?", a: "Yes — the cardio line is compact, quiet and simple to service, which suits unstaffed apartment and hotel gyms." },
    ],
  },
  {
    slug: "hammer-strength",
    name: "Hammer Strength",
    intro:
      "Hammer Strength plate-loaded machines are a staple of serious training floors. Built heavy and simple, they are among the most durable machines on the used market.",
    popularModels: ["Iso-Lateral Chest Press", "Ground Base Squat", "Plate Loaded Row", "HD Elite Rack"],
    faqs: [
      { q: "Why is Hammer Strength popular used?", a: "Plate-loaded machines have no electronics and few wear parts, so a twenty-year-old unit can still perform like new after new pads and paint." },
    ],
  },
  {
    slug: "nordictrack",
    name: "NordicTrack",
    intro:
      "NordicTrack focuses on home cardio — treadmills, bikes and rowers with interactive training. A good entry point for a home gym at a lower price than commercial machines.",
    popularModels: ["Commercial 1750 Treadmill", "S22i Studio Bike", "RW900 Rower", "Elite Elliptical"],
    faqs: [
      { q: "Is NordicTrack commercial grade?", a: "No. The machines are home-grade despite the 'Commercial' model names, and are best suited to household use rather than a staffed gym floor." },
    ],
  },
  {
    slug: "rogue-fitness",
    name: "Rogue Fitness",
    intro:
      "Rogue builds racks, rigs, barbells and conditioning gear for strength-focused gyms and garage setups. Its equipment retains value strongly on the used market.",
    popularModels: ["R-3 Power Rack", "Ohio Bar", "Monster Lite Rig", "Adjustable Bench 3.0"],
    faqs: [
      { q: "Does Rogue equipment hold value?", a: "Rogue racks and bars typically resell for a high percentage of retail because they are simple, heavily built and always in demand." },
    ],
  },
];

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug);

export interface Listing {
  slug: string;
  title: string;
  brand: string;
  brandSlug: string;
  model: string;
  category: string;
  subcategory: string;
  condition: Condition;
  price: number;
  city: string;
  state: string;
  stateSlug: string;
  usage: "Commercial" | "Home";
  muscleGroup: string;
  resistance: string;
  available: boolean;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  warranty: string;
  shipping: string;
  seller: { name: string; type: string; rating: number; reviews: number; since: number };
  featured?: boolean;
}

const L = (l: Listing) => l;

export const listings: Listing[] = [
  L({
    slug: "used-life-fitness-treadmill-95t",
    title: "Life Fitness Treadmill 95T",
    brand: "Life Fitness",
    brandSlug: "life-fitness",
    model: "95T",
    category: "cardio-equipment",
    subcategory: "Commercial Treadmills",
    condition: "New",
    price: 4299,
    city: "Dallas",
    state: "Texas",
    stateSlug: "texas",
    usage: "Commercial",
    muscleGroup: "Full Body",
    resistance: "Motorized",
    available: true,
    image: cardioImg,
    description:
      "A club-grade Life Fitness 95T treadmill built for continuous use on a busy gym floor. Heavy-gauge frame, cushioned deck and a console that stands up to daily commercial traffic. Suitable for gyms, hotels, corporate facilities and serious home setups.",
    specs: [
      { label: "Motor", value: "4.0 HP AC" },
      { label: "Speed range", value: "0.5 – 14 mph" },
      { label: "Incline", value: "0 – 15%" },
      { label: "Running surface", value: '22" x 60"' },
      { label: "Dimensions", value: '84" L x 34" W x 60" H' },
      { label: "Weight", value: "418 lbs" },
      { label: "Max user weight", value: "400 lbs" },
      { label: "Power", value: "110V dedicated outlet" },
    ],
    warranty: "2-year parts warranty from the seller",
    shipping: "Freight shipping nationwide, curbside or inside delivery available",
    seller: { name: "Lone Star Fitness Supply", type: "Verified Dealer", rating: 4.9, reviews: 214, since: 2014 },
    featured: true,
  }),
  L({
    slug: "used-precor-elliptical-efx-885",
    title: "Precor Elliptical EFX 885",
    brand: "Precor",
    brandSlug: "precor",
    model: "EFX 885",
    category: "cardio-equipment",
    subcategory: "Ellipticals",
    condition: "Excellent",
    price: 2499,
    city: "Chicago",
    state: "Illinois",
    stateSlug: "illinois",
    usage: "Commercial",
    muscleGroup: "Full Body",
    resistance: "Magnetic",
    available: true,
    image: cardioImg,
    description:
      "Refurbished Precor EFX 885 cross trainer with adjustable CrossRamp incline and moving handlebars. Serviced, cleaned and tested, with new wear parts fitted where needed.",
    specs: [
      { label: "CrossRamp", value: "13 – 40 degrees" },
      { label: "Resistance levels", value: "20" },
      { label: "Dimensions", value: '80" L x 32" W x 68" H' },
      { label: "Weight", value: "375 lbs" },
      { label: "Max user weight", value: "350 lbs" },
      { label: "Console", value: "P80 touchscreen" },
    ],
    warranty: "90-day refurbishment warranty",
    shipping: "Freight shipping, crated. Local delivery in Illinois available.",
    seller: { name: "Midwest Gym Exchange", type: "Verified Dealer", rating: 4.8, reviews: 168, since: 2011 },
    featured: true,
  }),
  L({
    slug: "used-rogue-power-rack-r-3",
    title: "Rogue Fitness Power Rack R-3",
    brand: "Rogue Fitness",
    brandSlug: "rogue-fitness",
    model: "R-3",
    category: "strength-equipment",
    subcategory: "Power Racks",
    condition: "Good",
    price: 1599,
    city: "Phoenix",
    state: "Arizona",
    stateSlug: "arizona",
    usage: "Home",
    muscleGroup: "Full Body",
    resistance: "Free Weight",
    available: true,
    image: strengthImg,
    description:
      "Rogue R-3 power rack with pull-up bar, J-cups and safety pins. Surface scuffs from garage use, structurally excellent. A proven rack for squats, presses and rack pulls.",
    specs: [
      { label: "Steel", value: '2" x 3" 11-gauge' },
      { label: "Height", value: '90.375"' },
      { label: "Footprint", value: '48" x 53"' },
      { label: "Weight", value: "215 lbs" },
      { label: "Hole spacing", value: "Westside" },
    ],
    warranty: "Sold as-is",
    shipping: "Local pickup in Phoenix, or buyer-arranged freight",
    seller: { name: "Desert Barbell Co.", type: "Verified Seller", rating: 4.7, reviews: 42, since: 2019 },
    featured: true,
  }),
  L({
    slug: "matrix-exercise-bike-ic7",
    title: "Matrix Exercise Bike IC7",
    brand: "Matrix Fitness",
    brandSlug: "matrix",
    model: "IC7",
    category: "cardio-equipment",
    subcategory: "Spin Bikes",
    condition: "New",
    price: 1899,
    city: "Los Angeles",
    state: "California",
    stateSlug: "california",
    usage: "Commercial",
    muscleGroup: "Lower Body",
    resistance: "Magnetic",
    available: true,
    image: homeImg,
    description:
      "New Matrix IC7 indoor cycle with magnetic resistance and a power-meter console. A studio favourite for boutique cycling classes and premium apartment gyms.",
    specs: [
      { label: "Resistance", value: "Magnetic, 100 levels" },
      { label: "Drive", value: "Poly-V belt" },
      { label: "Dimensions", value: '48" L x 22" W x 45" H' },
      { label: "Weight", value: "134 lbs" },
      { label: "Max user weight", value: "330 lbs" },
    ],
    warranty: "Manufacturer commercial warranty",
    shipping: "Free freight shipping in the continental US",
    seller: { name: "Pacific Fitness Distributors", type: "Verified Dealer", rating: 4.9, reviews: 305, since: 2009 },
    featured: true,
  }),
  L({
    slug: "used-life-fitness-multi-gym-g7",
    title: "Life Fitness Multi Gym G7",
    brand: "Life Fitness",
    brandSlug: "life-fitness",
    model: "G7",
    category: "home-gym-equipment",
    subcategory: "Multi-Gyms",
    condition: "Very Good",
    price: 3499,
    city: "Miami",
    state: "Florida",
    stateSlug: "florida",
    usage: "Home",
    muscleGroup: "Full Body",
    resistance: "Selectorized",
    available: true,
    image: commercialImg,
    description:
      "Life Fitness G7 home multi-gym with dual adjustable pulleys and a compact footprint. Cables and pads inspected; upholstery in very good condition.",
    specs: [
      { label: "Weight stack", value: "160 lbs" },
      { label: "Cable ratio", value: "2:1" },
      { label: "Footprint", value: '58" x 45"' },
      { label: "Height", value: '83"' },
      { label: "Weight", value: "480 lbs" },
    ],
    warranty: "30-day functional guarantee",
    shipping: "Freight shipping; disassembly and reassembly quoted separately",
    seller: { name: "South Florida Gym Outlet", type: "Verified Dealer", rating: 4.6, reviews: 97, since: 2016 },
    featured: true,
  }),
  L({
    slug: "used-rubber-hex-dumbbell-set-5-50-lbs",
    title: "Rogue Hex Dumbbell Set 5–50 lbs",
    brand: "Rogue Fitness",
    brandSlug: "rogue-fitness",
    model: "Hex 5-50",
    category: "free-weights",
    subcategory: "Dumbbell Sets",
    condition: "Good",
    price: 1199,
    city: "Atlanta",
    state: "Georgia",
    stateSlug: "georgia",
    usage: "Commercial",
    muscleGroup: "Full Body",
    resistance: "Free Weight",
    available: true,
    image: weightsImg,
    description:
      "Complete rubber hex dumbbell set from 5 to 50 lbs in 5 lb increments, with a two-tier storage rack. Normal gym-floor wear to the rubber heads.",
    specs: [
      { label: "Range", value: "5 – 50 lbs, 5 lb increments" },
      { label: "Pairs", value: "10" },
      { label: "Total weight", value: "550 lbs per side set" },
      { label: "Rack", value: "2-tier included" },
    ],
    warranty: "Sold as-is",
    shipping: "Freight on a pallet, or local pickup in Atlanta",
    seller: { name: "Peach State Fitness", type: "Verified Seller", rating: 4.8, reviews: 61, since: 2018 },
    featured: true,
  }),
  L({
    slug: "used-hammer-strength-iso-lateral-chest-press",
    title: "Hammer Strength Iso-Lateral Chest Press",
    brand: "Hammer Strength",
    brandSlug: "hammer-strength",
    model: "Iso-Lateral",
    category: "strength-equipment",
    subcategory: "Chest Press Machines",
    condition: "Refurbished",
    price: 2295,
    city: "Houston",
    state: "Texas",
    stateSlug: "texas",
    usage: "Commercial",
    muscleGroup: "Chest",
    resistance: "Plate Loaded",
    available: true,
    image: strengthImg,
    description:
      "Fully refurbished Hammer Strength Iso-Lateral chest press: frame repainted, new upholstery, new bearings and handle grips. Independent converging arms.",
    specs: [
      { label: "Loading", value: "Plate loaded, olympic sleeves" },
      { label: "Footprint", value: '62" x 58"' },
      { label: "Weight", value: "440 lbs" },
      { label: "Upholstery", value: "New, colour options available" },
    ],
    warranty: "1-year frame warranty after refurbishment",
    shipping: "Freight shipping nationwide",
    seller: { name: "Gulf Coast Gym Refurb", type: "Verified Dealer", rating: 4.9, reviews: 143, since: 2012 },
  }),
  L({
    slug: "used-cybex-arc-trainer-770a",
    title: "Cybex Arc Trainer 770A",
    brand: "Cybex",
    brandSlug: "cybex",
    model: "770A",
    category: "cardio-equipment",
    subcategory: "Cross Trainers",
    condition: "Very Good",
    price: 2750,
    city: "New York",
    state: "New York",
    stateSlug: "new-york",
    usage: "Commercial",
    muscleGroup: "Full Body",
    resistance: "Magnetic",
    available: true,
    image: cardioImg,
    description:
      "Cybex 770A Arc Trainer from a closed corporate facility. Low hours, console fully functional, low-impact stride with adjustable incline.",
    specs: [
      { label: "Incline range", value: "1 – 10" },
      { label: "Resistance levels", value: "100" },
      { label: "Dimensions", value: '71" L x 32" W x 68" H' },
      { label: "Weight", value: "395 lbs" },
    ],
    warranty: "60-day parts warranty",
    shipping: "Freight; inside delivery available in the New York metro",
    seller: { name: "Empire Fitness Liquidators", type: "Verified Dealer", rating: 4.7, reviews: 88, since: 2015 },
  }),
  L({
    slug: "technogym-excite-run-treadmill",
    title: "Technogym Excite Run Treadmill",
    brand: "Technogym",
    brandSlug: "technogym",
    model: "Excite Run",
    category: "commercial-gym-equipment",
    subcategory: "Commercial Cardio",
    condition: "Excellent",
    price: 5450,
    city: "Las Vegas",
    state: "Nevada",
    stateSlug: "nevada",
    usage: "Commercial",
    muscleGroup: "Full Body",
    resistance: "Motorized",
    available: true,
    image: cardioImg,
    description:
      "Premium Technogym Excite Run treadmill removed from a hotel fitness suite during a refit. Excellent cosmetic condition with a connected console.",
    specs: [
      { label: "Speed range", value: "0.5 – 15.5 mph" },
      { label: "Incline", value: "0 – 15%" },
      { label: "Deck", value: "Cushioned, commercial" },
      { label: "Weight", value: "440 lbs" },
    ],
    warranty: "90-day seller warranty",
    shipping: "Crated freight, nationwide",
    seller: { name: "Vegas Hospitality Fitness", type: "Verified Dealer", rating: 4.8, reviews: 54, since: 2017 },
  }),
  L({
    slug: "used-precor-discovery-squat-rack",
    title: "Precor Discovery Squat Rack",
    brand: "Precor",
    brandSlug: "precor",
    model: "Discovery DPL",
    category: "strength-equipment",
    subcategory: "Squat Racks",
    condition: "Good",
    price: 1450,
    city: "Denver",
    state: "Colorado",
    stateSlug: "colorado",
    usage: "Commercial",
    muscleGroup: "Legs",
    resistance: "Free Weight",
    available: true,
    image: strengthImg,
    description:
      "Commercial Precor Discovery series squat rack with integrated plate storage and adjustable safety spotters. Solid frame, minor paint wear.",
    specs: [
      { label: "Footprint", value: '68" x 60"' },
      { label: "Height", value: '92"' },
      { label: "Plate storage", value: "6 posts" },
      { label: "Weight", value: "330 lbs" },
    ],
    warranty: "Sold as-is",
    shipping: "Local delivery in Colorado; freight quoted on request",
    seller: { name: "Rocky Mountain Gym Gear", type: "Verified Seller", rating: 4.6, reviews: 37, since: 2020 },
  }),
  L({
    slug: "matrix-ultra-leg-press",
    title: "Matrix Ultra Series Leg Press",
    brand: "Matrix Fitness",
    brandSlug: "matrix",
    model: "Ultra G7-S70",
    category: "strength-equipment",
    subcategory: "Leg Press Machines",
    condition: "New",
    price: 6890,
    city: "Seattle",
    state: "Washington",
    stateSlug: "washington",
    usage: "Commercial",
    muscleGroup: "Legs",
    resistance: "Selectorized",
    available: true,
    image: commercialImg,
    description:
      "New Matrix Ultra Series leg press with a 400 lb selectorized stack, converging footplate and easy weight selection for high-traffic floors.",
    specs: [
      { label: "Weight stack", value: "400 lbs" },
      { label: "Footprint", value: '78" x 48"' },
      { label: "Weight", value: "710 lbs" },
      { label: "Upholstery", value: "Commercial vinyl" },
    ],
    warranty: "Manufacturer commercial warranty",
    shipping: "Freight shipping, installation available",
    seller: { name: "Northwest Fitness Solutions", type: "Verified Dealer", rating: 5, reviews: 76, since: 2013 },
  }),
  L({
    slug: "used-concept-rowing-machine",
    title: "Commercial Rowing Machine – Model D",
    brand: "Matrix Fitness",
    brandSlug: "matrix",
    model: "Rower D",
    category: "cardio-equipment",
    subcategory: "Rowing Machines",
    condition: "Very Good",
    price: 749,
    city: "Boston",
    state: "Massachusetts",
    stateSlug: "massachusetts",
    usage: "Commercial",
    muscleGroup: "Full Body",
    resistance: "Air",
    available: true,
    image: homeImg,
    description:
      "Air rower from a boutique studio closure. Chain freshly lubricated, monitor tested, seat rollers replaced.",
    specs: [
      { label: "Resistance", value: "Air, 1 – 10 damper" },
      { label: "Length", value: '96"' },
      { label: "Weight", value: "57 lbs" },
      { label: "Storage", value: "Separates into two pieces" },
    ],
    warranty: "30-day functional guarantee",
    shipping: "Parcel shipping nationwide",
    seller: { name: "Bay State Fitness Resale", type: "Verified Seller", rating: 4.9, reviews: 128, since: 2016 },
  }),
  L({
    slug: "used-cybex-vr3-lat-pulldown",
    title: "Cybex VR3 Lat Pulldown",
    brand: "Cybex",
    brandSlug: "cybex",
    model: "VR3",
    category: "strength-equipment",
    subcategory: "Lat Pulldown Machines",
    condition: "Refurbished",
    price: 1975,
    city: "Charlotte",
    state: "North Carolina",
    stateSlug: "north-carolina",
    usage: "Commercial",
    muscleGroup: "Back",
    resistance: "Selectorized",
    available: true,
    image: strengthImg,
    description:
      "Refurbished Cybex VR3 lat pulldown with new cables, new upholstery and a repainted frame. Ready for immediate commercial use.",
    specs: [
      { label: "Weight stack", value: "300 lbs" },
      { label: "Footprint", value: '56" x 48"' },
      { label: "Height", value: '84"' },
      { label: "Weight", value: "515 lbs" },
    ],
    warranty: "1-year frame warranty",
    shipping: "Freight shipping nationwide",
    seller: { name: "Carolina Gym Works", type: "Verified Dealer", rating: 4.8, reviews: 92, since: 2014 },
  }),
  L({
    slug: "nordictrack-commercial-1750-treadmill",
    title: "NordicTrack Commercial 1750 Treadmill",
    brand: "NordicTrack",
    brandSlug: "nordictrack",
    model: "Commercial 1750",
    category: "home-gym-equipment",
    subcategory: "Folding Treadmills",
    condition: "Good",
    price: 899,
    city: "Orlando",
    state: "Florida",
    stateSlug: "florida",
    usage: "Home",
    muscleGroup: "Full Body",
    resistance: "Motorized",
    available: true,
    image: cardioImg,
    description:
      "Folding home treadmill with incline and decline, touchscreen console and cushioned deck. Lightly used in a spare room.",
    specs: [
      { label: "Motor", value: "3.5 CHP" },
      { label: "Incline", value: "-3% to 15%" },
      { label: "Deck", value: '20" x 60"' },
      { label: "Folded footprint", value: '39" x 38"' },
    ],
    warranty: "Sold as-is",
    shipping: "Local pickup in Orlando preferred",
    seller: { name: "Sunshine Home Fitness", type: "Verified Seller", rating: 4.5, reviews: 23, since: 2021 },
  }),
  L({
    slug: "commercial-gym-package-20-stations",
    title: "Commercial Gym Package – 20 Stations",
    brand: "Life Fitness",
    brandSlug: "life-fitness",
    model: "Mixed Package",
    category: "commercial-gym-equipment",
    subcategory: "Full Gym Packages",
    condition: "Very Good",
    price: 38500,
    city: "Nashville",
    state: "Tennessee",
    stateSlug: "tennessee",
    usage: "Commercial",
    muscleGroup: "Full Body",
    resistance: "Mixed",
    available: true,
    image: commercialImg,
    description:
      "Complete gym package from a closed fitness center: 8 cardio machines, 10 selectorized strength stations, a full dumbbell set with racks and 2 benches. Ideal for a new studio or facility fit-out.",
    specs: [
      { label: "Cardio", value: "8 units (treadmills, bikes, ellipticals)" },
      { label: "Strength", value: "10 selectorized stations" },
      { label: "Free weights", value: "5 – 75 lb dumbbell set with racks" },
      { label: "Floor space needed", value: "Approx. 2,500 sq ft" },
    ],
    warranty: "90-day package warranty",
    shipping: "Full truckload freight, installation available",
    seller: { name: "Music City Fitness Assets", type: "Verified Dealer", rating: 4.9, reviews: 66, since: 2010 },
  }),
  L({
    slug: "used-bumper-plate-set-260-lbs",
    title: "Bumper Plate Set – 260 lbs",
    brand: "Rogue Fitness",
    brandSlug: "rogue-fitness",
    model: "Echo Bumper",
    category: "free-weights",
    subcategory: "Bumper Plates",
    condition: "Good",
    price: 640,
    city: "Austin",
    state: "Texas",
    stateSlug: "texas",
    usage: "Home",
    muscleGroup: "Full Body",
    resistance: "Free Weight",
    available: true,
    image: weightsImg,
    description:
      "260 lb bumper plate set: pairs of 10, 15, 25, 35 and 45 lb plates. Some scuffing, all true to weight and free of cracks.",
    specs: [
      { label: "Set", value: "2x10, 2x15, 2x25, 2x35, 2x45 lbs" },
      { label: "Bore", value: "50mm stainless insert" },
      { label: "Total", value: "260 lbs" },
    ],
    warranty: "Sold as-is",
    shipping: "Local pickup in Austin, or freight on a pallet",
    seller: { name: "ATX Barbell Resale", type: "Verified Seller", rating: 4.7, reviews: 31, since: 2020 },
  }),
  L({
    slug: "gym-flooring-rubber-tiles-500-sqft",
    title: "Rubber Gym Flooring – 500 sq ft",
    brand: "Matrix Fitness",
    brandSlug: "matrix",
    model: "Interlocking Tile",
    category: "gym-accessories",
    subcategory: "Gym Flooring",
    condition: "Excellent",
    price: 1150,
    city: "Philadelphia",
    state: "Pennsylvania",
    stateSlug: "pennsylvania",
    usage: "Commercial",
    muscleGroup: "N/A",
    resistance: "N/A",
    available: true,
    image: accessoriesImg,
    description:
      "500 sq ft of 8mm interlocking rubber gym tiles pulled from a studio refit. Cleaned and palletised, ready to install.",
    specs: [
      { label: "Coverage", value: "500 sq ft" },
      { label: "Thickness", value: "8mm" },
      { label: "Type", value: "Interlocking tile" },
    ],
    warranty: "Sold as-is",
    shipping: "Freight on two pallets",
    seller: { name: "Keystone Fitness Surplus", type: "Verified Seller", rating: 4.6, reviews: 44, since: 2019 },
  }),
  L({
    slug: "technogym-selection-pro-shoulder-press",
    title: "Technogym Selection Pro Shoulder Press",
    brand: "Technogym",
    brandSlug: "technogym",
    model: "Selection Pro",
    category: "strength-equipment",
    subcategory: "Shoulder Press Machines",
    condition: "Excellent",
    price: 3980,
    city: "San Diego",
    state: "California",
    stateSlug: "california",
    usage: "Commercial",
    muscleGroup: "Shoulders",
    resistance: "Selectorized",
    available: true,
    image: commercialImg,
    description:
      "Technogym Selection Pro shoulder press in excellent condition from a boutique studio. Smooth stack, clean upholstery, premium finish.",
    specs: [
      { label: "Weight stack", value: "220 lbs" },
      { label: "Footprint", value: '52" x 48"' },
      { label: "Weight", value: "460 lbs" },
    ],
    warranty: "90-day seller warranty",
    shipping: "Freight shipping; local delivery in Southern California",
    seller: { name: "Pacific Fitness Distributors", type: "Verified Dealer", rating: 4.9, reviews: 305, since: 2009 },
  }),
];

export const listingBySlug = (slug: string) => listings.find((l) => l.slug === slug);

export const conditions: Condition[] = ["New", "Excellent", "Very Good", "Good", "Refurbished"];

export interface Guide {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  body: { heading: string; paragraphs: string[] }[];
  related: string[];
}

export const guides: Guide[] = [
  {
    slug: "best-gym-equipment-for-a-home-gym",
    title: "Best Gym Equipment for a Home Gym",
    description:
      "How to build a complete home gym: the equipment that earns its floor space, what to buy new, and what to buy used.",
    readTime: "8 min read",
    body: [
      {
        heading: "Start with the movements, not the machines",
        paragraphs: [
          "A home gym works when it covers squat, hinge, push, pull and carry. A rack, a barbell, plates and an adjustable bench cover all five for less than most single selectorized machines cost.",
          "Add cardio second. A treadmill or rower is easy to justify once the strength base is in place, and the used market for cardio is far larger than for racks.",
        ],
      },
      {
        heading: "A realistic starting kit",
        paragraphs: [
          "Power rack or squat rack, olympic barbell, 300 lb of plates, adjustable bench, and a pair of adjustable dumbbells. Buying that kit used typically costs 40–60% less than new, and racks and plates are almost impossible to damage.",
          "Leave space to walk around the rack, and check ceiling height before buying — most racks need at least 8 ft, more if you plan to press overhead.",
        ],
      },
      {
        heading: "What to buy new",
        paragraphs: [
          "Buy barbells and benches new if you can. Bar knurling and bench padding are the parts that wear in ways you feel every session, and the price gap on the used market is usually small.",
        ],
      },
    ],
    related: ["home-gym-equipment", "free-weights", "strength-equipment"],
  },
  {
    slug: "best-commercial-gym-equipment",
    title: "Best Commercial Gym Equipment",
    description:
      "What belongs on a commercial gym floor, how many of each machine you need, and how to budget a full fit-out.",
    readTime: "9 min read",
    body: [
      {
        heading: "Plan by member count",
        paragraphs: [
          "A common planning ratio is one cardio machine per 8–10 peak-hour members and one strength station per 12–15. Undershoot on cardio and you get queues at 6pm; overshoot and you pay rent on idle machines.",
        ],
      },
      {
        heading: "The core floor",
        paragraphs: [
          "Treadmills, upright and recumbent bikes, ellipticals and rowers on the cardio side. On strength: chest press, shoulder press, lat pulldown, row, leg press, leg extension and curl, plus a free weight area with racks, benches and dumbbells to 100 lbs.",
          "Functional trainers and cable machines deliver the widest exercise range per square foot, which matters in smaller studios.",
        ],
      },
      {
        heading: "New, refurbished or used",
        paragraphs: [
          "Many operators mix: new cardio where consoles and warranty matter to members, refurbished plate-loaded and selectorized strength where the frames last decades. That mix commonly cuts fit-out cost by a third.",
        ],
      },
    ],
    related: ["commercial-gym-equipment", "strength-equipment", "cardio-equipment"],
  },
  {
    slug: "how-to-choose-a-treadmill",
    title: "How to Choose a Treadmill",
    description:
      "Motor size, deck dimensions, cushioning and console features — what actually matters when buying a treadmill.",
    readTime: "7 min read",
    body: [
      {
        heading: "Motor and duty rating",
        paragraphs: [
          "For home use, look for at least 3.0 CHP. For any shared or commercial setting, an AC motor rated for continuous duty is the difference between a machine that lasts ten years and one that lasts two.",
        ],
      },
      {
        heading: "Deck size and cushioning",
        paragraphs: [
          'Runners want at least a 20" x 60" belt; walkers can go shorter. Cushioned decks reduce joint load but wear out — on a used machine, ask how many hours are on the deck and whether it has been flipped or replaced.',
        ],
      },
      {
        heading: "Buying used",
        paragraphs: [
          "Run it at speed before you buy. Listen for bearing noise, check for belt slip under load, and confirm the incline motor moves through the whole range.",
        ],
      },
    ],
    related: ["cardio-equipment", "commercial-gym-equipment"],
  },
  {
    slug: "commercial-vs-home-gym-equipment",
    title: "Commercial vs Home Gym Equipment",
    description:
      "The real differences in build, warranty, footprint and cost between commercial-grade and home fitness equipment.",
    readTime: "6 min read",
    body: [
      {
        heading: "Build and duty cycle",
        paragraphs: [
          "Commercial machines use heavier steel, larger bearings and motors rated for continuous use. Home machines are built for a few hours a week and priced accordingly.",
        ],
      },
      {
        heading: "Footprint and power",
        paragraphs: [
          "Commercial cardio is heavier and often needs a dedicated circuit. Measure doorways, check floor loading and confirm outlets before committing to a commercial machine at home.",
        ],
      },
      {
        heading: "Which is better value?",
        paragraphs: [
          "Used commercial equipment often costs the same as new home equipment while lasting several times longer. The trade-off is size, weight and moving cost.",
        ],
      },
    ],
    related: ["commercial-gym-equipment", "home-gym-equipment"],
  },
  {
    slug: "new-vs-used-gym-equipment",
    title: "New vs Used Gym Equipment",
    description: "When buying used gym equipment saves money, and when new is the better decision.",
    readTime: "6 min read",
    body: [
      {
        heading: "Where used wins",
        paragraphs: [
          "Plate-loaded machines, racks, benches, dumbbells and plates have almost nothing to fail. Buying these used routinely saves 50% or more with no practical downside.",
        ],
      },
      {
        heading: "Where new wins",
        paragraphs: [
          "Anything with a motor, a touchscreen or a connected subscription. Warranty and parts support matter most on the machines that have the most to go wrong.",
        ],
      },
      {
        heading: "Refurbished sits in between",
        paragraphs: [
          "A properly refurbished machine has new wear parts, new upholstery and a warranty from the refurbisher. Ask exactly what was replaced — 'refurbished' is not a regulated term.",
        ],
      },
    ],
    related: ["used-gym-equipment", "commercial-gym-equipment"],
  },
  {
    slug: "how-much-does-gym-equipment-cost",
    title: "How Much Does Gym Equipment Cost?",
    description:
      "Typical price ranges for treadmills, racks, machines, dumbbells and full gym packages, new and used.",
    readTime: "7 min read",
    body: [
      {
        heading: "Typical ranges",
        paragraphs: [
          "Commercial treadmills run roughly $4,000–$9,000 new and $1,500–$4,500 used. Selectorized strength stations are about $3,000–$7,000 new and $1,200–$3,000 used. Power racks span $600–$3,000 depending on gauge and options.",
          "Dumbbell sets are priced by the pound: expect roughly $1.50–$2.50 per pound new and $0.90–$1.60 used, before freight.",
        ],
      },
      {
        heading: "Full fit-outs",
        paragraphs: [
          "A small studio fit-out typically lands between $25,000 and $60,000. A full commercial gym floor commonly runs $150,000 to $400,000 new, or a third to half that with a mixed new and refurbished package.",
        ],
      },
      {
        heading: "Don't forget freight",
        paragraphs: [
          "Freight, liftgate, inside delivery and installation can add 10–20% to a heavy equipment order. Always get these quoted before you compare prices between sellers.",
        ],
      },
    ],
    related: ["used-gym-equipment", "commercial-gym-equipment"],
  },
  {
    slug: "how-to-buy-used-gym-equipment",
    title: "How to Buy Used Gym Equipment",
    description: "A practical process for finding, vetting and paying for used gym equipment safely.",
    readTime: "8 min read",
    body: [
      {
        heading: "Decide the spec before you shop",
        paragraphs: [
          "Write down the machines, the maximum footprint and the budget. Used inventory changes daily, and a clear spec keeps you from buying whatever happens to be cheap that week.",
        ],
      },
      {
        heading: "Vet the seller",
        paragraphs: [
          "Look for a trading history, clear photos of the actual unit rather than stock images, and a written description of faults. Ask for a short video of the machine running.",
        ],
      },
      {
        heading: "Agree freight and payment terms in writing",
        paragraphs: [
          "Confirm who crates the equipment, who pays for liftgate service, and what happens if the machine arrives damaged. Pay through a traceable method, never by irreversible transfer to an unverified seller.",
        ],
      },
    ],
    related: ["used-gym-equipment"],
  },
  {
    slug: "how-to-inspect-used-gym-equipment",
    title: "How to Inspect Used Gym Equipment",
    description: "A checklist for inspecting used cardio, selectorized and plate-loaded equipment before you buy.",
    readTime: "6 min read",
    body: [
      {
        heading: "Cardio checklist",
        paragraphs: [
          "Run the machine for five minutes at moderate speed. Check belt tracking, deck wear, incline motor travel, console functions, heart-rate contacts and any grinding from the drive.",
        ],
      },
      {
        heading: "Selectorized checklist",
        paragraphs: [
          "Move the full stack through its range. Frayed cables, sticky pulleys, worn bushings and torn upholstery are the usual issues — all repairable, but they should affect the price.",
        ],
      },
      {
        heading: "Plate-loaded checklist",
        paragraphs: [
          "Look at welds, sleeve straightness and bearing smoothness. Cosmetic rust and faded paint are easy fixes; a cracked weld is not.",
        ],
      },
    ],
    related: ["used-gym-equipment", "strength-equipment"],
  },
  {
    slug: "gym-equipment-maintenance-guide",
    title: "Gym Equipment Maintenance Guide",
    description: "Daily, monthly and annual maintenance that keeps gym equipment safe and extends its life.",
    readTime: "7 min read",
    body: [
      {
        heading: "Daily",
        paragraphs: [
          "Wipe down contact surfaces, check that pins and collars are present, and log anything that sounds or feels wrong. Most expensive failures start as a noise someone ignored.",
        ],
      },
      {
        heading: "Monthly",
        paragraphs: [
          "Vacuum under treadmill motor covers, check belt tension and tracking, inspect cables for fraying, and torque rack and machine bolts.",
        ],
      },
      {
        heading: "Annually",
        paragraphs: [
          "Have cardio serviced professionally, replace worn cables and pads, and re-lubricate guide rods. Keep a maintenance log — it also raises resale value.",
        ],
      },
    ],
    related: ["commercial-gym-equipment", "used-gym-equipment"],
  },
  {
    slug: "best-gym-equipment-brands",
    title: "Best Gym Equipment Brands",
    description: "How the major gym equipment brands compare on build quality, parts support and resale value.",
    readTime: "8 min read",
    body: [
      {
        heading: "Commercial mainstays",
        paragraphs: [
          "Life Fitness, Precor, Technogym, Cybex, Matrix and Hammer Strength dominate commercial floors. All six have strong parts networks, which matters more than brand preference when a machine goes down.",
        ],
      },
      {
        heading: "Strength specialists",
        paragraphs: [
          "Hammer Strength and Rogue are the go-to names for plate-loaded and rack equipment, and both hold resale value unusually well.",
        ],
      },
      {
        heading: "Home brands",
        paragraphs: [
          "NordicTrack and similar home brands offer strong feature sets for the price, but are not built for shared or commercial use.",
        ],
      },
    ],
    related: ["life-fitness", "precor", "hammer-strength"],
  },
  {
    slug: "how-to-build-a-commercial-gym",
    title: "How to Build a Commercial Gym",
    description: "Space planning, equipment mix, budget and timeline for opening a commercial gym.",
    readTime: "10 min read",
    body: [
      {
        heading: "Space planning",
        paragraphs: [
          "Allow roughly 25–35 sq ft per cardio machine and 40–50 sq ft per strength station once walkways are counted. Free weight areas need more, plus reinforced flooring.",
        ],
      },
      {
        heading: "Equipment mix and phasing",
        paragraphs: [
          "Open with the machines members use most and phase in specialist equipment once you know your traffic. Leasing or buying refurbished for phase one frees cash for marketing.",
        ],
      },
      {
        heading: "Timeline",
        paragraphs: [
          "New commercial equipment can carry long lead times. Used and refurbished packages usually ship within weeks, which is often the deciding factor for an opening date.",
        ],
      },
    ],
    related: ["commercial-gym-equipment", "strength-equipment"],
  },
  {
    slug: "how-much-does-it-cost-to-open-a-gym",
    title: "How Much Does It Cost to Open a Gym?",
    description: "A breakdown of the startup costs behind opening a gym, from fit-out to first-year operating budget.",
    readTime: "9 min read",
    body: [
      {
        heading: "Startup line items",
        paragraphs: [
          "Lease deposit and build-out, equipment, flooring, mirrors, sound, software, insurance, signage and launch marketing. Equipment is usually the largest single line, and the one with the most room to negotiate.",
        ],
      },
      {
        heading: "Typical totals",
        paragraphs: [
          "A small studio commonly opens for $80,000–$200,000. A full-size independent gym more often lands between $350,000 and $1,000,000 depending on size, location and whether equipment is bought or leased.",
        ],
      },
      {
        heading: "Where operators save",
        paragraphs: [
          "Buying refurbished strength equipment, phasing cardio purchases, and taking equipment from gyms that are closing are the three levers that move the number most.",
        ],
      },
    ],
    related: ["commercial-gym-equipment", "used-gym-equipment"],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);

export interface Solution {
  slug: string;
  name: string;
  h1: string;
  intro: string;
  points: string[];
}

export const solutions: Solution[] = [
  {
    slug: "hotel-gym-equipment",
    name: "Hotel Gym Equipment",
    h1: "Hotel Gym Equipment",
    intro:
      "Compact, quiet and low-maintenance equipment for hotel fitness suites, where guests expect a good machine and staff need minimal servicing.",
    points: [
      "Cardio-led layouts that suit small rooms",
      "Quiet magnetic and belt-drive machines for rooms near guest floors",
      "Full packages with delivery, installation and removal of old equipment",
      "Brand-consistent finishes for premium properties",
    ],
  },
  {
    slug: "school-gym-equipment",
    name: "School Gym Equipment",
    h1: "School Gym Equipment",
    intro:
      "Durable equipment for school and university weight rooms, chosen for safety, supervision and heavy shared use.",
    points: [
      "Plate-loaded and rack-based layouts that handle group classes",
      "Safety spotters and enclosed stacks",
      "Budget-friendly refurbished packages with warranty",
      "Purchase order and district billing supported by many sellers",
    ],
  },
  {
    slug: "apartment-gym-equipment",
    name: "Apartment Gym Equipment",
    h1: "Apartment Gym Equipment",
    intro:
      "Unstaffed resident gyms need machines that are simple, quiet and hard to break. These packages are built for multi-family buildings.",
    points: [
      "Compact cardio and a single functional trainer covers most residents",
      "Quiet operation for units above and below",
      "Low-maintenance selectorized stacks over loose plates",
      "Flooring and mirror packages available",
    ],
  },
  {
    slug: "corporate-gym-equipment",
    name: "Corporate Gym Equipment",
    h1: "Corporate Gym Equipment",
    intro:
      "Workplace fitness rooms that get used at lunch and after work, specified for reliability and easy facilities management.",
    points: [
      "Balanced cardio and strength for mixed ability levels",
      "Service contracts available through verified dealers",
      "Phased rollouts across multiple offices",
      "Equipment removal and resale when offices relocate",
    ],
  },
  {
    slug: "personal-training-equipment",
    name: "Personal Training Equipment",
    h1: "Personal Training Studio Equipment",
    intro:
      "High-versatility equipment for personal trainers working one-to-one or in small groups, where floor space is the constraint.",
    points: [
      "Functional trainers and cable machines for maximum exercises per square foot",
      "Adjustable benches, dumbbells and kettlebells",
      "Turf strips, sleds and conditioning tools",
      "Mobile-friendly kits for in-home training",
    ],
  },
  {
    slug: "fitness-studio-equipment",
    name: "Fitness Studio Equipment",
    h1: "Fitness Studio Equipment",
    intro:
      "Boutique studio packages for cycling, HIIT, strength and small-group training, with a look that matches the brand.",
    points: [
      "Studio bikes, rowers and skill machines",
      "Matched dumbbell and kettlebell sets",
      "Rigs, storage and flooring",
      "Consistent finishes across the whole floor",
    ],
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);

export interface LocationPage {
  slug: string;
  state: string;
  cities: string[];
  blurb: string;
}

export const locations: LocationPage[] = [
  {
    slug: "texas",
    state: "Texas",
    cities: ["Dallas", "Houston", "Austin", "San Antonio"],
    blurb:
      "Texas has one of the deepest used gym equipment markets in the country, with dealers in Dallas, Houston and Austin regularly liquidating commercial facilities. Most sellers here offer local delivery within a few hundred miles.",
  },
  {
    slug: "florida",
    state: "Florida",
    cities: ["Miami", "Orlando", "Tampa", "Jacksonville"],
    blurb:
      "Florida's hotel and resort sector turns over fitness equipment frequently, so refurbished commercial cardio in excellent cosmetic condition is common here, particularly around Miami and Orlando.",
  },
  {
    slug: "california",
    state: "California",
    cities: ["Los Angeles", "San Diego", "San Francisco", "Sacramento"],
    blurb:
      "California carries the largest volume of boutique studio equipment on the marketplace, from studio cycles to premium strength lines, with dealers in Los Angeles and San Diego shipping statewide.",
  },
  {
    slug: "new-york",
    state: "New York",
    cities: ["New York", "Brooklyn", "Buffalo", "Rochester"],
    blurb:
      "New York sellers frequently list equipment from corporate and residential building gyms. Inside delivery and elevator access should always be confirmed before purchase in the city.",
  },
];

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);

export const reviews = [
  {
    quote: "Amazing selection and great customer service. Found exactly what I needed for my home gym.",
    name: "Michael R.",
    location: "Austin, TX",
    rating: 5,
  },
  {
    quote: "The equipment was in excellent condition and delivery was right on time. Highly recommend.",
    name: "Sarah T.",
    location: "Chicago, IL",
    rating: 5,
  },
  {
    quote: "The marketplace is easy to use and the prices are unbeatable. Will definitely buy again.",
    name: "James L.",
    location: "Phoenix, AZ",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "Is the equipment on Gym Equipment Marketplace new or used?",
    a: "Both. Listings cover new equipment from dealers, refurbished commercial machines and used equipment from gyms, studios and private sellers. Every listing states its condition.",
  },
  {
    q: "How does buying work?",
    a: "Find the equipment you want, review the specifications and seller details, then contact the seller or request a quote. Payment and delivery terms are agreed directly with the seller.",
  },
  {
    q: "Do you ship nationwide?",
    a: "Most sellers ship by freight across the continental United States. Larger items may need liftgate or inside delivery, which is quoted separately.",
  },
  {
    q: "Can I sell my own gym equipment here?",
    a: "Yes. Submit your equipment through Sell Your Equipment with photos, condition and asking price, and our team will help get it listed.",
  },
  {
    q: "Is used commercial gym equipment a good buy?",
    a: "Frequently, yes. Commercial machines are built for thousands of hours of use, so a well-maintained used unit often outlasts new home-grade equipment at a similar price.",
  },
  {
    q: "What warranty comes with used equipment?",
    a: "It varies by seller. Refurbished equipment usually carries a warranty from the refurbisher; private sales are often as-is. The warranty terms are shown on each listing.",
  },
];

export const businessInfo = {
  name: "Gym Equipment Marketplace",
  phone: "(800) 555-0123",
  email: "support@gymequipmentmarketplace.com",
  hours: "Mon – Fri, 8am – 6pm EST",
  tagline: "Buy • Sell • Compare • Upgrade",
};
