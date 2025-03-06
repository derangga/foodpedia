"use server";

import { prisma } from "@/libs/postgres";
import { getUserAction } from "@/shared/actions/get-user";
import { tryCatch } from "@/utils/try-catch";
import DOMPurify from "isomorphic-dompurify";

export async function createRecipeActions(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const ingridients = formData.get("ingridients");
  const categories = formData.get("categories");

  if (!title) {
    return { error: "title is empty" };
  }

  if (categories.length === 0) {
    return { error: "at least contains 1 category" };
  }

  if (ingridients.length === 0) {
    return { error: "at least contains 1 ingridients" };
  }

  if (!content) {
    return { error: "content is empty" };
  }

  const sanitizeContent = DOMPurify.sanitize(content);
  const user = await getUserAction();

  const recipe = await tryCatch(
    prisma.recipe.create({
      data: {
        title,
        categories: categories.split(","),
        ingridients: ingridients.split(","),
        description: sanitizeContent,
        userId: user.id,
      },
    })
  );

  if (recipe.error) {
    console.log(`create-recipe [ERROR]: ${recipe.error}`);
    return { error: "failed create recipe" };
  }

  return recipe.data;
}
