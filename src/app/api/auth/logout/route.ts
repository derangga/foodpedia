import { prisma } from "@/libs/postgres";
import responseBuilder from "@/utils/response-builder";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function POST() {
  const nextCookie = await tryCatch(cookies());
  if (nextCookie.error) {
    console.error(`logout-action [ERROR]: ${nextCookie.error}`);
    return responseBuilder({ message: "Bad Request" }, 400);
  }

  const sessionCookie = nextCookie.data.get("session_id");
  if (!sessionCookie || sessionCookie.value === "") {
    return responseBuilder();
  }

  const session = await prisma.session.findUnique({
    where: { session: sessionCookie.value },
  });

  if (!session || session.deletedAt) {
    nextCookie.data.delete("session_id");
    return responseBuilder();
  }

  const now = new Date();
  const result = await tryCatch(
    prisma.session.update({
      where: { session: sessionCookie.value },
      data: { deletedAt: now },
    })
  );

  if (result.error) {
    console.error(`logout-action [ERROR]: ${result.error}`);
    return responseBuilder({ message: "failed execute logout" }, 422);
  }
  nextCookie.data.delete("session_id");

  return responseBuilder();
}
