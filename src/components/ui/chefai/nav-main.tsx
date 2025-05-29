"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { useGptSessionAtom } from "@/models/atom";
import { GptSession } from "@/models/message";
import { useEffect } from "react";

interface NavmainProps {
  chatSessions: GptSession[];
}

export function NavMain({ chatSessions }: NavmainProps) {
  const [chatHistory, setChatHistory] = useAtom(useGptSessionAtom);
  useEffect(() => {
    setChatHistory(chatSessions);
  }, [chatSessions, setChatHistory]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chat history</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {chatHistory.map((item, idx) => (
            <SidebarMenuItem key={idx + 1}>
              <Link href={`/chefai/${item.id}` || "/chefai"}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="hover:cursor-pointer text-ellipsis overflow-hidden line-clamp-1"
                >
                  {`${format(item.createdAt, "MMM d, yyyy")} | ${item.title}`}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
