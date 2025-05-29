import { ChefAiSidebar } from "@/components/ui/chefai/chefai-sidebar";
import { SiteHeader } from "@/components/ui/chefai/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <SidebarProvider>
      <Suspense fallback={<div />}>
        <ChefAiSidebar variant="inset" user={session?.user} />
      </Suspense>
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
