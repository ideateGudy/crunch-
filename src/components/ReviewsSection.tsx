"use client";

import { useGSAP } from "@gsap/react";
import { ExternalLink, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import { ReviewsModal } from "@/components/ReviewsModal";
import { siteConfig } from "@/config/site";
import { reviews, type Review } from "@/data/reviews";
import { gsap } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/reveal";

const ROW_1 = reviews.slice(0, Math.ceil(reviews.length / 2));
const ROW_2 = reviews.slice(Math.ceil(reviews.length / 2));

function ReviewCard({
  review,
  onReadMore,
}: {
  review: Review;
  onReadMore: () => void;
}) {
  return (
    <article className="flex w-[290px] shrink-0 flex-col justify-between rounded-[20px] border border-border bg-surface-elevated p-5 shadow-[0_12px_32px_-12px_rgb(43_24_16/0.1)] sm:w-[340px]">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-caramel-ink">
            {review.flavour}
          </span>
          {review.isSample && (
            <span className="text-[11px] font-medium text-ink-soft">
              Sample
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-ink">&ldquo;{review.quote}&rdquo;</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
        <div className="text-xs">
          <p className="font-semibold text-ink">{review.author}</p>
          <p className="text-ink-soft">{review.location}</p>
        </div>
        <button
          type="button"
          onClick={onReadMore}
          className="inline-flex min-h-[44px] items-center px-2 text-xs font-semibold text-caramel-ink underline underline-offset-4 hover:text-ink"
        >
          Read more
        </button>
      </div>
    </article>
  );
}

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const [paused, setPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const hasVerifiedRating =
    siteConfig.reviews.rating !== null && siteConfig.reviews.reviewCount !== null;
  const rawReviewUrl = siteConfig.contact.googleReviewUrl;
  const isRealReviewUrl = rawReviewUrl.startsWith("http");

  useGSAP(
    () => {
      const revealTrigger = revealOnScroll("[data-reviews-reveal]", {
        stagger: 0.07,
      });

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced || !row1Ref.current || !row2Ref.current) {
        return () => {
          revealTrigger?.kill();
        };
      }

      const t1 = gsap.to(row1Ref.current, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });

      const t2 = gsap.fromTo(
        row2Ref.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 42,
          ease: "none",
          repeat: -1,
        },
      );

      tweensRef.current = [t1, t2];

      return () => {
        revealTrigger?.kill();
        t1.kill();
        t2.kill();
        tweensRef.current = [];
      };
    },
    { scope: sectionRef },
  );

  const setMarqueePaused = (shouldPause: boolean) => {
    for (const tw of tweensRef.current) {
      if (shouldPause) tw.pause();
      else if (!paused) tw.resume();
    }
  };

  const toggleManualPause = () => {
    const next = !paused;
    setPaused(next);
    for (const tw of tweensRef.current) {
      if (next) tw.pause();
      else tw.resume();
    }
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      aria-labelledby="reviews-heading"
      className="overflow-x-hidden border-t border-border bg-surface-muted/50 py-[clamp(4rem,8vw,9rem)]"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div
          data-reviews-reveal
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
              {hasVerifiedRating
                ? `${siteConfig.reviews.rating} ★ (${siteConfig.reviews.reviewCount} reviews)`
                : "Sample reviews — replace before launch"}
            </p>
            <h2
              id="reviews-heading"
              className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
              style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
            >
              Loved across tables &amp; events
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleManualPause}
              aria-pressed={paused}
              aria-label={paused ? "Play reviews marquee" : "Pause reviews marquee"}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-[1.5px] border-border bg-surface-elevated px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink"
            >
              {paused ? (
                <Play className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              )}
              <span>{paused ? "Play" : "Pause"}</span>
            </button>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-ink px-5 py-2 text-xs font-semibold text-ink transition-colors hover:bg-surface-muted"
            >
              Read all reviews
            </button>

            <a
              href={isRealReviewUrl ? rawReviewUrl : "#reviews"}
              target={isRealReviewUrl ? "_blank" : undefined}
              rel={isRealReviewUrl ? "noopener noreferrer" : undefined}
              title={isRealReviewUrl ? "Review us on Google" : rawReviewUrl}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-caramel px-4 py-2 text-xs font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
            >
              <span>Review us on Google</span>
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Two-row infinite marquee (pauses on hover, focus, touch; reduced-motion scrolls statically) */}
      <div
        className="mt-8 space-y-4 overflow-x-auto motion-safe:overflow-hidden"
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
        onFocusCapture={() => setMarqueePaused(true)}
        onBlurCapture={() => setMarqueePaused(false)}
        onTouchStart={() => setMarqueePaused(true)}
        onTouchEnd={() => setMarqueePaused(false)}
      >
        <div ref={row1Ref} className="flex w-max gap-4 px-4">
          {[...ROW_1, ...ROW_1].map((rev, i) => (
            <ReviewCard
              key={`r1-${rev.id}-${i}`}
              review={rev}
              onReadMore={() => setModalOpen(true)}
            />
          ))}
        </div>

        <div ref={row2Ref} className="flex w-max gap-4 px-4">
          {[...ROW_2, ...ROW_2].map((rev, i) => (
            <ReviewCard
              key={`r2-${rev.id}-${i}`}
              review={rev}
              onReadMore={() => setModalOpen(true)}
            />
          ))}
        </div>
      </div>

      {modalOpen && (
        <ReviewsModal
          reviews={reviews}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}
