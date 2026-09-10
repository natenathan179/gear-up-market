import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, Clock } from "lucide-react";
import { Breadcrumbs, PageHeader, SectionHeading } from "@/components/site/Bits";
import { businessInfo } from "@/data/catalog";

const title = "Contact Gym Equipment Marketplace";
const description =
  "Contact Gym Equipment Marketplace about buying or selling gym equipment, shipping, quotes or seller support. Call, email or send us a message.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  subject: z.string().trim().min(2, "Enter a subject").max(120),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success("Thanks — your message has been sent. We reply within one business day.");
  };

  const field = "h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-primary";

  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <PageHeader
        eyebrow="Contact"
        h1="Contact Gym Equipment Marketplace"
        intro="Questions about a listing, a quote, freight, or selling your own equipment? Our team is here Monday to Friday."
      />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={submit} noValidate className="space-y-4">
            <SectionHeading title="Send a Message" as="h2" />
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase">Name</span>
              <input
                value={form.name}
                maxLength={80}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
              />
              {errors["name"] && <span className="mt-1 block text-xs text-primary">{errors["name"]}</span>}
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase">Email</span>
              <input
                type="email"
                value={form.email}
                maxLength={120}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
              />
              {errors["email"] && <span className="mt-1 block text-xs text-primary">{errors["email"]}</span>}
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase">Subject</span>
              <input
                value={form.subject}
                maxLength={120}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={field}
              />
              {errors["subject"] && <span className="mt-1 block text-xs text-primary">{errors["subject"]}</span>}
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase">Message</span>
              <textarea
                value={form.message}
                rows={6}
                maxLength={1000}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary"
              />
              {errors["message"] && <span className="mt-1 block text-xs text-primary">{errors["message"]}</span>}
            </label>
            <button
              type="submit"
              className="bg-primary px-6 py-3 text-sm font-bold tracking-wide uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Send Message
            </button>
          </form>

          <aside className="border border-border bg-secondary p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Contact Details</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" /> {businessInfo.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" /> {businessInfo.email}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-primary" /> {businessInfo.hours}
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              These contact details are placeholders until your real phone, email and hours are
              added.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
