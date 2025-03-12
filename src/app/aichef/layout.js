import { Button } from "@heroui/react";
import { BotMessageSquare, House, Search } from "lucide-react";
import Link from "next/link";
import { SessionGpt } from "../_components/session-gpt";
import { getGptSessionByUserId } from "./_actions/ask-ai";

export default async function Layout({ children }) {
  const sessions = await getGptSessionByUserId();

  return (
    <div className="flex flex-row w-screen h-screen">
      <aside className="w-72 h-screen bg-stone-100 flex flex-col pb-4 px-3 overflow-scroll">
        <div className="flex flex-row sticky top-0 z-50 py-2 bg-stone-100 w-full">
          <Link href={"/"}>
            <Button isIconOnly variant="light">
              <House />
            </Button>
          </Link>
          <div className="grow" />
          <Button isIconOnly variant="light">
            <Search />
          </Button>
          <Button isIconOnly variant="light">
            <BotMessageSquare />
          </Button>
        </div>
        <SessionGpt sessions={sessions} />
      </aside>
      <div className="w-full">{children}</div>
    </div>
  );
}
