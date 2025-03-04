import { getUserAction } from "@/shared/actions/get-user";
import { NewRecipe } from "./_components/new-recipe";

export default async function Page() {
  const user = await getUserAction();

  return <NewRecipe currentUser={user} />;
}
