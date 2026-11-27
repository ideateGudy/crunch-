import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { siteConfig } from "@/config/site";
import { formatPhone, toInternationalDigits } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `Contact & Quote — ${siteConfig.name}`,
  description:
    "Order CRUNCHÉ chin chin on WhatsApp, call our team, or request a custom gift box and bulk event quote.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const whatsappHref = buildWhatsAppLink();
  const phoneDigits = toInternationalDigits(siteConfig.contact.phone);
  const telHref = phoneDigits ? `tel:+${phoneDigits}` : undefined;
  const emailHref = siteConfig.contact.email.startsWith("[")
    ? undefined
    : `mailto:${siteConfig.contact.email}`;

  return (
    <div className="bg-surface text-ink">
      <section className="mx-auto max-w-[1280px] px-4 py-[clamp(3.5rem,7vw,6.5rem)] sm:px-6 lg:px-10">
        <div className="max-w-[640px]">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
            Contact &amp; Bulk Quotes
          </p>
          <h1
            className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
            style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
          >
            Let&apos;s pack something crisp
          </h1>
          <p className="mt-3 text-lg text-ink-soft">
            Reach us directly on WhatsApp, give us a call, or send your event details using the quote builder.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-[20px] border border-border bg-surface-elevated p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                Direct Contact
              </h2>

              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-caramel-ink" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">WhatsApp</p>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center text-caramel-ink underline underline-offset-4 hover:text-ink"
                    >
                      {formatPhone(siteConfig.contact.whatsapp)}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-caramel-ink" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">Phone</p>
                    {telHref ? (
                      <a
                        href={telHref}
                        className="inline-flex min-h-[44px] items-center text-caramel-ink underline underline-offset-4 hover:text-ink"
                      >
                        {formatPhone(siteConfig.contact.phone)}
                      </a>
                    ) : (
                      <p className="text-ink-soft">{formatPhone(siteConfig.contact.phone)}</p>
                    )}
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-caramel-ink" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">Email</p>
                    {emailHref ? (
                      <a
                        href={emailHref}
                        className="inline-flex min-h-[44px] items-center text-caramel-ink underline underline-offset-4 hover:text-ink"
                      >
                        {siteConfig.contact.email}
                      </a>
                    ) : (
                      <p className="text-ink-soft">{siteConfig.contact.email}</p>
                    )}
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-caramel-ink" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">Hours</p>
                    {/* TODO(client): confirm business hours */}
                    <p className="text-ink-soft">{siteConfig.contact.hours}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Embedded-free map placeholder card (no third-party iframe) */}
            <div className="rounded-[20px] border border-border bg-surface-muted p-6">
              <div className="flex items-center gap-2 text-caramel-ink">
                <MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                <h2 className="font-display text-lg font-bold text-ink">
                  Kitchen &amp; Delivery Coverage
                </h2>
              </div>
              <p className="mt-2 text-sm text-ink-soft">
                Location: {siteConfig.contact.address}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {siteConfig.deliveryAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-ink"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div id="quote" className="lg:col-span-7">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
