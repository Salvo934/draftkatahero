"use client";

import { useEffect, useRef } from "react";
import type { ActivePickAnnouncement } from "@/lib/draft-announcement";
import {
  formatPickAnnouncementParts,
  getPickAnnouncementMs,
  PICK_ANNOUNCEMENT_AUDIO,
} from "@/lib/draft-announcement";
import { playPickAudio } from "@/lib/pick-audio";

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

  const durationMs = getPickAnnouncementMs(slot.slot);

  useEffect(() => {
    completedRef.current = false;
    let cancelled = false;

    const finish = () => {
      if (cancelled || completedRef.current) return;
      completedRef.current = true;
      onCompleteRef.current?.();
    };

    const src = PICK_ANNOUNCEMENT_AUDIO[slot.slot];
    let audio: HTMLAudioElement | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const finishOnce = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (audio) {
        audio.removeEventListener("ended", finishOnce);
        audio.removeEventListener("error", finishOnce);
      }
      finish();
    };

    timer = setTimeout(finishOnce, durationMs);

    if (src) {
      audio = playPickAudio(src);
      audio.addEventListener("ended", finishOnce);
      audio.addEventListener("error", finishOnce);
    }

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (audio) {
        audio.removeEventListener("ended", finishOnce);
        audio.removeEventListener("error", finishOnce);
      }
    };
  }, [durationMs, slot.slot, slot.player?.slug]);

  if (!slot.player) return null;

  const parts = formatPickAnnouncementParts(slot.slot, slot.player, year);
  const initials = slot.player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="slot-pick-intro absolute inset-0 z-20 overflow-hidden rounded-xl"
      role="status"
      aria-live="assertive"
      aria-label={`Pick ${slot.slot}: ${slot.player.name}`}
    >
      <div className="slot-pick-intro-bg absolute inset-0 rounded-xl" aria-hidden />

      {slot.player.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slot.player.photo}
          alt=""
          aria-hidden
          className="slot-pick-intro-photo absolute inset-0 h-full w-full object-cover object-[center_15%]"
        />
      ) : (
        <div
          aria-hidden
          className="slot-pick-intro-photo absolute inset-0 flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-950"
        >
          <span className="font-display text-6xl font-bold text-white/15">{initials}</span>
        </div>
      )}

      <div className="slot-pick-intro-vignette absolute inset-0 rounded-xl" aria-hidden />
      <div className="slot-pick-intro-grid absolute inset-0 rounded-xl opacity-30" aria-hidden />

      <span className="slot-pick-intro-corner slot-pick-intro-corner-tl" aria-hidden />
      <span className="slot-pick-intro-corner slot-pick-intro-corner-tr" aria-hidden />
      <span className="slot-pick-intro-corner slot-pick-intro-corner-bl" aria-hidden />
      <span className="slot-pick-intro-corner slot-pick-intro-corner-br" aria-hidden />

      <div className="relative flex h-full flex-col justify-between p-3 sm:p-3.5">
        <div className="slot-pick-intro-fade-1 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-accent sm:text-[9px]">
              Live
            </span>
          </div>
          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-zinc-500 sm:text-[9px]">
            KataHero Draft · {year}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-1 py-2 text-center">
          <p className="slot-pick-intro-fade-1 text-[8px] font-semibold uppercase tracking-[0.32em] text-zinc-500 sm:text-[9px]">
            On the clock
          </p>

          <div className="slot-pick-intro-fade-2 relative mt-3 flex flex-col items-center">
            <div className="slot-pick-intro-ring absolute inset-0 rounded-full" aria-hidden />
            <div className="relative flex h-14 w-14 flex-col items-center justify-center rounded-full border border-accent/40 bg-black/50 shadow-[0_0_28px_-6px_rgba(0,229,160,0.55)] sm:h-16 sm:w-16">
              <span className="font-display text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-accent/80">
                Pick
              </span>
              <span className="font-display text-xl font-bold leading-none text-white sm:text-2xl">
                #{slot.slot}
              </span>
            </div>
          </div>

          <p className="slot-pick-intro-fade-3 mt-4 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500 sm:text-[10px]">
            {parts.action}
          </p>

          <h3 className="slot-pick-intro-fade-4 mt-1.5 font-display text-base font-bold uppercase leading-tight tracking-tight text-white sm:text-lg">
            {parts.player}
          </h3>

          <p className="slot-pick-intro-fade-5 mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-300 sm:text-[10px]">
            <span className="text-accent">from</span>
            {parts.from}
          </p>
        </div>

        <div className="slot-pick-intro-fade-6">
          <div className="mb-1 flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.16em] text-zinc-600">
            <span>Commissioner call</span>
            <span>{Math.round(durationMs / 1000)}s</span>
          </div>
          <div className="slot-pick-intro-progress-track h-0.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="slot-pick-intro-progress-bar h-full rounded-full bg-accent"
              style={{ animationDuration: `${durationMs}ms` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
