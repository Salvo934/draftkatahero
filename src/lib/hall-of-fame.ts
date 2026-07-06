import type { DraftSlot } from "@/data/players";
import { formatWeekLabel } from "@/lib/draft-cycle";

/** Solo la pick #1 del draft settimanale entra in Hall of Fame. */
export function extractWeeklyFirstPick(
  slots: DraftSlot[],
  weekKey: string,
): DraftSlot | null {
  const first = slots.find((s) => s.slot === 1 && s.player);
  if (!first?.player) return null;

  return {
    slot: 1,
    player: first.player,
    draftWeekLabel: formatWeekLabel(weekKey),
  };
}
