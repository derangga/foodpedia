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
} from "drizzle-orm";
import { headers } from "next/headers";

export async function getDetailRecipe(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id || "";

  try {
    const detail = await drizzleDb
      .select({
        id: recipes.id,
        title: recipes.title,
        image: recipes.image,
        categories: recipes.categories,
        ingredients: recipes.ingredients,
        story: recipes.story,
        guide: recipes.guide,
        authorId: recipes.authorId,
        authorName: user.name,
        authorImage: user.image,
        createdAt: recipes.createdAt,
      })
      .from(recipes)
      .innerJoin(user, eq(recipes.authorId, user.id))
      .where(and(eq(recipes.id, id), isNull(recipes.deletedAt)));

    if (!detail[0]) {
      return null;
    }

    const [commentsCount, favoriteCount] = await Promise.all([
      drizzleDb
        .select({ count: count(comments.id) })
        .from(comments)
        .where(and(eq(comments.recipeId, id), isNull(comments.deletedAt))),
      drizzleDb
        .select({ count: count(favorites.id) })
        .from(favorites)
        .where(and(eq(favorites.recipeId, id), isNull(favorites.deletedAt))),
    ]);

    let isFavorited = false;
    if (userId) {
      const favoriteCheck = await drizzleDb
        .select({ id: favorites.id })
        .from(favorites)
        .where(
          and(
            eq(favorites.recipeId, id),
            eq(favorites.userId, userId),
            isNull(favorites.deletedAt)
          )
        )
        .limit(1);

      isFavorited = favoriteCheck.length > 0;
    }

    return {
      ...detail[0],
      commentsCount: commentsCount[0]?.count || 0,
      favoriteCount: favoriteCount[0]?.count || 0,
      isFavorited,
    };
  } catch (error) {
    console.error(`failed get detail: ${error}`);
    return null;
  }
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
