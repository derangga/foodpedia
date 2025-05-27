import Footer from "@/components/ui/landing/footer";
import Navbar from "@/components/ui/landing/navbar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
