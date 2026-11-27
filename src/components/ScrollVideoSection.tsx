"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ScrollVideo } from "@/components/ScrollVideo";
import { flavours } from "@/data/flavours";
import { revealOnScroll } from "@/lib/reveal";

export function ScrollVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const trigger = revealOnScroll("[data-showcase-reveal]", { stagger: 0.07 });
      return () => {
        trigger?.kill();
      };
    },
    { scope: sectionRef },
  );

  const handleProgress = useCallback((p: number) => {
    const next = Math.min(
      flavours.length - 1,
      Math.max(0, Math.floor(p * flavours.length)),
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="showcase-video-heading"
      className="bg-band text-band-ink"
    >
      <ScrollVideo
        desktopSrc="/videos/section.mp4"
        mobileSrc="/videos/section-mobile.mp4"
        posterSrc="/images/section-poster.jpg"
        endPosterSrc="/images/section-poster-end.jpg"
        alt="Five bowls of CRUNCHÉ chin chin flavours"
        scrubDistance="+=150%"
        onProgress={handleProgress}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-band/90 via-band/40 to-band/50"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-between px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-10">
          <div data-showcase-reveal className="max-w-[620px]">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-band-accent">
              The Flavour Line-up
            </p>
            <h2
              id="showcase-video-heading"
              className="mt-2 font-display font-bold tracking-[-0.02em] text-band-ink"
              style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
            >
              Five flavours. One bowl each.
            </h2>
          </div>

          <nav
            data-showcase-reveal
            aria-label="Filter shop by flavour"
            className="flex flex-wrap items-center gap-2.5"
          >
            {flavours.map((flavour, idx) => {
              const isActive = idx === activeIndex;
              return (
                <Link
                  key={flavour.slug}
                  href={`/shop?flavour=${flavour.slug}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`inline-flex min-h-[44px] items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-caramel text-on-caramel"
                      : "border border-band-ink/30 bg-band-elevated/85 text-band-ink hover:border-band-accent hover:text-band-accent"
                  }`}
                >
                  {flavour.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </ScrollVideo>
    </section>
  );
}
