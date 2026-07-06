import Link from "next/link";

export default function SiteHeader() {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
      <div className="glass-panel mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:rounded-full sm:px-5">
        <Link
          href="https://www.katahero.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative font-display text-lg font-bold tracking-tight text-white sm:text-xl"
        >
          DraftKataHero
          <span className="text-accent">.</span>
          <span
            className="absolute -inset-x-1 -bottom-0.5 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent opacity-0 transition group-hover:opacity-100"
            aria-hidden
          />
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-1 md:flex"
          aria-label="Principale"
        >
          <a
            href="#board"
            className="rounded-full px-3.5 py-2 text-[13px] font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white lg:px-4"
          >
            Da scoprire
          </a>
          <a
            href="#rivelate"
            className="rounded-full px-3.5 py-2 text-[13px] font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white lg:px-4"
          >
            Hall of Fame
          </a>
          <a
            href="#cosa-riceverai"
            className="rounded-full px-3.5 py-2 text-[13px] font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white lg:px-4"
          >
            Cosa ricevi
          </a>
        </nav>

        <a
          href="https://www.katahero.com/#contatti"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold md:inline-flex"
        >
          KataHero
          <span aria-hidden className="text-base leading-none">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
