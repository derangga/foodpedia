"use server";
import { promptSuggestionRecipe } from "@/libs/ai-client";

export async function askAI(_, formData) {
  const prompt = formData.get("prompt");

  if (!prompt) return;

  const response = await promptSuggestionRecipe(prompt);
  return response;
}
