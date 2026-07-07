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
  const player = slot.player;

  useEffect(() => {
    if (!player) return;

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
  }, [durationMs, player, slot.slot]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    if (!mq.matches) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!player) return null;

  const parts = formatPickAnnouncementParts(slot.slot, player, year);
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="slot-pick-intro absolute inset-0 z-20 overflow-hidden rounded-xl max-sm:fixed max-sm:inset-0 max-sm:z-9998 max-sm:rounded-none"
      role="status"
      aria-live="assertive"
      aria-label={`Pick ${slot.slot}: ${player.name}`}
    >
      <div className="slot-pick-intro-bg absolute inset-0 rounded-xl max-sm:rounded-none" aria-hidden />

      {player.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={player.photo}
          alt=""
          aria-hidden
          className="slot-pick-intro-photo absolute inset-0 h-full w-full object-cover object-[center_15%] max-sm:object-[center_20%]"
        />
      ) : (
        <div
          aria-hidden
          className="slot-pick-intro-photo absolute inset-0 flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-950"
        >
          <span className="font-display text-6xl font-bold text-white/15 max-sm:text-8xl">
            {initials}
          </span>
        </div>
      )}

      <div className="slot-pick-intro-vignette absolute inset-0 rounded-xl max-sm:rounded-none" aria-hidden />
      <div className="slot-pick-intro-grid absolute inset-0 rounded-xl opacity-30 max-sm:hidden" aria-hidden />

      <span className="slot-pick-intro-corner slot-pick-intro-corner-tl" aria-hidden />
      <span className="slot-pick-intro-corner slot-pick-intro-corner-tr" aria-hidden />
      <span className="slot-pick-intro-corner slot-pick-intro-corner-bl" aria-hidden />
      <span className="slot-pick-intro-corner slot-pick-intro-corner-br" aria-hidden />

      <div className="relative flex h-full flex-col justify-between p-2.5 sm:p-3.5 max-sm:justify-end max-sm:px-5 max-sm:pb-[max(1.25rem,env(safe-area-inset-bottom))] max-sm:pt-[max(3.5rem,env(safe-area-inset-top))]">
        <div className="slot-pick-intro-fade-1 flex items-center justify-between gap-2 max-sm:absolute max-sm:left-5 max-sm:right-5 max-sm:top-[max(1rem,env(safe-area-inset-top))] max-sm:justify-start">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-black/45 px-2.5 py-1 backdrop-blur-sm">
            <span className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-accent max-sm:text-[10px] max-sm:tracking-[0.18em]">
              Live
            </span>
          </div>
          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-zinc-500 max-sm:hidden sm:text-[9px]">
            Draft · {year}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-0.5 py-1 text-center max-sm:flex-none max-sm:items-start max-sm:gap-3 max-sm:py-0 max-sm:text-left">
          <p className="slot-pick-intro-fade-1 text-[8px] font-semibold uppercase tracking-[0.28em] text-zinc-500 max-sm:text-[10px] sm:text-[9px]">
            On the clock
          </p>

          <div className="slot-pick-intro-fade-2 relative mt-2 flex h-12 w-12 flex-col items-center justify-center max-sm:mt-2 max-sm:h-auto max-sm:w-auto max-sm:items-start sm:mt-3 sm:h-16 sm:w-16">
            <div className="slot-pick-intro-ring absolute inset-0 hidden rounded-full sm:block" aria-hidden />
            <div className="relative flex h-12 w-12 flex-col items-center justify-center rounded-full border border-accent/40 bg-black/55 shadow-[0_0_24px_-6px_rgba(0,229,160,0.5)] max-sm:hidden sm:h-16 sm:w-16">
              <span className="font-display text-[9px] font-bold uppercase leading-none tracking-widest text-accent/80 sm:text-[10px]">
                Pick
              </span>
              <span className="font-display text-lg font-bold leading-none text-white sm:text-2xl">
                #{slot.slot}
              </span>
            </div>
            <div className="hidden max-sm:inline-flex max-sm:items-baseline max-sm:gap-2">
              <span className="font-display text-sm font-bold uppercase tracking-[0.12em] text-accent">
                Pick
              </span>
              <span className="font-display text-4xl font-bold leading-none text-white">
                #{slot.slot}
              </span>
            </div>
          </div>

          <div className="w-full max-sm:border-t max-sm:border-white/10 max-sm:pt-3">
            <p className="slot-pick-intro-fade-3 mt-2.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-zinc-500 max-sm:mt-0 max-sm:text-[10px] max-sm:tracking-[0.24em] sm:mt-4 sm:text-[10px]">
              {parts.action}
            </p>

            <h3 className="slot-pick-intro-fade-4 mt-1 line-clamp-2 font-display text-sm font-bold uppercase leading-tight tracking-tight text-white max-sm:line-clamp-none max-sm:text-2xl max-sm:leading-[1.05] sm:text-lg">
              {parts.player}
            </h3>

            <p className="slot-pick-intro-fade-5 mt-1 line-clamp-1 text-[8px] font-medium uppercase tracking-[0.12em] text-zinc-300 max-sm:mt-2 max-sm:text-sm sm:text-[10px]">
              <span className="text-accent">from</span> {parts.from}
            </p>
          </div>
        </div>

        <div className="slot-pick-intro-fade-6 max-sm:mt-4 max-sm:w-full">
          <div className="mb-1 flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.16em] text-zinc-600 max-sm:text-[10px] max-sm:tracking-[0.14em]">
            <span className="max-sm:hidden">Commissioner call</span>
            <span className="hidden max-sm:inline">Annuncio in corso</span>
            <span>{Math.round(durationMs / 1000)}s</span>
          </div>
          <div className="slot-pick-intro-progress-track h-0.5 overflow-hidden rounded-full bg-white/8 max-sm:h-1">
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
