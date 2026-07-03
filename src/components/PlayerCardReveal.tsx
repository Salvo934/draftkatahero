"use client";

import { useEffect } from "react";

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

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Player card di ${name}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        aria-label="Chiudi"
      />

      <div className="relative z-10 w-full max-w-4xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-xl text-zinc-300 transition hover:border-accent/40 hover:text-accent sm:-right-2"
          aria-label="Chiudi player card"
        >
          ×
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`Player card — ${name}`}
          className="mx-auto max-h-[85vh] w-full rounded-2xl object-contain shadow-card-hover ring-1 ring-white/10"
        />
      </div>
    </div>
  );
}
