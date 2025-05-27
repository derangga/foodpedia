import CallToAction from "@/components/ui/landing/cta";
import Features from "@/components/ui/landing/features";
import Hero from "@/components/ui/landing/hero";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
}
