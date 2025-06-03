"use server";
import drizzleDb from "@/db";
import { comments, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/try-catch";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

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

export async function postCommentRecipe(
  _: boolean | Error | null,
  formData: FormData
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Error("You need a login to post the comment");
  }

  const id = formData.get("id") as string;
  const comment = formData.get("comment") as string;

  const commentValue: typeof comments.$inferInsert = {
    userId: session.user.id,
    recipeId: parseInt(id),
    comment: comment,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await tryCatch(
    drizzleDb.insert(comments).values(commentValue).returning()
  );

  if (result.error) {
    console.error(`failed post comment: ${result.error}`);
    return Error("Can't post a comment right know, please try again later");
  }

  revalidatePath(`/recipes/${id}`);
  return true;
}
