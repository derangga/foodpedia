import { AuthJwtPayload } from "@/libs/custom-token";
import { prisma } from "@/libs/postgres";
import { joseVerify } from "@/utils/jwt";
import responseBuilder from "@/utils/response-builder";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function POST() {
  const nextCookie = await tryCatch(cookies());
  if (nextCookie.error) {
    console.error(`logout-action [ERROR]: ${nextCookie.error}`);
    return responseBuilder({ message: "Bad Request" }, 400);
  }

  const sessionCookie = nextCookie.data.get("access_token");
  const secret = process.env.JWT_SESSION || "";

  if (!sessionCookie || sessionCookie.value === "") {
    return responseBuilder();
  }
  const token = await joseVerify<AuthJwtPayload>(
    sessionCookie?.value || "",
    secret
  );
  if (!token) {
    return responseBuilder({ message: "failed parse token" }, 400);
  }

  const session = await prisma.session.findFirst({
    where: {
      session: token?.jti,
      deletedAt: null,
    },
  });

  if (!session) {
    nextCookie.data.getAll().forEach((cookie) => {
      nextCookie.data.delete(cookie.name);
    });
    return responseBuilder();
  }

  const now = new Date();
  const result = await tryCatch(
    prisma.session.update({
      where: { id: session.id },
      data: { deletedAt: now },
    })
  );

  if (result.error) {
    console.error(`logout-action [ERROR]: ${result.error}`);
    return responseBuilder({ message: "failed execute logout" }, 422);
  }

  nextCookie.data.getAll().forEach((cookie) => {
    nextCookie.data.delete(cookie.name);
  });

  return responseBuilder();
}
