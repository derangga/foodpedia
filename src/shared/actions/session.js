"use server";
import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function provideSessionAction(userId) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 180); // session expires in 3hours
  const session = await prisma.session.create({
    data: {
      userId: userId,
      expiresAt: date,
    },
  });

  const { data, error } = await tryCatch(cookies());
  if (error) {
    console.log(`session-action [ERROR]: ${error}`);
  }
  data.set("session_id", session.session, {
    httpOnly: true,
    expires: date,
    secure: process.env.NODE_ENV === "production",
  });
}
