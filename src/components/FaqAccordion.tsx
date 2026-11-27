"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqGroupLabels, faqs, type FaqGroup } from "@/data/faqs";

const GROUPS: FaqGroup[] = [
  "ordering",
  "delivery",
  "allergens",
  "storage",
  "gifting",
];

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-10">
      {GROUPS.map((group) => {
        const groupItems = faqs.filter((f) => f.group === group);
        if (groupItems.length === 0) return null;

        return (
          <section key={group} aria-labelledby={`faq-group-${group}`}>
            <h2
              id={`faq-group-${group}`}
              className="font-display text-xl font-bold text-ink"
            >
              {faqGroupLabels[group]}
            </h2>

            <div className="mt-4 divide-y divide-border overflow-hidden rounded-[20px] border border-border bg-surface-elevated">
              {groupItems.map((item) => {
                const isOpen = openId === item.id;
                const panelId = `faq-panel-${item.id}`;
                const btnId = `faq-btn-${item.id}`;

                return (
                  <div key={item.id}>
                    <h3>
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold text-ink transition-colors hover:bg-surface-muted/60 sm:px-6"
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-caramel-ink transition-transform duration-300 ${
                            isOpen ? "rotate-180" : "rotate-0"
                          }`}
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      hidden={!isOpen}
                      className="border-t border-border/60 bg-surface px-5 py-4 text-sm text-ink-soft sm:px-6"
                    >
                      {item.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
