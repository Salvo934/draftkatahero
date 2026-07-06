"use client";

import { useMemo, useRef, useState } from "react";
import type { DraftSlot } from "@/data/players";
import PlayerCard from "./PlayerCard";

type PickedCarouselProps = {
  slots: DraftSlot[];
};

function matchesQuery(slot: DraftSlot, query: string): boolean {
  if (!slot.player) return false;
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const { name, team, position, category, country } = slot.player;
  return [name, team, position, category, country, slot.draftWeekLabel].some((field) =>
    field?.toLowerCase().includes(q),
  );
}

export default function PickedCarousel({ slots }: PickedCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => slots.filter((slot) => matchesQuery(slot, query)),
    [slots, query],
  );

  function scrollBy(direction: "prev" | "next") {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.75;
    track.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-md">
          <span className="sr-only">Cerca in Hall of Fame</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca per nome, squadra, settimana…"
            className="w-full rounded-full border border-white/12 bg-black/50 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 backdrop-blur-sm transition focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </label>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-medium text-zinc-500">
            {filtered.length} di {slots.length}
          </span>
          <button
            type="button"
            onClick={() => scrollBy("prev")}
            aria-label="Scorri indietro"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-zinc-300 transition hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollBy("next")}
            aria-label="Scorri avanti"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-zinc-300 transition hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
          >
            ›
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 py-10 text-center">
          <p className="font-display text-base font-bold text-zinc-500">Nessun risultato</p>
          <p className="mt-1 text-sm text-zinc-600">Prova con un altro nome o settimana.</p>
        </div>
      ) : (
        <div className="carousel-wrap relative -mx-1">
          <div
            ref={trackRef}
            className="carousel-track flex gap-3 overflow-x-auto px-1 pb-2 sm:gap-4"
          >
            {filtered.map((draftSlot) => (
              <div key={`${draftSlot.slot}-${draftSlot.player?.slug}`} className="carousel-slide">
                <PlayerCard slot={draftSlot} />
                {draftSlot.draftWeekLabel && (
                  <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                    Pick #1 · {draftSlot.draftWeekLabel}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HallOfFameCta() {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 px-5 py-5 sm:px-6">
      <p className="font-display text-sm font-bold text-zinc-200">
        Vuoi la tua player card?
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        In Hall of Fame entra solo la prima scelta del draft settimanale. Se vuoi la tua
        scheda KataHero, scrivici su{" "}
        <a
          href="https://www.katahero.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          katahero.com
        </a>{" "}
        o su{" "}
        <a
          href="https://www.instagram.com/katahero"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          Instagram
        </a>{" "}
        — te la invieremo noi.
      </p>
    </div>
  );
}

export { HallOfFameCta };
