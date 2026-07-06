import type { DraftSlot } from "@/data/players";
import { discoverSlots as seedDiscover, pickedSlots as seedPicked } from "@/data/players";
import { createEmptySlots, formatWeekLabel, getCurrentPeriodWeekKey } from "@/lib/draft-cycle";
import { extractWeeklyFirstPick } from "@/lib/hall-of-fame";
import { SLOT_COUNT } from "@/lib/draft-config";

type StoredBoard = {
  version: 2;
  weekKey: string;
  discoverSlots: DraftSlot[];
  pickedSlots: DraftSlot[];
};

const STORAGE_KEY = "draftkatahero-board-v7";

function readStorage(): StoredBoard | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredBoard;
  } catch {
    return null;
  }
}

function writeStorage(board: StoredBoard): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
}

function mergeDiscoverSlots(stored: DraftSlot[], picked: DraftSlot[]): DraftSlot[] {
  const archivedSlugs = new Set(
    [...picked, ...seedPicked].map((s) => s.player?.slug).filter(Boolean) as string[],
  );
  const bySlot = new Map(stored.map((s) => [s.slot, s]));
  for (const seed of seedDiscover) {
    if (seed.player && !archivedSlugs.has(seed.player.slug)) {
      bySlot.set(seed.slot, seed);
    }
  }
  return Array.from({ length: SLOT_COUNT }, (_, i) => bySlot.get(i + 1) ?? { slot: i + 1, player: null });
}

function mergePickedSlots(stored: DraftSlot[]): DraftSlot[] {
  const seen = new Set<string>();
  const merged: DraftSlot[] = [];

  for (const slot of [...stored, ...seedPicked]) {
    if (!slot.player) continue;
    const key = slot.player.slug;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(slot);
  }

  return merged.map((s, i) => ({ ...s, slot: i + 1 }));
}

function rollover(stored: StoredBoard, newWeekKey: string): StoredBoard {
  const firstPick = extractWeeklyFirstPick(stored.discoverSlots, stored.weekKey);
  const pickedSlots = mergePickedSlots([
    ...stored.pickedSlots,
    ...(firstPick ? [firstPick] : []),
  ]);

  return {
    version: 2,
    weekKey: newWeekKey,
    discoverSlots: mergeDiscoverSlots(createEmptySlots(), pickedSlots),
    pickedSlots,
  };
}

function initBoard(weekKey: string): StoredBoard {
  const pickedSlots = mergePickedSlots(seedPicked);
  return {
    version: 2,
    weekKey,
    discoverSlots: mergeDiscoverSlots(createEmptySlots(), pickedSlots),
    pickedSlots,
  };
}

export type DraftBoardState = {
  weekKey: string;
  weekLabel: string;
  discoverSlots: DraftSlot[];
  pickedSlots: DraftSlot[];
};

export function loadDraftBoardState(): DraftBoardState {
  const weekKey = getCurrentPeriodWeekKey();
  const weekLabel = formatWeekLabel(weekKey);

  let board = readStorage();

  if (!board) {
    board = initBoard(weekKey);
    writeStorage(board);
  } else if (board.weekKey !== weekKey) {
    board = rollover(board, weekKey);
    writeStorage(board);
  } else {
    const pickedSlots = mergePickedSlots(board.pickedSlots);
    board = {
      ...board,
      discoverSlots: mergeDiscoverSlots(board.discoverSlots, pickedSlots),
      pickedSlots,
    };
    writeStorage(board);
  }

  return {
    weekKey,
    weekLabel,
    discoverSlots: board.discoverSlots,
    pickedSlots: board.pickedSlots,
  };
}
