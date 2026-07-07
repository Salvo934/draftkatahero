import { SLOT_COUNT } from "@/lib/draft-config";

/**
 * - `discoverSlots` → prossima domenica (max 15 giocatori)
 * - `pickedSlots` → Hall of Fame: solo la pick #1 di ogni settimana
 *
 * Dopo ogni draft: sposta solo slot #1 in pickedSlots, svuota discover.
 * Gli altri atleti contattano katahero.com o Instagram per la propria scheda.
 */

export type PlayerProfile = {
  slug: string;
  name: string;
  position: string;
  team: string;
  country: string;
  height: string;
  weight?: string;
  birthYear?: string;
  category?: string;
  availability?: string;
  strongPoint?: string;
  dominantHand?: string;
  photo?: string;
  teamLogo?: string;
  cardImage?: string;
  /** Se true, la player card è visibile solo in anteprima — versione completa su KataHero */
  cardLocked?: boolean;
  playerCardUrl?: string;
  seasonStats?: {
    season: string;
    points: string;
    rebounds: string;
    assists: string;
  };
};

export type DraftSlot = {
  slot: number;
  player: PlayerProfile | null;
  /** Hall of Fame: settimana in cui è stata pick #1 */
  draftWeekLabel?: string;
  /** Prima scelta già rivelata — visibile subito, indipendentemente dal countdown del drop */
  revealed?: boolean;
};

const jasonTaylorProfile: PlayerProfile = {
  slug: "jason-taylor",
  name: "Jason Taylor",
  position: "Ala piccola",
  team: "USA",
  country: "USA",
  height: "198 cm",
  birthYear: "2003",
  category: "NCAA",
  photo: "/players/jason-taylor.png",
  cardImage: "/players/jason-taylor-card.png",
};

/** Prossimo draft — pick #1 in arrivo al drop (nascosta fino a fine intro) */
export const discoverSlots: DraftSlot[] = Array.from({ length: SLOT_COUNT }, (_, i) => ({
  slot: i + 1,
  player: i === 0 ? jasonTaylorProfile : null,
}));

/** Hall of Fame — si popola dopo ogni rollover con la pick #1 della settimana */
export const pickedSlots: DraftSlot[] = [];

export function getPlayerCardImage(player: PlayerProfile): string | undefined {
  return player.cardImage;
}

export function getPlayerCardUrl(player: PlayerProfile): string | undefined {
  return player.playerCardUrl;
}

/** @deprecated use discoverSlots */
export const draftSlots = discoverSlots;
