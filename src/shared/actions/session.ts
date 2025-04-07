"use server";
import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";
import { joseBuildAndSign } from "@/utils/jwt";

export async function provideSessionAction(userId: number) {
  const date = new Date();
  const jwtSignature = process.env.JWT_SESSION || "";
  date.setMinutes(date.getMinutes() + 180); // session expires in 3hours
  const session = await prisma.session.create({
    data: {
      userId: userId,
      expiresAt: date,
    },
  });

  const token = await joseBuildAndSign({
    grantType: "access_token",
    expiration: "6h",
    userId: userId,
    jti: session.session,
    jwtSignature,
  });

  if (!token) {
    return "";
  }

  const nextCookie = await tryCatch(cookies());
  if (nextCookie.error) {
    console.error(`session-action [ERROR]: ${nextCookie.error}`);
  }
  nextCookie.data?.set("access_token", token, {
    httpOnly: true,
    expires: date,
    secure: process.env.NODE_ENV === "production",
  });
  nextCookie.data?.set("user_id", `${userId}`, {
    httpOnly: true,
    expires: date,
    secure: process.env.NODE_ENV === "production",
  });

  return token;
}
