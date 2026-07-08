import { KATAHERO_PURCHASE_URL } from "@/lib/card-view";

export type ShopCategoryId = "overall" | "booster" | "album" | "estetica";

export type ShopRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type ShopProductId =
  | "points-10-50-70"
  | "points-10-70-85"
  | "points-10-85-95"
  | "bundle-salto-livello"
  | "booster-doppia-crescita"
  | "booster-skip-settimana"
  | "album-abbonamento-annuale"
  | "album-evidenza-settimana"
  | "finish-cromo"
  | "finish-oro"
  | "finish-speciale"
  | "badge-ruolo"
  | "animazione-reveal";

export type ShopProduct = {
  id: ShopProductId;
  category: ShopCategoryId;
  name: string;
  description: string;
  price: string;
  comparePrice?: string;
  pricePeriod?: string;
  rarity: ShopRarity;
  icon: string;
  highlight?: string;
  badge?: string;
  featured?: boolean;
  wide?: boolean;
};

export type ShopCategory = {
  id: ShopCategoryId;
  label: string;
  tagline: string;
  color: string;
};

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    id: "overall",
    label: "Punti Overall",
    tagline: "Il prodotto principale — fai salire il rating",
    color: "#ffd700",
  },
  {
    id: "booster",
    label: "Booster",
    tagline: "Bassa soglia, alta frequenza",
    color: "#00e676",
  },
  {
    id: "album",
    label: "Slot Album",
    tagline: "Visibilità nell'albo ufficiale",
    color: "#7c4dff",
  },
  {
    id: "estetica",
    label: "Estetica & Status",
    tagline: "Margine alto, zero impatto sportivo",
    color: "#ff6d00",
  },
];

const CHECKOUT_ENV_PREFIX = "NEXT_PUBLIC_SHOP_";

function checkoutEnvKey(productId: ShopProductId): string {
  return `${CHECKOUT_ENV_PREFIX}${productId.replace(/-/g, "_").toUpperCase()}_CHECKOUT_URL`;
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "points-10-50-70",
    category: "overall",
    name: "10 Punti Overall",
    description: "Fascia 50–70. Dieci punti sul rating ufficiale della tua card.",
    price: "€4,99",
    rarity: "uncommon",
    icon: "⬆",
    highlight: "OVR +10 · 50–70",
    badge: "Starter",
  },
  {
    id: "points-10-70-85",
    category: "overall",
    name: "10 Punti Overall",
    description: "Fascia 70–85. Per chi è già competitivo e vuole spingere.",
    price: "€7,99",
    rarity: "rare",
    icon: "🔥",
    highlight: "OVR +10 · 70–85",
  },
  {
    id: "points-10-85-95",
    category: "overall",
    name: "10 Punti Overall",
    description: "Fascia 85–95, cap massimo a 95. Il push finale verso l'elite.",
    price: "€12,99",
    rarity: "epic",
    icon: "💎",
    highlight: "OVR +10 · 85–95",
    badge: "Cap 95",
  },
  {
    id: "bundle-salto-livello",
    category: "overall",
    name: "Salto di Livello",
    description: "30 punti Overall in un colpo solo. Il bundle per risultati rapidi.",
    price: "€24,99",
    comparePrice: "€38,97",
    rarity: "legendary",
    icon: "🚀",
    highlight: "30 punti · bundle",
    badge: "Best deal",
    featured: true,
    wide: true,
  },
  {
    id: "booster-doppia-crescita",
    category: "booster",
    name: "Doppia Crescita",
    description:
      "Prossimo aggiornamento mensile stats: invii le tue stats reali e ottieni punti doppi quel mese.",
    price: "€1,99",
    rarity: "uncommon",
    icon: "⚡",
    highlight: "2× punti · 1 mese",
    badge: "Hot",
  },
  {
    id: "booster-skip-settimana",
    category: "booster",
    name: "Skip Settimana",
    description: "Hai saltato l'aggiornamento mensile? Recupera un mese perso.",
    price: "€2,99",
    rarity: "rare",
    icon: "⏭",
    highlight: "Recupero 1 mese",
  },
  {
    id: "album-abbonamento-annuale",
    category: "album",
    name: "Visibilità Album",
    description: "Abbonamento annuale: la tua card resta visibile nell'albo ufficiale DraftKataHero.",
    price: "€9,99",
    pricePeriod: "/anno",
    rarity: "legendary",
    icon: "📖",
    highlight: "365 giorni · album",
    badge: "Pezzo forte",
    featured: true,
    wide: true,
  },
  {
    id: "album-evidenza-settimana",
    category: "album",
    name: "Metti in Evidenza",
    description: "La tua card appare tra i primi risultati di ricerca per 7 giorni. Ideale pre-torneo.",
    price: "€1,99",
    rarity: "epic",
    icon: "⭐",
    highlight: "Top ricerca · 7 gg",
  },
  {
    id: "finish-cromo",
    category: "estetica",
    name: "Finish Cromo",
    description: "Variante card effetto cromo — brilla su social e album.",
    price: "€1,99",
    rarity: "uncommon",
    icon: "🪩",
    highlight: "Skin cromo",
  },
  {
    id: "finish-oro",
    category: "estetica",
    name: "Finish Oro",
    description: "Finitura oro premium sulla player card.",
    price: "€2,49",
    rarity: "rare",
    icon: "👑",
    highlight: "Skin oro",
  },
  {
    id: "finish-speciale",
    category: "estetica",
    name: "Edizione Speciale",
    description: "Variante limitata con artwork esclusivo KataHero.",
    price: "€2,99",
    rarity: "epic",
    icon: "✨",
    highlight: "Limited drop",
  },
  {
    id: "badge-ruolo",
    category: "estetica",
    name: "Badge Riconoscimento",
    description: "Captain, Rookie o MVP mensile — badge visibile su card e profilo.",
    price: "€2,99",
    rarity: "rare",
    icon: "🎖",
    highlight: "Captain · Rookie · MVP",
  },
  {
    id: "animazione-reveal",
    category: "estetica",
    name: "Reveal Personalizzata",
    description: "Animazione unica quando qualcuno apre la tua card dall'album.",
    price: "€2,99",
    rarity: "epic",
    icon: "🎬",
    highlight: "Custom reveal",
  },
];

function readCheckoutBase(productId: ShopProductId): string {
  const envKey = checkoutEnvKey(productId);
  const fromEnv = process.env[envKey as keyof NodeJS.ProcessEnv]?.trim();
  if (fromEnv) return fromEnv;
  return KATAHERO_PURCHASE_URL;
}

/** URL checkout Stripe con riferimento prodotto e atleta. */
export function getShopCheckoutUrl(productId: ShopProductId, playerSlug?: string): string {
  const base = readCheckoutBase(productId);
  if (!playerSlug) return base;

  try {
    const url = new URL(base);
    url.searchParams.set("client_reference_id", `draft:${playerSlug}:${productId}`);
    return url.toString();
  } catch {
    return base;
  }
}

export function getShopProduct(id: ShopProductId): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((product) => product.id === id);
}

export function getShopProductsByCategory(categoryId: ShopCategoryId): ShopProduct[] {
  return SHOP_PRODUCTS.filter((product) => product.category === categoryId);
}

export function getFeaturedShopProducts(): ShopProduct[] {
  return SHOP_PRODUCTS.filter((product) => product.featured);
}

export const SHOP_RARITY_LABELS: Record<ShopRarity, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};
