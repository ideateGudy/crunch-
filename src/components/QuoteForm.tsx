"use client";

import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { flavours } from "@/data/flavours";
import { formatPhone } from "@/lib/format";
import { buildWhatsAppMessageLink } from "@/lib/whatsapp";

const OCCASIONS = [
  "Wedding / Owambe",
  "Corporate Gift",
  "Birthday / Celebration",
  "Retail / Wholesale",
  "Other",
] as const;

const PACK_OPTIONS = ["100g", "250g", "500g", "1kg", "Gift Boxes"] as const;

const NIGERIAN_STATES = [
  "Lagos",
  "Abuja (FCT)",
  "Rivers (Port Harcourt)",
  "Oyo (Ibadan)",
  "Ogun",
  "Enugu",
  "Kano",
  "Other Nigerian State",
] as const;

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  flavours?: string;
  packSizes?: string;
  quantity?: string;
  eventDate?: string;
  consent?: string;
}

function isValidNigerianPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return (
    /^234[789][01]\d{8}$/.test(digits) ||
    /^0[789][01]\d{8}$/.test(digits)
  );
}

export function QuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState<string>(OCCASIONS[0]);
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([
    flavours[0]?.name ?? "Classic Golden",
  ]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["250g"]);
  const [quantity, setQuantity] = useState("20");
  const [eventDate, setEventDate] = useState("");
  const [deliveryState, setDeliveryState] = useState<string>(NIGERIAN_STATES[0]);
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedLinks, setSubmittedLinks] = useState<{
    whatsappUrl: string;
    mailtoUrl: string;
  } | null>(null);

  const toggleItem = (
    list: string[],
    setList: (next: string[]) => void,
    value: string,
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) next.name = "Please enter your full name.";
    if (!isValidNigerianPhone(phone)) {
      next.phone = "Enter a valid Nigerian number (e.g. +234 801 234 5678 or 08012345678).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (selectedFlavours.length === 0) {
      next.flavours = "Select at least one flavour.";
    }
    if (selectedSizes.length === 0) {
      next.packSizes = "Select at least one pack size or Gift Boxes.";
    }
    const qtyNum = Number(quantity);
    if (!Number.isFinite(qtyNum) || qtyNum < 1) {
      next.quantity = "Enter a quantity of 1 or more.";
    }
    if (!eventDate) {
      next.eventDate = "Please choose an event or preferred delivery date.";
    }
    if (!consent) {
      next.consent = "Please accept the Privacy Notice before continuing.";
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setSubmittedLinks(null);
      return;
    }

    const formattedPhone = formatPhone(phone);
    const lines = [
      `Hello CRUNCHÉ! I'd like a quote:`,
      `Name: ${name.trim()}`,
      `Phone: ${formattedPhone}`,
      `Email: ${email.trim()}`,
      `Occasion: ${occasion}`,
      `Flavours: ${selectedFlavours.join(", ")}`,
      `Pack sizes: ${selectedSizes.join(", ")}`,
      `Quantity: ${quantity}`,
      `Event / Delivery date: ${eventDate}`,
      `Delivery state: ${deliveryState}`,
      notes.trim() ? `Notes: ${notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = buildWhatsAppMessageLink(lines);
    const mailTarget = siteConfig.contact.email.startsWith("[")
      ? ""
      : siteConfig.contact.email;
    const mailtoUrl = `mailto:${mailTarget}?subject=${encodeURIComponent(
      `CRUNCHÉ Quote Request — ${occasion}`,
    )}&body=${encodeURIComponent(lines)}`;

    setSubmittedLinks({ whatsappUrl, mailtoUrl });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="quote-form-heading"
      className="rounded-[28px] border border-border bg-surface-elevated p-6 shadow-[0_12px_32px_-12px_rgb(43_24_16/0.15)] sm:p-8"
    >
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
        Gift &amp; Bulk Quote
      </p>
      <h2 id="quote-form-heading" className="mt-2 font-display text-2xl font-bold text-ink">
        Request a custom quote
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        Fill in your event or wholesale details below. Your quote request opens pre-filled in WhatsApp (or email).
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className="block text-sm font-medium text-ink">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "quote-name-err" : undefined}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3.5 text-sm text-ink"
          />
          {errors.name && (
            <p id="quote-name-err" className="mt-1 text-xs font-medium text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className="block text-sm font-medium text-ink">
            Phone (+234) <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234 801 234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "quote-phone-err" : undefined}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3.5 text-sm text-ink placeholder:text-ink-soft/70"
          />
          {errors.phone && (
            <p id="quote-phone-err" className="mt-1 text-xs font-medium text-danger">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-email" className="block text-sm font-medium text-ink">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "quote-email-err" : undefined}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3.5 text-sm text-ink"
          />
          {errors.email && (
            <p id="quote-email-err" className="mt-1 text-xs font-medium text-danger">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-occasion" className="block text-sm font-medium text-ink">
            Occasion
          </label>
          <select
            id="quote-occasion"
            name="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3.5 text-sm text-ink"
          >
            {OCCASIONS.map((occ) => (
              <option key={occ} value={occ}>
                {occ}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-ink">
            Flavours <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {flavours.map((f) => {
              const checked = selectedFlavours.includes(f.name);
              return (
                <label
                  key={f.slug}
                  className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[12px] border px-3.5 text-sm transition-colors ${
                    checked
                      ? "border-caramel bg-surface-muted font-semibold text-ink"
                      : "border-border bg-surface text-ink-soft hover:bg-surface-muted/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      toggleItem(selectedFlavours, setSelectedFlavours, f.name)
                    }
                    className="h-4 w-4 accent-[var(--caramel)]"
                  />
                  <span>{f.name}</span>
                </label>
              );
            })}
          </div>
          {errors.flavours && (
            <p className="mt-1 text-xs font-medium text-danger">{errors.flavours}</p>
          )}
        </fieldset>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-ink">
            Pack sizes / Boxes <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {PACK_OPTIONS.map((size) => {
              const checked = selectedSizes.includes(size);
              return (
                <label
                  key={size}
                  className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[12px] border px-3.5 text-sm transition-colors ${
                    checked
                      ? "border-caramel bg-surface-muted font-semibold text-ink"
                      : "border-border bg-surface text-ink-soft hover:bg-surface-muted/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      toggleItem(selectedSizes, setSelectedSizes, size)
                    }
                    className="h-4 w-4 accent-[var(--caramel)]"
                  />
                  <span>{size}</span>
                </label>
              );
            })}
          </div>
          {errors.packSizes && (
            <p className="mt-1 text-xs font-medium text-danger">{errors.packSizes}</p>
          )}
        </fieldset>

        <div>
          <label htmlFor="quote-qty" className="block text-sm font-medium text-ink">
            Estimated quantity <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-qty"
            name="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby={errors.quantity ? "quote-qty-err" : undefined}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3.5 text-sm text-ink"
          />
          {errors.quantity && (
            <p id="quote-qty-err" className="mt-1 text-xs font-medium text-danger">
              {errors.quantity}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-date" className="block text-sm font-medium text-ink">
            Event / Delivery date <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-date"
            name="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            aria-invalid={Boolean(errors.eventDate)}
            aria-describedby={errors.eventDate ? "quote-date-err" : undefined}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3.5 text-sm text-ink"
          />
          {errors.eventDate && (
            <p id="quote-date-err" className="mt-1 text-xs font-medium text-danger">
              {errors.eventDate}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="quote-state" className="block text-sm font-medium text-ink">
            Delivery state
          </label>
          <select
            id="quote-state"
            name="deliveryState"
            value={deliveryState}
            onChange={(e) => setDeliveryState(e.target.value)}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3.5 text-sm text-ink"
          >
            {NIGERIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="quote-notes" className="block text-sm font-medium text-ink">
            Notes (ribbon colour, branding, or delivery instructions)
          </label>
          <textarea
            id="quote-notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1.5 w-full rounded-[12px] border border-border bg-surface p-3.5 text-sm text-ink"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-sm text-ink-soft">
            <input
              id="quote-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "quote-consent-err" : undefined}
              className="mt-1 h-5 w-5 shrink-0 accent-[var(--caramel)]"
            />
            <span>
              I consent to CRUNCHÉ using these details to prepare my quote in line with the{" "}
              <Link
                href="/policies/privacy"
                className="inline-flex min-h-[44px] items-center font-medium text-caramel-ink underline underline-offset-4 hover:text-ink"
              >
                Privacy Notice
              </Link>{" "}
              (NDPA). <span aria-hidden="true">*</span>
            </span>
          </label>
          {errors.consent && (
            <p id="quote-consent-err" className="mt-1 text-xs font-medium text-danger">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-caramel px-6 py-3 text-base font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink sm:w-auto"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          <span>Open quote in WhatsApp</span>
        </button>
      </div>

      <div aria-live="polite" className="mt-4">
        {submittedLinks && (
          <div className="rounded-[16px] border border-success bg-surface p-4 text-sm text-ink">
            <p className="font-semibold text-success">
              Opening WhatsApp with your pre-filled quote…
            </p>
            <p className="mt-1 text-ink-soft">
              If WhatsApp did not open automatically, use one of the direct links below:
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={submittedLinks.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-caramel px-4 py-2 text-xs font-semibold text-on-caramel hover:bg-cocoa hover:text-band-ink"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                <span>Open WhatsApp</span>
              </a>
              <a
                href={submittedLinks.mailtoUrl}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-[1.5px] border-ink px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-muted"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                <span>Send via Email instead</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
