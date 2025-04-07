"use server";

import { prisma } from "@/libs/postgres";
import { uploadImage } from "@/libs/s3";
import { getUserAction } from "@/shared/actions/get-user";
import { tryCatch } from "@/utils/try-catch";
import DOMPurify from "isomorphic-dompurify";

type CreateRecipe = {
  error: string | null;
};
export async function createRecipeActions(
  formData: FormData
): Promise<CreateRecipe> {
  const title = formData.get("title") as string;
  const story = formData.get("story") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File;
  const ingredients: string[] = JSON.parse(
    formData.get("ingredients") as string
  );
  const categories: string[] = JSON.parse(formData.get("categories") as string);

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

  if (image.size === 0) {
    return { error: "image should provided" };
  }

  const sanitizeContent = DOMPurify.sanitize(content);

  const user = await getUserAction();
  if (!user) {
    return { error: "failed get user data" };
  }

  const recipe = await tryCatch(
    prisma.recipe.create({
      data: {
        title,
        story,
        categories: categories,
        ingredients: ingredients,
        description: sanitizeContent,
        userId: user.id,
        image: image.size !== 0 ? image.name : null,
      },
    })
  );

  if (recipe.error) {
    console.error(`create-recipe [ERROR]: ${recipe.error}`);
    return { error: "failed create recipe" };
  }

  await uploadImage({
    key: image.name,
    folder: `${recipe.data.id}`,
    body: image,
  });

  return { error: null };
}
