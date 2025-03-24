import { Footer } from "@/shared/components/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
