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
import { useQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/lib/queries";
import { buildBrandDirectory } from "@/lib/brands";
import { departmentBySlug, equipmentDepartments } from "@/lib/taxonomy";
import logoMark from "@/assets/logo-mark.png";

// Grouped instead of one flat 15-link row: "Gym Equipment" and "Resources"
// become dropdowns on desktop so the bar stays to a handful of top-level
// items instead of overflowing/wrapping the header.
const shopLinks = [
  { to: "/strength-equipment", label: "Strength Equipment" },
  { to: "/cardio-equipment", label: "Cardio Equipment" },
  { to: "/free-weights", label: "Free Weights" },
  { to: "/gym-accessories", label: "Gym Accessories" },
  { to: "/used-gym-equipment", label: "Used Equipment" },
  { to: "/commercial-gym-equipment", label: "Commercial Gym" },
  { to: "/home-gym-equipment", label: "Home Gym" },
] as const;

const supplementLinks = [
  { to: "/supplements", label: "All Supplements" },
  ...departmentBySlug("supplements")!.types.map((t) => ({
    to: `/supplements/${t.slug}`,
    label: t.name,
  })),
];

const useLinks = [
  { to: "/used-gym-equipment", label: "Used Gym Equipment" },
  { to: "/commercial-gym-equipment", label: "Commercial Gym Equipment" },
  { to: "/home-gym-equipment", label: "Home Gym Equipment" },
  { to: "/brands", label: "Shop by Brand" },
  { to: "/sell-your-equipment", label: "Sell Your Equipment" },
] as const;

const megaItemClass =
  "block py-1 text-[13px] font-medium normal-case tracking-normal text-charcoal-foreground/80 transition-colors hover:text-primary";

// Open state for a full-width mega menu: closes on outside click or Escape,
// and only fetches inventory once it has been opened.
function useMegaMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const { data: products } = useQuery({ ...productsQueryOptions, enabled: open });

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return { open, setOpen, ref, products, close: () => setOpen(false) };
}

