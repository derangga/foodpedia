"use server";
import drizzleDb from "@/db";
import { favorites } from "@/db/schema";
import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/try-catch";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function favoriteRecipe(recipeId: number, recipeOwnerId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  if (recipeOwnerId === session.user.id) {
    return;
  }

  const favorite = await drizzleDb
    .select({
      id: favorites.id,
      deletedAt: favorites.deletedAt,
    })
    .from(favorites)
    .where(
      and(
        eq(favorites.userId, session.user.id),
        eq(favorites.recipeId, recipeId)
      )
    );

  if (favorite.length === 0) {
    const values: typeof favorites.$inferInsert = {
      userId: session.user.id,
      recipeOwnerId: recipeOwnerId,
      recipeId: recipeId,
      createdAt: new Date(),
    };
    const result = await tryCatch(drizzleDb.insert(favorites).values(values));
    if (result.error) {
      console.error(`favorite action [ERROR]: ${result.error}`);
      return false;
    }

    revalidatePath(`/recipes/${recipeId}`);
    return true;
  }

  const deleted = favorite[0].deletedAt ? null : new Date();
  const result = await tryCatch(
    drizzleDb
      .update(favorites)
      .set({ deletedAt: deleted })
      .where(eq(favorites.id, favorite[0].id))
  );

  if (result.error) {
    console.error(`favorite action [ERROR]: ${result.error}`);
    return false;
  }

  revalidatePath(`/recipes/${recipeId}`);
  return true;
}
