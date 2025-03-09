import { prisma } from "@/libs/postgres";

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
