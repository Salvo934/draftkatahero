import type { DraftSlot, PlayerProfile } from "@/data/players";
import { discoverSlots } from "@/data/players";
import { SLOT_COUNT } from "@/lib/draft-config";

export const SIMULATION_PICK_COUNT = 3;

const demoPick2: PlayerProfile = {
  slug: "sim-luca-bianchi",
  name: "Luca Bianchi",
  position: "Guardia",
  team: "UCC Assigeco Piacenza",
  country: "Italia",
  height: "192 cm",
  birthYear: "2003",
  category: "Serie B",
  photo: "/players/ilario-simonetti.jpg",
  cardImage: "/players/ilario-card.png",
};

const demoPick3: PlayerProfile = {
  slug: "sim-andrea-verdi",
  name: "Andrea Verdi",
  position: "Center",
  team: "Fortitudo Bologna",
  country: "Italia",
  height: "208 cm",
  birthYear: "2002",
  category: "Serie B",
  photo: "/players/ilario-simonetti.jpg",
  cardImage: "/players/ilario-card.png",
};

export function buildSimulationSlots(): DraftSlot[] {
  const ilario = discoverSlots[0].player;
  if (!ilario) {
    return Array.from({ length: SLOT_COUNT }, (_, i) => ({
      slot: i + 1,
      player: null,
    }));
  }

  const picks: PlayerProfile[] = [ilario, demoPick2, demoPick3];

  return Array.from({ length: SLOT_COUNT }, (_, i) => ({
    slot: i + 1,
    player: i < picks.length ? picks[i] : null,
  }));
}
