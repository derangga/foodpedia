"use client";
import { Textarea, Button, Divider } from "@heroui/react";
import { useActionState, useState } from "react";
import { commentRecipeAction } from "../_actions/comment";

export const CommentBox = ({
  userId,
  recipeId,
  className,
}: {
  userId: number | undefined;
  recipeId: number | undefined;
  className?: string;
}) => {
  const [comment, setComment] = useState("");
  const [state, formAction, isLoading] = useActionState(
    commentRecipeAction,
    null
  );
  return (
    <>
      <form
        className={`flex flex-col items-end gap-3 ${className || ""}`}
        action={formAction}
      >
        <input name="userId" defaultValue={userId} className="hidden" />
        <input name="recipeId" defaultValue={recipeId} className="hidden" />
        <Textarea
          name="comment"
          placeholder="Give a warm comment"
          minRows={5}
          onValueChange={setComment}
        />
        <div className="flex gap-4 items-center">
          <div
            className={`font-poppins ${
              comment.length <= 200 ? "text-gray-400" : "text-red-400"
            }`}
          >
            {`${comment.length}`}/200
          </div>
          <Button
            className={`w-fit text-white ${
              comment.length === 0 ? "bg-gray-200" : "bg-black"
            }`}
            radius="full"
            isLoading={isLoading}
            type="submit"
          >
            Respond
          </Button>
        </div>
      </form>
      <Divider className="my-4" />
    </>
  );
};
