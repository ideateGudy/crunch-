"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ImageCategory, ProductImage } from "@/data/flavours";

const CATEGORIES: ImageCategory[] = [
  "Close-up",
  "Texture",
  "Pack",
  "Serving",
  "Gifting",
];

export interface ExploreModalProps {
  flavourName: string;
  images: ProductImage[];
  onClose: () => void;
}

export function ExploreModal({
  flavourName,
  images,
  onClose,
}: ExploreModalProps) {
  const [activeCategory, setActiveCategory] = useState<ImageCategory>(
    images[0]?.category ?? "Close-up",
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      prevActive?.focus?.();
    };
  }, [onClose]);

  const matchingImages = images.filter((img) => img.category === activeCategory);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-band/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="explore-modal-title"
        className="crunche-modal-enter flex max-h-[90svh] w-full max-w-[820px] flex-col overflow-hidden rounded-[28px] border border-border bg-surface-elevated text-ink shadow-[0_12px_32px_-12px_rgb(43_24_16/0.35)]"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
              Photo Tour
            </p>
            <h2 id="explore-modal-title" className="font-display text-xl font-bold text-ink">
              Explore {flavourName}
            </h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={`Close Explore ${flavourName} modal`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:bg-surface-muted"
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div
          role="tablist"
          aria-label="Photo categories"
          className="flex shrink-0 gap-2 overflow-x-auto border-b border-border px-5 py-3 sm:px-6"
        >
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full px-4 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-caramel text-on-caramel"
                    : "border border-border bg-surface text-ink hover:bg-surface-muted"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4">
            {matchingImages.map((img, i) => (
              <figure key={`${img.category}-${i}`} className="overflow-hidden rounded-[20px] border border-border bg-surface-muted">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 820px) 100vw, 760px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-border bg-surface px-4 py-3 text-sm text-ink-soft">
                  {img.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
