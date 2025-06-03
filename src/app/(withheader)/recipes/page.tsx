import RecipePage from "./recipe-page";
import { getCategories } from "@/actions/categories";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { search = "" } = await searchParams;
  const categories = await getCategories();

  return <RecipePage categories={categories} searchQuery={search} />;
}
