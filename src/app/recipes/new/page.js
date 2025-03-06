import { getUserAction } from "@/shared/actions/get-user";
import { NewRecipe } from "./_components/new-recipe";
import { getCategoriesAction } from "./_actions/categories";

export default async function Page() {
  const user = await getUserAction();
  const categories = await getCategoriesAction();

  return <NewRecipe currentUser={user} categories={categories} />;
}
