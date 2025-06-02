import drizzleDb from "@/db";
import { recipes, user } from "@/db/schema";
import { tryCatch } from "@/utils/try-catch";
import { and, count, eq } from "drizzle-orm";

export async function getProfiles(userId: string) {
  const result = await tryCatch(
    drizzleDb
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        bio: user.bio,
        recipePost: count(recipes.authorId).as("recipe_post"),
      })
      .from(user)
      .leftJoin(recipes, eq(user.id, recipes.authorId))
      .where(and(eq(user.id, userId)))
      .groupBy(user.id, recipes.authorId)
  );
  if (result.error) {
    console.error(`failed get profile: ${result.error}`);
    return null;
  }

  const [profile] = result.data;
  return profile;
}
