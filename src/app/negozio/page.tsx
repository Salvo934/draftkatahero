import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import ShopCatalog from "@/components/ShopCatalog";
import SiteHeader from "@/components/SiteHeader";
import "./shop.css";

export const metadata: Metadata = {
  title: "Negozio Card — DraftKataHero",
  description:
    "Card Overall da €4,99 o pacchetto completo con player page a €9,99. Scegli il piano giusto per la tua presenza da cestista.",
};

function ShopLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center text-sm text-zinc-500 sm:px-6">
      Caricamento negozio…
    </div>
  );
}

export default function NegozioPage() {
  return (
    <div className="draft-bg relative min-h-screen">
      <SiteHeader />
      <main className="pb-20 pt-[max(5.75rem,calc(4.5rem+env(safe-area-inset-top)))]">
        <Suspense fallback={<ShopLoading />}>
          <ShopCatalog />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
