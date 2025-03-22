"use client";

import { unfavoriteAction } from "@/shared/actions/favorite";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Ellipsis } from "lucide-react";

export const RecipeFavAction = ({ recipeId }: { recipeId: number }) => {
  const onCornerMenuAction = async () => {
    await unfavoriteAction(recipeId);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className="rounded-md hover:bg-gray-100 hover:cursor-pointer py-0.5 px-1 mx-2 my-px">
            <Ellipsis size={16} />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          onAction={() => onCornerMenuAction()}
        >
          <DropdownItem key="delete" className="text-danger" color="danger">
            Remove
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
