"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "crunche-cookie-consent";
const CONSENT_EVENT = "crunche-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "unset";
  } catch {
    return "unset";
  }
}

function getServerSnapshot(): string | null {
  return "pending";
}

export function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (consent !== "unset") {
    return null;
  }

  const saveChoice = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage errors in restricted contexts
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  return (
    <aside
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-[680px] rounded-[20px] border border-border bg-surface-elevated p-5 shadow-[0_12px_32px_-12px_rgb(43_24_16/0.25)] sm:left-6 sm:right-auto"
    >
      <p className="text-sm font-semibold text-ink">Cookie &amp; Privacy Preference</p>
      <p className="mt-1 text-sm text-ink-soft">
        We only store your theme and consent choice locally. No non-essential cookies are set before you accept.{" "}
        <Link
          href="/policies/privacy"
          className="inline-flex min-h-[44px] items-center font-medium text-caramel-ink underline underline-offset-4 hover:text-ink"
        >
          Learn more
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => saveChoice("accepted")}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-caramel px-5 py-2 text-sm font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => saveChoice("declined")}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full border-[1.5px] border-ink px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          Decline
        </button>
      </div>
    </aside>
  );
}
