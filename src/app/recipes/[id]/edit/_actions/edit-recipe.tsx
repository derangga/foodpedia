"use server";

import { prisma } from "@/libs/postgres";
import { uploadImage } from "@/libs/s3";
import { getUserAction } from "@/shared/actions/get-user";
import { tryCatch } from "@/utils/try-catch";
import DOMPurify from "isomorphic-dompurify";

type UpdateRecipe = {
  error: string | null;
};
export async function updateRecipeActions(
  formData: FormData
): Promise<UpdateRecipe> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const story = formData.get("story") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File;
  const ingredients: string[] = JSON.parse(
    formData.get("ingredients") as string
  );
  const categories: string[] = JSON.parse(formData.get("categories") as string);

  if (!id) {
    return { error: "recipe identifier not found" };
  }
  if (!title) {
    return { error: "title is empty" };
  }

  if (categories.length === 0) {
    return { error: "at least contains 1 category" };
  }

  if (!story) {
    return { error: "story is empty" };
  }

  if (ingredients.length === 0) {
    return { error: "at least contains 1 ingredients" };
  }

  if (!content) {
    return { error: "content is empty" };
  }

  const sanitizeContent = DOMPurify.sanitize(content);

  const user = await getUserAction();
  if (!user) {
    return { error: "failet get user data" };
  }

  const data =
    image.size === 0
      ? {
          title,
          story,
          categories: categories,
          ingredients: ingredients,
          description: sanitizeContent,
          updatedAt: new Date(),
        }
      : {
          title,
          story,
          categories: categories,
          ingredients: ingredients,
          description: sanitizeContent,
          image: image.name,
          updatedAt: new Date(),
        };

  const recipe = await tryCatch(
    prisma.recipe.update({
      where: { id: Number(id) },
      data,
    })
  );

  if (recipe.error) {
    console.error(`update-recipe [ERROR]: ${recipe.error}`);
    return { error: "failed update recipe" };
  }

  if (image.size > 0) {
    await uploadImage({
      key: image.name,
      folder: `${recipe.data.id}`,
      body: image,
    });
  }

  return { error: null };
}
