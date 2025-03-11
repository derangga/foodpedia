import { Button } from "@heroui/react";

export const SuggestRecipeItem = ({ recipe }) => {
  const categories = recipe.categories.join(", ");
  return (
    <div className="flex flex-row items-center justify-between shadow-sm rounded-xl border py-2 px-4">
      <div className="flex flex-col gap-1">
        <div className="font-poppins font-semibold text-xl">{recipe.title}</div>
        <div>
          Categories:{" "}
          <span className="text-orange-400 font-semibold">{categories}</span>
        </div>
      </div>
      <Button size="sm" color="warning" className="text-white">
        Ask recipe
      </Button>
    </div>
  );
};
