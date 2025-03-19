export type GptRecipeSuggestionsItem = {
  title: string;
  categories: string[];
};
export type GptRecipeSuggestions = {
  recipes: GptRecipeSuggestionsItem[];
  reject_reason: string | null;
};

export type GptRecipeStep = {
  detail: string;
};
export type GptRecipe = {
  title: string;
  categories: string[];
  ingredients: string[];
  steps: GptRecipeStep[];
};
export type GptRecipeGuide = {
  recipe: GptRecipe;
  reject_reason: string | null;
};
