import { authStatus } from "@/utils/auth-status";
import { getUserById } from "@/shared/actions/get-user";
import { redirect } from "next/navigation";
import { getCategoriesAction } from "@/shared/actions/categories";
import { getDetailRecipeAction } from "@/shared/actions/recipe";
import { EditRecipe } from "./_components/edit-recipe";
import { User } from "@/model/user";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const auth = await authStatus();

  const user = await getUserById(auth.userId);

  const recipe = await getDetailRecipeAction(Number(id));

  if (!recipe) {
    redirect("/profile");
  }
  const categories = await getCategoriesAction();

  const props = {
    currentUser: user as User,
    categories,
    recipe,
  };

  return <EditRecipe {...props} />;
}
