"use server";
import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function provideSessionAction(userId: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 180); // session expires in 3hours
  const session = await prisma.session.create({
    data: {
      userId: userId,
      expiresAt: date,
    },
  });

  const nextCookie = await tryCatch(cookies());
  if (nextCookie.error) {
    console.error(`session-action [ERROR]: ${nextCookie.error}`);
  }
  nextCookie.data?.set("session_id", session.session, {
    httpOnly: true,
    expires: date,
    secure: process.env.NODE_ENV === "production",
  });
  nextCookie.data?.set("user_id", `${userId}`, {
    httpOnly: true,
    expires: date,
    secure: process.env.NODE_ENV === "production",
  });
}
