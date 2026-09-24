import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  ChevronDown,
} from "lucide-react";
import { businessInfo } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import logoMark from "@/assets/logo-mark.png";

// Grouped instead of one flat 15-link row: "Shop Equipment" and "Resources"
// become dropdowns on desktop so the bar stays to a handful of top-level
// items instead of overflowing/wrapping the header.
const shopLinks = [
  { to: "/shop-equipment", label: "All Equipment" },
  { to: "/used-gym-equipment", label: "Used Equipment" },
  { to: "/commercial-gym-equipment", label: "Commercial" },
  { to: "/home-gym-equipment", label: "Home Gym" },
  { to: "/cardio-equipment", label: "Cardio" },
  { to: "/strength-equipment", label: "Strength" },
  { to: "/free-weights", label: "Free Weights" },
  { to: "/gym-accessories", label: "Accessories" },
] as const;

const resourceLinks = [
  { to: "/blog", label: "Blog" },
  { to: "/fitness-equipment-guide", label: "Equipment Guide" },
  { to: "/about", label: "About Us" },
  { to: "/reviews", label: "Reviews" },
] as const;

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop-equipment", label: "Shop Equipment" },
  ...shopLinks.slice(1),
  { to: "/brands", label: "Brands" },
  ...resourceLinks,
  { to: "/contact", label: "Contact" },
] as const;

function NavDropdown({
  label,
  to,
  items,
}: {
  label: string;
  to?: string;
  items: readonly { to: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <li ref={ref} className="relative flex items-center">
      {to ? (
        <Link
          to={to as never}
          activeProps={{ className: "bg-primary text-primary-foreground" }}
          className="px-3 py-3 text-[13px] font-semibold tracking-wide uppercase transition-colors hover:bg-white/10"
        >
          {label}
        </Link>
      ) : (
        <span className="px-3 py-3 text-[13px] font-semibold tracking-wide uppercase">{label}</span>
      )}
      <button
        type="button"
        aria-label={`${label} menu`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-full items-center px-1.5 transition-colors hover:bg-white/10"
      >
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="absolute top-full left-0 z-20 min-w-52 border border-white/10 bg-charcoal py-1 shadow-lg">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to as never}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary" }}
                className="block px-4 py-2.5 text-[13px] font-medium normal-case tracking-normal transition-colors hover:bg-white/10 hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

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
              <Link
                to="/reviews"
                className="hidden items-center gap-1.5 hover:text-primary sm:flex"
              >
                <Heart className="size-3.5" /> Reviews
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <Link to="/admin/login" className="flex items-center gap-1.5 hover:text-primary">
                <User className="size-3.5" /> Admin
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center gap-1.5 font-semibold hover:text-primary"
              >
                <ShoppingCart className="size-3.5" /> Cart ({cart.count})
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img src={logoMark} alt="Gym Equipment Marketplace" className="h-14 w-auto" />
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
              className="h-11 w-full rounded-l-sm border border-border border-r-0 px-4 text-base outline-none focus:border-primary md:text-sm"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex h-11 w-14 items-center justify-center rounded-r-sm bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Search className="size-4" />
            </button>
          </form>

          <a
            href={`tel:${businessInfo.phone.replace(/\D/g, "")}`}
            className="hidden items-center gap-2 lg:flex"
          >
            <Phone className="size-6 text-primary" />
            <span className="text-xs leading-tight">
              <span className="block text-muted-foreground">Call Us</span>
              <span className="block text-base font-bold text-foreground">
                {businessInfo.phone}
              </span>
              <span className="block text-muted-foreground">{businessInfo.hours}</span>
            </span>
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="-mr-2.5 ml-auto p-2.5 text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <nav aria-label="Main" className="bg-charcoal text-charcoal-foreground">
        <ul className="mx-auto hidden max-w-7xl items-center gap-1 px-4 md:flex">
          <li>
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="px-3 py-3 text-[13px] font-semibold tracking-wide uppercase transition-colors hover:bg-white/10"
            >
              Home
            </Link>
          </li>
          <NavDropdown label="Shop Equipment" to="/shop-equipment" items={shopLinks} />
          <li>
            <Link
              to="/brands"
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="px-3 py-3 text-[13px] font-semibold tracking-wide uppercase transition-colors hover:bg-white/10"
            >
              Brands
            </Link>
          </li>
          <NavDropdown label="Resources" items={resourceLinks} />
          <li>
            <Link
              to="/contact"
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="px-3 py-3 text-[13px] font-semibold tracking-wide uppercase transition-colors hover:bg-white/10"
            >
              Contact
            </Link>
          </li>
        </ul>

        {open && (
          <div className="md:hidden">
            <form onSubmit={submit} className="flex p-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gym equipment…"
                aria-label="Search gym equipment"
                className="h-11 w-full rounded-l-sm px-3 text-base text-foreground"
              />
              <button
                type="submit"
                aria-label="Search"
                className="flex h-11 w-12 items-center justify-center rounded-r-sm bg-primary"
              >
                <Search className="size-4" />
              </button>
            </form>
            <ul className="pb-3">
              {navLinks.map((l, i) => (
                <li key={l.to}>
                  {(i === 1 || i === shopLinks.length + 2) && (
                    <p className="mt-2 px-4 pb-1 text-[11px] font-bold tracking-wide text-charcoal-foreground/50 uppercase">
                      {i === 1 ? "Shop Equipment" : "Resources"}
                    </p>
                  )}
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium hover:bg-white/10"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
