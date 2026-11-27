"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { FullscreenImageButton } from "@/components/FullscreenImageButton";
import { revealOnScroll } from "@/lib/reveal";

const STORY_IMAGES = [
  {
    category: "Kitchen",
    src: "/images/site/story/kitchen-1.webp",
    alt: "Freshly made CRUNCHÉ chin chin in our kitchen",
  },
  {
    category: "Ingredients",
    src: "/images/site/story/ingredients-1.webp",
    alt: "Flour, butter, whole milk, nutmeg, and fresh ingredients for CRUNCHÉ chin chin",
  },
];

export function StoryTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trigger = revealOnScroll("[data-story-reveal]", { stagger: 0.08 });
      return () => {
        trigger?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="story-teaser-heading"
      className="border-t border-border bg-surface-muted/50"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 py-[clamp(4rem,8vw,9rem)] sm:px-6 lg:grid-cols-12 lg:px-10">
        <div data-story-reveal className="lg:col-span-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
            Our Story
          </p>
          <h2
            id="story-teaser-heading"
            className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
            style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
          >
            Built around the bowl everyone reaches for
          </h2>
          <p className="mt-4 max-w-[55ch] text-ink-soft">
            In Nigerian homes, a jar of chin chin is never just a snack—it is what comes out when guests arrive, what travels in suitcases, and what disappears fastest at every celebration.
          </p>
          <p className="mt-3 max-w-[55ch] text-ink-soft">
            CRUNCHÉ honours that warmth with small-batch discipline: clean oil, honest butter and nutmeg, and packaging neat enough to gift without second thought.
          </p>
          <div className="mt-6">
            <Link
              href="/our-story"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-[1.5px] border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted"
            >
              <span>Read our story</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div data-story-reveal className="lg:col-span-6">
          <FullscreenImageButton
            images={STORY_IMAGES}
            title="Our Story"
            sizes="(max-width: 1023px) 100vw, 600px"
            className="aspect-[4/3] rounded-[28px] border border-border bg-surface-elevated"
          />
        </div>
      </div>
    </section>
  );
}
