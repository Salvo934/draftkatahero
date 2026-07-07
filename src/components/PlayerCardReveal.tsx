"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  getPlayerCardCheckoutUrl,
  PLAYER_CARD_PRICE,
  PLAYER_CARD_PRICE_PERIOD,
} from "@/lib/card-view";

type PlayerCardRevealProps = {
  name: string;
  image: string;
  playerSlug?: string;
  locked?: boolean;
  checkoutUrl?: string;
  onClose: () => void;
};

function LockIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={`${className} text-accent`}
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

function CheckIcon() {
  return (
    <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const PURCHASE_BENEFITS = [
  { title: "Card HD", detail: "Social e scout" },
  { title: "Profilo atleta premium", detail: "Scout e club" },
  { title: "Link personale", detail: "Subito tuo" },
] as const;

function UnlockCta({ payUrl, className = "" }: { payUrl: string; className?: string }) {
  return (
    <div className={className}>
      <div className="rounded-xl border border-white/8 bg-black/35 px-3 py-2.5 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          Sblocco completo
        </p>
        <p className="mt-0.5 font-display text-xl font-bold leading-none text-white sm:text-2xl">
          {PLAYER_CARD_PRICE}
          {PLAYER_CARD_PRICE_PERIOD ? (
            <span className="ml-0.5 text-sm font-semibold text-zinc-400">
              {PLAYER_CARD_PRICE_PERIOD}
            </span>
          ) : null}
        </p>
      </div>

      <a
        href={payUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="mt-2.5 flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-bold text-black shadow-[0_0_32px_-8px_rgba(0,229,160,0.55)] active:scale-[0.98] sm:mt-3"
      >
        Sblocca la tua player card
      </a>

      <p className="mt-2 text-[10px] leading-snug text-zinc-600">
        Pagamento sicuro con Stripe · Nessuna sorpresa al checkout
      </p>
    </div>
  );
}

function PurchasePanel({ payUrl }: { payUrl: string }) {
  return (
    <div className="shrink-0 rounded-2xl border border-white/10 bg-linear-to-b from-zinc-900/95 to-black px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-4 sm:py-4">
      <div className="text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
          Pick ufficiale · DraftKataHero
        </p>
        <h2 className="mt-2 font-display text-base font-bold leading-snug text-white sm:text-lg">
          Falla lavorare per te
        </h2>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-3.5">
        {PURCHASE_BENEFITS.map((item) => (
          <div
            key={item.title}
            className="flex min-h-22 flex-col items-center justify-center rounded-xl border border-white/8 bg-white/4 px-1.5 py-2 text-center sm:min-h-23 sm:px-2"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <CheckIcon />
            </span>
            <p className="mt-1.5 line-clamp-2 text-[9px] font-semibold leading-tight text-zinc-100 sm:text-[10px]">
              {item.title}
            </p>
            <p className="mt-1 text-[9px] leading-snug text-zinc-500 sm:text-[10px]">{item.detail}</p>
          </div>
        ))}
      </div>

      <UnlockCta payUrl={payUrl} className="mt-3.5 sm:mt-4" />
    </div>
  );
}

function hideModalRoot(el: HTMLElement | null) {
  if (!el) return;
  el.style.setProperty("display", "none", "important");
  el.style.setProperty("visibility", "hidden", "important");
  el.style.setProperty("opacity", "0", "important");
  el.style.setProperty("pointer-events", "none", "important");
}

export default function PlayerCardReveal({
  name,
  image,
  playerSlug,
  locked = false,
  checkoutUrl,
  onClose,
}: PlayerCardRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closedRef = useRef(false);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  const closeNow = useCallback(() => {
    if (closedRef.current) return;
    closedRef.current = true;

    document.body.style.overflow = "";
    hideModalRoot(rootRef.current);

    requestAnimationFrame(() => {
      onCloseRef.current();
    });
  }, []);

  const handleDismiss = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      closeNow();
    },
    [closeNow],
  );

  const firstName = name.split(" ")[0];
  const payUrl = checkoutUrl ?? getPlayerCardCheckoutUrl(playerSlug);

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
      ref={rootRef}
      className="fixed inset-0 z-9999 flex touch-manipulation flex-col overflow-hidden px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-label={locked ? `Anteprima player card di ${name}` : `Player card di ${name}`}
    >
      <button
        type="button"
        onTouchStart={handleDismiss}
        onMouseDown={handleDismiss}
        onClick={handleDismiss}
        className="absolute inset-0 bg-black/95"
        aria-label="Chiudi"
      />

      <div
        className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[min(94vw,26rem)] flex-col gap-2.5 sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          role="button"
          tabIndex={-1}
          aria-label="Chiudi player card"
          onTouchStartCapture={handleDismiss}
          onMouseDownCapture={handleDismiss}
          onClick={handleDismiss}
          className="absolute -top-0.5 right-0 z-30 flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-white/25 bg-zinc-900 text-2xl leading-none text-white select-none [-webkit-tap-highlight-color:transparent]"
        >
          ×
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <div className="relative flex h-full max-h-[min(58dvh,34rem)] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={locked ? `Anteprima player card — ${name}` : `Player card — ${name}`}
              className={`max-h-full max-w-full object-contain ${
                locked ? "blur-[6px] brightness-95 saturate-90 transform-[translateZ(0)]" : ""
              }`}
              decoding="async"
            />

            {locked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 px-4 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-black/60 sm:h-12 sm:w-12">
                  <LockIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <p className="mt-2.5 font-display text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
                  {firstName}, sei stato scelto
                </p>
                <p className="mt-1 max-w-56 text-[11px] leading-snug text-zinc-300">
                  La tua player card KataHero ti aspetta.
                </p>
              </div>
            )}
          </div>
        </div>

        {locked ? (
          <PurchasePanel payUrl={payUrl} />
        ) : (
          <div className="shrink-0 rounded-2xl border border-white/10 bg-zinc-900/95 px-4 py-4">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
              Player card
            </p>
            <UnlockCta payUrl={payUrl} className="mt-3" />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
