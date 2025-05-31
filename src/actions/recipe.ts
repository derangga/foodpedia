import drizzleDb from "@/db";
import { comments, favorites, recipes, user } from "@/db/schema";
import { RecipeItem } from "@/models/recipe";
import { tryCatch } from "@/utils/try-catch";
import {
  and,
  eq,
  count,
  isNull,
  desc,
  ilike,
  arrayOverlaps,
} from "drizzle-orm";

export async function getDetailRecipe(id: number) {
  const result = await tryCatch(
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
        commentsCount: count(comments.id),
        favoriteCount: count(favorites.id),
      })
      .from(recipes)
      .innerJoin(user, eq(recipes.authorId, user.id))
      .leftJoin(comments, eq(recipes.id, comments.recipeId))
      .leftJoin(favorites, eq(recipes.id, favorites.recipeId))
      .where(eq(recipes.id, id))
      .groupBy(recipes.id, user.name, user.image)
  );
  if (result.error) {
    console.log(`Failed get detail: ${result.error}`);
    return null;
  }
  return result;
}

export async function getRecipes(searchQuery: string, filters: string[]) {
  const result = await tryCatch(
    drizzleDb
      .select({
        id: recipes.id,
        title: recipes.title,
        image: recipes.image,
        userName: user.name,
        categories: recipes.categories,
        createdAt: recipes.createdAt,
      })
      .from(recipes)
      .innerJoin(user, eq(recipes.authorId, user.id))
      .where(
        and(
          isNull(recipes.deletedAt),
          searchQuery ? ilike(recipes.title, `%${searchQuery}%`) : undefined,
          filters.length > 0
            ? arrayOverlaps(recipes.categories, filters)
            : undefined
        )
      )
      .orderBy(desc(recipes.createdAt))
  );
  if (result.error) {
    console.log(`Failed recipes: ${result.error}`);
    return [];
  }
  const recipeMap: RecipeItem[] = result.data;

  return recipeMap;
}
