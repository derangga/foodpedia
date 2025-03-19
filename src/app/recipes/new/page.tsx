import { getUserBySessionAction } from "@/shared/actions/get-user";
import { NewRecipe } from "./_components/new-recipe";
import { getCategoriesAction } from "./_actions/categories";
import { authenticationStatus } from "@/shared/actions/authentication-status";
import { redirect } from "next/navigation";

export default async function Page() {
  const authStatus = await authenticationStatus();
  if (!authStatus.isAuthenticate) {
    redirect("/");
  }

  const user = await getUserBySessionAction(authStatus?.sessionId);
  if (!user) {
    redirect("/");
  }
  const categories = await getCategoriesAction();

  return <NewRecipe currentUser={user} categories={categories} />;
}
