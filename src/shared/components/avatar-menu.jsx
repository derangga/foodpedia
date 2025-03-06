"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { SquareUserRound, Settings, LogOut } from "lucide-react";
export const AvatarMenu = ({ name, onCornerMenuAction }) => {
  const avatar = () => {
    return name.charAt(0).toUpperCase();
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex justify-center items-center w-10 h-10 bg-black rounded-full hover:cursor-pointer">
          <div className="text-white font-mono font-semibold">{avatar()}</div>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => onCornerMenuAction(key)}
      >
        <DropdownItem key="profile">
          <div className="flex flex-row space-x-4 items-center">
            <SquareUserRound size={20} />
            <div>Profile</div>
          </div>
        </DropdownItem>
        <DropdownItem key="setting">
          <div className="flex flex-row space-x-4 items-center">
            <Settings size={20} />
            <div>Settings</div>
          </div>
        </DropdownItem>
        <DropdownItem key="sign-out" className="text-danger" color="danger">
          <div className="flex flex-row space-x-4 items-center">
            <LogOut size={20} />
            <div>Sign out</div>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
