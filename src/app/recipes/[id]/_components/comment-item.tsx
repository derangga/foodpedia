"use client";
import { Ellipsis } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

export type CommentProps = {
  onMenuClicked?: () => void;
  className?: string;
};
export const CommentItem = (props: CommentProps) => {
  return (
    <div
      className={`flex flex-col gap-4 border-b py-3 ${props.className || ""}`}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex items-center justify-center h-8 w-8 bg-black rounded-full">
          <div className="text-white">D</div>
        </div>
        <div className="flex flex-col">
          <div className="font-poppins text-sm">John Doe</div>
          <div className="text-xs text-gray-400">Jan 12, 2024</div>
        </div>
        <div className="grow" />
        <Dropdown>
          <DropdownTrigger>
            <Button className="bg-white" isIconOnly aria-label="Comment Menu">
              <Ellipsis />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            variant="flat"
            onAction={(key) => props.onMenuClicked?.()}
          >
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete comment
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <p>Thanks for the recipe, it is inspire me</p>
    </div>
  );
};
