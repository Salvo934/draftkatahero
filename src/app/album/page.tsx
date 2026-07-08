import type { Metadata } from "next";
import Footer from "@/components/Footer";
import OverallAlbum from "@/components/OverallAlbum";
import SiteHeader from "@/components/SiteHeader";
import { SLOT_COUNT } from "@/lib/draft-config";

export const metadata: Metadata = {
  title: "Album Overall — DraftKataHero",
  description: `Collezione ufficiale delle player card FIFA del draft KataHero — fino a ${SLOT_COUNT} card overall sospese da completare.`,
};

export default function AlbumPage() {
  return (
    <div className="draft-bg relative min-h-screen">
      <SiteHeader />
      <main className="pb-20 pt-[max(5.75rem,calc(4.5rem+env(safe-area-inset-top)))]">
        <OverallAlbum />
      </main>
      <Footer />
    </div>
  );
}
