"use client";

import { useRef, useState } from "react";
import type { DraftSlot, PlayerProfile } from "@/data/players";
import {
  getPlayerCardImage,
  getPlayerCardUrl,
  isPlayerCardLocked,
} from "@/data/players";
import PlayerCardReveal from "./PlayerCardReveal";

type PlayerCardProps = {
  slot: DraftSlot;
};

function EmptySlot({ slot }: { slot: number }) {
  return (
    <article className="relative flex aspect-3/4 flex-col overflow-hidden rounded-xl border border-white/10 bg-linear-to-b from-zinc-900/80 via-zinc-950/95 to-black shadow-inset-subtle">
      <div className="accent-line absolute inset-x-0 top-0 h-px opacity-40" />
      <div className="relative flex flex-1 flex-col items-center justify-center gap-4 p-4">
        <div className="relative flex h-18 w-18 items-center justify-center rounded-xl border border-dashed border-accent/25 bg-black/40 sm:h-20 sm:w-20">
          <span className="font-display text-3xl font-bold text-accent/40">{slot}</span>
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Slot in attesa
        </p>
      </div>
      <div className="border-t border-white/8 bg-black/50 px-3 py-2.5 text-center">
        <span className="font-display text-sm font-bold tracking-wide text-zinc-500">#{slot}</span>
      </div>
    </article>
  );
}

function MiniCard({ slot, player }: { slot: number; player: PlayerProfile }) {
  const [revealed, setRevealed] = useState(false);
  const ignoreClickUntil = useRef(0);
  const cardImage = getPlayerCardImage(player);
  const externalUrl = getPlayerCardUrl(player);
  const cardLocked = isPlayerCardLocked(player);
  const isClickable = Boolean(cardImage || externalUrl);

  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleClick() {
    if (Date.now() < ignoreClickUntil.current) return;
    if (cardImage) {
      setRevealed(true);
      return;
    }
    if (externalUrl) {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
    }
  }

  function handleCloseReveal() {
    ignoreClickUntil.current = Date.now() + 600;
    window.setTimeout(() => setRevealed(false), 0);
  }

  const card = (
    <article
      className={`group relative flex aspect-3/4 flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-card ring-1 ring-white/5 transition duration-300 ${
        isClickable
          ? "cursor-pointer hover:-translate-y-1 hover:border-accent/25 hover:shadow-card-hover"
          : ""
      }`}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className="accent-line absolute inset-x-0 top-0 z-20 h-px opacity-80" />

      <div className="relative flex-1 overflow-hidden bg-zinc-900">
        {player.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={player.photo}
            alt={player.name}
            className="h-full w-full object-cover object-[center_15%] transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-950">
            <span className="font-display text-5xl font-bold text-white/90">{initials}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3 z-10 flex h-8 min-w-8 items-center justify-center rounded-lg bg-accent px-2 shadow-accent-badge">
          <span className="font-display text-sm font-bold leading-none text-black">#{slot}</span>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/8 bg-black/80 px-3 py-3 backdrop-blur-sm">
        <h3 className="line-clamp-2 text-center font-display text-sm font-bold uppercase leading-tight tracking-tight text-white transition group-hover:text-accent sm:text-base">
          {player.name}
        </h3>
      </div>
    </article>
  );

  return (
    <>
      {card}
      {revealed && cardImage && (
        <PlayerCardReveal
          name={player.name}
          image={cardImage}
          playerSlug={player.slug}
          locked={cardLocked}
          onClose={handleCloseReveal}
        />
      )}
    </>
  );
}

export default function PlayerCard({ slot: draftSlot }: PlayerCardProps) {
  if (!draftSlot.player) {
    return <EmptySlot slot={draftSlot.slot} />;
  }
  return <MiniCard slot={draftSlot.slot} player={draftSlot.player} />;
}
