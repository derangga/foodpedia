"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { Key, useState } from "react";
import { deleteRecipeAction } from "../_actions/delete-recipe";

export const RecipeContentAction = ({
  recipeId,
  recipeName,
}: {
  recipeId: number;
  recipeName: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onCornerMenuAction = async (key: Key) => {
    if (key === "edit") {
      router.push(`/recipes/${recipeId}/edit`);
    } else {
      onOpen();
    }
  };

  const onDelete = async (onClose: () => void) => {
    setIsLoading(true);
    const result = await deleteRecipeAction(recipeId, "/profile");
    setIsLoading(false);

    if (!result) return;
    onClose();
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
          onAction={(key) => onCornerMenuAction(key)}
        >
          <DropdownItem key="edit">Edit recipe</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete recipe
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Recipe
              </ModalHeader>
              <ModalBody>
                <div>
                  Are you sure want to delete recipe{" "}
                  <strong>{recipeName}</strong>
                  {" ?"}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  isLoading={isLoading}
                  onPress={() => {
                    onDelete(onClose);
                  }}
                >
                  Delete
                </Button>
                <Button
                  color="warning"
                  onPress={onClose}
                  className="text-white"
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
