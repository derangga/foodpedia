"use client";
import { Ellipsis } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  addToast,
} from "@heroui/react";
import dateFormat from "@/utils/date-time";
import { Key } from "react";
import { deleteCommentAction } from "../_actions/comment";

export type CommentProps = {
  recipeId: number;
  commentId: number;
  name: string;
  comment: string;
  commentdAt: Date;
  showMenu: boolean;
  className?: string;
};
export const CommentItem = (props: CommentProps) => {
  const dateFormated = dateFormat(props.commentdAt);
  const onMenuClicked = async (_: Key) => {
    const result = await deleteCommentAction(props.commentId, props.recipeId);
    if (!result) {
      addToast({
        title: "Delete comment failed",
        description:
          "Something wrong with your request, please try again later",
        color: "danger",
      });
    }
  };
  return (
    <div
      className={`flex flex-col gap-4 border-b py-3 ${props.className || ""}`}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex items-center justify-center h-8 w-8 bg-black rounded-full">
          <div className="text-white">D</div>
        </div>
        <div className="flex flex-col">
          <div className="font-poppins text-sm">{props.name}</div>
          <div className="text-xs text-gray-400">{dateFormated}</div>
        </div>
        <div className="grow" />
        {props.showMenu && (
          <Dropdown>
            <DropdownTrigger>
              <Button className="bg-white" isIconOnly aria-label="Comment Menu">
                <Ellipsis />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              variant="flat"
              onAction={onMenuClicked}
            >
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete comment
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <p>{props.comment}</p>
    </div>
  );
};
