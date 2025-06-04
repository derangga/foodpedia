"use client";
import { User } from "lucide-react";
import { Textarea } from "../../textarea";
import { useActionState, useEffect } from "react";
import { postCommentRecipe } from "@/actions/comment";
import { toast } from "sonner";
import ButtonLoading from "../../button-loading";

interface CommentInputProps {
  recipeId: number;
}

const CommentInput: React.FC<CommentInputProps> = ({ recipeId }) => {
  const [state, formAction, isLoading] = useActionState(
    postCommentRecipe,
    null
  );

  useEffect(() => {
    if (state instanceof Error && !isLoading) {
      toast.error("Failed post comment", {
        description: state.message,
        duration: 2000,
      });
      return;
    }
  }, [state, isLoading]);

  return (
    <div className="flex gap-4 mb-8">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <User className="h-6 w-6 text-gray-500" />
      </div>
      <form className="flex-1" action={formAction}>
        <input name="id" defaultValue={recipeId} className="hidden" />
        <Textarea
          placeholder="Add a comment..."
          name="comment"
          disabled={isLoading}
          className="w-full p-4 min-h-24 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          maxLength={200}
        />
        <ButtonLoading
          isLoading={isLoading}
          className="mt-2 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Post Comment
        </ButtonLoading>
      </form>
    </div>
  );
};

export default CommentInput;
