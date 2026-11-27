"use client";

import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import type { Review } from "@/data/reviews";

export interface ReviewsModalProps {
  reviews: Review[];
  onClose: () => void;
}

export function ReviewsModal({ reviews, onClose }: ReviewsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const hasVerifiedRating =
    siteConfig.reviews.rating !== null && siteConfig.reviews.reviewCount !== null;
  const rawReviewUrl = siteConfig.contact.googleReviewUrl;
  const isRealReviewUrl = rawReviewUrl.startsWith("http");

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
        aria-labelledby="all-reviews-title"
        className="crunche-modal-enter flex max-h-[90svh] w-full max-w-[820px] flex-col overflow-hidden rounded-[28px] border border-border bg-surface-elevated text-ink shadow-[0_12px_32px_-12px_rgb(43_24_16/0.35)]"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
              {hasVerifiedRating
                ? `${siteConfig.reviews.rating} / 5 · ${siteConfig.reviews.reviewCount} verified reviews`
                : "Sample reviews — replace before launch"}
            </p>
            <h2 id="all-reviews-title" className="font-display text-xl font-bold text-ink">
              What customers say
            </h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close all reviews modal"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:bg-surface-muted"
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reviews.map((rev) => (
              <article
                key={rev.id}
                className="flex flex-col justify-between rounded-[20px] border border-border bg-surface p-5"
              >
                <p className="text-sm text-ink">&ldquo;{rev.quote}&rdquo;</p>
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3 text-xs text-ink-soft">
                  <div>
                    <p className="font-semibold text-ink">{rev.author}</p>
                    <p>{rev.location}</p>
                  </div>
                  <span className="rounded-full bg-surface-muted px-3 py-1 font-medium text-ink">
                    {rev.flavour}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-5 py-3 sm:px-6">
          <span className="text-xs text-ink-soft">
            {hasVerifiedRating ? "Verified Google reviews" : "Sample reviews — replace before launch"}
          </span>
          <a
            href={isRealReviewUrl ? rawReviewUrl : "#reviews"}
            target={isRealReviewUrl ? "_blank" : undefined}
            rel={isRealReviewUrl ? "noopener noreferrer" : undefined}
            title={isRealReviewUrl ? "Review us on Google" : rawReviewUrl}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-caramel px-4 py-2 text-xs font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
          >
            <span>Review us on Google</span>
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
