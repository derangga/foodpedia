import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";

export async function getRecipes() {
  const result = await tryCatch(
    prisma.recipe.findMany({
      where: { deletedAt: null },
    })
  );
  if (result.error) return [];
  return result.data;
}
export async function getDetailRecipeAction(recipeId: number) {
  const recipe = prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          favorites: { where: { deletedAt: null } },
          comments: { where: { deletedAt: null } },
        },
      },
    },
  });

  return recipe;
}

export async function getRecipeByUserIdAction(userId: string | undefined) {
  if (!userId) return [];

  const recipes = await tryCatch(
    prisma.recipe.findMany({
      where: {
        userId: Number(userId),
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        image: true,
        userId: true,
        categories: true,
        createdAt: true,
      },
    })
  );

  if (recipes.error) {
    console.error(`get-recipe-by-uid [ERROR]: ${recipes.error}`);
    return [];
  }

  return recipes.data;
}
