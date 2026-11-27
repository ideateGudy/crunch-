"use client";

import { Check, Images, Minus, Plus, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ExploreModal } from "@/components/ExploreModal";
import { ImageLightbox } from "@/components/ImageLightbox";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";
import type { Flavour, PackSize } from "@/data/flavours";
import { formatNaira } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function ProductDetailView({
  flavour,
  related,
}: {
  flavour: Flavour;
  related: Flavour[];
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<PackSize>(
    flavour.sizes[0]?.size ?? "100g",
  );
  const [qty, setQty] = useState(1);

  const activeSizeObj =
    flavour.sizes.find((s) => s.size === selectedSize) ?? flavour.sizes[0];
  const unitPrice = activeSizeObj?.priceNgn ?? 0;
  const totalPrice = unitPrice * qty;
  const currentImg = flavour.images[imgIndex] ?? flavour.images[0];

  const waHref = buildWhatsAppLink({
    flavour: flavour.name,
    size: activeSizeObj?.size,
    qty,
  });

  return (
    <div className="bg-surface pb-24 text-ink lg:pb-0">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="inline-flex min-h-[44px] min-w-[44px] items-center hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="inline-flex min-h-[44px] min-w-[44px] items-center hover:text-ink">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">
              {flavour.name}
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Gallery */}
          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Open ${flavour.name} gallery lightbox`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-border bg-surface-muted"
            >
              <Image
                src={currentImg.src}
                alt={currentImg.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 600px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </button>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {flavour.images.map((img, idx) => (
                <button
                  key={`${img.category}-${idx}`}
                  type="button"
                  onClick={() => setImgIndex(idx)}
                  aria-label={`View ${img.category} photo`}
                  aria-current={idx === imgIndex ? "true" : undefined}
                  className={`relative aspect-square min-h-[44px] overflow-hidden rounded-[12px] border-2 transition-colors ${
                    idx === imgIndex ? "border-caramel" : "border-border opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setExploreOpen(true)}
              className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted"
            >
              <Images className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              <span>Explore {flavour.name}</span>
            </button>
          </div>

          {/* Info & Order Controls */}
          <div className="lg:col-span-6">
            {flavour.badge && (
              <span className="inline-block rounded-full bg-caramel px-3.5 py-1 text-xs font-semibold text-on-caramel">
                {flavour.badge}
              </span>
            )}
            <h1
              className="mt-3 font-display font-bold tracking-[-0.02em] text-ink"
              style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
            >
              {flavour.name} Chin Chin
            </h1>
            <p className="mt-3 text-lg text-ink-soft">{flavour.description}</p>

            <p className="mt-5 font-display text-2xl font-bold text-caramel-ink">
              {formatNaira(totalPrice)}
              {qty > 1 && (
                <span className="ml-2 text-sm font-normal text-ink-soft">
                  ({formatNaira(unitPrice)} each)
                </span>
              )}
            </p>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
                Pack Size
              </p>
              <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Select pack size">
                {flavour.sizes.map((s) => {
                  const active = s.size === activeSizeObj?.size;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSize(s.size)}
                      aria-pressed={active}
                      className={`inline-flex min-h-[44px] min-w-[64px] items-center justify-center rounded-[12px] px-4 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-ink text-surface"
                          : "border border-border bg-surface-elevated text-ink hover:bg-surface-muted"
                      }`}
                    >
                      {s.size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
                  Quantity
                </p>
                <div className="mt-2 inline-flex items-center rounded-full border border-border bg-surface-elevated p-1">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                  <span className="min-w-[2.5rem] text-center font-display text-base font-bold text-ink" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(50, q + 1))}
                    aria-label="Increase quantity"
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex-1 pt-6">
                <WhatsAppOrderButton
                  href={waHref}
                  className="min-h-[48px] w-full px-6 py-3 text-base"
                />
              </div>
            </div>

            {/* Clean checklist blocks */}
            <div className="mt-8 space-y-5 border-t border-border pt-6">
              <div>
                <h2 className="font-display text-lg font-bold text-ink">Taste Notes</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {flavour.tasteNotes.map((note) => (
                    <li
                      key={note}
                      className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3.5 py-1.5 text-sm text-ink"
                    >
                      <Check className="h-3.5 w-3.5 text-caramel-ink" strokeWidth={1.75} aria-hidden="true" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-lg font-bold text-ink">Ingredients</h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  {flavour.ingredients.join(", ")}.
                </p>
              </div>

              <div className="rounded-[20px] border border-border bg-surface-elevated p-4">
                <h2 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                  <ShieldAlert className="h-4 w-4 text-caramel-ink" strokeWidth={1.75} aria-hidden="true" />
                  <span>Allergens</span>
                </h2>
                <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                  {flavour.allergens.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-[16px] border border-border bg-surface-elevated p-4">
                  <h2 className="font-display text-base font-bold text-ink">Shelf Life</h2>
                  <p className="mt-1 text-sm text-ink-soft">{flavour.shelfLife}</p>
                </div>
                <div className="rounded-[16px] border border-border bg-surface-elevated p-4">
                  <h2 className="font-display text-base font-bold text-ink">Storage</h2>
                  <p className="mt-1 text-sm text-ink-soft">{flavour.storage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related flavours */}
        <section aria-labelledby="related-heading" className="mt-16 border-t border-border pt-12">
          <h2 id="related-heading" className="font-display text-2xl font-bold text-ink">
            More flavours to try
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/shop/${item.slug}`}
                className="group flex flex-col rounded-[20px] border border-border bg-surface-elevated p-4 transition-colors hover:border-caramel"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-muted">
                  <Image
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    fill
                    sizes="(max-width: 1023px) 50vw, 280px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-ink group-hover:text-caramel-ink">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{item.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky mobile order bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div>
          <p className="text-xs font-medium text-ink-soft">
            {flavour.name} · {activeSizeObj?.size} × {qty}
          </p>
          <p className="font-display text-lg font-bold text-ink">
            {formatNaira(totalPrice)}
          </p>
        </div>
        <WhatsAppOrderButton href={waHref} className="px-5 py-2.5 text-sm" />
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={flavour.images}
          index={imgIndex}
          title={flavour.name}
          onIndexChange={setImgIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {exploreOpen && (
        <ExploreModal
          flavourName={flavour.name}
          images={flavour.images}
          onClose={() => setExploreOpen(false)}
        />
      )}
    </div>
  );
}
