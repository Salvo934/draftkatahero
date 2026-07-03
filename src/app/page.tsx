import Countdown from "@/components/Countdown";
import DraftBoard from "@/components/DraftBoard";
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
        <DraftBoard />
      </main>
      <Footer />
    </div>
  );
}
