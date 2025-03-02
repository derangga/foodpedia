"use server";

import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function logoutActions() {
  const response = (success, message) => {
    return { success, message };
  };

  const cookie = await tryCatch(cookies());
  if (cookie.error) {
    console.log(`logout-action [ERROR]: ${cookie.error}`);
    return response(false, "failed read cookies");
  }

  const sessionCookie = cookie.data.get("session_id");
  if (!sessionCookie || sessionCookie.value === "") {
    return response(true, "");
  }

  const session = await prisma.session.findUnique({
    where: { session: sessionCookie.value },
  });
  if (session.deletedAt) {
    return response(true, "");
  }

  const now = new Date();
  const result = await tryCatch(
    prisma.session.update({
      where: { session: sessionCookie.value },
      data: { deletedAt: now },
    })
  );

  if (result.error) {
    console.log(`logout-action [ERROR]: ${result.error}`);
    return response(false, "failed execute logout");
  }
  cookie.data.delete("session_id");

  return response(true, "");
}
