import { gsap, ScrollTrigger } from "@/lib/gsap";

export interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

/**
 * Self-healing scroll reveal helper for section-entry animations.
 * Uses only transform (y) and opacity, honours prefers-reduced-motion,
 * and ensures elements already in or above the viewport never stay stuck at opacity: 0.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  options: RevealOptions = {},
): ScrollTrigger | null {
  if (typeof window === "undefined") return null;

  const elements = gsap.utils.toArray<HTMLElement>(targets);
  if (elements.length === 0) return null;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) {
    gsap.set(elements, { opacity: 1, y: 0, clearProps: "transform" });
    return null;
  }

  const yOffset = Math.min(options.y ?? 20, 24);
  const duration = Math.min(Math.max(options.duration ?? 0.6, 0.5), 0.7);
  const stagger = Math.min(options.stagger ?? 0.06, 0.08);
  const start = options.start ?? "top 88%";

  gsap.set(elements, { opacity: 0, y: yOffset });

  let revealed = false;

  const playReveal = () => {
    if (revealed) return;
    revealed = true;
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      clearProps: "transform",
    });
  };

  const checkViewport = () => {
    if (revealed) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const anyVisible = elements.some((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top <= vh * 0.92;
    });
    if (anyVisible) {
      playReveal();
    }
  };

  return ScrollTrigger.create({
    trigger: elements[0],
    start,
    once: true,
    onEnter: playReveal,
    onEnterBack: playReveal,
    onRefresh: checkViewport,
  });
}
