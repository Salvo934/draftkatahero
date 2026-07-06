"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ActivePickAnnouncement } from "@/lib/draft-announcement";
import {
  formatPickAnnouncementParts,
  PICK_ANNOUNCEMENT_AUDIO,
} from "@/lib/draft-announcement";

type DraftPickAnnouncementProps = {
  announcement: ActivePickAnnouncement;
};

export default function DraftPickAnnouncement({ announcement }: DraftPickAnnouncementProps) {
  const { slot, year } = announcement;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const src = PICK_ANNOUNCEMENT_AUDIO[slot.slot];
    if (!src) return;

    const audio = new Audio(src);
    audioRef.current = audio;
    void audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [slot.slot, slot.player?.slug]);

  if (!slot.player) return null;

  const parts = formatPickAnnouncementParts(slot.slot, slot.player, year);

  return createPortal(
    <div
      className="fixed inset-0 z-9998 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
      role="status"
      aria-live="assertive"
      aria-label={`Pick ${slot.slot}: ${slot.player.name}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,160,0.12)_0%,transparent_65%)]" />

      <div className="relative w-full max-w-3xl animate-[popup-in_0.45s_ease-out] text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent sm:text-xs">
          On the clock
        </p>

        <p className="mt-6 font-display text-lg font-semibold leading-relaxed text-zinc-300 sm:text-2xl md:text-[1.65rem]">
          {parts.lead}
        </p>

        <p className="mt-8 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          {parts.action}{" "}
          <span className="text-gradient-accent">{parts.player}</span>
        </p>

        <p className="mt-5 text-base font-medium text-zinc-400 sm:text-xl">
          from <span className="font-semibold text-zinc-200">{parts.from}</span>
        </p>

        <div className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
          <span className="font-display text-2xl font-bold text-accent">#{slot.slot}</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
