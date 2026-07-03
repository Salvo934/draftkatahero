import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-zinc-950/80 px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-xl font-bold tracking-tight text-white">
            DraftKataHero<span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Un prodotto{" "}
            <Link
              href="https://www.katahero.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-400 underline-offset-2 hover:text-accent hover:underline"
            >
              KataHero
            </Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-zinc-600 sm:text-right">
          © 2026 DraftKataHero · Drop ogni domenica alle 21:00
        </p>
      </div>
    </footer>
  );
}
