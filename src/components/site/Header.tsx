import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Phone,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Truck,
  ShieldCheck,
  Lock,
  Dumbbell,
} from "lucide-react";
import { businessInfo, categories } from "@/data/catalog";
import { useCart } from "@/lib/cart";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop-equipment", label: "Shop Equipment" },
  { to: "/used-gym-equipment", label: "Used Equipment" },
  { to: "/commercial-gym-equipment", label: "Commercial" },
  { to: "/home-gym-equipment", label: "Home Gym" },
  { to: "/cardio-equipment", label: "Cardio" },
  { to: "/strength-equipment", label: "Strength" },
  { to: "/gym-accessories", label: "Accessories" },
  { to: "/brands", label: "Brands" },
  { to: "/sell-your-equipment", label: "Sell Your Equipment" },
  { to: "/about", label: "About Us" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const cart = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop-equipment", search: { q: query.trim() } });
    setOpen(false);
  };

  return (
    <header>
      <div className="bg-charcoal-deep text-charcoal-foreground/80 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <ul className="flex flex-wrap items-center gap-5">
            <li className="flex items-center gap-1.5">
              <Truck className="size-3.5 text-primary" /> Free Shipping on Select Items
            </li>
            <li className="hidden items-center gap-1.5 sm:flex">
              <ShieldCheck className="size-3.5 text-primary" /> Trusted Sellers
            </li>
            <li className="hidden items-center gap-1.5 md:flex">
              <Lock className="size-3.5 text-primary" /> Secure Payments
            </li>
          </ul>
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/reviews" className="hidden items-center gap-1.5 hover:text-primary sm:flex">
                <Heart className="size-3.5" /> Reviews
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <Link to="/admin/login" className="flex items-center gap-1.5 hover:text-primary">
                <User className="size-3.5" /> Admin
              </Link>
            </li>
            <li>
              <Link to="/cart" className="flex items-center gap-1.5 font-semibold hover:text-primary">
                <ShoppingCart className="size-3.5" /> Cart ({cart.count})
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Dumbbell className="size-5" />
            </span>
            <span className="font-display leading-none">
              <span className="block text-lg font-extrabold tracking-tight text-foreground uppercase">
                Gym Equipment
              </span>
              <span className="block text-sm font-bold tracking-[0.18em] text-primary uppercase">
                Marketplace
              </span>
            </span>
          </Link>

          <form onSubmit={submit} className="hidden flex-1 md:flex">
            <label htmlFor="site-search" className="sr-only">
              Search gym equipment
            </label>
            <input
              id="site-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gym equipment, brands, models…"
              className="h-11 w-full rounded-l-sm border border-border border-r-0 px-4 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex h-11 w-14 items-center justify-center rounded-r-sm bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Search className="size-4" />
            </button>
          </form>

          <a href={`tel:${businessInfo.phone.replace(/\D/g, "")}`} className="hidden items-center gap-2 lg:flex">
            <Phone className="size-6 text-primary" />
            <span className="text-xs leading-tight">
              <span className="block text-muted-foreground">Call Us</span>
              <span className="block text-base font-bold text-foreground">{businessInfo.phone}</span>
              <span className="block text-muted-foreground">{businessInfo.hours}</span>
            </span>
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-auto text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <nav aria-label="Main" className="bg-charcoal text-charcoal-foreground">
        <div className="mx-auto hidden max-w-7xl items-center gap-1 px-4 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="px-3 py-3 text-[13px] font-semibold tracking-wide uppercase transition-colors hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {open && (
          <div className="md:hidden">
            <form onSubmit={submit} className="flex p-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gym equipment…"
                aria-label="Search gym equipment"
                className="h-10 w-full rounded-l-sm px-3 text-sm text-foreground"
              />
              <button className="flex h-10 w-12 items-center justify-center rounded-r-sm bg-primary">
                <Search className="size-4" />
              </button>
            </form>
            <ul className="pb-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium hover:bg-white/10"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              {categories.map((c) => (
                <li key={c.slug} className="hidden" />
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
