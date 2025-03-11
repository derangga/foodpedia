"use server";
import { promptDetailRecipe, promptSuggestionRecipe } from "@/libs/ai-client";

export async function askRecipeRecommendation(formData) {
  const prompt = formData.get("prompt");

  if (!prompt) return null;

  const response = await promptSuggestionRecipe(prompt);
  return response;
}

export async function askRecipedetail(recipeName) {
  if (!recipeName) return null;

  const response = await promptDetailRecipe(recipeName);
  return response;
}
