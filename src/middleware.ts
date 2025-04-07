import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import protectedPage from "./middleware/protected-page";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");

  if (req.nextUrl.pathname === "/auth" && accessToken?.value) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  } else if (isRouteGuarded(req.nextUrl.pathname, accessToken?.value)) {
    const res = await protectedPage(req, accessToken?.value as string);
    return res;
  }
  return NextResponse.next();
}

function isRouteGuarded(
  targetRoute: string,
  accessToken: string | undefined
): boolean {
  const protectedRoute = ["/aichef", "/recipes/new", "/profile"];
  const editRecipe = /^\/recipes\/[^/]+\/edit$/;
  const verifyPath =
    protectedRoute.includes(targetRoute) || editRecipe.test(targetRoute);
  return verifyPath && accessToken !== "";
}
