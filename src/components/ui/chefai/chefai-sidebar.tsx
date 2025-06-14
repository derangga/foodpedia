import { ChefHat, SquarePen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { SearchForm } from "../search-form";
import { NavUser } from "./nav-user";
import { User } from "better-auth";
import Link from "next/link";
import { getGptSession } from "@/actions/gpt";

interface SidebarUser {
  user?: User;
}
export async function ChefAiSidebar({
  user,
  ...props
}: SidebarUser & React.ComponentProps<typeof Sidebar>) {
  const session = await getGptSession();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={"/"}>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                  <ChefHat className="size-4" />
                </div>
                <div className="text-xl font-semibold text-orange-500">
                  Foodpedia
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href={"/chefai"}>
                <SidebarMenuButton
                  tooltip="Create new chat"
                  className="hover:cursor-pointer"
                >
                  <SquarePen />
                  New chat
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain initialSessions={session} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
