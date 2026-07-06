import type { PlayerProfile } from "@/data/players";
import type { DraftSlot } from "@/data/players";

const ORDINALS: Record<number, string> = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  21: "21st",
  22: "22nd",
  23: "23rd",
  31: "31st",
};

function getOrdinal(n: number): string {
  if (ORDINALS[n]) return ORDINALS[n];
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  if (mod10 === 1) return `${n}st`;
  if (mod10 === 2) return `${n}nd`;
  if (mod10 === 3) return `${n}rd`;
  return `${n}th`;
}

export function getDraftYearFromWeekKey(weekKey: string): number {
  return Number(weekKey.split("-")[0]);
}

export function getPlayerDraftFrom(player: PlayerProfile): string {
  return player.team || player.country;
}

export function formatPickAnnouncement(
  slot: number,
  player: PlayerProfile,
  year: number,
): string {
  const pick = getOrdinal(slot);
  const from = getPlayerDraftFrom(player);
  return `With the ${pick} pick in the ${year} KataHero Draft, KataHero selects ${player.name} from ${from}.`;
}

export function formatPickAnnouncementParts(
  slot: number,
  player: PlayerProfile,
  year: number,
) {
  return {
    lead: `With the ${getOrdinal(slot)} pick in the ${year} KataHero Draft,`,
    action: "KataHero selects",
    player: player.name,
    from: getPlayerDraftFrom(player),
  };
}

export type ActivePickAnnouncement = {
  slot: DraftSlot;
  year: number;
};

/** Audio intro per pick specifiche (es. 1pick.m4a per la #1) */
export const PICK_ANNOUNCEMENT_AUDIO: Partial<Record<number, string>> = {
  1: "/audio/1pick.m4a",
};
