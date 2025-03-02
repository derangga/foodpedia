"use server";
import { prisma } from "@/libs/postgres";
import bcrypt from "bcrypt";
import { provideSessionAction } from "./session";

export async function registerAction(formData) {
  const name = formData.get("name")?.toString();
  const password = formData.get("password")?.toString();
  const email = formData.get("email")?.toString();

  const response = (success, message) => {
    return {
      success,
      message,
    };
  };

  const hashPw = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPw,
      role: "USER",
    },
  });

  if (!user) {
    return response(false, "failed register user");
  }

  await provideSessionAction(user.id);

  return response(true, "");
}
