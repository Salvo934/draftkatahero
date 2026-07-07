"use client";

import { useCallback, useEffect } from "react";
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
      aria-label={`Player card di ${name}`}
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

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`Player card — ${name}`}
          className="w-full object-contain"
          decoding="async"
        />

        <div className="mt-5 w-full text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            Player card
          </p>
          <a
            href={purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 min-w-[200px] items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black active:scale-[0.98]"
          >
            Sblocca la tua player card
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
