"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { processSteps } from "@/data/process";
import { gsap } from "@/lib/gsap";
import { revealOnScroll } from "@/lib/reveal";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const revealTrigger = revealOnScroll("[data-process-reveal]", {
        stagger: 0.08,
      });

      const line = lineRef.current;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let lineTween: gsap.core.Tween | null = null;
      if (line && !prefersReduced) {
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        lineTween = gsap.to(line, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: true,
          },
        });
      }

      return () => {
        revealTrigger?.kill();
        lineTween?.scrollTrigger?.kill();
        lineTween?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="mx-auto max-w-[1280px] px-4 py-[clamp(4rem,8vw,9rem)] sm:px-6 lg:px-10"
    >
      <div data-process-reveal className="max-w-[60ch]">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
          How It&apos;s Made
        </p>
        <h2
          id="process-heading"
          className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
          style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
        >
          Four careful steps to the golden snap
        </h2>
        <p className="mt-3 text-ink-soft">
          Good chin chin cannot be rushed. Every batch follows a disciplined rhythm from dough bowl to sealed pouch.
        </p>
      </div>

      {/* Subtle scroll-linked progress rule (desktop) */}
      <div
        aria-hidden="true"
        className="mt-10 hidden h-[2px] w-full overflow-hidden rounded-full bg-border lg:block"
      >
        <div
          ref={lineRef}
          className="h-full w-full bg-caramel"
        />
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((item) => (
          <li
            key={item.step}
            data-process-reveal
            className="flex flex-col rounded-[20px] border border-border bg-surface-elevated p-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface-muted">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 280px"
                className="object-cover"
              />
            </div>
            <span className="mt-4 font-display text-2xl font-bold text-caramel-ink">
              0{item.step}
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-ink">
              {item.summary}
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              {item.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
