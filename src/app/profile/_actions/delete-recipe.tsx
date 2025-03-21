"use server";

import prisma from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { revalidatePath } from "next/cache";
export async function deleteRecipeAction(
  recipeId: number,
  refreshPath: string
) {
  const result = await tryCatch(
    prisma.recipe.update({
      where: { id: recipeId },
      data: { deletedAt: new Date() },
    })
  );

  if (result.error) {
    return false;
  }

  revalidatePath(refreshPath);

  return true;
}
