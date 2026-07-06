import type { DraftSlot } from "@/data/players";
import type { ActivePickAnnouncement } from "@/lib/draft-announcement";
import {
  getDraftYearFromWeekKey,
  getPickAnnouncementMs,
} from "@/lib/draft-announcement";
import type { DropRuntime } from "@/lib/drop-runtime";
import { resolveDropRuntime } from "@/lib/drop-runtime";
import { BETWEEN_PICKS_MS } from "@/lib/draft-config";

export type DropPhase = "pre" | "revealing" | "post";

type PickTimelineEntry = {
  slot: DraftSlot;
  index: number;
  startMs: number;
  announcementMs: number;
  revealMs: number;
};

function getFilledSlots(slots: DraftSlot[]): DraftSlot[] {
  return slots.filter((s) => s.player).sort((a, b) => a.slot - b.slot);
}

function getScheduledSlots(slots: DraftSlot[]): DraftSlot[] {
  return getFilledSlots(slots).filter((s) => !s.revealed);
}

function getInstantRevealCount(slots: DraftSlot[]): number {
  return slots.filter((s) => s.player && s.revealed).length;
}

function buildPickTimeline(
  scheduled: DraftSlot[],
  defaultAnnouncementMs: number,
): PickTimelineEntry[] {
  let cursor = 0;

  return scheduled.map((slot, index) => {
    const announcementMs = getPickAnnouncementMs(slot.slot, defaultAnnouncementMs);
    const startMs = cursor;
    const revealMs = startMs + announcementMs;
    cursor = revealMs + BETWEEN_PICKS_MS;

    return { slot, index, startMs, announcementMs, revealMs };
  });
}

function resolveTimeline(
  slots: DraftSlot[],
  runtime?: Partial<DropRuntime>,
): { scheduled: DraftSlot[]; timeline: PickTimelineEntry[]; dropStart: Date } | null {
  const scheduled = getScheduledSlots(slots);
  if (scheduled.length === 0) return null;

  const { dropStart, announcementMs } = resolveDropRuntime("", runtime);
  const timeline = buildPickTimeline(scheduled, announcementMs);

  return { scheduled, timeline, dropStart };
}

export function getDropPhase(
  now: Date,
  weekKey: string,
  slots: DraftSlot[],
  runtime?: Partial<DropRuntime>,
): DropPhase {
  const filled = getFilledSlots(slots);
  if (filled.length === 0) return "post";

  const resolved = resolveTimeline(slots, runtime);
  if (!resolved) return "post";

  const { timeline, dropStart } = resolved;
  if (now < dropStart) return "pre";

  const lastRevealMs = timeline[timeline.length - 1].revealMs;
  if (now.getTime() >= dropStart.getTime() + lastRevealMs) return "post";

  return "revealing";
}

export function getRevealedPlayerCount(
  now: Date,
  weekKey: string,
  slots: DraftSlot[],
  runtime?: Partial<DropRuntime>,
): number {
  const filled = getFilledSlots(slots);
  const instant = getInstantRevealCount(slots);

  if (filled.length === 0) return 0;

  const resolved = resolveTimeline(slots, runtime);
  if (!resolved) return filled.length;

  const phase = getDropPhase(now, weekKey, slots, runtime);
  if (phase === "pre") return instant;
  if (phase === "post") return filled.length;

  const { timeline, dropStart } = resolved;
  const elapsed = now.getTime() - dropStart.getTime();
  let scheduledVisible = 0;

  for (const entry of timeline) {
    if (elapsed >= entry.revealMs) scheduledVisible++;
  }

  return instant + scheduledVisible;
}

export function getActivePickAnnouncement(
  now: Date,
  weekKey: string,
  slots: DraftSlot[],
  runtime?: Partial<DropRuntime>,
): ActivePickAnnouncement | null {
  if (getDropPhase(now, weekKey, slots, runtime) !== "revealing") return null;

  const resolved = resolveTimeline(slots, runtime);
  if (!resolved) return null;

  const { timeline, dropStart } = resolved;
  const elapsed = now.getTime() - dropStart.getTime();

  for (const entry of timeline) {
    if (elapsed >= entry.startMs && elapsed < entry.revealMs) {
      return {
        slot: entry.slot,
        year: getDraftYearFromWeekKey(weekKey),
      };
    }
  }

  return null;
}

export function applyDropReveal(
  slots: DraftSlot[],
  now: Date,
  weekKey: string,
  runtime?: Partial<DropRuntime>,
): DraftSlot[] {
  const scheduled = getScheduledSlots(slots);
  const instantCount = getInstantRevealCount(slots);
  const revealCount = getRevealedPlayerCount(now, weekKey, slots, runtime);
  const scheduledVisible = new Set(
    scheduled.slice(0, Math.max(0, revealCount - instantCount)).map((s) => s.slot),
  );

  return slots.map((s) => {
    if (s.revealed && s.player) return s;
    if (scheduledVisible.has(s.slot)) return s;
    return { ...s, player: null };
  });
}

export function getSecondsUntilNextReveal(
  now: Date,
  weekKey: string,
  slots: DraftSlot[],
  _revealedCount: number,
  runtime?: Partial<DropRuntime>,
): number | null {
  if (getDropPhase(now, weekKey, slots, runtime) !== "revealing") return null;

  const resolved = resolveTimeline(slots, runtime);
  if (!resolved) return null;

  const { timeline, dropStart } = resolved;
  const elapsed = now.getTime() - dropStart.getTime();

  for (const entry of timeline) {
    if (elapsed < entry.revealMs) {
      return Math.max(0, Math.ceil((entry.revealMs - elapsed) / 1000));
    }
  }

  return null;
}

export { getDropStartFromWeekKey } from "@/lib/drop-runtime";
