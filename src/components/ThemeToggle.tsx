"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("crunche-theme", next ? "dark" : "light");
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-[1.5px] border-border bg-surface-elevated text-ink transition-colors hover:bg-surface-muted ${className}`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
