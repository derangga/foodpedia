import { GptRecipeSuggestionsItem } from "@/model/gpt";
import { Button } from "@heroui/react";

export type SuggestRecipeItemProps = {
  recipe: GptRecipeSuggestionsItem;
  askRecipe?: (title: string) => void;
};
export const SuggestRecipeItem = (props: SuggestRecipeItemProps) => {
  const categories = props.recipe.categories.join(", ");
  return (
    <div className="flex flex-row items-center justify-between shadow-sm rounded-xl border py-2 px-4">
      <div className="flex flex-col gap-1">
        <div className="font-poppins font-semibold">{props.recipe.title}</div>
        <div className="text-sm">
          Categories:{" "}
          <span className="text-orange-400 font-semibold">{categories}</span>
        </div>
      </div>
      <Button
        size="sm"
        color="warning"
        className="text-white"
        onPress={() => {
          props.askRecipe?.(props.recipe.title);
        }}
      >
        Ask recipe
      </Button>
    </div>
  );
};
