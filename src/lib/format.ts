const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/**
 * Formats an amount in Nigerian Naira (₦) using en-NG locale.
 */
export function formatNaira(amount: number): string {
  if (!Number.isFinite(amount)) return "₦0";
  return nairaFormatter.format(Math.round(amount));
}

/**
 * Formats a Nigerian phone number to +234 international display format.
 * Returns placeholder strings unchanged so TODO(client) values remain visible.
 */
export function formatPhone(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith("[")) return trimmed;

  const digits = trimmed.replace(/\D/g, "");
  let national = digits;

  if (digits.startsWith("234") && digits.length >= 13) {
    national = digits.slice(3);
  } else if (digits.startsWith("0") && digits.length >= 11) {
    national = digits.slice(1);
  }

  if (national.length === 10) {
    return `+234 ${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`;
  }

  return trimmed.startsWith("+") ? trimmed : `+${digits}`;
}

/**
 * Extracts digits-only Nigerian number suitable for wa.me or tel: links.
 * Returns empty string if input is a placeholder.
 */
export function toInternationalDigits(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith("[")) return "";

  const digits = trimmed.replace(/\D/g, "");
  if (digits.startsWith("234")) return digits;
  if (digits.startsWith("0") && digits.length >= 11) {
    return `234${digits.slice(1)}`;
  }
  return digits;
}
