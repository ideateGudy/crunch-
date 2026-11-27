"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProductImage } from "@/data/flavours";

export interface ImageLightboxProps {
  images: ProductImage[];
  index: number;
  title: string;
  onIndexChange: (nextIndex: number) => void;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  index,
  title,
  onIndexChange,
  onClose,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const safeIndex = ((index % images.length) + images.length) % images.length;
  const current = images[safeIndex];

  useEffect(() => {
    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        onIndexChange((safeIndex - 1 + images.length) % images.length);
        return;
      }
      if (e.key === "ArrowRight") {
        onIndexChange((safeIndex + 1) % images.length);
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
  }, [images.length, onClose, onIndexChange, safeIndex]);

  if (!current) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image viewer`}
      className="crunche-modal-enter fixed inset-0 z-50 flex flex-col bg-band/95 p-4 text-band-ink backdrop-blur-sm sm:p-6"
    >
      <div className="mx-auto flex w-full max-w-[1040px] shrink-0 items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-band-accent">
            {current.category} · {safeIndex + 1} / {images.length}
          </p>
          <p className="font-display text-lg font-bold text-band-ink">{title}</p>
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-band-ink/30 bg-band-elevated text-band-ink transition-colors hover:border-band-accent hover:text-band-accent"
        >
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative mx-auto mt-3 flex min-h-0 w-full flex-1 items-center justify-center"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null || images.length <= 1) return;
          const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(delta) > 36) {
            if (delta < 0) {
              onIndexChange((safeIndex + 1) % images.length);
            } else {
              onIndexChange((safeIndex - 1 + images.length) % images.length);
            }
          }
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-band-elevated sm:rounded-[28px]">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 1040px) 100vw, 1040px"
            className="object-contain"
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onIndexChange((safeIndex - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-band/85 text-band-ink transition-colors hover:bg-caramel hover:text-on-caramel"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onIndexChange((safeIndex + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-band/85 text-band-ink transition-colors hover:bg-caramel hover:text-on-caramel"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
