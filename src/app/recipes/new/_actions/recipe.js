"use server";

import { prisma } from "@/libs/postgres";
import { uploadImage } from "@/libs/s3";
import { getUserAction } from "@/shared/actions/get-user";
import { tryCatch } from "@/utils/try-catch";
import DOMPurify from "isomorphic-dompurify";

export async function createRecipeActions(formData) {
  const title = formData.get("title");
  const story = formData.get("story");
  const content = formData.get("content");
  const image = formData.get("image");
  const ingredients = formData.get("ingredients");
  const categories = formData.get("categories");

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

  const recipe = await tryCatch(
    prisma.recipe.create({
      data: {
        title,
        story,
        categories: categories.split(","),
        ingredients: ingredients.split(","),
        description: sanitizeContent,
        userId: user.id,
        image: image.size !== 0 ? image.name : null,
      },
    })
  );

  if (recipe.error) {
    console.log(`create-recipe [ERROR]: ${recipe.error}`);
    return { error: "failed create recipe" };
  }

  await uploadImage({
    key: image.name,
    folder: recipe.data.id,
    body: image,
  });

  return recipe.data;
}
