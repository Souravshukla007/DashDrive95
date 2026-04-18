import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RideBookingSection from "@/components/DrivingChange";
import UniqueFeatures from "@/components/Industries";
import FleetShowcase from "@/components/DarkService";
import SocialImpact from "@/components/Testimonials";
import GamificationSection from "@/components/FooterCTA";
import Footer from "@/components/Footer";
import ScrollAnimationInitializer from "@/components/ScrollAnimationInitializer";

export default function Home() {
  return (
    <>
      <ScrollAnimationInitializer />
      <Navbar />
      <main className="flex-grow flex flex-col w-full relative">
        <Hero />
        <RideBookingSection />
        <UniqueFeatures />
        <FleetShowcase />
        <SocialImpact />
        <GamificationSection />
      </main>
      <Footer />
    </>
  );
}
