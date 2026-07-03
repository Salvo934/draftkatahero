"use client";

import { useEffect, useState } from "react";
import { getNextSundayDrop, getTimeRemaining, pad, isDropLive } from "@/lib/draft";

type TimeLeft = ReturnType<typeof getTimeRemaining>;

const EMPTY_TIME: TimeLeft = {
  total: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function Digit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="countdown-digit flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14 md:h-16 md:w-16">
        <span
          className="font-display text-2xl font-bold tabular-nums tracking-tight text-accent sm:text-3xl md:text-4xl"
          suppressHydrationWarning
        >
          {value}
        </span>
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(EMPTY_TIME);
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const target = getNextSundayDrop();

    const tick = () => {
      setTimeLeft(getTimeRemaining(target));
      setLive(isDropLive());
    };

    tick();
    setReady(true);
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-40 px-3 pt-[max(5.5rem,calc(4.5rem+env(safe-area-inset-top)))] sm:px-5 sm:pt-24 lg:px-8">
      <div className="glass-panel mx-auto max-w-6xl overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="accent-line h-px w-full opacity-80" />

        <div className="flex flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between sm:gap-6 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <div
              className={`h-2 w-2 rounded-full ${live ? "bg-accent live-dot" : "animate-pulse bg-accent/70"}`}
            />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                {ready && live ? "Live now" : "Countdown"}
              </p>
              <p className="mt-0.5 text-xs text-zinc-400 sm:text-sm" suppressHydrationWarning>
                {ready && live ? (
                  <span className="font-semibold text-accent">
                    Drop in corso — le card si stanno rivelando
                  </span>
                ) : (
                  <>Prossimo drop · Domenica ore 21:00</>
                )}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 ${ready ? "" : "animate-pulse opacity-60"}`}
            aria-busy={!ready}
          >
            <Digit value={pad(timeLeft.days)} label="Giorni" />
            <span className="font-display text-xl text-accent/30 sm:text-2xl">:</span>
            <Digit value={pad(timeLeft.hours)} label="Ore" />
            <span className="font-display text-xl text-accent/30 sm:text-2xl">:</span>
            <Digit value={pad(timeLeft.minutes)} label="Min" />
            <span className="font-display text-xl text-accent/30 sm:text-2xl">:</span>
            <Digit value={pad(timeLeft.seconds)} label="Sec" />
          </div>
        </div>
      </div>
    </div>
  );
}
