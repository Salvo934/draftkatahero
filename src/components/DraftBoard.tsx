"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { DraftBoardState } from "@/lib/draft-board";
import { loadDraftBoardState } from "@/lib/draft-board";
import { SLOT_COUNT } from "@/lib/draft-config";
import {
  applyDropReveal,
  getDropPhase,
  getSecondsUntilNextReveal,
} from "@/lib/drop-reveal";
import PlayerCard from "./PlayerCard";
import PickedCarousel from "./PickedCarousel";

function DiscoverGrid({ slots }: { slots: DraftBoardState["discoverSlots"] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:gap-5">
      {slots.map((draftSlot) => (
        <div
          key={`${draftSlot.slot}-${draftSlot.player?.slug ?? "empty"}`}
          className={draftSlot.player ? "slot-drop-reveal" : undefined}
        >
          <PlayerCard slot={draftSlot} />
        </div>
      ))}
    </div>
  );
}

function BoardSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:gap-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="aspect-3/4 animate-pulse rounded-xl border border-white/5 bg-zinc-900/60"
        />
      ))}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: ReactNode;
}) {
  return (
    <div className="mb-10 max-w-xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.45rem] md:leading-[1.14]">
        {title}{" "}
        {highlight && <span className="text-gradient-accent">{highlight}</span>}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">{description}</p>
    </div>
  );
}

export default function DraftBoard() {
  const [board, setBoard] = useState<DraftBoardState | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setBoard(loadDraftBoardState());

    const syncBoard = () => setBoard(loadDraftBoardState());
    const boardId = setInterval(syncBoard, 60_000);
    const clockId = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearInterval(boardId);
      clearInterval(clockId);
    };
  }, []);

  const filledCount = board?.discoverSlots.filter((s) => s.player).length ?? 0;
  const displaySlots = useMemo(
    () => (board ? applyDropReveal(board.discoverSlots, now, board.weekKey) : []),
    [board, now],
  );
  const visibleCount = displaySlots.filter((s) => s.player).length;
  const dropPhase = board ? getDropPhase(now, board.weekKey, filledCount) : "pre";
  const nextRevealIn = board
    ? getSecondsUntilNextReveal(now, board.weekKey, filledCount, visibleCount)
    : null;
  const pickedCount = board?.pickedSlots.length ?? 0;

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <section id="board" className="scroll-mt-28">
        <div className="pointer-events-none absolute inset-x-4 top-10 h-px bg-linear-to-r from-transparent via-white/10 to-transparent sm:inset-x-6 lg:inset-x-8" />

        <SectionHeader
          eyebrow="Prossima domenica"
          title="Da scoprire ·"
          highlight={`${SLOT_COUNT} slot`}
          description={
            <>
              Clicca sulla card per aprire la player card KataHero.
              {board && (
                <span className="ml-1 font-semibold text-zinc-300" suppressHydrationWarning>
                  Drop del {board.weekLabel}.
                  {dropPhase === "pre" && filledCount > 0 && (
                    <> · {filledCount} talent{filledCount === 1 ? "o" : "i"} in arrivo domenica ore 21:00.</>
                  )}
                  {dropPhase === "revealing" && (
                    <>
                      {" "}
                      · Drop live: {visibleCount}/{filledCount} rivelat
                      {visibleCount === 1 ? "o" : "i"}
                      {nextRevealIn !== null && nextRevealIn > 0 && (
                        <> · prossimo tra {nextRevealIn}s</>
                      )}
                    </>
                  )}
                  {dropPhase === "post" && visibleCount > 0 && (
                    <> · {visibleCount} scopert{visibleCount === 1 ? "o" : "i"}.</>
                  )}
                </span>
              )}
            </>
          }
        />

        {!board ? <BoardSkeleton /> : <DiscoverGrid slots={displaySlots} />}
      </section>

      <section id="rivelate" className="mt-16 scroll-mt-28 border-t border-white/8 pt-10">
        <SectionHeader
          eyebrow="Archivio permanente"
          title="Rivelate"
          description={
            <>
              Scorri il carosello o cerca per nome — i talenti restano qui per sempre.
              {pickedCount > 0 && (
                <span className="ml-1 font-semibold text-zinc-300">
                  {pickedCount} talent{pickedCount === 1 ? "o" : "i"} in archivio.
                </span>
              )}
            </>
          }
        />

        {!board ? (
          <div className="carousel-track flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="carousel-slide aspect-3/4 animate-pulse rounded-xl border border-white/5 bg-zinc-900/60"
              />
            ))}
          </div>
        ) : pickedCount > 0 ? (
          <PickedCarousel slots={board.pickedSlots} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 py-16 text-center">
            <p className="font-display text-lg font-bold text-zinc-500">Nessun talento rivelato</p>
            <p className="mt-2 max-w-sm text-sm text-zinc-600">
              Al termine della prima domenica, i giocatori scoperti compariranno qui.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
