"use server";
import drizzleDb from "@/db";
import { recipes, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/try-catch";
import { and, count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

export async function updateBio(_: boolean | Error | null, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }
  const bio = formData.get("bio") as string;

  const result = await tryCatch(
    drizzleDb.update(user).set({ bio: bio }).where(eq(user.id, session.user.id))
  );
  if (result.error) {
    console.error(`failed update bio: ${result.error}`);
    return Error("Something wrong with you request please try again later");
  }

  revalidatePath("/profiles");
  return true;
}
