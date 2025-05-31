import { getRecipes } from "@/actions/recipe";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const filter = searchParams.get("filter")?.split(",") || [];

  const data = await getRecipes(query, filter);
  return Response.json(data);
}
