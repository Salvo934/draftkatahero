import Countdown from "@/components/Countdown";
import DraftGrid from "@/components/DraftGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="draft-bg relative min-h-screen">
      <SiteHeader />
      <Countdown />
      <main>
        <Hero />
        <DraftGrid />
      </main>
      <Footer />
    </div>
  );
}
