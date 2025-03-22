"use server";
import { Recipe } from "@/model/recipe";
import prisma from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function favoriteAction(recipe: Recipe) {
  const nextCookies = await tryCatch(cookies());
  if (nextCookies.error) {
    console.error(`favorite action [ERROR]: failed read cookies`);
    return false;
  }
  const userId: number = Number(nextCookies.data?.get("user_id")?.value);

  const favorite = await prisma.favorite.findFirst({
    where: {
      userId: userId,
      recipeId: recipe.id,
    },
  });

  if (!favorite) {
    const result = await tryCatch(
      prisma.favorite.create({
        data: {
          userId: userId,
          recipeId: recipe.id,
          recipeOwnerId: recipe.userId,
        },
      })
    );

    if (result.error) {
      console.error(`favorite action [ERROR]: ${result.error}`);
      return false;
    }

    revalidatePath(`/recipes/${recipe.id}`);
    return true;
  }

  const deleted = favorite.deletedAt ? null : new Date();
  const result = await tryCatch(
    prisma.favorite.update({
      where: {
        id: favorite.id,
      },
      data: {
        deletedAt: deleted,
      },
    })
  );

  if (result.error) {
    console.error(`favorite action [ERROR]: ${result.error}`);
    return false;
  }

  revalidatePath(`/recipes/${recipe.id}`);
  return true;
}

export async function unfavoriteAction(recipeId: number) {
  const nextCookies = await tryCatch(cookies());
  if (nextCookies.error) {
    console.error(`failed read cookies`);
    return false;
  }

  const userId = nextCookies.data.get("user_id")?.value;
  if (!userId) return false;

  await prisma.favorite.updateMany({
    where: { recipeId: recipeId, userId: Number(userId) },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/profile");

  return true;
}

export async function isFavoritedAction(
  userId: string | undefined,
  recipeId: number | undefined
) {
  if (!userId || !recipeId) return false;

  const result = await prisma.favorite.findFirst({
    where: { userId: Number(userId), recipeId },
  });

  return result && !result.deletedAt ? true : false;
}

export async function getFavoriteByUserIdAction(userId: string | undefined) {
  if (!userId) return [];
  const recipeIds = await prisma.favorite.findMany({
    where: { userId: Number(userId), deletedAt: null },
    select: {
      recipeId: true,
    },
  });

  const recipes = await prisma.recipe.findMany({
    where: {
      id: {
        in: recipeIds.map((e) => e.recipeId),
      },
    },
    select: {
      id: true,
      title: true,
      image: true,
      userId: true,
      categories: true,
      createdAt: true,
    },
  });

  return recipes;
}
