import type { DraftSlot } from "@/data/players";
import type { ActivePickAnnouncement } from "@/lib/draft-announcement";
import { getDraftYearFromWeekKey } from "@/lib/draft-announcement";
import { BETWEEN_PICKS_MS } from "@/lib/draft-config";

export type SimulationPlayback = {
  slots: DraftSlot[];
  scheduled: DraftSlot[];
  revealedSlots: number[];
  activeAnnouncement: ActivePickAnnouncement | null;
  pickIndex: number;
  awaitingNextIntro: boolean;
  done: boolean;
};

export function getScheduledPicks(slots: DraftSlot[]): DraftSlot[] {
  return slots
    .filter((s) => s.player)
    .sort((a, b) => a.slot - b.slot)
    .filter((s) => !s.revealed);
}

export function createSimulationPlayback(
  slots: DraftSlot[],
  weekKey: string,
): SimulationPlayback {
  const scheduled = getScheduledPicks(slots);
  const year = getDraftYearFromWeekKey(weekKey || `${new Date().getFullYear()}-01-01`);

  return {
    slots,
    scheduled,
    revealedSlots: [],
    activeAnnouncement: scheduled[0] ? { slot: scheduled[0], year } : null,
    pickIndex: 0,
    awaitingNextIntro: false,
    done: scheduled.length === 0,
  };
}

export function applySimulationReveal(
  slots: DraftSlot[],
  revealedSlots: number[],
): DraftSlot[] {
  const revealed = new Set(revealedSlots);

  return slots.map((s) => {
    if (!s.player) return s;
    if (revealed.has(s.slot)) return s;
    return { ...s, player: null };
  });
}

export function advanceSimulationAfterIntro(
  playback: SimulationPlayback,
): SimulationPlayback {
  if (!playback.activeAnnouncement) return playback;

  const slotNum = playback.activeAnnouncement.slot.slot;
  const revealedSlots = [...playback.revealedSlots, slotNum];
  const nextIndex = playback.pickIndex + 1;

  if (nextIndex >= playback.scheduled.length) {
    return {
      ...playback,
      revealedSlots,
      activeAnnouncement: null,
      pickIndex: nextIndex,
      awaitingNextIntro: false,
      done: true,
    };
  }

  return {
    ...playback,
    revealedSlots,
    activeAnnouncement: null,
    pickIndex: nextIndex,
    awaitingNextIntro: true,
  };
}

export function startNextSimulationIntro(
  playback: SimulationPlayback,
  weekKey: string,
): SimulationPlayback {
  const year = getDraftYearFromWeekKey(weekKey || `${new Date().getFullYear()}-01-01`);
  const next = playback.scheduled[playback.pickIndex];

  return {
    ...playback,
    activeAnnouncement: next ? { slot: next, year } : null,
    awaitingNextIntro: false,
  };
}

export { BETWEEN_PICKS_MS };
