"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DraftBoardState } from "@/lib/draft-board";
import { loadDraftBoardState } from "@/lib/draft-board";
import { SLOT_COUNT } from "@/lib/draft-config";
import { createSimulationRuntime, type DropRuntime } from "@/lib/drop-runtime";
import {
  applyDropReveal,
  getActivePickAnnouncement,
  getDropPhase,
  getSecondsUntilNextReveal,
} from "@/lib/drop-reveal";
import { buildSimulationSlots, SIMULATION_PICK_COUNT } from "@/lib/draft-simulation";
import DraftPickAnnouncement from "./DraftPickAnnouncement";
import PlayerCard from "./PlayerCard";
import PickedCarousel, { HallOfFameCta } from "./PickedCarousel";

type SimulationState = {
  slots: ReturnType<typeof buildSimulationSlots>;
  runtime: DropRuntime;
};

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
  const [simulation, setSimulation] = useState<SimulationState | null>(null);

  useEffect(() => {
    setBoard(loadDraftBoardState());

    const syncBoard = () => setBoard(loadDraftBoardState());
    const boardId = setInterval(syncBoard, 60_000);

    return () => {
      clearInterval(boardId);
    };
  }, []);

  useEffect(() => {
    const ms = simulation ? 250 : 1000;
    const clockId = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(clockId);
  }, [simulation]);

  const startSimulation = useCallback(() => {
    const start = new Date();
    setSimulation({
      slots: buildSimulationSlots(),
      runtime: createSimulationRuntime(start),
    });
    setNow(start);
    document.getElementById("board")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const stopSimulation = useCallback(() => {
    setSimulation(null);
  }, []);

  const sourceSlots = simulation?.slots ?? board?.discoverSlots ?? [];
  const dropRuntime = simulation?.runtime;
  const weekKey = board?.weekKey ?? "";
  const isSimulating = Boolean(simulation);

  const filledCount = sourceSlots.filter((s) => s.player).length;
  const displaySlots = useMemo(
    () =>
      board || simulation
        ? applyDropReveal(sourceSlots, now, weekKey, dropRuntime)
        : [],
    [board, simulation, sourceSlots, now, weekKey, dropRuntime],
  );
  const visibleCount = displaySlots.filter((s) => s.player).length;
  const dropPhase =
    board || simulation ? getDropPhase(now, weekKey, sourceSlots, dropRuntime) : "pre";
  const activeAnnouncement =
    board || simulation
      ? getActivePickAnnouncement(now, weekKey, sourceSlots, dropRuntime)
      : null;
  const nextRevealIn =
    board || simulation
      ? getSecondsUntilNextReveal(now, weekKey, sourceSlots, visibleCount, dropRuntime)
      : null;
  const pickedCount = board?.pickedSlots.length ?? 0;

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      {activeAnnouncement && <DraftPickAnnouncement announcement={activeAnnouncement} />}
      <section id="board" className="scroll-mt-28">
        <div className="pointer-events-none absolute inset-x-4 top-10 h-px bg-linear-to-r from-transparent via-white/10 to-transparent sm:inset-x-6 lg:inset-x-8" />

        <SectionHeader
          eyebrow={isSimulating ? "Simulazione live" : "Prossima domenica"}
          title="Da scoprire ·"
          highlight={`${SLOT_COUNT} slot`}
          description={
            <>
              Clicca sulla card per aprire la player card KataHero.
              {board && (
                <span className="ml-1 font-semibold text-zinc-300" suppressHydrationWarning>
                  {isSimulating ? (
                    <>
                      {" "}
                      · Simulazione drop: {visibleCount}/{filledCount} pick
                      {dropPhase === "revealing" && nextRevealIn !== null && nextRevealIn > 0 && (
                        <> · prossimo tra {nextRevealIn}s</>
                      )}
                      {dropPhase === "post" && <> · simulazione completata</>}
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </span>
              )}
            </>
          }
        />

        <div className="mb-8 flex flex-wrap items-center gap-3">
          {!isSimulating ? (
            <button
              type="button"
              onClick={startSimulation}
              className="btn-accent inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Simula drop ({SIMULATION_PICK_COUNT} pick)
            </button>
          ) : (
            <button
              type="button"
              onClick={stopSimulation}
              className="btn-ghost inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
            >
              Esci simulazione
            </button>
          )}
          {isSimulating && (
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Simulazione attiva
            </span>
          )}
        </div>

        {!board ? <BoardSkeleton /> : <DiscoverGrid slots={displaySlots} />}
      </section>

      <section id="rivelate" className="mt-16 scroll-mt-28 border-t border-white/8 pt-10">
        <SectionHeader
          eyebrow="Archivio permanente"
          title="Hall of Fame"
          description={
            <>
              Solo la pick #1 di ogni draft settimanale resta qui per sempre — le prime scelte
              della storia DraftKataHero.
              {pickedCount > 0 && (
                <span className="ml-1 font-semibold text-zinc-300">
                  {pickedCount} pick #1 in archivio.
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
          <>
            <PickedCarousel slots={board.pickedSlots} />
            <HallOfFameCta />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 py-16 text-center">
            <p className="font-display text-lg font-bold text-zinc-500">Hall of Fame vuota</p>
            <p className="mt-2 max-w-sm text-sm text-zinc-600">
              Dopo ogni domenica, la pick #1 del draft entra qui per sempre.
            </p>
            <div className="mt-6 w-full max-w-lg">
              <HallOfFameCta />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
