import { PanelLeftClose } from "lucide-react";
import { Button } from "../button";
import ChatHistory from "@/models/chat-history";
import { format } from "date-fns";

interface SideMenuProps {
  chatHistory: ChatHistory[];
  toggleSidebar: () => void;
}
const SideMenu: React.FC<SideMenuProps> = ({ chatHistory, toggleSidebar }) => {
  return (
    <div className="hidden sm:block w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chat History</h2>
        <Button
          onClick={toggleSidebar}
          className="rounded-full hover:bg-gray-100 transition-colors size-9"
          variant="ghost"
        >
          <PanelLeftClose className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
      <div className="space-y-2">
        {chatHistory.map((chat) => (
          <button
            key={chat.id}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="text-sm font-medium text-gray-900">
              {format(chat.timestamp, "MMM d, yyyy h:mm a")}
            </div>
            <div className="text-sm text-gray-500 truncate">{chat.preview}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
