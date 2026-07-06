"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { KATAHERO_PURCHASE_URL } from "@/lib/card-view";

type PlayerCardRevealProps = {
  name: string;
  image: string;
  purchaseUrl?: string;
  onClose: () => void;
};

export default function PlayerCardReveal({
  name,
  image,
  purchaseUrl = KATAHERO_PURCHASE_URL,
  onClose,
}: PlayerCardRevealProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Player card di ${name}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/92 backdrop-blur-lg"
        aria-label="Chiudi"
      />

      <div className="relative z-10 w-full max-w-3xl animate-[popup-in_0.28s_ease-out]">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 right-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/80 text-2xl leading-none text-zinc-200 transition hover:border-accent/50 hover:text-accent sm:-right-3"
          aria-label="Chiudi player card"
        >
          ×
        </button>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-card-hover ring-1 ring-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={`Player card — ${name}`}
            className="mx-auto max-h-[min(68vh,720px)] w-full object-contain bg-black"
          />

          <div className="border-t border-white/10 bg-black/90 px-5 py-5 text-center sm:px-8 sm:py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Pick rivelata
            </p>
            <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
              {name}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
              Vuoi la tua player card KataHero in alta qualità? Acquistala ora sul nostro sito.
            </p>
            <div className="mt-5 flex justify-center">
              <a
                href={purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-accent/90"
              >
                Acquista
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
