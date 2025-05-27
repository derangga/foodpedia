"use server";

import drizzleDb from "@/db";
import { recipes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { uploadImage } from "@/lib/s3-client";
import { RecipeSchema } from "@/models/recipe";

import DOMPurify from "isomorphic-dompurify";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createNewRecipe(
  formData: FormData
): Promise<number | Error> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const image = formData.get("image") as File;
  const guide = formData.get("guide") as string;
  const sanitizeGuide = DOMPurify.sanitize(guide);
  const categories: string[] = JSON.parse(formData.get("categories") as string);
  const ingredients: string[] = JSON.parse(
    formData.get("ingredients") as string
  );

  try {
    const recipe = RecipeSchema.parse({
      title: formData.get("title"),
      story: formData.get("story"),
      authorId: session.user.id,
      ingredients: ingredients,
      categories: categories,
      image: image.size !== 0 ? image.name : null,
      guide: sanitizeGuide,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const recipeValues: typeof recipes.$inferInsert = {
      title: recipe.title,
      authorId: recipe.authorId,
      story: recipe.story,
      categories: recipe.categories,
      ingredients: recipe.ingredients,
      guide: recipe.guide,
      image: recipe.image,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };

    const [result] = await drizzleDb
      .insert(recipes)
      .values(recipeValues)
      .returning();

    await uploadImage({
      key: image.name,
      folder: `${result.id}`,
      body: image,
    });

    return result.id;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return new Error("something wrong when insert recipe data");
  }
}
