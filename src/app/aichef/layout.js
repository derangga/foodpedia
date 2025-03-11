import { Button } from "@heroui/react";
import {
  BotMessageSquare,
  Ellipsis,
  PanelRightClose,
  Search,
} from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="flex flex-row w-screen h-screen">
      <aside className="w-72 h-screen bg-stone-100 flex flex-col pb-4 px-3 overflow-scroll">
        <div className="flex flex-row sticky top-0 z-50 py-2 bg-stone-100 w-full">
          <Button isIconOnly variant="light">
            <PanelRightClose />
          </Button>
          <div className="grow" />
          <Button isIconOnly variant="light">
            <Search />
          </Button>
          <Button isIconOnly variant="light">
            <BotMessageSquare />
          </Button>
        </div>
        <div className="flex flex-row justify-between p-2 rounded-xl hover:bg-stone-200 hover:cursor-pointer font-poppins">
          <div>Tempe dan telur</div>
          <Ellipsis />
        </div>
      </aside>
      <div className="w-full">{children}</div>
    </div>
  );
}
