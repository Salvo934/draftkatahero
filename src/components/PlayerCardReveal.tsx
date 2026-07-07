"use client";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { KATAHERO_PURCHASE_URL } from "@/lib/card-view";

type PlayerCardRevealProps = {
  name: string;
  image: string;
  locked?: boolean;
  purchaseUrl?: string;
  onClose: () => void;
};

function LockIcon() {
  return (
    <svg
      className="h-8 w-8 text-accent"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0V10.5M6.75 10.5h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z"
      />
    </svg>
  );
}

export default function PlayerCardReveal({
  name,
  image,
  locked = false,
  purchaseUrl = KATAHERO_PURCHASE_URL,
  onClose,
}: PlayerCardRevealProps) {
  const closeNow = useCallback(() => {
    document.body.style.overflow = "";
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeNow]);

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex touch-manipulation items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={locked ? `Anteprima player card di ${name}` : `Player card di ${name}`}
    >
      <button
        type="button"
        onClick={closeNow}
        className="absolute inset-0 bg-black/95"
        aria-label="Chiudi"
      />

      <div className="relative z-10 flex w-full max-w-[min(92vw,22rem)] flex-col items-center sm:max-w-[24rem]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            closeNow();
          }}
          className="absolute -top-1 -right-1 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-zinc-900 text-2xl leading-none text-white active:scale-95 sm:-right-3"
          aria-label="Chiudi player card"
        >
          ×
        </button>

        <div className="relative w-full overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={locked ? `Anteprima sfocata — ${name}` : `Player card — ${name}`}
            className={`w-full object-contain ${locked ? "scale-105 blur-xl brightness-75" : ""}`}
            decoding="async"
          />

          {locked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-black/60">
                <LockIcon />
              </div>
              <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-white">
                Anteprima sfocata
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                La versione completa si sblocca con l&apos;acquisto su KataHero.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 w-full text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            {locked ? "Player card · preview" : "Player card"}
          </p>

          {locked ? (
            <>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Dopo il pagamento ti invieremo un link personale con la tua player card in alta
                qualità e il badge sportivo KataHero — da usare come preferisci.
              </p>
              <a
                href={purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 min-w-[200px] items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black active:scale-[0.98]"
              >
                Sblocca su KataHero
              </a>
            </>
          ) : (
            <a
              href={purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 min-w-[200px] items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black active:scale-[0.98]"
            >
              Sblocca la tua player card
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
