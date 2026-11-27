"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export interface ScrollVideoProps {
  desktopSrc: string;
  mobileSrc: string;
  posterSrc: string;
  endPosterSrc: string;
  alt: string;
  isHero?: boolean;
  scrubDistance?: string;
  onProgress?: (progress: number) => void;
  className?: string;
  children?: React.ReactNode;
}

const MIN_FRAME_STEP = 1 / 30;

/**
 * Reusable scroll-scrubbed video section implementing DESIGN.md §7.3 & §7.4:
 * - gsap.matchMedia() mobile/desktop source switch
 * - activeTl tracked & killed in mm.add() cleanup (StrictMode-safe)
 * - loadedmetadata + rAF throttled >= 1/30s + [0, duration - 0.05] clamp
 * - seeking/seeked gating + smooth scrub interpolation so frames never pile up or skip
 * - prefers-reduced-motion or video error fallback to static end-frame poster
 */
export function ScrollVideo({
  desktopSrc,
  mobileSrc,
  posterSrc,
  endPosterSrc,
  alt,
  isHero = false,
  scrubDistance = "+=180%",
  onProgress,
  className = "",
  children,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  const [fallbackMode, setFallbackMode] = useState(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions ?? {};

          if (reduceMotion) {
            setFallbackMode(true);
            onProgressRef.current?.(1);
            return;
          }

          setFallbackMode(false);

          const targetSrc = isDesktop ? desktopSrc : mobileSrc;
          if (video.getAttribute("src") !== targetSrc) {
            video.setAttribute("src", targetSrc);
            video.load();
          }

          let activeTl: gsap.core.Timeline | null = null;
          let rafId = 0;
          let targetTime = 0;
          let lastAppliedTime = -1;
          let disposed = false;

          const applyTime = () => {
            if (disposed || video.seeking) return;
            if (Math.abs(targetTime - lastAppliedTime) >= MIN_FRAME_STEP) {
              lastAppliedTime = targetTime;
              video.currentTime = targetTime;
            }
          };

          const scheduleFrame = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
              rafId = 0;
              applyTime();
            });
          };

          const onSeeked = () => {
            if (disposed) return;
            if (Math.abs(targetTime - lastAppliedTime) >= MIN_FRAME_STEP) {
              scheduleFrame();
            }
          };

          const setupScrollPin = () => {
            if (disposed) return;
            const duration = Number.isFinite(video.duration) ? video.duration : 0;
            if (duration <= 0) return;

            const maxTime = Math.max(0, duration - 0.05);

            if (isHero) {
              window.scrollTo({ top: 0, behavior: "instant" });
            }

            activeTl?.scrollTrigger?.kill();
            activeTl?.kill();

            const playhead = { progress: 0 };
            activeTl = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: scrubDistance,
                pin: true,
                scrub: 0.25,
                anticipatePin: 1,
                refreshPriority: isHero ? 1 : 0,
              },
            });

            activeTl.to(playhead, {
              progress: 1,
              ease: "none",
              onUpdate: () => {
                const p = playhead.progress;
                targetTime = Math.min(maxTime, Math.max(0, p * maxTime));
                scheduleFrame();
                onProgressRef.current?.(p);
              },
            });

            ScrollTrigger.refresh();
          };

          const onLoadedMetadata = () => {
            setupScrollPin();
          };

          const onError = () => {
            setFallbackMode(true);
            onProgressRef.current?.(1);
          };

          video.addEventListener("loadedmetadata", onLoadedMetadata);
          video.addEventListener("seeked", onSeeked);
          video.addEventListener("error", onError);

          if (video.readyState >= 1) {
            setupScrollPin();
          }

          return () => {
            disposed = true;
            if (rafId) cancelAnimationFrame(rafId);
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
            video.removeEventListener("seeked", onSeeked);
            video.removeEventListener("error", onError);
            activeTl?.scrollTrigger?.kill();
            activeTl?.kill();
            activeTl = null;
          };
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [desktopSrc, mobileSrc, isHero, scrubDistance] },
  );

  return (
    <div
      ref={containerRef}
      className={`relative h-[100svh] w-full overflow-hidden bg-band text-band-ink ${className}`}
    >
      {fallbackMode ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={endPosterSrc}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          poster={posterSrc}
          muted
          playsInline
          preload="auto"
          aria-label={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {children}
    </div>
  );
}
