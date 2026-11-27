"use client";

import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ImageLightbox } from "@/components/ImageLightbox";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";
import type { FlavourSize, PackSize, ProductImage } from "@/data/flavours";
import { formatNaira } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export interface ShopCardItem {
  kind: "flavour" | "gift-box";
  slug: string;
  name: string;
  tagline: string;
  href: string;
  badge?: string;
  sizes?: FlavourSize[];
  fixedPriceNgn?: number;
  images: ProductImage[];
}

export function ShopCard({
  item,
  initialSize,
}: {
  item: ShopCardItem;
  initialSize?: PackSize;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const defaultSize =
    item.sizes?.find((s) => s.size === initialSize)?.size ??
    item.sizes?.[0]?.size;
  const [selectedSize, setSelectedSize] = useState<PackSize | undefined>(defaultSize);

  const touchStartX = useRef<number | null>(null);

  const activeSizeObj = item.sizes?.find((s) => s.size === selectedSize) ?? item.sizes?.[0];
  const priceNgn = activeSizeObj?.priceNgn ?? item.fixedPriceNgn ?? 0;

  const waHref = buildWhatsAppLink({
    flavour: item.kind === "gift-box" ? `${item.name} Gift Box` : item.name,
    size: activeSizeObj?.size,
    qty: 1,
  });

  const currentImg = item.images[imgIndex] ?? item.images[0];
  const total = item.images.length;

  const prevImg = () => setImgIndex((i) => (i - 1 + total) % total);
  const nextImg = () => setImgIndex((i) => (i + 1) % total);

  return (
    <article className="crunche-card flex flex-col rounded-[20px] border border-border bg-surface-elevated p-4 shadow-[0_12px_32px_-12px_rgb(43_24_16/0.12)]">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-muted"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null || total <= 1) return;
          const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(delta) > 36) {
            if (delta < 0) nextImg();
            else prevImg();
          }
        }}
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Open ${item.name} image viewer`}
          className="group relative block h-full w-full text-left"
        >
          <Image
            src={currentImg.src}
            alt={currentImg.alt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 300px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-band/75 text-band-ink opacity-90"
          >
            <Expand className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </button>

        {item.badge && (
          <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full bg-caramel px-3 py-1 text-xs font-semibold text-on-caramel">
            {item.badge}
          </span>
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prevImg}
              aria-label={`Previous ${item.name} image`}
              className="absolute left-1.5 top-1/2 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-band/70 text-band-ink transition-colors hover:bg-caramel hover:text-on-caramel"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={nextImg}
              aria-label={`Next ${item.name} image`}
              className="absolute right-1.5 top-1/2 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-band/70 text-band-ink transition-colors hover:bg-caramel hover:text-on-caramel"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          className="mt-1 flex items-center justify-center"
          role="group"
          aria-label={`${item.name} image categories`}
        >
          {Array.from(new Set(item.images.map((img) => img.category))).map(
            (category) => {
              const firstIdx = item.images.findIndex(
                (img) => img.category === category,
              );
              const isActiveCategory = currentImg.category === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setImgIndex(firstIdx)}
                  aria-label={`Show ${category} image`}
                  aria-current={isActiveCategory ? "true" : undefined}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${
                      isActiveCategory ? "w-5 bg-caramel" : "w-2 bg-border"
                    }`}
                  />
                </button>
              );
            },
          )}
        </div>
      )}

      <div className="mt-2 flex flex-1 flex-col">
        <h2 className="font-display text-lg font-bold text-ink">
          <Link
            href={item.href}
            className="inline-flex min-h-[44px] min-w-[44px] items-center hover:text-caramel-ink"
          >
            {item.kind === "gift-box" ? `${item.name} Gift Box` : item.name}
          </Link>
        </h2>
        <p className="font-display text-base font-bold text-caramel-ink">
          {formatNaira(priceNgn)}
        </p>
        <p className="mt-1.5 flex-1 text-sm text-ink-soft">{item.tagline}</p>

        {item.sizes && (
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label={`Pack size for ${item.name}`}>
            {item.sizes.map((s) => {
              const active = s.size === activeSizeObj?.size;
              return (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSelectedSize(s.size)}
                  aria-pressed={active}
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[12px] px-3 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-ink text-surface"
                      : "border border-border bg-surface text-ink hover:bg-surface-muted"
                  }`}
                >
                  {s.size}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-4">
          <WhatsAppOrderButton href={waHref} className="w-full px-4 py-2 text-xs" />
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={item.images}
          index={imgIndex}
          title={item.kind === "gift-box" ? `${item.name} Gift Box` : item.name}
          onIndexChange={setImgIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </article>
  );
}
