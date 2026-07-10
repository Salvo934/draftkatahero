"use client";

import Link from "next/link";

const STEPS = [
  {
    n: "1",
    title: "Richiedi la tua card",
    text: "Scegli Card Overall (€4,99) o Card + Player Page (€9,99) e compila il form con i dati atleta.",
  },
  {
    n: "2",
    title: "Ricevi il giorno di uscita",
    text: "Ti contattiamo con la data in cui la tua card comparirà nell'album DraftKataHero.",
  },
  {
    n: "3",
    title: "Acquista dall'album",
    text: "Quando la card è live, acquistala direttamente dallo slot nel tuo album.",
  },
  {
    n: "4",
    title: "Finestra 24 ore",
    text: "Hai fino alle 12:00 del giorno successivo all'uscita per completare l'acquisto.",
  },
  {
    n: "5",
    title: "Ricevi la card",
    text: "Dopo il pagamento ti arriva un messaggio con la card selezionata in HD.",
  },
] as const;

type AlbumAthleteGuideProps = {
  onOpenForm: () => void;
};

export default function AlbumAthleteGuide({ onOpenForm }: AlbumAthleteGuideProps) {
  return (
    <section className="album-guide mb-10">
      <div className="album-guide__panel glass-panel rounded-2xl p-5 sm:p-6 lg:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          Per gli atleti
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Come funziona la tua <span className="text-gradient-accent">Overall</span>
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Richiedi la tua card con Overall oppure card + player page. Ti avvisiamo il giorno in cui
          uscirà nell&apos;album: potrai acquistarla direttamente da qui. Dopo il pagamento ricevi la
          card scelta via messaggio.{" "}
          <strong className="font-semibold text-zinc-200">
            Hai fino alle 12:00 del giorno successivo
          </strong>{" "}
          per acquistare — poi lo slot svanisce e potrai richiederla su{" "}
          <a
            href="https://www.katahero.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            katahero.com
          </a>{" "}
          con un supplemento sul prezzo.
        </p>

        <ol className="album-guide__steps mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step) => (
            <li key={step.n} className="album-guide__step rounded-xl border border-white/8 bg-white/3 p-3.5">
              <span className="album-guide__step-n">{step.n}</span>
              <p className="mt-2 text-sm font-semibold text-white">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="album-guide__packages mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3.5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">Solo card</p>
            <p className="mt-1 font-display text-lg font-bold text-white">Card Overall · €4,99</p>
            <p className="mt-1 text-xs text-zinc-500">PNG HD scaricabile — nessuna player page.</p>
          </div>
          <div className="rounded-xl border border-accent/25 bg-accent/6 px-4 py-3.5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Card + page</p>
            <p className="mt-1 font-display text-lg font-bold text-white">Overall + Page · €9,99</p>
            <p className="mt-1 text-xs text-zinc-500">
              Card + profilo base. Sezioni extra (gallery, highlights…) a €9,99 cad.{" "}
              <Link href="/negozio" className="text-accent hover:underline">
                Vedi negozio
              </Link>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenForm}
          className="btn-accent mt-6 inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
        >
          Richiedi la tua card →
        </button>
      </div>
    </section>
  );
}
