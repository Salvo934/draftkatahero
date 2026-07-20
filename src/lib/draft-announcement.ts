import type { PlayerProfile } from "@/data/players";
import type { DraftSlot } from "@/data/players";
import { DEFAULT_ANNOUNCEMENT_MS } from "@/lib/draft-config";

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
    pickOrdinal: getOrdinal(slot),
    action: "KataHero selects",
    player: player.name,
    from: getPlayerDraftFrom(player),
    year,
  };
}

export type ActivePickAnnouncement = {
  slot: DraftSlot;
  year: number;
};

/** Profilo voce commissioner (Adam Silver) — pick #3 */
export const PICK_VOICE_PROFILE = {
  voice: "en-US-EricNeural",
  rate: "-20%",
  pitch: "+5Hz",
} as const;

/** Pick #1 — highlight schiacciata ~5s */
export const PICK_1_HIGHLIGHTS_VOICE = {
  voice: "en-US-GuyNeural",
  rate: "+12%",
  pitch: "+3Hz",
  style: "highlights-dunk",
} as const;

/** Pick #2 — voce macchina IT neutra (né uomo né donna) */
export const PICK_2_VOICE = {
  voice: "it-IT-GiuseppeMultilingualNeural",
  rate: "-28%",
  pitch: "+0Hz",
  style: "machine-italian",
} as const;

/** Audio intro per pick */
export const PICK_ANNOUNCEMENT_AUDIO: Partial<Record<number, string>> = {
  1: "/audio/1pick.m4a",
  2: "/audio/2pick.m4a",
  3: "/audio/3pick.m4a",
};

/** Durata intro fissa (ms) — allineata a 14,6s per ogni pick */
export const PICK_INTRO_MS = 14_600;

/** Durata intro allineata ai file audio (ms) — lo slot compare a fine intro */
export const PICK_ANNOUNCEMENT_MS: Partial<Record<number, number>> = {
  1: 5_440,
  2: 8_654,
  3: PICK_INTRO_MS,
};

export function getPickAnnouncementMs(
  slot: number,
  fallback: number = DEFAULT_ANNOUNCEMENT_MS,
): number {
  return PICK_ANNOUNCEMENT_MS[slot] ?? fallback;
}

export function getPickAudioDownloads() {
  return Object.entries(PICK_ANNOUNCEMENT_AUDIO)
    .map(([slot, src]) => ({
      slot: Number(slot),
      src: src!,
      filename: `${slot}pick.m4a`,
    }))
    .sort((a, b) => a.slot - b.slot);
}
