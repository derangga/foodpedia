"use server";
import { promptDetailRecipe, promptSuggestionRecipe } from "@/libs/ai-client";
import { prisma } from "@/libs/postgres";
import { getUserAction } from "@/shared/actions/get-user";

export async function getGptSessionByUserId() {
  const user = await getUserAction();
  const gptSession = await prisma.gptSession.findFirst({
    where: {
      userId: user.id,
    },
  });

  return gptSession;
}

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
