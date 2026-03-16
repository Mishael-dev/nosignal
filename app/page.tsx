" use server "
import HeroSection from "@/components/landing-page/HeroSection";
import PhilosophySection from "@/components/landing-page/PhilosophySection";
import MarqueeSection from "@/components/landing-page/MarqueeSection";
import NewArrivalsSection from "@/components/landing-page/NewArrivalsSection";
import NewsletterSection from "@/components/landing-page/NewsletterSection";
import FooterSection from "@/components/FooterSection";
import CookieConsent from "@/components/CookieConsent";
import { getHighlightedProducts } from "@/lib/db/products";

const Index = async () => {
  const highlightedProducts = await getHighlightedProducts()

  return (
   <main>
     <HeroSection />
    <PhilosophySection />
      <MarqueeSection />
      <NewArrivalsSection highlightedProducts={highlightedProducts} />
      <NewsletterSection />
      <CookieConsent />
   </main>
  );
};

export default Index;
