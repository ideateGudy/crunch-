"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [nearFooter, setNearFooter] = useState(false);
  const href = buildWhatsAppLink();

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setNearFooter(entry.isIntersecting);
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      aria-hidden={nearFooter}
      tabIndex={nearFooter ? -1 : 0}
      className={`fixed bottom-5 right-5 z-30 inline-flex min-h-[48px] min-w-[48px] items-center gap-2 rounded-full bg-caramel px-4 py-3 text-sm font-semibold text-on-caramel shadow-[0_12px_32px_-12px_rgb(43_24_16/0.35)] transition-[opacity,transform,background-color,color] duration-300 hover:bg-cocoa hover:text-band-ink ${
        nearFooter
          ? "pointer-events-none translate-y-3 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      <span className="hidden sm:inline">Order on WhatsApp</span>
    </a>
  );
}
