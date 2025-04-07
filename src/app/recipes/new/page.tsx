import { getUserById } from "@/shared/actions/get-user";
import { NewRecipe } from "./_components/new-recipe";
import { getCategoriesAction } from "../../../shared/actions/categories";
import { authStatus } from "@/utils/auth-status";
import { User } from "@/model/user";

export default async function Page() {
  const auth = await authStatus();
  const user = await getUserById(auth.userId);

  const categories = await getCategoriesAction();

  return <NewRecipe currentUser={user as User} categories={categories} />;
}
