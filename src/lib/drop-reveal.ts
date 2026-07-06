import type { DraftSlot } from "@/data/players";
import { DROP_HOUR, REVEAL_INTERVAL_MS } from "@/lib/draft-config";

export type DropPhase = "pre" | "revealing" | "post";

export function getDropStartFromWeekKey(weekKey: string): Date {
  const [y, m, d] = weekKey.split("-").map(Number);
  return new Date(y, m - 1, d, DROP_HOUR, 0, 0, 0);
}

function getFilledSlots(slots: DraftSlot[]): DraftSlot[] {
  return slots.filter((s) => s.player).sort((a, b) => a.slot - b.slot);
}

export function getDropPhase(now: Date, weekKey: string, filledCount: number): DropPhase {
  if (filledCount === 0) return "post";

  const dropStart = getDropStartFromWeekKey(weekKey);

  if (now < dropStart) return "pre";

  const allRevealedAt = dropStart.getTime() + (filledCount - 1) * REVEAL_INTERVAL_MS;
  if (now.getTime() >= allRevealedAt) return "post";

  return "revealing";
}

export function getRevealedPlayerCount(
  now: Date,
  weekKey: string,
  filledCount: number,
): number {
  if (filledCount === 0) return 0;

  const phase = getDropPhase(now, weekKey, filledCount);
  if (phase === "pre") return 0;
  if (phase === "post") return filledCount;

  const dropStart = getDropStartFromWeekKey(weekKey);
  const elapsed = now.getTime() - dropStart.getTime();
  return Math.min(filledCount, Math.floor(elapsed / REVEAL_INTERVAL_MS) + 1);
}

export function applyDropReveal(
  slots: DraftSlot[],
  now: Date,
  weekKey: string,
): DraftSlot[] {
  const filled = getFilledSlots(slots);
  const revealCount = getRevealedPlayerCount(now, weekKey, filled.length);
  const revealed = new Set(filled.slice(0, revealCount).map((s) => s.slot));

  return slots.map((s) => {
    if (s.revealed && s.player) return s;
    return revealed.has(s.slot) ? s : { ...s, player: null };
  });
}

export function getSecondsUntilNextReveal(
  now: Date,
  weekKey: string,
  filledCount: number,
  revealedCount: number,
): number | null {
  if (getDropPhase(now, weekKey, filledCount) !== "revealing") return null;
  if (revealedCount >= filledCount) return null;

  const dropStart = getDropStartFromWeekKey(weekKey);
  const nextRevealAt = dropStart.getTime() + revealedCount * REVEAL_INTERVAL_MS;
  return Math.max(0, Math.ceil((nextRevealAt - now.getTime()) / 1000));
}
