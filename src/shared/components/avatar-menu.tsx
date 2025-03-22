"use client";
import { tryCatch } from "@/utils/try-catch";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { SquareUserRound, Settings, LogOut } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { Key } from "react";

export type AvatarMenyProps = {
  name: string;
};
export const AvatarMenu = (props: AvatarMenyProps) => {
  const router = useRouter();
  const onCornerMenuAction = async (key: Key) => {
    if (key === "sign-out") {
      const result = await tryCatch(
        fetch("/api/auth/logout", {
          method: "POST",
        })
      );
      if (result.error) return;

      redirect("/");
    } else {
      router.push(`/${key}`);
    }
  };

  const avatar = props.name.charAt(0).toUpperCase();
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex justify-center items-center w-10 h-10 bg-black rounded-full hover:cursor-pointer">
          <div className="text-white font-mono font-semibold">{avatar}</div>
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
