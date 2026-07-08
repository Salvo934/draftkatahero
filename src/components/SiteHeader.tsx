"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV_LINKS = [
  { href: "/album", label: "Album Overall" },
  { href: "/negozio", label: "Negozio" },
  { href: "/#board", label: "Da scoprire" },
  { href: "/#rivelate", label: "Hall of Fame" },
] as const;

const MOBILE_NAV_TOP =
  "max(4.75rem,calc(3.75rem + env(safe-area-inset-top)))";

function linkClassName(active: boolean) {
  return `block rounded-xl px-4 py-3 text-[15px] font-medium transition ${
    active
      ? "bg-accent/12 text-accent"
      : "text-zinc-300 hover:bg-white/8 hover:text-white"
  }`;
}

function desktopLinkClassName(active: boolean) {
  return `rounded-full px-3.5 py-2 text-[13px] font-medium transition lg:px-4 ${
    active
      ? "bg-white/10 text-white"
      : "text-zinc-400 hover:bg-white/10 hover:text-white"
  }`;
}

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  return pathname === href;
}

function MobileNavMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-9998 md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        aria-label="Chiudi menu"
        onClick={onClose}
      />

      <nav
        id="mobile-nav-panel"
        className="absolute right-3 left-3 rounded-2xl border border-white/10 bg-zinc-950 p-3 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.9)] sm:right-5 sm:left-5"
        style={{ top: MOBILE_NAV_TOP }}
        aria-label="Menu mobile"
      >
        <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Navigazione
        </p>
        <div className="space-y-1">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClassName(isActive(pathname, item.href))}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-3 border-t border-white/8 pt-3">
          <a
            href="https://www.katahero.com/#contatti"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold"
            onClick={onClose}
          >
            KataHero
            <span aria-hidden className="text-base leading-none">
              →
            </span>
          </a>
        </div>
      </nav>
    </div>,
    document.body,
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-9999 px-3 pt-3 sm:px-5 lg:px-8">
        <div className="glass-panel mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:rounded-full sm:px-5">
          <Link
            href="/"
            className="group relative font-display text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            DraftKataHero
            <span className="text-accent">.</span>
            <span
              className="absolute -inset-x-1 -bottom-0.5 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent opacity-0 transition group-hover:opacity-100"
              aria-hidden
            />
          </Link>

          <nav
            className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-1 md:flex"
            aria-label="Principale"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={desktopLinkClassName(isActive(pathname, item.href))}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://www.katahero.com/#contatti"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold md:inline-flex"
            >
              KataHero
              <span aria-hidden className="text-base leading-none">
                →
              </span>
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-white transition hover:border-accent/30 hover:text-accent md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute top-0 left-0 h-0.5 w-4 rounded-full bg-current transition ${
                    open ? "top-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 h-0.5 w-4 rounded-full bg-current transition ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute top-3 left-0 h-0.5 w-4 rounded-full bg-current transition ${
                    open ? "top-1.5 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {mounted ? (
        <MobileNavMenu open={open} pathname={pathname} onClose={closeMenu} />
      ) : null}
    </>
  );
}
