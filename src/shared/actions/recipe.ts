import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";

export async function getRecipes() {
  const result = await tryCatch(prisma.recipe.findMany());
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
        select: { favorite: true },
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
    })
  );

  if (recipes.error) {
    console.error(`get-recipe-by-uid [ERROR]: ${recipes.error}`);
    return [];
  }

  return recipes.data;
}
