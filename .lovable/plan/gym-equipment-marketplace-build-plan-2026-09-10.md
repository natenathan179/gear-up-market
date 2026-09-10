# Gym Equipment Marketplace — Build Plan

A premium marketplace site for buying and selling new and used gym equipment, built for strong search visibility. Phase 1 is the complete front-end with realistic sample listings (no accounts or live database yet), matching the layout and look of the screenshot you attached: deep charcoal, white, strong red accent, light grey supporting.

## Pages

Home
- Top bar (free shipping, trusted sellers, secure payments, sign in, phone)
- Header with logo, big equipment search, call-us block
- Dark navigation bar with the full menu you listed
- Hero: "Buy & Sell New and Used Gym Equipment" with Shop Equipment / Sell Your Equipment buttons and four trust badges
- Shop by Category (6 cards), Featured Equipment (product cards with brand, model, condition, price, location), Used Gym Equipment section, Commercial showcase, Shop by Brand logos, How It Works (5 steps), Sell Your Equipment banner, Guides, Customer Reviews, FAQ, full footer

Category pages
- /strength-equipment, /cardio-equipment, /home-gym-equipment, /commercial-gym-equipment, /free-weights, /gym-accessories
- Each with its own headline, intro copy, subcategory links, filtered listing grid, internal links to related categories and guides

Used equipment
- /used-gym-equipment with filters: condition, brand, price, location, equipment type

Marketplace listings
- /equipment/<listing-slug> product pages: photos, brand, model, condition, price, location, specs, dimensions, weight, warranty, shipping, seller info, FAQs, related equipment, and Contact Seller / Request Quote / Save buttons

Brands
- /brands index plus /brands/life-fitness, precor, technogym, cybex, matrix, hammer-strength, nordictrack — each with intro, new and used equipment, popular models, related categories, FAQs

Guides
- /fitness-equipment-guide index plus article pages for the topics you listed (home gym, choosing a treadmill, new vs used, costs, buying and inspecting used equipment, maintenance, best brands)

Commercial supporting pages
- Hotel, school, apartment, corporate, personal training and fitness studio equipment

Sell Your Equipment
- /sell-your-equipment with the listing submission form (type, brand, model, condition, quantity, price, location, photos, contact)

Company and policy
- About, Contact, Shipping Information, Returns & Refunds, Terms, Privacy, FAQ

Location pages
- A small, genuinely useful set only: Texas, Florida, California, New York, plus city pages for the metros in the sample inventory. No mass-generated thin pages.

## Search and filters

Site-wide search matching product names, brands, equipment types and model numbers. Filters for equipment type, brand, condition, price, location, commercial/home, muscle group, resistance type and availability. Filter state lives in the address bar so results are shareable, with only the main category paths marked for search engines to avoid duplicate thin pages.

## Search-visibility work

- One clear headline per page, proper heading order, unique title and description per page following the tier structure you set out (home = marketplace, categories = category terms, products = model terms, brands, locations, guides = informational)
- Breadcrumbs on every deep page
- Structured data: Organization and WebSite on home, Product + Offer on listings, BreadcrumbList on deep pages, Article on guides, AggregateRating only where reviews are real
- Clean URLs, canonical tags, robots.txt, sitemap, 404 handling, internal linking between categories, brands, listings and guides
- Compressed modern-format imagery, lazy loading, mobile-first layout

## Content and images

I'll create realistic placeholder listings, brands, prices, locations, reviews and contact details, plus generated equipment photography in the style of the screenshot. Everything invented is a placeholder — send me your real inventory, phone, email, hours and reviews and I'll swap them in. I won't publish invented testimonials or ratings as if they were real; they'll be clearly sample content until you supply the genuine ones.

The screenshot is used as design reference and as the link-preview picture for the site.

## Not in this phase

User accounts, real seller sign-up, checkout and payments, and a live listings database. Those need the built-in backend and are a natural phase 2 once the site structure is approved.

## Technical notes

TanStack Start file routes, one route file per page above; shared Header/Nav/Footer in the root layout. Design tokens (charcoal/white/red/grey, radius, typography) defined in `src/styles.css` and used everywhere — no hardcoded colours. Sample listings, brands, categories and guides live in typed data modules under `src/data/` so a real backend can replace them without touching the UI. Per-route `head()` for title, description, og and twitter tags; JSON-LD via the route `scripts` option. Canonical and og:url relative until a public domain is connected; sitemap added once the site has its public URL.
