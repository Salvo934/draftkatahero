import {
  overallAlbumSeed,
  type DraftSlot,
  type OverallAlbumEntry,
  type PlayerProfile,
} from "@/data/players";
import { SLOT_COUNT } from "@/lib/draft-config";

function playerKey(player: PlayerProfile): string {
  return player.slug;
}

function hasAlbumCard(player: PlayerProfile): boolean {
  return Boolean(player.cardImage);
}

/** Unisce seed album + giocatori con card overall dal board (slot liberi in ordine). */
export function buildOverallAlbum(
  discoverSlots: DraftSlot[],
  pickedSlots: DraftSlot[],
): OverallAlbumEntry[] {
  const entries: OverallAlbumEntry[] = overallAlbumSeed.map((entry) => ({ ...entry }));
  const inAlbum = new Set(
    entries.filter((e) => e.player).map((e) => playerKey(e.player!)),
  );

  const candidates = [...pickedSlots, ...discoverSlots]
    .filter((s) => s.player && hasAlbumCard(s.player) && !inAlbum.has(playerKey(s.player)))
    .sort((a, b) => a.slot - b.slot);

  for (const slot of candidates) {
    const emptyIndex = entries.findIndex((e) => !e.player);
    if (emptyIndex === -1) break;

    entries[emptyIndex] = {
      index: entries[emptyIndex].index,
      player: slot.player,
      collectedWeekLabel: slot.draftWeekLabel,
    };
    inAlbum.add(playerKey(slot.player!));
  }

  return entries.slice(0, SLOT_COUNT);
}

export function countCollectedOverallCards(entries: OverallAlbumEntry[]): number {
  return entries.filter((e) => e.player && hasAlbumCard(e.player)).length;
}
