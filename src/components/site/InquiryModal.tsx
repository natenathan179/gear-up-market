import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendForm } from "@/lib/formsubmit";
import type { Product } from "@/lib/product-utils";
import type { CartItem } from "@/lib/cart";

export type InquirySubject =
  | { kind: "product"; product: Product }
  | { kind: "cart"; items: CartItem[]; total: number };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: InquirySubject;
  onSuccess?: () => void;
}

const deliveryOptions = [
  "Freight delivery to my address",
  "Inside delivery / installation",
  "I will arrange pickup",
  "Not sure yet – please advise",
];

export function InquiryModal({ open, onOpenChange, subject, onSuccess }: Props) {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isCart = subject.kind === "cart";
  const heading = isCart ? "Request a quote for your cart" : "Enquire about this equipment";

  const summaryLines = isCart
    ? subject.items.map(
        (item) =>
          `${item.qty} x ${item.title} (${item.condition}) — $${(item.price * item.qty).toLocaleString()}`,
      )
    : [
        `${subject.product.title} (${subject.product.condition}) — $${subject.product.price.toLocaleString()}`,
      ];

  const productFields = isCart
    ? {
        "Quote type": "Cart checkout enquiry",
        Items: subject.items
          .map((item) => `${item.qty} x ${item.title} [${item.slug}] @ $${item.price}`)
          .join(" | "),
        "Item count": String(subject.items.reduce((sum, item) => sum + item.qty, 0)),
        "Cart total": `$${subject.total.toLocaleString()}`,
      }
    : {
        "Quote type": "Single product enquiry",
        Product: subject.product.title,
        "Product page": `/equipment/${subject.product.slug}`,
        Brand: subject.product.brand,
        Model: subject.product.model,
        Condition: subject.product.condition,
        Price: `$${subject.product.price.toLocaleString()}`,
        Category: subject.product.category,
        Subcategory: subject.product.subcategory,
        Location: `${subject.product.city}, ${subject.product.state}`,
        Seller: subject.product.seller.name,
        Warranty: subject.product.warranty,
        Shipping: subject.product.shipping,
      };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "").trim();

    const name = get("name");
    const email = get("email");
    const phone = get("phone");
    const zip = get("zip");
    const quantity = get("quantity");
    const delivery = get("delivery");
    const message = get("message");

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors["name"] = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) nextErrors["email"] = "Enter a valid email address.";
    if (phone.length < 7) nextErrors["phone"] = "Enter a contact phone number.";
    if (message.length > 1500) nextErrors["message"] = "Please keep your message under 1500 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      await sendForm(isCart ? "Cart quote request" : `Enquiry: ${subject.product.title}`, {
        Name: name,
        Email: email,
        Phone: phone,
        "ZIP / delivery area": zip,
        "Quantity needed": quantity || "1",
        "Delivery preference": delivery,
        Message: message || "(no additional message)",
        ...productFields,
        Summary: summaryLines.join(" | "),
      });
      toast.success("Enquiry sent. Our team replies within one business day.");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{heading}</DialogTitle>
          <DialogDescription>
            Send your details and we will come back with availability, freight cost and a final
            price. No payment is taken online.
          </DialogDescription>
        </DialogHeader>

        <div className="border border-border bg-secondary p-3 text-sm">
          <p className="mb-2 text-xs font-bold tracking-wide uppercase text-muted-foreground">
            {isCart ? "Your cart" : "Selected equipment"}
          </p>
          <ul className="space-y-1">
            {summaryLines.map((line) => (
              <li key={line} className="text-foreground">
                {line}
              </li>
            ))}
          </ul>
          {isCart && (
            <p className="mt-2 font-bold text-primary">
              Estimated total: ${subject.total.toLocaleString()}
            </p>
          )}
          {!isCart && (
            <p className="mt-2 text-xs text-muted-foreground">
              {subject.product.brand} {subject.product.model} · {subject.product.city},{" "}
              {subject.product.state} · {subject.product.shipping}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" error={errors["name"]} required />
            <Field label="Email" name="email" type="email" error={errors["email"]} required />
            <Field label="Phone" name="phone" error={errors["phone"]} required />
            <Field label="ZIP / delivery area" name="zip" />
            <Field label="Quantity needed" name="quantity" type="number" defaultValue="1" />
            <div>
              <Label htmlFor="delivery" className="mb-1.5 block text-xs font-semibold uppercase">
                Delivery preference
              </Label>
              <select
                id="delivery"
                name="delivery"
                className="h-9 w-full border border-input bg-background px-2 text-sm outline-none focus:border-primary"
              >
                {deliveryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase">
              Your message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your timeline, facility, or any questions on condition and specifications."
            />
            {errors["message"] && (
              <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={sending} className="w-full sm:w-auto">
              {sending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isCart ? "Send quote request" : "Send enquiry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase">
        {label}
        {required && <span className="text-primary"> *</span>}
      </Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
