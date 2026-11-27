import Link from "next/link";

export default function FlavourNotFound() {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center px-4 py-20 text-center sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
        404 · Not Found
      </p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink">
        We could not find that flavour
      </h1>
      <p className="mt-3 text-ink-soft">
        The pack you are looking for may have moved. Browse all five signature flavours in our shop.
      </p>
      <Link
        href="/shop"
        className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-caramel px-6 py-3 text-sm font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
      >
        Back to Shop
      </Link>
    </div>
  );
}
