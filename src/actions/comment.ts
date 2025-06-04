"use server";
import drizzleDb from "@/db";
import { comments, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { CommentSchema } from "@/models/comment";
import { tryCatch } from "@/utils/try-catch";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { ZodError } from "zod";

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

  try {
    const comment = CommentSchema.parse({
      recipeId: parseInt(formData.get("id") as string),
      comment: formData.get("comment") as string,
    });

    const commentValue: typeof comments.$inferInsert = {
      userId: session.user.id,
      recipeId: comment.recipeId,
      comment: comment.comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await drizzleDb.insert(comments).values(commentValue).returning();

    revalidatePath(`/recipes/${comment.recipeId}`);
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      return Error("Please post a valid comment");
    }
    console.error(`failed post comment: ${error}`);
    return Error("Can't post a comment right know, please try again later");
  }
}
