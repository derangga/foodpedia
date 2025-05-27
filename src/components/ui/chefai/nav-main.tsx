import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import ChatHistory from "@/models/chat-history";
import { format } from "date-fns";

export function NavMain() {
  const chatHistory: ChatHistory[] = [
    {
      id: "1",
      timestamp: new Date("2024-03-10T10:30:00"),
      preview: "Italian pasta recipes",
      url: "",
    },
    {
      id: "2",
      timestamp: new Date("2024-03-09T15:45:00"),
      preview: "Vegetarian dinner ideas",
      url: "",
    },
    {
      id: "3",
      timestamp: new Date("2024-03-08T09:20:00"),
      preview: "Quick breakfast recipes",
      url: "",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chat history</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {chatHistory.map((item) => (
            <SidebarMenuItem key={item.id}>
              <Link href={item.url}>
                <SidebarMenuButton
                  tooltip={item.preview}
                  className="hover:cursor-pointer text-ellipsis overflow-hidden line-clamp-1"
                >
                  {`${format(item.timestamp, "MMM d, yyyy")} | ${item.preview}`}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
