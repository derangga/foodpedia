"use client";
import { Loader2, User } from "lucide-react";
import { Textarea } from "../../textarea";
import { useActionState } from "react";
import { postCommentRecipe } from "@/actions/comment";
import { Button } from "../../button";
import { toast } from "sonner";

interface CommentInputProps {
  recipeId: number;
}

const CommentInput: React.FC<CommentInputProps> = ({ recipeId }) => {
  const [state, formAction, isLoading] = useActionState(
    postCommentRecipe,
    null
  );

  if (state instanceof Error) {
    toast.error("Failed post comment", {
      description: state.message,
      duration: 2000,
    });
  }
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
        <Button
          className="mt-2 text-white rounded-lg hover:bg-orange-600 transition-colors"
          type="submit"
        >
          {isLoading && <Loader2 className="animate-spin mr-2" />}
          Post Comment
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