function MegaMenuToggle({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${label} menu`}
      aria-expanded={open}
      onClick={onToggle}
      className="flex h-full items-center px-1.5 transition-colors hover:bg-white/10"
    >
      <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

// Department → equipment type mega menu. Types with no live stock are
// hidden once inventory has loaded, so the menu never leads to an empty page.
function ShopMegaMenu() {
  const { open, setOpen, ref, products, close } = useMegaMenu();
  const inStock = new Set(products?.map((p) => `${p.department}/${p.typeSlug}`));

  return (
    <li ref={ref} className="flex items-center">
      <Link
        to="/shop-equipment"
        activeProps={{ className: "bg-primary text-primary-foreground" }}
        className="px-3 py-3 text-[13px] font-semibold tracking-wide uppercase transition-colors hover:bg-white/10"
      >
        Gym Equipment
      </Link>
      <MegaMenuToggle label="Gym Equipment" open={open} onToggle={() => setOpen((v) => !v)} />
      {open && (
        <div className="absolute inset-x-0 top-full z-30 border-t border-white/10 bg-charcoal shadow-xl">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-6 md:grid-cols-3 lg:grid-cols-5">
            {equipmentDepartments.map((d) => (
              <div key={d.slug}>
                <Link
                  to={`/${d.slug}` as never}
                  onClick={close}
                  className="mb-2 block border-b border-white/10 pb-2 text-[13px] font-bold tracking-wide text-white uppercase hover:text-primary"
                >
                  {d.name}
                </Link>
                <ul>
                  {d.types
                    .filter((t) => !products || inStock.has(`${d.slug}/${t.slug}`))
                    .map((t) => (
                      <li key={t.slug}>
                        <Link
                          to={`/${d.slug}/${t.slug}` as never}
                          onClick={close}
                          className={megaItemClass}
                        >
                          {t.short}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="mb-2 border-b border-white/10 pb-2 text-[13px] font-bold tracking-wide text-white uppercase">
                Shop by Use
              </p>
              <ul>
                {useLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} onClick={close} className={megaItemClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/shop-equipment"
                onClick={close}
                className="mt-4 inline-block bg-primary px-3 py-2 text-xs font-bold tracking-wide text-primary-foreground uppercase"
              >
                Shop all equipment
              </Link>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

// Every brand with live stock, A–Z, flowed into columns.
function BrandsMegaMenu() {
  const { open, setOpen, ref, products, close } = useMegaMenu();
  const brands = products ? buildBrandDirectory(products).filter((b) => b.count > 0) : [];

  return (
    <li ref={ref} className="flex items-center">
      <Link
        to="/brands"
        activeProps={{ className: "bg-primary text-primary-foreground" }}
        className="px-3 py-3 text-[13px] font-semibold tracking-wide uppercase transition-colors hover:bg-white/10"
      >
        Brands
      </Link>
      <MegaMenuToggle label="Brands" open={open} onToggle={() => setOpen((v) => !v)} />
      {open && (
        <div className="absolute inset-x-0 top-full z-30 border-t border-white/10 bg-charcoal shadow-xl">
          <div className="mx-auto max-w-7xl px-6 py-6">
            {products ? (
              <ul className="columns-2 gap-8 sm:columns-3 lg:columns-5">
                {brands.map((b) => (
                  <li key={b.slug} className="break-inside-avoid">
                    <Link
                      to="/brands/$slug"
                      params={{ slug: b.slug }}
                      onClick={close}
                      className={megaItemClass}
                    >
                      {b.name} <span className="text-charcoal-foreground/50">({b.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13px] text-charcoal-foreground/70">Loading brands…</p>
            )}
            <Link
              to="/brands"
              onClick={close}
              className="mt-5 inline-block bg-primary px-3 py-2 text-xs font-bold tracking-wide text-primary-foreground uppercase"
            >
              View all brands
            </Link>
          </div>
        </div>
      )}
    </li>
  );
}

const resourceLinks = [
  { to: "/blog", label: "Blog" },
  { to: "/fitness-equipment-guide", label: "Equipment Guide" },
  { to: "/about", label: "About Us" },
  { to: "/reviews", label: "Reviews" },
  { to: "/shipping-information", label: "Shipping Information" },
  { to: "/returns-and-refunds", label: "Returns & Refunds" },
  { to: "/faq", label: "FAQ" },
] as const;

// Mobile menu: top-level links plus collapsible categories mirroring the
// desktop dropdowns. `items` sections expand; plain entries are links.
type MobileEntry =
  | { label: string; to: string }
  | { label: string; items: readonly { to: string; label: string }[] };

const mobileMenu: readonly MobileEntry[] = [
  { label: "Home", to: "/" },
  {
    label: "Gym Equipment",
    items: [
      { to: "/shop-equipment", label: "All Gym Equipment" },
      ...shopLinks,
      { to: "/sell-your-equipment", label: "Sell Your Equipment" },
    ],
  },
  { label: "Supplements", items: supplementLinks },
  { label: "Brands", to: "/brands" },
  { label: "Resources", items: resourceLinks },
  { label: "Contact", to: "/contact" },
];

const mobileLinkClass =
  "block px-4 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-white/10";

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
  const [section, setSection] = useState<string | null>(null);

  const closeMenu = () => {
    setOpen(false);
    setSection(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop-equipment", search: { q: query.trim() } });
    closeMenu();
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
        {/* Mobile: 3-column grid with menu left, logo centered, name right.
            The logo link is `contents` there so its image and name land in
            separate columns; from md up it's the usual flex row. */}
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-4 md:flex md:gap-6">
          <Link to="/" className="contents md:flex md:shrink-0 md:items-center md:gap-2">
            <img
              src={logoMark}
              alt="Gym Equipment Marketplace"
              className="h-12 w-auto justify-self-center md:h-14"
            />
            <span className="justify-self-end text-right font-display leading-none md:text-left">
              <span className="block text-sm font-extrabold tracking-tight text-foreground uppercase sm:text-base md:text-lg">
                Gym Equipment
              </span>
              <span className="block text-[11px] font-bold tracking-[0.18em] text-primary uppercase sm:text-xs md:text-sm">
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
            className="order-first -ml-2.5 justify-self-start p-2.5 text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <nav aria-label="Main" className="bg-charcoal text-charcoal-foreground">
        <ul className="relative mx-auto hidden max-w-7xl items-center gap-1 px-4 md:flex">
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
          <ShopMegaMenu />
          <NavDropdown label="Supplements" to="/supplements" items={supplementLinks} />
          <BrandsMegaMenu />
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
            <ul className="divide-y divide-white/10 border-t border-white/10 pb-3">
              {mobileMenu.map((entry) =>
                "items" in entry ? (
                  <li key={entry.label}>
                    <button
                      type="button"
                      aria-expanded={section === entry.label}
                      onClick={() => setSection((s) => (s === entry.label ? null : entry.label))}
                      className={`${mobileLinkClass} flex w-full items-center justify-between text-left`}
                    >
                      {entry.label}
                      <ChevronDown
                        className={`size-4 transition-transform ${section === entry.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {section === entry.label && (
                      <ul className="bg-charcoal-deep pb-2">
                        {entry.items.map((item) => (
                          <li key={item.to}>
                            <Link
                              to={item.to as never}
                              onClick={closeMenu}
                              activeProps={{ className: "text-primary" }}
                              className="block px-7 py-2.5 text-sm font-medium hover:bg-white/10 hover:text-primary"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={entry.label}>
                    <Link
                      to={entry.to as never}
                      onClick={closeMenu}
                      activeOptions={{ exact: entry.to === "/" }}
                      activeProps={{ className: "text-primary" }}
                      className={mobileLinkClass}
                    >
                      {entry.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
