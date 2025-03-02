"use server";
import { prisma } from "@/libs/postgres";
import bcrypt from "bcrypt";
import { provideSessionAction } from "@/shared/actions/session";
import { tryCatch } from "@/utils/try-catch";
import { getUserByEmailAction } from "@/shared/actions/get-user";

export async function loginAction(_, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = (success, message) => {
    return { success, message };
  };
  const user = await getUserByEmailAction(email);

  if (!user) {
    return response(false, "invalid credential");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return response(false, "invalid credential");
  }

  await provideSessionAction(user.id);

  return response(true, "");
}

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

  const { data, error } = await tryCatch(
    prisma.user.create({
      data: {
        name,
        email,
        password: hashPw,
        role: "USER",
      },
    })
  );

  if (error || !data) {
    console.log(`register-action [ERROR]: ${error}`);
    return response(false, "failed register user");
  }

  await provideSessionAction(data.id);

  return response(true, "");
}
