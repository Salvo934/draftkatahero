/**
 * Due sezioni separate:
 * - `discoverSlots` → 40 slot "Da scoprire" (prossima domenica)
 * - `pickedSlots` → talenti "Rivelate" (restano permanentemente)
 *
 * Aggiungi `cardImage` per la player card grafica (lightbox al click).
 * Opzionale: `playerCardUrl` per link esterno se non c'è cardImage.
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
  /** Immagine player card — si apre in lightbox al click */
  cardImage?: string;
  /** Link esterno opzionale — usato solo se manca cardImage */
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

/** 40 slot da scoprire — si azzerano ogni lunedì, i giocatori passano in Rivelate */
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
      weight: "98 kg",
      birthYear: "2004",
      category: "Serie B",
      availability: "Disponibile",
      strongPoint: "Fisico importante: impatto nel pitturato e al contatto.",
      dominantHand: "Destra",
      photo: "/players/ilario-simonetti.jpg",
      cardImage: "/players/ilario-card.png",
      playerCardUrl: "https://ilariosimonetti7.katahero.com",
      seasonStats: { season: "25/26", points: "5,7", rebounds: "1,8", assists: "1,0" },
    },
  },
  ...Array.from({ length: 39 }, (_, i) => ({
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
