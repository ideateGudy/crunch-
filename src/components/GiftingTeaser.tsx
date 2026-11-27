"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRight, Gift, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { giftBoxes } from "@/data/gift-boxes";
import { formatNaira } from "@/lib/format";
import { revealOnScroll } from "@/lib/reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function GiftingTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trigger = revealOnScroll("[data-gifting-reveal]", { stagger: 0.08 });
      return () => {
        trigger?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="gifting-teaser-heading"
      className="mx-auto max-w-[1280px] px-4 py-[clamp(4rem,8vw,9rem)] sm:px-6 lg:px-10"
    >
      <div
        data-gifting-reveal
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
            Gifting &amp; Corporate
          </p>
          <h2
            id="gifting-teaser-heading"
            className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
            style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
          >
            Share the crunch at every table
          </h2>
          <p className="mt-3 max-w-[58ch] text-ink-soft">
            Ribboned gift boxes, owambe party packs, and custom-branded hampers for teams and clients.
          </p>
        </div>

        <Link
          href="/gifting"
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-full border-[1.5px] border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted sm:self-auto"
        >
          <span>Explore gifting &amp; bulk</span>
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {giftBoxes.map((box) => {
          const preview = box.images[0];
          const waHref = buildWhatsAppLink({
            flavour: `${box.name} Gift Box`,
            qty: 1,
          });
          return (
            <article
              key={box.slug}
              data-gifting-reveal
              className="flex flex-col rounded-[20px] border border-border bg-surface-elevated p-5 shadow-[0_12px_32px_-12px_rgb(43_24_16/0.12)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-muted">
                <Image
                  src={preview.src}
                  alt={preview.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 400px"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-caramel px-3 py-1 text-xs font-semibold text-on-caramel">
                  <Gift className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                  <span>{box.name}</span>
                </span>
              </div>

              <div className="mt-4 flex flex-1 flex-col">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-ink">
                    {box.name} Box
                  </h3>
                  <span className="font-display text-lg font-bold text-caramel-ink">
                    {formatNaira(box.priceNgn)}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{box.tagline}</p>
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-caramel px-4 py-2 text-xs font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
                  >
                    <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    <span>Order on WhatsApp</span>
                  </a>
                  <Link
                    href="/gifting"
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-[1.5px] border-border px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-surface-muted"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
