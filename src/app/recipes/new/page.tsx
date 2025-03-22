import { getUserById } from "@/shared/actions/get-user";
import { NewRecipe } from "./_components/new-recipe";
import { getCategoriesAction } from "../../../shared/actions/categories";
import { authenticationStatus } from "@/shared/actions/authentication-status";
import { redirect } from "next/navigation";
import { User } from "@/model/user";

export default async function Page() {
  const authStatus = await authenticationStatus();
  if (!authStatus.isAuthenticate) {
    redirect("/auth");
  }

  const user = await getUserById(authStatus.userId);
  if (!user) {
    redirect("/auth");
  }
  const categories = await getCategoriesAction();

  return <NewRecipe currentUser={user as User} categories={categories} />;
}
