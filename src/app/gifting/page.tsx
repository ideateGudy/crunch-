import type { Metadata } from "next";
import { ArrowRight, Check, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { bulkTiers, giftBoxes } from "@/data/gift-boxes";
import { formatNaira } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `Gifting & Corporate — ${siteConfig.name}`,
  description:
    "CRUNCHÉ Classic, Celebration, and Corporate gift boxes, owambe party packs, and bulk wholesale chin chin orders across Nigeria.",
  alternates: { canonical: "/gifting" },
};

const OCCASIONS = [
  {
    title: "Weddings & Traditional Engagements",
    body: "Custom-ribboned 100g party packs and Celebration boxes ready for guest tables and bridal hampers.",
  },
  {
    title: "Owambe & Milestone Birthdays",
    body: "Crowd-pleasing assorted flavours packed neat so guests take the crunch home.",
  },
  {
    title: "Corporate Gifts & Client Hampers",
    body: "Branded belly bands and personalised cards for team milestones, onboarding, and client appreciation.",
  },
  {
    title: "Festive Seasons",
    body: "Eid, Christmas, and New Year gifting boxes dispatched directly to recipients nationwide.",
  },
] as const;

export default function GiftingPage() {
  return (
    <div className="bg-surface text-ink">
      <section className="mx-auto max-w-[1280px] px-4 py-[clamp(3.5rem,7vw,7rem)] sm:px-6 lg:px-10">
        <div className="max-w-[680px]">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
            Gifting, Events &amp; Wholesale
          </p>
          <h1
            className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
            style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
          >
            Gift boxes &amp; bulk orders, packed to impress
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            From intimate thank-you hampers to 500-pack owambe favours, every CRUNCHÉ gift order is packed fresh and dressed for the occasion.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {giftBoxes.map((box) => {
            const preview = box.images[0];
            const waHref = buildWhatsAppLink({
              flavour: `${box.name} Gift Box`,
              qty: 1,
            });

            return (
              <article
                key={box.slug}
                className="flex flex-col rounded-[20px] border border-border bg-surface-elevated p-6 shadow-[0_12px_32px_-12px_rgb(43_24_16/0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-muted">
                  <Image
                    src={preview.src}
                    alt={preview.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 380px"
                    className="object-cover"
                  />
                </div>

                <div className="mt-5">
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {box.name} Box
                  </h2>
                  <p className="mt-1 font-display text-xl font-bold text-caramel-ink">
                    {formatNaira(box.priceNgn)}
                  </p>
                </div>

                <p className="mt-2 text-sm text-ink-soft">{box.tagline}</p>

                <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-ink">
                  {box.contents.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-caramel-ink"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-1 text-xs text-ink-soft">
                  {box.minOrder && <p>Minimum order: {box.minOrder}</p>}
                  <p className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-caramel-ink" strokeWidth={1.75} aria-hidden="true" />
                    <span>Lead time: {box.leadTime}</span>
                  </p>
                </div>

                <div className="mt-6 pt-2">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-caramel px-5 py-3 text-sm font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    <span>Order {box.name} on WhatsApp</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="occasions-heading"
        className="border-y border-border bg-surface-muted/60"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-[clamp(3.5rem,7vw,6.5rem)] sm:px-6 lg:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
            Occasion Ideas
          </p>
          <h2 id="occasions-heading" className="mt-2 font-display text-2xl font-bold text-ink">
            Made for every celebration
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OCCASIONS.map((occ) => (
              <div
                key={occ.title}
                className="rounded-[20px] border border-border bg-surface-elevated p-6"
              >
                <h3 className="font-display text-lg font-bold text-ink">{occ.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{occ.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="bulk-tiers-heading"
        className="mx-auto max-w-[1280px] px-4 py-[clamp(3.5rem,7vw,6.5rem)] sm:px-6 lg:px-10"
      >
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
          Bulk &amp; Wholesale Tiers
        </p>
        <h2 id="bulk-tiers-heading" className="mt-2 font-display text-2xl font-bold text-ink">
          Volume options for events &amp; stockists
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {bulkTiers.map((tier) => (
            <div
              key={tier.tier}
              className="rounded-[20px] border border-border bg-surface-elevated p-6"
            >
              <h3 className="font-display text-lg font-bold text-ink">{tier.tier}</h3>
              <p className="mt-1 font-display text-base font-semibold text-caramel-ink">
                From {tier.minimum}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{tier.idealFor}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="gifting-cta-heading" className="bg-band text-band-ink">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-10">
          <div className="max-w-[60ch]">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-band-accent">
              Custom Quote
            </p>
            <h2
              id="gifting-cta-heading"
              className="mt-2 font-display text-2xl font-bold text-band-ink"
            >
              Planning an event or corporate hamper run?
            </h2>
            <p className="mt-2 text-band-ink/85">
              Share your event date, flavours, and quantity—we will prepare a tailored quote via WhatsApp or email.
            </p>
          </div>
          <Link
            href="/contact#quote"
            className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-caramel px-6 py-3 text-sm font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
          >
            <span>Request a bulk quote</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
