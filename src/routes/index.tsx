import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, CreditCard, Truck, Headphones, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-gym.jpg";
import sellImg from "@/assets/sell-banner.jpg";
import { ListingCard, SectionHeading, Stars } from "@/components/site/Bits";
import { brands, categories, faqs, guides, listings, reviews } from "@/data/catalog";

const title = "Gym Equipment Marketplace – Buy New & Used Gym Equipment";
const description =
  "Buy and sell new and used gym equipment. Shop cardio machines, strength equipment, free weights and commercial gym equipment from verified sellers across the US.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Gym Equipment Marketplace",
          url: "/",
          potentialAction: {
            "@type": "SearchAction",
            target: "/shop-equipment?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: Home,
});

const trustBadges = [
  { icon: BadgeCheck, title: "Verified Sellers", copy: "Buy with confidence" },
  { icon: CreditCard, title: "Secure Payments", copy: "Multiple payment options" },
  { icon: Truck, title: "Shipping Assistance", copy: "Nationwide & international" },
  { icon: Headphones, title: "Customer Support", copy: "We're here to help" },
];

const steps = [
  { n: "1", t: "Find Equipment", d: "Search thousands of new and used listings." },
  { n: "2", t: "Compare", d: "Compare condition, price, brand and location." },
  { n: "3", t: "Contact Seller", d: "Ask questions or request a quote directly." },
  { n: "4", t: "Buy", d: "Agree terms and pay securely." },
  { n: "5", t: "Get Delivered", d: "Freight, local delivery or pickup." },
];

