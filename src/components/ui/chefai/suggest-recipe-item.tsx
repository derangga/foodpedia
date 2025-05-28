import { GptRecipeSuggestions } from "@/models/gpt";
import { Button } from "../button";

export type SuggestRecipeItemProps = {
  recipe: GptRecipeSuggestions;
  askRecipe?: (title: string) => void;
};
export const SuggestRecipeItem: React.FC<SuggestRecipeItemProps> = ({
  recipe,
  askRecipe,
}) => {
  const categories = recipe.categories.join(", ");
  return (
    <div className="flex flex-row items-center justify-between shadow-sm rounded-xl border py-2 px-4 gap-3 max-w-[560px]">
      <div className="flex flex-col gap-1">
        <div className="font-poppins font-semibold line-clamp-2">
          {recipe.title}
        </div>
        <div className="text-sm">
          Categories:{" "}
          <span className="text-orange-400 font-semibold">{categories}</span>
        </div>
      </div>
      <Button
        size="sm"
        color="warning"
        className="text-white"
        onClick={() => {
          askRecipe?.(recipe.title);
        }}
      >
        Ask recipe
      </Button>
    </div>
  );
};
