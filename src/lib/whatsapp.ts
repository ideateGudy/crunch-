import { siteConfig } from "@/config/site";
import { toInternationalDigits } from "@/lib/format";

export interface WhatsAppOrderParams {
  flavour?: string;
  size?: string;
  qty?: number;
  message?: string;
}

/**
 * Builds a pre-filled WhatsApp URL from any custom message.
 */
export function buildWhatsAppMessageLink(message: string): string {
  const digits = toInternationalDigits(siteConfig.contact.whatsapp);
  const encoded = encodeURIComponent(message);
  return digits
    ? `https://wa.me/${digits}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
}

/**
 * Builds a pre-filled WhatsApp order link from flavour, size and quantity.
 */
export function buildWhatsAppLink(params: WhatsAppOrderParams = {}): string {
  if (params.message) {
    return buildWhatsAppMessageLink(params.message);
  }

  const { flavour, size, qty } = params;
  if (!flavour) {
    return buildWhatsAppMessageLink(siteConfig.whatsappDefaultMessage);
  }

  const parts = [`Hello CRUNCHÉ! I'd like to order ${flavour}`];
  if (size) parts.push(`(${size})`);
  if (qty && qty > 0) parts.push(`× ${qty}`);
  parts.push(".");

  return buildWhatsAppMessageLink(parts.join(" "));
}
