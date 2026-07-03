"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type PlayerCardRevealProps = {
  name: string;
  image: string;
  onClose: () => void;
};

export default function PlayerCardReveal({ name, image, onClose }: PlayerCardRevealProps) {
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

      <div className="relative z-10 w-full max-w-5xl animate-[popup-in_0.28s_ease-out]">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 right-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/80 text-2xl leading-none text-zinc-200 transition hover:border-accent/50 hover:text-accent sm:-right-3"
          aria-label="Chiudi player card"
        >
          ×
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`Player card — ${name}`}
          className="mx-auto max-h-[88vh] w-auto max-w-[min(960px,96vw)] rounded-xl object-contain shadow-card-hover ring-1 ring-white/15"
        />
      </div>
    </div>,
    document.body,
  );
}
