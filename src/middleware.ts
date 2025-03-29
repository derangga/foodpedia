import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedPage = ["/aichef", "/recipes/new"];
  const sessionId = req.cookies.get("session_id");
  const protectedRoutes = /^\/recipes\/[^/]+\/edit$/;
  if (req.nextUrl.pathname === "/auth" && sessionId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  } else if (protectedPage.includes(req.nextUrl.pathname) && !sessionId) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  } else if (protectedRoutes.test(req.nextUrl.pathname) && !sessionId) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  return NextResponse.next();
}
