import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { LEGAL, LEGAL_LINKS } from "@/lib/legal";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  description,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="draft-bg relative min-h-screen">
      <SiteHeader />
      <main className="relative z-10 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-accent"
          >
            ← Torna al draft
          </Link>

          <header className="mt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
              Informazioni legali
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">{description}</p>
            <p className="mt-3 text-xs text-zinc-600">
              Ultimo aggiornamento: {LEGAL.lastUpdated} · {LEGAL.siteUrl}
            </p>
          </header>

          <nav
            aria-label="Documenti legali"
            className="mt-8 flex flex-wrap gap-2 border-b border-white/8 pb-8"
          >
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-400 transition hover:border-accent/30 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <article className="legal-prose mt-10 space-y-8 text-sm leading-relaxed text-zinc-300">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-bold text-white">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
