import { businessInfo } from "@/data/catalog";

/**
 * All site forms are delivered by FormSubmit.co to this address.
 * Change this one value to route enquiries elsewhere.
 */
export const FORM_RECIPIENT = businessInfo.email;

const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(FORM_RECIPIENT)}`;

export async function sendForm(subject: string, fields: Record<string, string>): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: subject,
      _template: "table",
      _captcha: "false",
      ...fields,
    }),
  });
  if (!response.ok) {
    throw new Error("We could not send your message. Please try again or call us.");
  }
}
