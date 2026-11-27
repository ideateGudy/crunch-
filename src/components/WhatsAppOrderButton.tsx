"use client";

import { Check, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface WhatsAppOrderButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function WhatsAppOrderButton({
  href,
  label = "Order on WhatsApp",
  className = "",
}: WhatsAppOrderButtonProps) {
  const [opening, setOpening] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    setOpening(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOpening(false);
    }, 2200);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`crunche-press inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-caramel px-5 py-2.5 text-sm font-semibold text-on-caramel hover:bg-cocoa hover:text-band-ink ${className}`}
    >
      {opening ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      ) : (
        <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
      )}
      <span aria-live="polite">{opening ? "Opening WhatsApp…" : label}</span>
    </a>
  );
}
