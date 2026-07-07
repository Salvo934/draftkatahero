import type { DraftSlot, PlayerProfile } from "@/data/players";
import { discoverSlots } from "@/data/players";
import { SLOT_COUNT } from "@/lib/draft-config";

export const SIMULATION_PICK_COUNT = 1;

export function buildSimulationSlots(): DraftSlot[] {
  const pick1 = discoverSlots[0].player;
  if (!pick1) {
    return Array.from({ length: SLOT_COUNT }, (_, i) => ({
      slot: i + 1,
      player: null,
    }));
  }

  const picks: PlayerProfile[] = [pick1];

  return Array.from({ length: SLOT_COUNT }, (_, i) => ({
    slot: i + 1,
    player: i < picks.length ? picks[i] : null,
  }));
}
