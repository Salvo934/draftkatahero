import { KATAHERO_PURCHASE_URL } from "@/lib/card-view";

export type ShopPlanId = "card-overall" | "card-player-page";

export type ShopPageSectionId =
  | "section-gallery"
  | "section-highlights"
  | "section-stats"
  | "section-bio";

export type ShopExtraId =
  | "upgrade-boost"
  | "design-change"
  | "overall-point"
  | "overall-pack-5"
  | "finish-cromo"
  | "badge-ruolo";

export type ShopItemId = ShopPlanId | ShopPageSectionId | ShopExtraId;

export type ShopFeature = {
  label: string;
  included: boolean;
  detail?: string;
};

export type ShopPlan = {
  id: ShopPlanId;
  name: string;
  tagline: string;
  price: string;
  badge?: string;
  recommended?: boolean;
  accent: "silver" | "gold";
  cta: string;
  features: ShopFeature[];
};

export type ShopPageSection = {
  id: ShopPageSectionId;
  name: string;
  description: string;
  price: string;
  icon: string;
  cta: string;
};

export type ShopExtra = {
  id: ShopExtraId;
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  icon: string;
  tag?: string;
  cta: string;
  forPlayerPage?: boolean;
};

export const SHOP_PLANS: ShopPlan[] = [
  {
    id: "card-overall",
    name: "Card Overall",
    tagline: "Solo la card — pronta da scaricare",
    price: "€4,99",
    accent: "silver",
    cta: "Acquista la card",
    features: [
      { label: "Card Overall FIFA in HD", included: true, detail: "PNG ad alta risoluzione" },
      { label: "Download immediato", included: true, detail: "Dopo il pagamento" },
      { label: "Formato social & stories", included: true },
      { label: "Player page KataHero", included: false },
      { label: "Link personale profilo", included: false },
      { label: "Visibilità su katahero.com", included: false },
    ],
  },
  {
    id: "card-player-page",
    name: "Card + Player Page",
    tagline: "Card + pagina atleta base — sezioni premium a parte",
    price: "€9,99",
    badge: "Consigliato",
    recommended: true,
    accent: "gold",
    cta: "Acquista card + page",
    features: [
      { label: "Card Overall FIFA in HD", included: true, detail: "PNG ad alta risoluzione" },
      { label: "Player page base", included: true, detail: "Profilo + link personale" },
      { label: "Visibilità su katahero.com", included: true },
      { label: "Gallery", included: false, detail: "€9,99 · sezione extra" },
      { label: "Highlights", included: false, detail: "€9,99 · sezione extra" },
      { label: "Stats & stagione", included: false, detail: "€9,99 · sezione extra" },
    ],
  },
];

/** Sezioni player page — €9,99 ciascuna (per chi ha Card + Player Page) */
export const SHOP_PAGE_SECTIONS: ShopPageSection[] = [
  {
    id: "section-gallery",
    name: "Gallery",
    description:
      "Galleria foto sulla tua player page — momenti, allenamenti, partite e lifestyle da mostrare a scout e club.",
    price: "€9,99",
    icon: "📸",
    cta: "Aggiungi gallery",
  },
  {
    id: "section-highlights",
    name: "Highlights",
    description:
      "Sezione highlights con i tuoi migliori clip — azioni, canestri e play da condividere sul profilo.",
    price: "€9,99",
    icon: "🎬",
    cta: "Aggiungi highlights",
  },
  {
    id: "section-stats",
    name: "Stats & stagione",
    description:
      "Numeri, medie e statistiche stagione aggiornate — OVR, punti, rimbalzi, assist e trend.",
    price: "€9,99",
    icon: "📊",
    cta: "Aggiungi stats",
  },
  {
    id: "section-bio",
    name: "Bio & percorso",
    description:
      "Storia, percorso e obiettivi — racconta chi sei, da dove vieni e dove vuoi arrivare.",
    price: "€9,99",
    icon: "📝",
    cta: "Aggiungi bio",
  },
];

export const SHOP_EXTRAS: ShopExtra[] = [
  {
    id: "upgrade-boost",
    name: "Upgrade Boost",
    description: "Spingi la tua card in evidenza per 7 giorni — più visibilità su KataHero.",
    price: "€1,99",
    icon: "⚡",
    tag: "Popolare",
    cta: "Aggiungi boost",
  },
  {
    id: "design-change",
    name: "Cambio design",
    description: "Nuovo layout, finitura o palette sulla tua card Overall. File HD aggiornato.",
    price: "€3,99",
    icon: "🎨",
    cta: "Cambia design",
  },
  {
    id: "overall-point",
    name: "Punto Overall",
    description: "+1 sul rating Overall della tua card. Ogni punto costa €1 — acquista quanti ne vuoi.",
    price: "€1,00",
    priceNote: "a punto",
    icon: "⬆",
    cta: "Aggiungi punto",
  },
  {
    id: "overall-pack-5",
    name: "Pack 5 punti OVR",
    description: "Cinque punti Overall in un colpo solo. Ideale per un salto visibile sul rating.",
    price: "€5,00",
    icon: "📈",
    tag: "Risparmio",
    cta: "Pack +5 OVR",
  },
  {
    id: "finish-cromo",
    name: "Finish Cromo",
    description: "Variante card effetto cromo — brilla su social e nell'album.",
    price: "€1,99",
    icon: "🪩",
    cta: "Skin cromo",
  },
  {
    id: "badge-ruolo",
    name: "Badge ruolo",
    description: "Captain, Rookie o MVP — badge visibile su card e player page.",
    price: "€2,99",
    icon: "🎖",
    cta: "Aggiungi badge",
  },
];

const CHECKOUT_ENV_PREFIX = "NEXT_PUBLIC_SHOP_";

function checkoutEnvKey(itemId: ShopItemId): string {
  return `${CHECKOUT_ENV_PREFIX}${itemId.replace(/-/g, "_").toUpperCase()}_CHECKOUT_URL`;
}

function readCheckoutBase(itemId: ShopItemId): string {
  const envKey = checkoutEnvKey(itemId);
  const fromEnv = process.env[envKey as keyof NodeJS.ProcessEnv]?.trim();
  if (fromEnv) return fromEnv;
  return KATAHERO_PURCHASE_URL;
}

/** URL checkout Stripe — opzionale riferimento atleta draft. */
export function getShopCheckoutUrl(itemId: ShopItemId, playerSlug?: string): string {
  const base = readCheckoutBase(itemId);
  if (!playerSlug) return base;

  try {
    const url = new URL(base);
    url.searchParams.set("client_reference_id", `draft:${playerSlug}:${itemId}`);
    return url.toString();
  } catch {
    return base;
  }
}

export function getShopPlan(id: ShopPlanId): ShopPlan | undefined {
  return SHOP_PLANS.find((plan) => plan.id === id);
}

export function getShopPageSection(id: ShopPageSectionId): ShopPageSection | undefined {
  return SHOP_PAGE_SECTIONS.find((section) => section.id === id);
}

export function getShopExtra(id: ShopExtraId): ShopExtra | undefined {
  return SHOP_EXTRAS.find((extra) => extra.id === id);
}

/** @deprecated use SHOP_PLANS */
export const SHOP_PRODUCTS = SHOP_PLANS;

/** @deprecated use ShopItemId */
export type ShopProductId = ShopItemId;
