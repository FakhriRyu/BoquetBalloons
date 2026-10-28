import React from "react";
import AnnouncementHeader from "@/components/AnnouncementHeader";
import HeroSection from "@/components/HeroSection";
import OccasionRail from "@/components/OccasionRail";
import BestSellers from "@/components/BestSellers";
import PromoBanner from "@/components/PromoBanner";
import TrustPillars from "@/components/TrustPillars";
import CustomCta from "@/components/CustomCta";
import FooterSection from "@/components/FooterSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <AnnouncementHeader />
      <main className="w-full pt-28 bg-surface">
        <div className="flex flex-col w-full">
          <HeroSection />
          <OccasionRail />
          <BestSellers />
          <PromoBanner />
          <TrustPillars />
          <CustomCta />
        </div>
      </main>
      <FooterSection />
      <FloatingWhatsApp />
    </>
  );
}