function Home() {
  const featured = listings.filter((l) => l.featured);
  const used = listings.filter((l) => l.condition !== "New").slice(0, 6);
  const commercial = listings.filter((l) => l.usage === "Commercial").slice(0, 4);

  return (
    <>
      <section className="relative bg-charcoal-deep text-charcoal-foreground">
        <img
          src={heroImg}
          alt="Commercial gym floor lined with dumbbells, benches and strength machines"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">
            Gym Equipment Marketplace
          </p>
          <h1 className="font-display mt-4 max-w-2xl text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl">
            Buy &amp; Sell New and Used Gym Equipment
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-charcoal-foreground/85 sm:text-base">
            Shop quality gym equipment for home gyms, commercial fitness centers, training
            facilities and more. Find cardio machines, strength equipment, free weights and gym
            accessories from trusted sellers — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop-equipment"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold tracking-wide uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Shop Gym Equipment <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/sell-your-equipment"
              className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-sm font-bold tracking-wide uppercase transition-colors hover:bg-white/10"
            >
              Sell Your Equipment
            </Link>
          </div>
          <ul className="mt-14 grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((b) => (
              <li key={b.title} className="flex items-center gap-3">
                <b.icon className="size-7 text-primary" />
                <span className="text-sm leading-tight">
                  <span className="block font-bold">{b.title}</span>
                  <span className="block text-charcoal-foreground/70">{b.copy}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading title="Shop by Category" href="/shop-equipment" linkLabel="View All Categories" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <article key={c.slug} className="border border-border bg-card">
              <img
                src={c.image}
                alt={`${c.name} for sale`}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-4/3 w-full object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-bold text-charcoal">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
                <Link
                  to={`/${c.slug}` as never}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary uppercase"
                >
                  Shop Now <ArrowRight className="size-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <SectionHeading title="Featured Equipment" href="/shop-equipment" linkLabel="View All Products" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {featured.map((l) => (
            <ListingCard key={l.slug} listing={l} />
          ))}
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Used Gym Equipment"
            href="/used-gym-equipment"
            linkLabel="Shop All Used Equipment"
          />
          <p className="-mt-2 mb-6 max-w-2xl text-sm text-muted-foreground">
            Pre-owned and refurbished commercial machines at a fraction of new prices — inspected,
            described honestly and sold by verified sellers.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {used.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading
          title="Commercial Gym Equipment"
          href="/commercial-gym-equipment"
          linkLabel="Explore Commercial"
        />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_2fr]">
          <div className="bg-charcoal p-8 text-charcoal-foreground">
            <h3 className="font-display text-2xl font-extrabold">Fitting out a facility?</h3>
            <p className="mt-3 text-sm text-charcoal-foreground/80">
              Full gym packages and single machines for gyms, hotels, schools, apartments and
              corporate facilities — new, refurbished and used, with freight and installation
              support.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <Link to="/commercial-gym-equipment/$solution" params={{ solution: "hotel-gym-equipment" }} className="hover:text-primary">
                  Hotel Gym Equipment
                </Link>
              </li>
              <li>
                <Link to="/commercial-gym-equipment/$solution" params={{ solution: "school-gym-equipment" }} className="hover:text-primary">
                  School Gym Equipment
                </Link>
              </li>
              <li>
                <Link to="/commercial-gym-equipment/$solution" params={{ solution: "apartment-gym-equipment" }} className="hover:text-primary">
                  Apartment Gym Equipment
                </Link>
              </li>
              <li>
                <Link to="/commercial-gym-equipment/$solution" params={{ solution: "corporate-gym-equipment" }} className="hover:text-primary">
                  Corporate Gym Equipment
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {commercial.map((l) => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <SectionHeading title="Shop by Brand" href="/brands" linkLabel="View All Brands" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {brands.map((b) => (
            <li key={b.slug}>
              <Link
                to="/brands/$slug"
                params={{ slug: b.slug }}
                className="flex h-16 items-center justify-center border border-border bg-card px-2 text-center text-xs font-bold tracking-wide uppercase transition-colors hover:border-primary hover:text-primary"
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="How It Works" />
          <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n} className="border border-border bg-card p-5">
                <span className="font-display block text-3xl font-extrabold text-primary">{s.n}</span>
                <h3 className="mt-2 text-sm font-bold text-charcoal">{s.t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="relative overflow-hidden bg-charcoal-deep text-charcoal-foreground">
          <img
            src={sellImg}
            alt="Warehouse of used commercial gym equipment"
            loading="lazy"
            width={1600}
            height={700}
            className="absolute inset-0 size-full object-cover opacity-40"
          />
          <div className="relative grid gap-6 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-extrabold">Sell Your Gym Equipment</h2>
              <p className="mt-3 max-w-md text-sm text-charcoal-foreground/85">
                Turn your unused gym equipment into cash. It's fast, easy, and reaches thousands of
                buyers looking for exactly what you have.
              </p>
              <Link
                to="/sell-your-equipment"
                className="mt-6 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold tracking-wide uppercase text-primary-foreground transition-colors hover:bg-primary/90"
              >
                List Your Equipment <ArrowRight className="size-4" />
              </Link>
            </div>
            <ul className="space-y-3 self-center text-sm">
              <li className="flex items-center gap-2">
                <BadgeCheck className="size-5 text-primary" /> Quick &amp; easy listing
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="size-5 text-primary" /> Reach serious buyers
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="size-5 text-primary" /> Safe &amp; secure transactions
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <SectionHeading
          title="Latest from Our Guide"
          href="/fitness-equipment-guide"
          linkLabel="View All Articles"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.slice(0, 4).map((g) => (
            <article key={g.slug} className="border border-border bg-card p-5">
              <h3 className="text-sm font-bold text-charcoal">
                <Link to="/fitness-equipment-guide/$slug" params={{ slug: g.slug }} className="hover:text-primary">
                  {g.title}
                </Link>
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">{g.description}</p>
              <p className="mt-3 text-xs font-bold text-primary uppercase">Read More →</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="What Our Customers Say" />
          <p className="-mt-2 mb-6 text-xs text-muted-foreground">
            Sample reviews shown while the marketplace collects verified buyer feedback.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="border border-border bg-card p-5">
                <Stars rating={r.rating} />
                <blockquote className="mt-3 text-sm text-charcoal">“{r.quote}”</blockquote>
                <figcaption className="mt-3 text-xs text-muted-foreground">
                  {r.name} – {r.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading title="Frequently Asked Questions" href="/faq" linkLabel="All FAQs" />
        <dl className="grid gap-4 md:grid-cols-2">
          {faqs.slice(0, 4).map((f) => (
            <div key={f.q} className="border border-border p-5">
              <dt className="text-sm font-bold text-charcoal">{f.q}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
