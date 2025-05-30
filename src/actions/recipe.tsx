import drizzleDb from "@/db";
import { recipes, user } from "@/db/schema";
import { tryCatch } from "@/utils/try-catch";
import { eq } from "drizzle-orm";

export async function getDetailRecipe(id: number) {
  const recipe = await tryCatch(
    drizzleDb
      .select({
        id: recipes.id,
        title: recipes.title,
        image: recipes.image,
        categories: recipes.categories,
        ingredients: recipes.ingredients,
        story: recipes.story,
        guide: recipes.guide,
        createdAt: recipes.createdAt,
        userName: user.name,
        userImage: user.image,
      })
      .from(recipes)
      .innerJoin(user, eq(recipes.authorId, user.id))
      .where(eq(recipes.id, id))
  );
  return recipe;
}
