import CallToAction from "@/components/ui/landing/cta";
import Features from "@/components/ui/landing/features";
import Hero from "@/components/ui/landing/hero";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      {!session?.user && <CallToAction />}
    </div>
  );
}
