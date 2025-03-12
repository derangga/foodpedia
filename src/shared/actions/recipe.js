import { prisma } from "@/libs/postgres";
import { getUserAction } from "./get-user";
import { tryCatch } from "@/utils/try-catch";

export async function getRecipes() {
  const recipes = prisma.recipe.findMany();
  return recipes;
}
export async function getDetailRecipeAction(recipeId) {
  const recipe = prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      user: {
        omit: {
          email: true,
          password: true,
          registerType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
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
