"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const whatsappHref = buildWhatsAppLink();

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center rounded-lg pr-2"
          aria-label="CRUNCHÉ home"
        >
          <Logo tone="auto" variant="wordmark" size={32} />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {siteConfig.navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium transition-colors ${
                  active
                    ? "bg-surface-muted text-ink"
                    : "text-ink-soft hover:bg-surface-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-[44px] items-center gap-2 rounded-full bg-caramel px-5 py-2.5 text-sm font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            <span>Order on WhatsApp</span>
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Open navigation menu"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-[1.5px] border-border bg-surface-elevated text-ink transition-colors hover:bg-surface-muted lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      </header>

      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="crunche-modal-enter fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-y-auto bg-surface px-4 py-4 sm:px-6 lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-border pb-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-[44px] items-center"
              aria-label="CRUNCHÉ home"
            >
              <Logo tone="auto" variant="wordmark" size={32} />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setMenuOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-[1.5px] border-border bg-surface-elevated text-ink transition-colors hover:bg-surface-muted"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile links" className="mt-6 flex flex-1 flex-col gap-2">
            {siteConfig.navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center rounded-[12px] px-4 font-display text-xl font-semibold transition-colors ${
                    active
                      ? "bg-surface-muted text-ink"
                      : "text-ink hover:bg-surface-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border pt-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-caramel px-6 py-3 text-base font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
