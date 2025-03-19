import { prisma } from "@/libs/postgres";
import { getUserAction } from "./get-user";
import { tryCatch } from "@/utils/try-catch";

export async function getRecipes() {
  const recipes = prisma.recipe.findMany();
  return recipes;
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

export async function getRecipeByUserIdAction() {
  const user = await getUserAction();
  if (!user) return null;

  const recipes = await tryCatch(
    prisma.recipe.findMany({
      where: {
        userId: user.id,
      },
    })
  );

  if (recipes.error) {
    console.log(`get-recipe-by-uid [ERROR]: ${recipes.error}`);
    return [];
  }

  return recipes.data;
}
