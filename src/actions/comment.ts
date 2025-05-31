import drizzleDb from "@/db";
import { comments, user } from "@/db/schema";
import { tryCatch } from "@/utils/try-catch";
import { eq } from "drizzle-orm";

export async function getCommentsRecipe(recipeId: number) {
  const result = await tryCatch(
    drizzleDb
      .select({
        id: comments.id,
        comment: comments.comment,
        createdAt: comments.createdAt,
        userName: user.name,
        userImage: user.image,
      })
      .from(comments)
      .innerJoin(user, eq(comments.userId, user.id))
      .where(eq(comments.recipeId, recipeId))
  );

  return result;
}
