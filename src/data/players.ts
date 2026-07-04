import { SLOT_COUNT } from "@/lib/draft-config";

/**
 * Due sezioni separate:
 * - `discoverSlots` → slot "Da scoprire" (prossima domenica)
 * - `pickedSlots` → talenti "Rivelate" (restano permanentemente)
 *
 * Aggiungi `cardImage` per la player card grafica (lightbox al click).
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
};

/** Slot da scoprire — si azzerano ogni lunedì, i giocatori passano in Rivelate */
export const discoverSlots: DraftSlot[] = [
  {
    slot: 1,
    player: {
      slug: "ilario-simonetti",
      name: "Ilario Simonetti",
      position: "Ala piccola",
      team: "Benacquista Assicurazioni Latina",
      country: "Italia",
      height: "200 cm",
      birthYear: "2004",
      category: "Serie B",
      availability: "Disponibile",
      photo: "/players/ilario-simonetti.jpg",
      cardImage: "/players/ilario-card.png",
      playerCardUrl: "https://ilariosimonetti7.katahero.com",
    },
  },
  ...Array.from({ length: SLOT_COUNT - 1 }, (_, i) => ({
    slot: i + 2,
    player: null as PlayerProfile | null,
  })),
];

/** Talent rivelati — restano sempre in sezione Rivelate */
export const pickedSlots: DraftSlot[] = [];

export function getPlayerCardImage(player: PlayerProfile): string | undefined {
  return player.cardImage;
}

export function getPlayerCardUrl(player: PlayerProfile): string | undefined {
  return player.playerCardUrl;
}

/** @deprecated use discoverSlots */
export const draftSlots = discoverSlots;
