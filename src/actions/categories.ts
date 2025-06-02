import drizzleDb from "@/db";
import { category } from "@/db/schema";
import Category from "@/models/category";
import { tryCatch } from "@/utils/try-catch";
import { isNull } from "drizzle-orm";

export async function getCategories(): Promise<Category[]> {
  const result = await tryCatch(
    drizzleDb
      .select({
        key: category.key,
        name: category.name,
      })
      .from(category)
      .where(isNull(category.deletedAt))
      .orderBy(category.key)
  );

  if (result.error) {
    console.error(`failed get category: ${result.error}`);
    return [];
  }

  return result.data;
}
