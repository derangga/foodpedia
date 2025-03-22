"use server";

import { tryCatch } from "@/utils/try-catch";
import prisma from "@/libs/postgres";
import { revalidatePath } from "next/cache";

export async function commentRecipeAction(
  _: any | undefined | null,
  formData: FormData
) {
  const userId = formData.get("userId") as string;
  const recipeId = formData.get("recipeId") as string;
  const comment = formData.get("comment") as string;

  if (!userId || !recipeId || !comment) return false;

  const result = await tryCatch(
    prisma.comment.create({
      data: {
        userId: Number(userId),
        recipeId: Number(recipeId),
        comment,
      },
    })
  );
  if (result.error) {
    console.error(`failed create comment [ERROR]: ${result.error}`);
    return false;
  }

  revalidatePath(`/recipes/${recipeId}`);
  return true;
}

export async function deleteCommentAction(commentId: number, recipeId: number) {
  const result = await tryCatch(
    prisma.comment.update({
      where: { id: commentId },
      data: {
        deletedAt: new Date(),
      },
    })
  );

  if (result.error) {
    console.error(`failed delete comment [ERROR]: ${result.error}`);
    return false;
  }

  revalidatePath(`/recipes/${recipeId}`);
  return true;
}

export async function getCommentsAction(recipeId: number | undefined) {
  if (!recipeId) return [];
  const comments = prisma.comment.findMany({
    where: { recipeId, deletedAt: null },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return comments;
}
