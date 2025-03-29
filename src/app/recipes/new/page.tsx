import { getUserById } from "@/shared/actions/get-user";
import { NewRecipe } from "./_components/new-recipe";
import { getCategoriesAction } from "../../../shared/actions/categories";
import { authenticationStatus } from "@/shared/actions/authentication-status";
import { User } from "@/model/user";

export default async function Page() {
  const authStatus = await authenticationStatus();
  const user = await getUserById(authStatus.userId);

  const categories = await getCategoriesAction();

  return <NewRecipe currentUser={user as User} categories={categories} />;
}
