"use server";
import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function getUserById(userId: string | undefined) {
  if (!userId) return null;

  console.log("cek: ", userId);
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });

  return user;
}

export async function getUserAction() {
  const nextCookie = await tryCatch(cookies());
  if (nextCookie.error) {
    console.error(`get-user [ERROR]: ${nextCookie.error}`);
    return null;
  }

  const userId = nextCookie.data?.get("user_id")?.value || "";
  const user = await prisma.user.findUnique({
    omit: {
      password: true,
    },
    where: { id: Number(userId) },
  });

  return user;
}

export async function getUserByEmailAction(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}
