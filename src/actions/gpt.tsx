"use server";
import {
  promptAskRecipe,
  promptSuggestionRecipe,
} from "@/lib/ai/openai-client";

export async function promptGpt(input: string) {
  return await promptSuggestionRecipe(input);
}

export async function askRecipePromptGpt(language: string, input: string) {
  return await promptAskRecipe(language, input);
}
