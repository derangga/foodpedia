import { getCategories } from "@/actions/categories";
import NewRecipePage from "./new-recipe";

export default async function Page() {
  const categories = await getCategories();

  return <NewRecipePage categories={categories} />;
}
