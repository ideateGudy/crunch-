"use client";

import { useGSAP } from "@gsap/react";
import { Flame, Gift, Sparkles, Truck } from "lucide-react";
import { useRef } from "react";
import { revealOnScroll } from "@/lib/reveal";

// TODO(client): confirm operational claims (fresh batch cadence, nationwide delivery coverage)
const BENEFITS = [
  {
    title: "Freshly made",
    description: "Small-batch fried so every cube arrives crisp, warm-toned, and never stale.",
    Icon: Flame,
  },
  {
    title: "Premium ingredients",
    description: "Real butter, whole milk, sieved wheat flour, and aromatic Nigerian spices.",
    Icon: Sparkles,
  },
  {
    title: "Gift-ready packaging",
    description: "Resealable pouches and ribboned gift boxes built for owambe and corporate gifting.",
    Icon: Gift,
  },
  {
    title: "Nationwide delivery",
    description: "Dispatched from Lagos to Abuja, Port Harcourt, Ibadan, and across Nigeria.",
    Icon: Truck,
  },
] as const;

export function BenefitsStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trigger = revealOnScroll("[data-benefit-item]", { stagger: 0.06 });
      return () => {
        trigger?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Why CRUNCHÉ"
      className="border-y border-border bg-surface-muted/70"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
        {BENEFITS.map(({ title, description, Icon }) => (
          <div
            key={title}
            data-benefit-item
            className="flex items-start gap-4 rounded-[20px] border border-border bg-surface-elevated p-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-caramel text-on-caramel">
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
