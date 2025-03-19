"use client";

import { GptRecipeGuide, GptRecipeSuggestions } from "@/model/gpt";
import { SuggestRecipeItem } from "./suggest-recipe-item";

export type ChatBubbleProps = {
  chatModel: string | GptRecipeSuggestions | GptRecipeGuide | null;
  type?: string;
  askRecipe?: (recipeName: string) => void;
};
export const ChatBubble = (props: ChatBubbleProps) => {
  if (props.type === "recipe") {
    const gptRecipeGuide = props.chatModel as GptRecipeGuide;
    const recipe = gptRecipeGuide.recipe;
    const categories = recipe.categories.join(", ");
    return (
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-xl">{recipe.title}</div>
        <div className="font-semibold text-xl">
          Categories:{" "}
          <span className="text-orange-400 text-base">{categories}</span>
        </div>
        <div className="font-semibold text-xl">Ingredients: </div>
        <ul className="list-disc pl-4">
          {recipe.ingredients?.map((e, idx) => (
            <li key={idx + 1}>{e}</li>
          ))}
        </ul>
        <div className="font-semibold text-xl">Guide to cook</div>
        <ul className="list-disc pl-4">
          {recipe.steps?.map((e, idx) => (
            <li key={idx + 1}>{e.detail}</li>
          ))}
        </ul>
      </div>
    );
  } else if (props.type === "suggestion") {
    const gptRecipeSuggestions = props.chatModel as GptRecipeSuggestions;
    return (
      <div className="flex flex-col gap-2 w-[36rem]">
        {gptRecipeSuggestions.recipes.map((e, idx) => (
          <SuggestRecipeItem
            key={idx + 1}
            recipe={e}
            askRecipe={(e) => props.askRecipe?.(e)}
          />
        ))}
      </div>
    );
  } else if (props.type === "rejection") {
    const gpt = props.chatModel as GptRecipeSuggestions | GptRecipeGuide;
    return <div className="py-2 px-4">{gpt.reject_reason}</div>;
  }

  return <div />;
};
