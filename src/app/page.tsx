import Countdown from "@/components/Countdown";
import DraftBoard from "@/components/DraftBoard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import WhatYouGetSection from "@/components/WhatYouGetSection";

export default function Home() {
  return (
    <div className="draft-bg relative min-h-screen">
      <SiteHeader />
      <Countdown />
      <main>
        <Hero />
        <WhatYouGetSection />
        <DraftBoard />
      </main>
      <Footer />
    </div>
  );
}
