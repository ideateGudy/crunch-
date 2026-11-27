"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShopCard, type ShopCardItem } from "@/components/ShopCard";
import { flavours, getMinPrice, type PackSize } from "@/data/flavours";
import { giftBoxes } from "@/data/gift-boxes";

const PAGE_SIZE = 8;
const SIZES: PackSize[] = ["100g", "250g", "500g", "1kg"];

type SortKey = "popular" | "price-asc" | "price-desc";

interface CatalogueEntry {
  item: ShopCardItem;
  popularity: number;
  sortPrice: number;
}

const ALL_ENTRIES: CatalogueEntry[] = [
  ...flavours.map((f) => ({
    item: {
      kind: "flavour" as const,
      slug: f.slug,
      name: f.name,
      tagline: f.tagline,
      href: `/shop/${f.slug}`,
      badge: f.badge,
      sizes: f.sizes,
      images: f.images,
    },
    popularity: f.popularity,
    sortPrice: getMinPrice(f),
  })),
  ...giftBoxes.map((b, i) => ({
    item: {
      kind: "gift-box" as const,
      slug: b.slug,
      name: b.name,
      tagline: b.tagline,
      href: "/gifting",
      badge: "Gift Box",
      fixedPriceNgn: b.priceNgn,
      images: b.images,
    },
    popularity: 75 - i,
    sortPrice: b.priceNgn,
  })),
];

export function ShopCatalogue() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = (searchParams.get("q") ?? "").trim();
  const flavourFilter = searchParams.get("flavour") ?? "all";
  const sizeFilter = (searchParams.get("size") ?? "all") as PackSize | "all";
  const sort = (searchParams.get("sort") ?? "popular") as SortKey;
  const rawPage = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (!v || v === "all" || (k === "page" && v === "1") || (k === "sort" && v === "popular")) {
        next.delete(k);
      } else {
        next.set(k, v);
      }
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = ALL_ENTRIES.filter(({ item }) => {
    if (flavourFilter !== "all" && item.slug !== flavourFilter) return false;
    if (sizeFilter !== "all") {
      if (!item.sizes?.some((s) => s.size === sizeFilter)) return false;
    }
    if (q) {
      const hay = `${item.name} ${item.tagline}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  }).sort((a, b) => {
    const priceA = sizeFilter !== "all" && a.item.sizes
      ? (a.item.sizes.find((s) => s.size === sizeFilter)?.priceNgn ?? a.sortPrice)
      : a.sortPrice;
    const priceB = sizeFilter !== "all" && b.item.sizes
      ? (b.item.sizes.find((s) => s.size === sizeFilter)?.priceNgn ?? b.sortPrice)
      : b.sortPrice;
    if (sort === "price-asc") return priceA - priceB;
    if (sort === "price-desc") return priceB - priceA;
    return b.popularity - a.popularity;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 rounded-[20px] border border-border bg-surface-elevated p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="shop-search" className="block text-xs font-medium uppercase tracking-[0.12em] text-caramel-ink">
            Search
          </label>
          <div className="relative mt-1.5">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" strokeWidth={1.75} aria-hidden="true" />
            <input
              id="shop-search"
              type="search"
              value={q}
              onChange={(e) => updateParams({ q: e.target.value, page: "1" })}
              placeholder="Search flavours or boxes..."
              className="min-h-[44px] w-full rounded-[12px] border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft"
            />
          </div>
        </div>

        <div>
          <label htmlFor="shop-flavour" className="block text-xs font-medium uppercase tracking-[0.12em] text-caramel-ink">
            Flavour / Box
          </label>
          <select
            id="shop-flavour"
            value={flavourFilter}
            onChange={(e) => updateParams({ flavour: e.target.value, page: "1" })}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3 text-sm text-ink"
          >
            <option value="all">All items</option>
            {flavours.map((f) => (
              <option key={f.slug} value={f.slug}>{f.name}</option>
            ))}
            {giftBoxes.map((b) => (
              <option key={b.slug} value={b.slug}>{b.name} Gift Box</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="shop-size" className="block text-xs font-medium uppercase tracking-[0.12em] text-caramel-ink">
            Pack Size
          </label>
          <select
            id="shop-size"
            value={sizeFilter}
            onChange={(e) => updateParams({ size: e.target.value, page: "1" })}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3 text-sm text-ink"
          >
            <option value="all">All sizes</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="shop-sort" className="block text-xs font-medium uppercase tracking-[0.12em] text-caramel-ink">
            Sort
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value, page: "1" })}
            className="mt-1.5 min-h-[44px] w-full rounded-[12px] border border-border bg-surface px-3 text-sm text-ink"
          >
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
        Showing {pageItems.length} of {filtered.length} items
      </p>

      {pageItems.length === 0 ? (
        <div className="mt-8 rounded-[20px] border border-border bg-surface-elevated p-10 text-center">
          <p className="font-display text-xl font-bold text-ink">No matching items found</p>
          <p className="mt-2 text-sm text-ink-soft">
            Try clearing your search or selecting &ldquo;All items&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-caramel px-6 py-2.5 text-sm font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pageItems.map(({ item }) => (
            <ShopCard
              key={item.slug}
              item={item}
              initialSize={sizeFilter !== "all" ? sizeFilter : undefined}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex items-center justify-center gap-2"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => updateParams({ page: String(p) })}
              aria-current={p === safePage ? "page" : undefined}
              className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                p === safePage
                  ? "bg-caramel text-on-caramel"
                  : "border border-border bg-surface-elevated text-ink hover:bg-surface-muted"
              }`}
            >
              {p}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
