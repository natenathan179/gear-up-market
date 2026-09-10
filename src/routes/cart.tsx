import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";
import { InquiryModal } from "@/components/site/InquiryModal";
import { useCart } from "@/lib/cart";

const title = "Your Cart & Quote Request | Gym Equipment Marketplace";
const description =
  "Review the gym equipment in your cart and send a single quote request. We confirm availability, freight cost and payment options by email — no payment is taken online.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/cart" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <PageHeader
        eyebrow="Quote Basket"
        h1="Your Equipment Cart"
        intro="Add as many machines as you need and send one quote request. Our team replies with availability, combined freight cost and payment options within one business day."
      />

      <section className="mx-auto max-w-7xl px-4 py-10">
        {cart.items.length === 0 ? (
          <div className="border border-border bg-card p-10 text-center">
            <h2 className="font-display text-xl font-bold text-foreground">Your cart is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse the marketplace and add the equipment you are interested in.
            </p>
            <Link
              to="/shop-equipment"
              className="mt-6 inline-block bg-primary px-5 py-3 text-sm font-bold uppercase text-primary-foreground hover:bg-primary/90"
            >
              Shop equipment
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.slug}
                  className="flex flex-col gap-4 border border-border bg-card p-4 sm:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    width={160}
                    height={120}
                    className="aspect-4/3 w-full object-cover sm:w-40"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                    <h2 className="text-sm font-bold text-foreground">
                      <Link
                        to="/equipment/$slug"
                        params={{ slug: item.slug }}
                        className="hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Condition: {item.condition}
                    </p>
                    <p className="mt-2 text-lg font-extrabold text-primary">
                      ${(item.price * item.qty).toLocaleString()}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        onClick={() => cart.setQty(item.slug, item.qty - 1)}
                        className="flex size-8 items-center justify-center border border-border hover:border-primary"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.title}`}
                        onClick={() => cart.setQty(item.slug, item.qty + 1)}
                        className="flex size-8 items-center justify-center border border-border hover:border-primary"
                      >
                        <Plus className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => cart.remove(item.slug)}
                        className="ml-3 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit border border-border bg-card p-5">
              <h2 className="font-display text-lg font-bold text-foreground">Quote summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Items</dt>
                  <dd className="font-semibold">{cart.count}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Equipment total</dt>
                  <dd className="font-semibold">${cart.total.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Freight</dt>
                  <dd className="font-semibold">Quoted</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="mt-5 w-full bg-primary py-3 text-sm font-bold uppercase text-primary-foreground hover:bg-primary/90"
              >
                Checkout – request quote
              </button>
              <button
                type="button"
                onClick={cart.clear}
                className="mt-2 w-full border border-border py-2.5 text-xs font-semibold uppercase hover:bg-secondary"
              >
                Clear cart
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                No card details are taken online. We confirm stock and freight first, then agree
                payment with you directly.
              </p>
            </aside>
          </div>
        )}
      </section>

      <InquiryModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        subject={{ kind: "cart", items: cart.items, total: cart.total }}
        onSuccess={cart.clear}
      />
    </>
  );
}
