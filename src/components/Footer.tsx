import Link from "next/link";
import { LEGAL, LEGAL_LINKS } from "@/lib/legal";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-zinc-950/80 px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
          <div className="text-center lg:text-left">
            <p className="font-display text-xl font-bold tracking-tight text-white">
              DraftKataHero<span className="text-accent">.</span>
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Un prodotto{" "}
              <Link
                href={LEGAL.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-400 underline-offset-2 hover:text-accent hover:underline"
              >
                KataHero
              </Link>
            </p>
          </div>

          <nav
            aria-label="Informazioni legali"
            className="flex flex-col items-center gap-3 lg:items-end"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-end">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-medium text-zinc-500 underline-offset-2 transition hover:text-accent hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="max-w-md text-center text-[10px] leading-relaxed text-zinc-600 lg:text-right">
              Utilizzando questo sito accetti i{" "}
              <Link href="/termini" className="underline-offset-2 hover:text-zinc-400 hover:underline">
                Termini di utilizzo
              </Link>{" "}
              e l’{" "}
              <Link href="/privacy" className="underline-offset-2 hover:text-zinc-400 hover:underline">
                Informativa privacy
              </Link>
              . I dati locali sul dispositivo sono descritti nella{" "}
              <Link href="/cookie" className="underline-offset-2 hover:text-zinc-400 hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </nav>
        </div>

        <p className="mt-8 border-t border-white/6 pt-6 text-center text-[11px] text-zinc-600 lg:text-left">
          © 2026 DraftKataHero · Drop ogni domenica alle 21:00 · {LEGAL.controller}
        </p>
      </div>
    </footer>
  );
}
