export const KATAHERO_INSTAGRAM_URL = "https://www.instagram.com/katahero";
export const KATAHERO_PURCHASE_URL = "https://www.katahero.com";

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
