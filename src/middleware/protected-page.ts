import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthJwtPayload } from "@/libs/custom-token";
import { joseVerify } from "@/utils/jwt";
import { JWTExpired } from "jose/errors";
import { cookies } from "next/headers";

export default async function protectedPage(
  req: NextRequest,
  accessToken: string
) {
  try {
    const secret = process.env.JWT_SESSION || "";
    const tokenClaims = await joseVerify<AuthJwtPayload>(accessToken, secret);
    if (!tokenClaims) {
      await clearCookie();
      return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }
    return NextResponse.next();
  } catch (error) {
    if (error instanceof JWTExpired) {
      await clearCookie();
      return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }
}

async function clearCookie() {
  const cookie = await cookies();
  cookie.getAll().forEach((e) => {
    cookie.delete(e.name);
  });
}
