import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";

export async function getCategoriesAction() {
  const result = await tryCatch(prisma.category.findMany());

  if (result.error) {
    console.error(`get-categories [ERROR]: ${result.error}`);
    return [];
  }

  const categories = result.data.map((e) => {
    return e.name;
  });

  return categories;
}
