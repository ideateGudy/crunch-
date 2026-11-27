"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { flavours, getMinPrice } from "@/data/flavours";
import { formatNaira } from "@/lib/format";
import { revealOnScroll } from "@/lib/reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function FlavoursShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trigger = revealOnScroll("[data-flavour-reveal]", { stagger: 0.06 });
      return () => {
        trigger?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-hero-next
      aria-labelledby="flavours-heading"
      className="mx-auto max-w-[1280px] px-4 py-[clamp(4rem,8vw,9rem)] sm:px-6 lg:px-10"
    >
      <div
        data-flavour-reveal
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
            Signature Range
          </p>
          <h2
            id="flavours-heading"
            className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
            style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
          >
            Five flavours, one crunch
          </h2>
          <p className="mt-3 max-w-[55ch] text-ink-soft">
            From warm nutmeg Classic Golden to lively Nigerian Spicy—pick a pack size from 100g to 1kg and order in seconds.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-full border-[1.5px] border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted sm:self-auto"
        >
          <span>Explore full shop</span>
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>

      {/* Horizontal snap-scroll on mobile/tablet, 5-column grid on desktop */}
      <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
        {flavours.map((flavour) => {
          const firstImage = flavour.images[0];
          const minPrice = getMinPrice(flavour);
          const defaultSize = flavour.sizes[0]?.size ?? "100g";
          const orderHref = buildWhatsAppLink({
            flavour: flavour.name,
            size: defaultSize,
            qty: 1,
          });

          return (
            <article
              key={flavour.slug}
              data-flavour-reveal
              className="flex w-[272px] shrink-0 snap-start flex-col rounded-[20px] border border-border bg-surface-elevated p-4 shadow-[0_12px_32px_-12px_rgb(43_24_16/0.12)] sm:w-[290px] lg:w-auto"
            >
              <Link
                href={`/shop/${flavour.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-muted"
              >
                <Image
                  src={firstImage.src}
                  alt={firstImage.alt}
                  fill
                  sizes="(max-width: 1023px) 290px, 240px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                {flavour.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-caramel px-3 py-1 text-xs font-semibold text-on-caramel">
                    {flavour.badge}
                  </span>
                )}
              </Link>

              <div className="mt-4 flex flex-1 flex-col">
                <h3 className="font-display text-lg font-bold leading-snug text-ink">
                  <Link
                    href={`/shop/${flavour.slug}`}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center hover:text-caramel-ink"
                  >
                    {flavour.name}
                  </Link>
                </h3>
                <p className="font-display text-sm font-bold text-caramel-ink">
                  From {formatNaira(minPrice)}
                </p>

                <p className="mt-2 flex-1 text-sm text-ink-soft">
                  {flavour.tagline}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={orderHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-caramel px-3 py-2 text-xs font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
                  >
                    <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    <span>Order</span>
                  </a>
                  <Link
                    href={`/shop/${flavour.slug}`}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-[1.5px] border-border px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-surface-muted"
                  >
                    View
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
