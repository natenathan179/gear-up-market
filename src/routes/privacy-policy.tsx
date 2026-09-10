import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";

const title = "Privacy Policy | Gym Equipment Marketplace";
const description =
  "How Gym Equipment Marketplace collects, uses and protects personal information from buyers and sellers using the platform.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy-policy" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: Page,
});

const sections = [
  {
    h: "What we collect",
    p: "Details you submit through our contact and equipment listing forms, such as your name, email, phone number, location and the equipment information you provide.",
  },
  {
    h: "How we use it",
    p: "To respond to enquiries, publish listings you ask us to publish, connect buyers with sellers, and improve the marketplace.",
  },
  {
    h: "Sharing",
    p: "Contact details are shared with the other party to a transaction where that is necessary to complete a sale. We do not sell personal information.",
  },
  {
    h: "Your choices",
    p: "You can ask us to update or delete your information at any time by contacting our support team.",
  },
  {
    h: "Placeholder notice",
    p: "This page is template wording and is not legal advice. Replace it with a policy reviewed for your jurisdiction before collecting real customer data.",
  },
];

function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <PageHeader eyebrow="Legal" h1="Privacy Policy" intro="How we handle the information you share with Gym Equipment Marketplace." />
      <section className="mx-auto max-w-3xl px-4 py-12">
        {sections.map((s) => (
          <div key={s.h} className="mb-8">
            <h2 className="font-display text-xl font-bold text-foreground">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </div>
        ))}
      </section>
    </>
  );
}
