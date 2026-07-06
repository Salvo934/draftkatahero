import { SLOT_COUNT } from "@/lib/draft-config";

export default function Hero() {
  return (
    <section className="relative z-10 overflow-hidden px-4 pb-4 pt-[max(7rem,calc(5.5rem+env(safe-area-inset-top)))] sm:px-6 sm:pb-8 sm:pt-32 lg:px-8">
      {/* Ambient rings */}
      <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2">
        <div className="hero-ring h-56 w-56 rounded-full border border-accent/10 sm:h-72 sm:w-72" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 sm:h-52 sm:w-52" />
      </div>

      <div className="relative mx-auto max-w-6xl text-center">
        {/* Ticker */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/12 bg-black/45 py-2.5 shadow-inset-light backdrop-blur-md sm:rounded-full">
          <div className="ticker-track flex whitespace-nowrap">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="mx-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500 sm:text-[11px]"
              >
                DRAFTKATAHERO · {SLOT_COUNT} PICKS · OGNI DOMENICA · 21:00 ·
                <span className="text-accent"> ON THE CLOCK </span>·
                KATAHERO ·
              </span>
            ))}
          </div>
        </div>

        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/45 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-200 shadow-inset-light backdrop-blur-md sm:rounded-full sm:px-4 sm:py-1.5 sm:tracking-[0.22em]">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent shadow-accent-dot" />
          Weekly Draft · Season 2026
        </div>

        {/* Title */}
        <h1 className="font-display text-[clamp(2.25rem,9vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white text-shadow-hero">
          Il draft settimanale
          <br />
          <span className="text-gradient-accent">stile KataHero</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Clicca sulla card per aprire la player card dell&apos;atleta.
          Ogni domenica alle 21:00 le card si rivelano una alla volta — la pick #1 passa in
          Hall of Fame e si aprono {SLOT_COUNT} nuovi slot.
        </p>

        {/* Stats */}
        <div className="mx-auto mt-9 grid max-w-2xl grid-cols-3 gap-2.5 sm:gap-4">
          {[
            { value: String(SLOT_COUNT), label: "Slot", sub: "Giocatori" },
            { value: "DOM", label: "Drop", sub: "Ogni settimana" },
            { value: "21:00", label: "Live", sub: "Orario IT" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card relative overflow-hidden rounded-2xl px-3 py-4 sm:px-5 sm:py-5"
            >
              <div className="accent-line pointer-events-none absolute inset-x-0 top-0 h-px opacity-70" />
              <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-300 sm:text-[11px]">
                {stat.label}
              </p>
              <p className="mt-0.5 text-[10px] text-zinc-600">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#board"
            className="btn-accent inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold sm:w-auto sm:text-base"
          >
            Vai al Draft Board
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
