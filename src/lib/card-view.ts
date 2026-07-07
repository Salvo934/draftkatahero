export const KATAHERO_INSTAGRAM_URL = "https://www.instagram.com/katahero";
export const KATAHERO_PURCHASE_URL = "https://www.katahero.com";

/**
 * Prezzo mostrato nel modal (non nel testo del pulsante).
 * Aggiorna qui o via env `NEXT_PUBLIC_PLAYER_CARD_PRICE` su Vercel.
 */
export const PLAYER_CARD_PRICE =
  process.env.NEXT_PUBLIC_PLAYER_CARD_PRICE?.trim() || "€9,99";

export const PLAYER_CARD_PRICE_PERIOD = "";

/**
 * Link pagamento player card (Stripe o altro).
 * Imposta qui oppure via env `NEXT_PUBLIC_PLAYER_CARD_CHECKOUT_URL` su Vercel.
 */
export const PLAYER_CARD_CHECKOUT_URL = "";

export function getPlayerCardCheckoutUrl(playerSlug?: string): string {
  const base =
    process.env.NEXT_PUBLIC_PLAYER_CARD_CHECKOUT_URL?.trim() ||
    PLAYER_CARD_CHECKOUT_URL ||
    KATAHERO_PURCHASE_URL;

  if (!playerSlug) return base;

  try {
    const url = new URL(base);
    url.searchParams.set("client_reference_id", `draft:${playerSlug}`);
    return url.toString();
  } catch {
    return base;
  }
}

const STORAGE_KEY = "draftkatahero-card-views";

function readViewedSlugs(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeViewedSlugs(slugs: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]));
}

export function hasViewedCard(slug: string): boolean {
  return readViewedSlugs().has(slug);
}

export function markCardViewed(slug: string): void {
  const slugs = readViewedSlugs();
  if (slugs.has(slug)) return;
  slugs.add(slug);
  writeViewedSlugs(slugs);
}
