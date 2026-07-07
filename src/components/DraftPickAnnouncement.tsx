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
      className="slot-pick-intro absolute inset-0 z-20 overflow-hidden rounded-xl"
      role="status"
      aria-live="assertive"
      aria-label={`Pick ${slot.slot}: ${player.name}`}
    >
      <div className="slot-pick-intro-accent-line absolute inset-x-0 top-0 z-30 h-px" aria-hidden />

      {player.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={player.photo}
          alt=""
          aria-hidden
          className="slot-pick-intro-photo absolute inset-0 h-full w-full object-cover object-[center_12%]"
        />
      ) : (
        <div
          aria-hidden
          className="slot-pick-intro-photo absolute inset-0 flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-950"
        >
          <span className="font-display text-6xl font-bold text-white/12 sm:text-7xl">{initials}</span>
        </div>
      )}

      <div className="slot-pick-intro-bg absolute inset-0 rounded-xl" aria-hidden />
      <div className="slot-pick-intro-veil absolute inset-0 rounded-xl" aria-hidden />
      <div className="slot-pick-intro-vignette absolute inset-0 rounded-xl" aria-hidden />
      <div className="slot-pick-intro-beam absolute inset-0 rounded-xl" aria-hidden />

      <span className="slot-pick-intro-corner slot-pick-intro-corner-tl" aria-hidden />
      <span className="slot-pick-intro-corner slot-pick-intro-corner-tr" aria-hidden />

      <div className="slot-pick-intro-fade-1 absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-2 p-2 sm:p-2.5">
        <div className="inline-flex items-center gap-1.5 rounded-md border border-accent/35 bg-black/55 px-2 py-1 shadow-[0_0_16px_-6px_rgba(0,229,160,0.45)] backdrop-blur-md">
          <span className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-accent sm:text-[10px]">
            Live
          </span>
        </div>
        <div className="rounded-md border border-white/10 bg-black/45 px-2 py-1 backdrop-blur-md">
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-300 sm:text-[10px]">
            Draft {year}
          </span>
        </div>
      </div>

      <div className="slot-pick-intro-fade-2 absolute inset-x-0 top-[22%] z-20 flex justify-center sm:top-[24%]">
        <div className="slot-pick-intro-pick-stage flex items-center gap-2 sm:gap-3">
          <span className="slot-pick-intro-pick-wing" aria-hidden />
          <div className="slot-pick-intro-medallion relative">
            <div className="slot-pick-intro-medallion-glow absolute inset-0 rounded-2xl" aria-hidden />
            <div className="slot-pick-intro-ring absolute inset-0 rounded-2xl" aria-hidden />
            <div className="slot-pick-intro-ring slot-pick-intro-ring-delay absolute inset-0 rounded-2xl" aria-hidden />
            <p className="relative text-[8px] font-bold uppercase tracking-[0.32em] text-accent sm:text-[9px]">
              The
            </p>
            <p className="slot-pick-intro-medallion-pick relative font-display text-[2.15rem] font-bold leading-none sm:text-[2.6rem]">
              {parts.pickOrdinal}
            </p>
            <p className="relative text-[8px] font-bold uppercase tracking-[0.36em] text-accent sm:text-[9px]">
              Pick
            </p>
          </div>
          <span className="slot-pick-intro-pick-wing slot-pick-intro-pick-wing-r" aria-hidden />
        </div>
      </div>

      <div className="slot-pick-intro-panel slot-pick-intro-fade-3 absolute inset-x-0 bottom-0 z-20 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-zinc-500 sm:text-[9px]">
          {parts.action}
        </p>
        <h3 className="mt-1 line-clamp-2 font-display text-sm font-bold uppercase leading-[1.06] tracking-tight text-white sm:text-base">
          {parts.player}
        </h3>
        <div className="mx-auto mt-1.5 inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
          <span className="text-[8px] font-bold uppercase tracking-wider text-accent sm:text-[9px]">
            from
          </span>
          <span className="truncate text-[9px] font-semibold uppercase tracking-wide text-zinc-200 sm:text-[10px]">
            {parts.from}
          </span>
        </div>

        <div className="slot-pick-intro-fade-6 mt-2.5 sm:mt-3">
          <div className="slot-pick-intro-progress-track h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="slot-pick-intro-progress-bar h-full rounded-full"
              style={{ animationDuration: `${durationMs}ms` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
