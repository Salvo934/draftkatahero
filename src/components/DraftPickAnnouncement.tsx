"use client";

import { useEffect, useRef } from "react";
import type { ActivePickAnnouncement } from "@/lib/draft-announcement";
import {
  formatPickAnnouncementParts,
  getPickAnnouncementMs,
  PICK_ANNOUNCEMENT_AUDIO,
} from "@/lib/draft-announcement";

type DraftPickAnnouncementProps = {
  announcement: ActivePickAnnouncement;
  onComplete?: () => void;
};

export default function DraftPickAnnouncement({
  announcement,
  onComplete,
}: DraftPickAnnouncementProps) {
  const { slot, year } = announcement;
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    completedRef.current = false;
    let cancelled = false;

    const finish = () => {
      if (cancelled || completedRef.current) return;
      completedRef.current = true;
      onCompleteRef.current?.();
    };

    const src = PICK_ANNOUNCEMENT_AUDIO[slot.slot];
    if (!src) {
      const timer = setTimeout(finish, getPickAnnouncementMs(slot.slot));
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    const audio = new Audio(src);
    audio.addEventListener("ended", finish);
    audio.addEventListener("error", finish);
    void audio.play().catch(finish);

    return () => {
      cancelled = true;
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("ended", finish);
      audio.removeEventListener("error", finish);
    };
  }, [slot.slot, slot.player?.slug]);

  if (!slot.player) return null;

  const parts = formatPickAnnouncementParts(slot.slot, slot.player, year);

  return (
    <div
      className="slot-pick-intro absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl border border-accent/35 bg-black/92 p-3 text-center shadow-[0_0_32px_-8px_rgba(0,229,160,0.45)] backdrop-blur-sm"
      role="status"
      aria-live="assertive"
      aria-label={`Pick ${slot.slot}: ${slot.player.name}`}
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent sm:text-[10px]">
        On the clock
      </p>

      <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 sm:h-11 sm:w-11">
        <span className="font-display text-lg font-bold text-accent sm:text-xl">#{slot.slot}</span>
      </div>

      <p className="mt-3 line-clamp-3 text-[10px] leading-snug text-zinc-400 sm:text-[11px]">
        {parts.lead}
      </p>

      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px]">
        {parts.action}
      </p>

      <p className="mt-1 font-display text-sm font-bold leading-tight text-white sm:text-base">
        {parts.player}
      </p>

      <p className="mt-1 line-clamp-2 text-[10px] text-zinc-500 sm:text-[11px]">
        from {parts.from}
      </p>
    </div>
  );
}
