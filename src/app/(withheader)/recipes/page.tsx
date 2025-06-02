import RecipePage from "./recipe-page";
import { getCategories } from "@/actions/categories";

export default async function Page() {
  const categories = await getCategories();

  return <RecipePage categories={categories} />;
}
