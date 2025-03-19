"use server";
import { promptDetailRecipe, promptSuggestionRecipe } from "@/libs/ai-client";

export async function askRecipeRecommendation(formData: FormData) {
  const prompt = formData.get("prompt") as string;

  if (!prompt) return null;

  const response = await promptSuggestionRecipe(prompt);
  return response;
}

export async function askRecipedetail(recipeName: string) {
  if (!recipeName) return null;

  const response = await promptDetailRecipe(recipeName);
  return response;
}
