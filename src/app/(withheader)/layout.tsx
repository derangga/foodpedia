import Footer from "@/components/ui/landing/footer";
import Navbar from "@/components/ui/landing/navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="h-screen flex flex-col">
      <Navbar user={session?.user} />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
