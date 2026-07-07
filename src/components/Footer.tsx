import Link from "next/link";
import { LEGAL, LEGAL_LINKS } from "@/lib/legal";

export default function Footer() {
  return (
    <footer className="relative z-10 px-3 pb-5 pt-3 sm:px-5 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(0,229,160,0.06),transparent)]"
        aria-hidden
      />

      <div className="glass-panel relative mx-auto max-w-6xl overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="accent-line absolute inset-x-0 top-0 h-px opacity-80" />

        <div className="flex flex-col items-center gap-5 px-5 py-6 sm:flex-row sm:justify-between sm:px-8 sm:py-7">
          <div className="text-center sm:text-left">
            <Link href="/" className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
              DraftKataHero<span className="text-accent">.</span>
            </Link>
            <p className="mt-1 text-[11px] text-zinc-600">
              by{" "}
              <Link
                href={LEGAL.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition hover:text-accent"
              >
                KataHero
              </Link>
            </p>
          </div>

          <nav
            aria-label="Informazioni legali e pagamenti"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
          >
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium text-zinc-500 transition hover:text-accent sm:text-xs"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-1 border-t border-white/6 px-5 py-3.5 text-[10px] text-zinc-600 sm:flex-row sm:px-8 sm:text-[11px]">
          <p>© 2026 {LEGAL.controller}</p>
          <p className="font-medium uppercase tracking-[0.18em]">
            Drop <span className="text-accent">dom 21:00</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
