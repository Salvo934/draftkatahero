import type { DraftSlot } from "@/data/players";
import type { ActivePickAnnouncement } from "@/lib/draft-announcement";
import { getDraftYearFromWeekKey } from "@/lib/draft-announcement";
import type { DropRuntime } from "@/lib/drop-runtime";
import { resolveDropRuntime } from "@/lib/drop-runtime";

export type DropPhase = "pre" | "revealing" | "post";

function getFilledSlots(slots: DraftSlot[]): DraftSlot[] {
  return slots.filter((s) => s.player).sort((a, b) => a.slot - b.slot);
}

function getScheduledSlots(slots: DraftSlot[]): DraftSlot[] {
  return getFilledSlots(slots).filter((s) => !s.revealed);
}

function getInstantRevealCount(slots: DraftSlot[]): number {
  return slots.filter((s) => s.player && s.revealed).length;
}

export function getDropPhase(
  now: Date,
  weekKey: string,
  slots: DraftSlot[],
  runtime?: Partial<DropRuntime>,
): DropPhase {
  const filled = getFilledSlots(slots);
  if (filled.length === 0) return "post";

  const scheduled = getScheduledSlots(slots);
  if (scheduled.length === 0) return "post";

  const { dropStart, revealIntervalMs, announcementMs } = resolveDropRuntime(weekKey, runtime);
  if (now < dropStart) return "pre";

  const lastCardAt =
    dropStart.getTime() + (scheduled.length - 1) * revealIntervalMs + announcementMs;

  if (now.getTime() >= lastCardAt) return "post";

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
  const scheduled = getScheduledSlots(slots);

  if (filled.length === 0) return 0;
  if (scheduled.length === 0) return filled.length;

  const phase = getDropPhase(now, weekKey, slots, runtime);
  if (phase === "pre") return instant;
  if (phase === "post") return filled.length;

  const { dropStart, revealIntervalMs, announcementMs } = resolveDropRuntime(weekKey, runtime);
  const elapsed = now.getTime() - dropStart.getTime();
  let scheduledVisible = 0;

  for (let i = 0; i < scheduled.length; i++) {
    if (elapsed >= i * revealIntervalMs + announcementMs) {
      scheduledVisible = i + 1;
    }
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

  const scheduled = getScheduledSlots(slots);
  if (scheduled.length === 0) return null;

  const { dropStart, revealIntervalMs, announcementMs } = resolveDropRuntime(weekKey, runtime);
  const elapsed = now.getTime() - dropStart.getTime();
  const pickIndex = Math.floor(elapsed / revealIntervalMs);

  if (pickIndex < 0 || pickIndex >= scheduled.length) return null;

  const pickStart = pickIndex * revealIntervalMs;
  if (elapsed < pickStart || elapsed >= pickStart + announcementMs) return null;

  return {
    slot: scheduled[pickIndex],
    year: getDraftYearFromWeekKey(weekKey),
  };
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
  revealedCount: number,
  runtime?: Partial<DropRuntime>,
): number | null {
  if (getDropPhase(now, weekKey, slots, runtime) !== "revealing") return null;

  const scheduled = getScheduledSlots(slots);
  const instant = getInstantRevealCount(slots);
  const scheduledRevealed = revealedCount - instant;

  if (scheduledRevealed >= scheduled.length) return null;

  const { dropStart, revealIntervalMs, announcementMs } = resolveDropRuntime(weekKey, runtime);
  const elapsed = now.getTime() - dropStart.getTime();
  const pickStart = scheduledRevealed * revealIntervalMs;

  if (elapsed < pickStart + announcementMs) {
    return Math.max(0, Math.ceil((pickStart + announcementMs - elapsed) / 1000));
  }

  const nextPickStart = (scheduledRevealed + 1) * revealIntervalMs;
  if (scheduledRevealed + 1 >= scheduled.length) return null;

  return Math.max(0, Math.ceil((nextPickStart - elapsed) / 1000));
}

export { getDropStartFromWeekKey } from "@/lib/drop-runtime";
