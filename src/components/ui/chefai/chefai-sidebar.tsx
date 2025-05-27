"use client";

import { ChefHat } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { useRouter } from "next/navigation";
import { SearchForm } from "../search-form";
import { NavUser } from "./nav-user";
import { User } from "better-auth";

interface SidebarUser {
  user?: User;
}
export function ChefAiSidebar({
  user,
  ...props
}: SidebarUser & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => router.push("/")}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                <ChefHat className="size-4" />
              </div>
              <div className="text-xl font-semibold text-orange-500">
                Foodish
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
