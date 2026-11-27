"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useCallback, useRef } from "react";
import { ScrollVideo } from "@/components/ScrollVideo";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";
import { siteConfig } from "@/config/site";
import { gsap } from "@/lib/gsap";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const whatsappHref = buildWhatsAppLink();

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const items = gsap.utils.toArray<HTMLElement>("[data-hero-enter]");
      if (items.length === 0) return;

      if (prefersReduced) {
        gsap.set(items, { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "transform",
        },
      );
    },
    { scope: sectionRef },
  );

  const handleProgress = useCallback((p: number) => {
    const el = copyRef.current;
    if (!el) return;
    // When reduced-motion is active, ScrollVideo jumps straight to 1 — keep copy at full opacity.
    const isAtRest = p === 0 || p === 1;
    const translateY = isAtRest ? 0 : Math.round(p * -20);
    const copyOpacity = isAtRest
      ? 1
      : Math.max(0.15, 1 - Math.max(0, (p - 0.55) / 0.45) * 0.85);
    el.style.transform = `translate3d(0, ${translateY}px, 0)`;
    el.style.opacity = String(copyOpacity);
  }, []);

  const handleScrollNext = () => {
    const next = document.querySelector<HTMLElement>("[data-hero-next]");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="CRUNCHÉ hero"
      className="-mt-[69px] bg-band text-band-ink"
    >
      <ScrollVideo
        desktopSrc="/videos/hero.mp4"
        mobileSrc="/videos/hero-mobile.mp4"
        posterSrc="/images/hero-poster.jpg"
        endPosterSrc="/images/hero-poster-end.jpg"
        alt="Freshly fried golden CRUNCHÉ chin chin cubes"
        isHero
        onProgress={handleProgress}
      >
        {/* Token-based gradient scrims for guaranteed WCAG AA contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-band/92 via-band/50 to-band/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-band/75 via-band/30 to-transparent"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-4 pb-6 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:px-10 lg:pb-12">
          <div
            ref={copyRef}
            className="max-w-[920px] transition-opacity duration-150 will-change-transform"
          >
            <p
              data-hero-enter
              className="text-xs font-medium uppercase tracking-[0.14em] text-band-accent"
            >
              Freshly Made Nigerian Chin Chin
            </p>

            <h1
              data-hero-enter
              className="mt-2 font-display font-bold tracking-[-0.02em] text-band-ink"
              style={{
                fontSize: "clamp(2.5rem, min(6.2vw, 9.5svh), 6.25rem)",
                lineHeight: 0.96,
              }}
            >
              {siteConfig.tagline}
            </h1>

            <p
              data-hero-enter
              className="mt-3 max-w-[52ch] text-base text-band-ink/90 sm:text-lg"
            >
              Crisp, golden cubes crafted in small batches across five signature flavours—made for sharing, gifting, and every celebration.
            </p>

            <div data-hero-enter className="mt-5 flex flex-wrap items-center gap-3">
              <WhatsAppOrderButton
                href={whatsappHref}
                className="min-h-[48px] px-6 py-3 sm:text-base"
              />

              <Link
                href="/shop"
                className="crunche-press inline-flex min-h-[48px] items-center justify-center rounded-full border-[1.5px] border-band-ink px-6 py-3 text-sm font-semibold text-band-ink hover:bg-band-ink/10 sm:text-base"
              >
                Shop flavours
              </Link>
            </div>

            <ul
              data-hero-enter
              aria-label="Brand highlights"
              className="mt-5 flex flex-wrap items-center gap-2"
            >
              {siteConfig.trustChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-band-ink/20 bg-band-elevated/85 px-3.5 py-1.5 text-xs font-medium text-band-ink/90"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div data-hero-enter className="mt-5 flex justify-start">
            <button
              type="button"
              onClick={handleScrollNext}
              aria-label="Scroll to next section"
              className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border border-band-ink/30 bg-band-elevated/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-band-ink transition-colors hover:border-band-accent hover:text-band-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <span>Scroll</span>
              <ArrowDown className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      </ScrollVideo>
    </section>
  );
}
