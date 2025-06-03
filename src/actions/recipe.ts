import drizzleDb from "@/db";
import { comments, favorites, recipes, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { RecipeItem, UserRecipeItem } from "@/models/recipe";
import { tryCatch } from "@/utils/try-catch";
import {
  and,
  eq,
  count,
  isNull,
  desc,
  ilike,
  arrayOverlaps,
  sql,
} from "drizzle-orm";
import { headers } from "next/headers";

export async function getDetailRecipe(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id || "";
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
        authorId: user.id,
        author: user.name,
        userImage: user.image,
        commentsCount: sql<number>`COUNT(CASE
            WHEN ${comments.id} IS NOT NULL AND ${comments.deletedAt} IS NULL
            THEN 1
          END)`.as("commentsCount"),
        favoriteCount: sql<number>`COUNT(CASE
            WHEN ${favorites.id} IS NOT NULL AND ${favorites.deletedAt} IS NULL
            THEN 1
          END)`.as("favoriteCount"),
        isFavorited: sql<boolean>`EXISTS (
          SELECT 1 FROM ${favorites}
          WHERE ${favorites.recipeId} = ${recipes.id}
            AND ${favorites.userId} = ${userId}
            AND ${favorites.deletedAt} IS NULL
        )`,
      })
      .from(recipes)
      .innerJoin(user, eq(recipes.authorId, user.id))
      .leftJoin(comments, eq(recipes.id, comments.recipeId))
      .leftJoin(favorites, eq(recipes.id, favorites.recipeId))
      .where(eq(recipes.id, id))
      .groupBy(recipes.id, user.id, user.name, user.image)
  );
  if (result.error) {
    console.error(`Failed get detail: ${result.error}`);
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
        username: user.name,
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
    console.error(`Failed recipes: ${result.error}`);
    return [];
  }
  const recipeMap: RecipeItem[] = result.data;

  return recipeMap;
}

export async function getRecipeByUser(userId: string) {
  const result = await tryCatch(
    drizzleDb
      .select({
        id: recipes.id,
        title: recipes.title,
        image: recipes.image,
        username: user.name,
        categories: recipes.categories,
        createdAt: recipes.createdAt,
        likes: count(favorites.id).as("likes"),
      })
      .from(recipes)
      .innerJoin(user, eq(recipes.authorId, user.id))
      .leftJoin(favorites, eq(recipes.id, favorites.recipeId))
      .where(and(isNull(recipes.deletedAt), eq(recipes.authorId, userId)))
      .groupBy(recipes.id, recipes.title, user.name)
      .orderBy(desc(recipes.createdAt))
  );

  if (result.error) {
    console.error(`Failed recipes: ${result.error}`);
    return [];
  }

  const recipeMap: UserRecipeItem[] = result.data;
  return recipeMap;
}

export async function getRecipeFavorite(userId: string) {
  const result = await tryCatch(
    drizzleDb
      .select({
        id: favorites.recipeId,
        title: recipes.title,
        image: recipes.image,
        username: user.name,
        categories: recipes.categories,
        createdAt: recipes.createdAt,
        likes: count(favorites.id).as("likes"),
      })
      .from(favorites)
      .innerJoin(recipes, eq(favorites.recipeId, recipes.id))
      .innerJoin(user, eq(favorites.recipeOwnerId, user.id))
      .where(and(isNull(recipes.deletedAt), eq(favorites.userId, userId)))
      .groupBy(favorites.recipeId, recipes.id, recipes.title, user.name)
      .orderBy(desc(recipes.createdAt))
  );
  if (result.error) {
    console.error(`Failed recipes favorite: ${result.error}`);
    return [];
  }

  const recipeMap: UserRecipeItem[] = result.data;
  return recipeMap;
}
