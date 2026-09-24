import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, FaqList, PageHeader, faqSchema } from "@/components/site/Bits";
import accessoriesImg from "@/assets/cat-accessories.webp";
import { businessInfo } from "@/data/catalog";
import { canonicalUrl, merchantReturnPolicySchema } from "@/lib/seo";

const title = "Returns & Refunds | Gym Equipment Marketplace";
const description =
  "Our 14-day buyer protection policy: how to request a return, who pays return freight, and how refunds are issued on gym equipment bought through the marketplace.";

export const Route = createFileRoute("/returns-and-refunds")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/returns-and-refunds" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/returns-and-refunds") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          ...merchantReturnPolicySchema(),
        }),
      },
      ...faqSchema(returnFaqs),
    ],
  }),
  component: Page,
});

const sections = [
  {
    h: "14-day buyer protection, on every listing",
    p: `Every purchase on the marketplace — dealer, refurbisher or private seller — is covered by the same baseline: you have 14 days from delivery to report a problem and request a return or refund. This is a floor, not a ceiling: a dealer's own refurbished-equipment warranty, where offered, applies on top of this window and does not shorten it.`,
  },
  {
    h: "How to request a return",
    p: `Contact the seller directly through the listing within 14 days of delivery, and copy ${businessInfo.email} (or call ${businessInfo.phone}) with your order details, a description of the issue and photos of the equipment. We track every request against the delivery date on the freight receipt, so keep that receipt until the window closes.`,
  },
  {
    h: "Who pays return freight",
    p: "For a no-fault return — you simply changed your mind or ordered the wrong equipment — you cover return freight, quoted the same way as the original delivery. If the equipment arrives damaged, doesn't match its listing description, or is otherwise defective, return freight is free: the seller or marketplace arranges and pays for it.",
  },
  {
    h: "Refunds",
    p: "Once the returned equipment is received back and inspected against the condition it shipped in, we issue a full refund to your original payment method within 5 business days. Partial refunds only apply where you and the seller have separately agreed to a partial return, such as keeping accessories that shipped with the machine.",
  },
  {
    h: "Damaged in transit",
    p: "Note any visible damage on the delivery receipt before signing, photograph it immediately, and contact the seller and support the same day. Freight carriers have strict claim windows, and a clean signature makes a damage claim very hard to win later — this is separate from, and faster than, the 14-day return window above.",
  },
  {
    h: "Additional seller warranties",
    p: "Dealers and refurbishers frequently back their equipment with a longer parts or labor warranty beyond the 14-day window — check the listing for specifics. Those warranties are additional coverage on top of the marketplace baseline, not a replacement for it.",
  },
  {
    h: "What isn't covered",
    p: "Normal cosmetic wear consistent with the listing's stated condition isn't a defect. Equipment that's been modified, reassembled incorrectly or used outside its rated capacity after delivery falls outside both the 14-day window and any seller warranty.",
  },
  {
    h: "Disputes",
    p: "If you and a seller can't reach a resolution inside the return window, contact our support team with your listing details and correspondence and we will step in to mediate.",
  },
];

const returnFaqs = [
  {
    q: "What is the marketplace's return window?",
    a: "14 days from the date of delivery to report an issue and request a return or refund — this applies to every listing on the marketplace, regardless of seller type.",
  },
  {
    q: "Who pays for return shipping?",
    a: "You cover return freight for a no-fault return (changed your mind, ordered the wrong item). If the equipment arrived damaged, defective or materially different from its listing, return freight is free — the seller or marketplace arranges and pays for it.",
  },
  {
    q: "How do I actually start a return?",
    a: `Contact the seller through the listing within 14 days of delivery and copy ${businessInfo.email} with your order details, a description of the issue and photos. Keep your freight delivery receipt — it's what we check the 14-day window against.`,
  },
  {
    q: "How and when will I get my money back?",
    a: "To your original payment method, within 5 business days of the returned equipment being received back and inspected.",
  },
  {
    q: "Does a dealer's refurbished warranty replace this policy?",
    a: "No — a dealer or refurbisher's own warranty is additional coverage layered on top of the 14-day marketplace baseline, not a substitute for it.",
  },
  {
    q: "What if my equipment arrives damaged?",
    a: "Note the damage on the delivery receipt before signing, photograph it immediately, and contact the seller and support the same day — freight carriers enforce strict claim windows, and this is handled faster than a standard return.",
  },
];

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Returns & Refunds" }]} />
      <PageHeader
        eyebrow="Buyer Support"
        h1="Returns & Refunds"
        intro="A 14-day buyer protection window on every listing, plus how return freight, refunds and seller-specific warranties work on the marketplace."
        image={accessoriesImg}
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        {sections.map((s) => (
          <div key={s.h} className="mb-8">
            <h2 className="font-display text-xl font-bold text-foreground">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <FaqList faqs={returnFaqs} title="Returns & Refunds FAQs" />
      </section>
    </>
  );
}
