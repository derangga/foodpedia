import { getUserAction } from "@/shared/actions/get-user";
import { getDetailRecipeAction } from "./_actions/recipe-detail";
import { DetailPage } from "./_components/detail-page";

export default async function Page({ params }) {
  const { id } = await params;
  const recipe = await getDetailRecipeAction(Number(id));
  const currentUser = await getUserAction();

  return <DetailPage currentUser={currentUser} recipe={recipe} />;
}
