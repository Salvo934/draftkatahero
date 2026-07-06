"use client";

import { useRef, useState } from "react";
import { demoShowcase, KATAHERO_PURCHASE_URL, KATAHERO_SECTION_PRICE } from "@/lib/katahero-pricing";

export default function WhatYouGetSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoMissing, setVideoMissing] = useState(false);

  return (
    <section
      id="cosa-riceverai"
      className="relative z-10 scroll-mt-28 border-t border-white/8 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-accent/25 to-transparent sm:inset-x-6 lg:inset-x-8" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            Dopo il draft…
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.45rem] md:leading-[1.14]">
            Scopri cosa{" "}
            <span className="text-gradient-accent">riceverai</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Sei stato scelto nel draft? Ecco cosa ti aspetta su KataHero — la player card e la
            pagina hero del tuo profilo professionale.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Player card */}
          <div className="flex flex-col">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              01 · Player card
            </p>
            <div className="glass-card relative flex flex-1 flex-col overflow-hidden rounded-2xl p-3 sm:p-4">
              <div className="accent-line absolute inset-x-0 top-0 h-px opacity-70" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={demoShowcase.cardImage}
                alt={`Player card — ${demoShowcase.name}`}
                className="w-full rounded-xl object-contain shadow-card ring-1 ring-white/10"
              />
              <p className="mt-4 text-center text-sm text-zinc-400">
                Scheda grafica pronta per social, scouting e presentazioni — come quella di{" "}
                <span className="font-semibold text-zinc-200">{demoShowcase.name}</span>.
              </p>
            </div>
          </div>

          {/* Hero video */}
          <div className="flex flex-col">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              02 · Pagina hero
            </p>
            <div className="glass-card relative flex flex-1 flex-col overflow-hidden rounded-2xl p-3 sm:p-4">
              <div className="accent-line absolute inset-x-0 top-0 h-px opacity-70" />
              <div className="relative overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
                {!videoMissing ? (
                  <video
                    ref={videoRef}
                    className="aspect-9/16 max-h-[min(70vh,520px)] w-full object-cover sm:aspect-video sm:max-h-none sm:object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    poster={demoShowcase.cardImage}
                    onError={() => setVideoMissing(true)}
                  >
                    <source src={demoShowcase.heroVideo} type="video/mp4" />
                  </video>
                ) : (
                  <div className="flex aspect-9/16 flex-col items-center justify-center gap-4 bg-linear-to-b from-zinc-950 to-black px-6 py-12 text-center sm:aspect-video">
                    <p className="text-sm text-zinc-400">
                      Anteprima video hero in arrivo. Nel frattempo visita la pagina live di Ilario.
                    </p>
                    <a
                      href={demoShowcase.heroUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent inline-flex rounded-full px-6 py-3 text-sm font-semibold"
                    >
                      Vedi hero live →
                    </a>
                  </div>
                )}
              </div>
              <p className="mt-4 text-center text-sm text-zinc-400">
                La tua pagina hero KataHero: stats, video, bio e link — tutto in un unico link
                condivisibile.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                €{KATAHERO_SECTION_PRICE}
                <span className="ml-2 text-lg font-semibold text-zinc-400">/ anno</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  Player card
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  Pagina hero personalizzata
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  Premium
                </li>
              </ul>
            </div>
            <a
              href={KATAHERO_PURCHASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex shrink-0 items-center justify-center rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wide sm:text-base"
            >
              Sblocca la tua player card
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
