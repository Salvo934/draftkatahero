import { getAllSlots, getPublishedSlots } from "@/data/players";
import PlayerCard from "./PlayerCard";

export default function DraftGrid() {
  const allSlots = getAllSlots();
  const publishedCount = getPublishedSlots().length;

  return (
    <section
      id="board"
      className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-4 pb-24 pt-10 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="mb-10 max-w-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          Draft Board
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.45rem] md:leading-[1.14]">
          40 slot ·{" "}
          <span className="text-gradient-accent">40 talenti</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
          Clicca sul nome del giocatore per aprire la player card completa.
          {publishedCount > 0 && (
            <span className="ml-1 font-semibold text-zinc-300">
              {publishedCount} profil{publishedCount === 1 ? "o" : "i"} già online.
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
        {allSlots.map((draftSlot, index) => (
          <div
            key={draftSlot.slot}
            className="slot-animate"
            style={{ animationDelay: `${index * 35}ms` }}
          >
            <PlayerCard slot={draftSlot} />
          </div>
        ))}
      </div>
    </section>
  );
}
