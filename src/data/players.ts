/**
 * Aggiungi manualmente ogni giocatore in `draftSlots`.
 * - `player: null` → slot vuoto in attesa del drop
 * - `playerCardUrl` → link alla Player Card KataHero (bottoni apri / condividi)
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
  /** Player Card KataHero dell'atleta — es. https://nome.katahero.com */
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

/** Modifica questo array — max 40 slot */
export const draftSlots: DraftSlot[] = [
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
      playerCardUrl: "https://ilariosimonetti7.katahero.com",
      seasonStats: { season: "25/26", points: "5,7", rebounds: "1,8", assists: "1,0" },
    },
  },
  ...Array.from({ length: 39 }, (_, i) => ({
    slot: i + 2,
    player: null as PlayerProfile | null,
  })),
];

export function getAllSlots(): DraftSlot[] {
  return draftSlots.slice(0, 40);
}

export function getPlayerCardUrl(player: PlayerProfile): string | undefined {
  return player.playerCardUrl;
}

export function getPublishedSlots(): DraftSlot[] {
  return getAllSlots().filter((s) => s.player !== null);
}
