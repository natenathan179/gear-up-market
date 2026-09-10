import { Link } from "@tanstack/react-router";
import { Dumbbell, Mail, MapPin, Phone } from "lucide-react";
import { brands, businessInfo, categories, locations } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="mt-20 bg-charcoal-deep text-charcoal-foreground/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Dumbbell className="size-4" />
            </span>
            <span className="font-display leading-none">
              <span className="block text-base font-extrabold tracking-tight uppercase text-charcoal-foreground">
                Gym Equipment
              </span>
              <span className="block text-xs font-bold tracking-[0.18em] text-primary uppercase">
                Marketplace
              </span>
            </span>
          </div>
          <p className="mt-4 text-sm">Buy, Sell & Shop Quality Gym Equipment</p>
          <p className="mt-2 text-sm">{businessInfo.tagline}</p>
        </div>

        <FooterCol title="Categories">
          {categories.map((c) => (
            <FooterLink key={c.slug} to={`/${c.slug}`} label={c.name} />
          ))}
          <FooterLink to="/used-gym-equipment" label="Used Gym Equipment" />
        </FooterCol>

        <FooterCol title="Brands">
          {brands.slice(0, 7).map((b) => (
            <FooterLink key={b.slug} to={`/brands/${b.slug}`} label={b.name} />
          ))}
          <FooterLink to="/brands" label="All Brands" />
        </FooterCol>

        <FooterCol title="Resources">
          <FooterLink to="/fitness-equipment-guide" label="Fitness Equipment Guide" />
          <FooterLink to="/sell-your-equipment" label="Sell Your Equipment" />
          <FooterLink to="/shipping-information" label="Shipping Information" />
          <FooterLink to="/returns-and-refunds" label="Returns & Refunds" />
          <FooterLink to="/faq" label="FAQs" />
          <FooterLink to="/terms-and-conditions" label="Terms & Conditions" />
          <FooterLink to="/privacy-policy" label="Privacy Policy" />
        </FooterCol>

        <div>
          <h2 className="font-display text-sm font-bold tracking-wide text-charcoal-foreground uppercase">
            Contact Us
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> {businessInfo.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> {businessInfo.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> {businessInfo.hours}
            </li>
          </ul>
          <h2 className="mt-6 font-display text-sm font-bold tracking-wide text-charcoal-foreground uppercase">
            Locations
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {locations.map((l) => (
              <FooterLink
                key={l.slug}
                to={`/gym-equipment-for-sale/${l.slug}`}
                label={`Gym Equipment in ${l.state}`}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-5 text-xs">
          <p>© {new Date().getFullYear()} Gym Equipment Marketplace. All rights reserved.</p>
          <p>Better Equipment. Stronger Communities.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-bold tracking-wide text-charcoal-foreground uppercase">
        {title}
      </h2>
      <ul className="mt-4 space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link to={to as never} className="transition-colors hover:text-primary">
        {label}
      </Link>
    </li>
  );
}
