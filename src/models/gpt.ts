export type GptMessageResponse = {
  answer_type: "recipe_food" | "recipe_suggestions";
  language_use: string;
  answer: string | GptRecipeSuggestions[];
};

export type GptRecipeSuggestions = {
  title: string;
  categories: string[];
};

export default GptMessageResponse;
