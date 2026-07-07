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
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Player card di ${name}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/94 backdrop-blur-md"
        aria-label="Chiudi"
      />

      <div className="relative z-10 flex w-full max-w-[min(92vw,22rem)] flex-col items-center animate-[popup-in_0.28s_ease-out] sm:max-w-[24rem]">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-xl leading-none text-zinc-200 transition hover:border-accent/50 hover:text-accent sm:-right-4"
          aria-label="Chiudi player card"
        >
          ×
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`Player card — ${name}`}
          className="w-full object-contain drop-shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
        />

        <div className="mt-5 w-full text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            Player card
          </p>
          <a
            href={purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-w-[200px] items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-accent/90"
          >
            Sblocca la tua player card
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
