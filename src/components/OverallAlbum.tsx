"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { OverallAlbumEntry } from "@/data/players";
import { getPlayerCardImage, isPlayerCardLocked } from "@/data/players";
import { loadDraftBoardState } from "@/lib/draft-board";
import { buildOverallAlbum } from "@/lib/overall-album";
import AlbumAthleteGuide from "./AlbumAthleteGuide";
import CardRequestForm from "./CardRequestForm";
import PlayerCardReveal from "./PlayerCardReveal";

const ALBUM_TILTS = [-2.8, 1.6, -1.2, 2.2, -1.8, 1.1, -2.2, 0.8, -1.5, 2.5, -0.9, 1.9, -2.4, 1.3, -1.1];

function AlbumSectionHeader() {
  return (
    <div className="mb-10 max-w-xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
        Collezione ufficiale
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.45rem] md:leading-[1.14]">
        Album <span className="text-gradient-accent">Overall</span>
      </h2>
    </div>
  );
}

function EmptyAlbumSlot({ index }: { index: number }) {
  const tilt = ALBUM_TILTS[(index - 1) % ALBUM_TILTS.length];

  return (
    <div className="album-stage" aria-hidden={false}>
      <span className="album-wire album-wire-ghost" aria-hidden />
      <span className="album-slot-index album-slot-index-ghost">{index}</span>

      <div
        className="album-card-ghost"
        style={{ "--album-tilt": `${tilt * 0.6}deg` } as CSSProperties}
      >
        <span className="font-display text-2xl font-bold text-white/10">?</span>
      </div>

      <span className="album-floor-shadow album-floor-shadow-ghost" aria-hidden />
      <p className="album-slot-label">In arrivo</p>
    </div>
  );
}

function SuspendedOverallCard({
  entry,
  onOpen,
}: {
  entry: OverallAlbumEntry;
  onOpen: () => void;
}) {
  const player = entry.player!;
  const tilt = ALBUM_TILTS[(entry.index - 1) % ALBUM_TILTS.length];
  const floatDelay = (entry.index % 5) * 0.35;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className="album-stage album-stage-interactive group w-full border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      style={{ "--album-tilt": `${tilt}deg` } as CSSProperties}
      aria-label={`Apri overall card di ${player.name}`}
    >
      <span className="album-wire" aria-hidden />
      <span className="album-pin" aria-hidden />
      <span className="album-slot-index">{entry.index}</span>

      <div
        className="album-card-ghost album-card-filled"
        style={
          {
            "--album-tilt": `${tilt}deg`,
            animationDelay: `${floatDelay}s`,
          } as CSSProperties
        }
      >
        <img
          src={getPlayerCardImage(player)}
          alt=""
          className="album-card-img"
          decoding="async"
        />
      </div>

      <p className="album-player-name">{player.name}</p>
    </div>
  );
}

function AlbumCell({ entry }: { entry: OverallAlbumEntry }) {
  const [revealed, setRevealed] = useState(false);
  const player = entry.player;

  if (!player || !getPlayerCardImage(player)) {
    return <EmptyAlbumSlot index={entry.index} />;
  }

  const cardImage = getPlayerCardImage(player)!;

  return (
    <>
      <SuspendedOverallCard entry={entry} onOpen={() => setRevealed(true)} />
      {revealed && (
        <PlayerCardReveal
          name={player.name}
          image={cardImage}
          playerSlug={player.slug}
          locked={isPlayerCardLocked(player)}
          onClose={() => setRevealed(false)}
        />
      )}
    </>
  );
}

export default function OverallAlbum() {
  const [entries, setEntries] = useState<OverallAlbumEntry[]>(() =>
    buildOverallAlbum([], []),
  );
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      const board = loadDraftBoardState();
      setEntries(buildOverallAlbum(board.discoverSlots, board.pickedSlots));
    };

    sync();
    const id = setInterval(sync, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="pointer-events-none absolute inset-x-4 top-10 h-px bg-linear-to-r from-transparent via-white/10 to-transparent sm:inset-x-6 lg:inset-x-8" />

      <AlbumSectionHeader />

      <AlbumAthleteGuide onOpenForm={() => setFormOpen(true)} />
      <CardRequestForm open={formOpen} onClose={() => setFormOpen(false)} />

      <div className="album-gallery relative py-4 sm:py-6 md:py-8">
        <div className="album-gallery-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="album-gallery-grid pointer-events-none absolute inset-0 hidden opacity-40 sm:block" aria-hidden />

        <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-5 xl:gap-x-8 xl:gap-y-14">
          {entries.map((entry) => (
            <AlbumCell key={`album-${entry.index}-${entry.player?.slug ?? "empty"}`} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
