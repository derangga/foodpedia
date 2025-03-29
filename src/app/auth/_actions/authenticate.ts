"use server";
import { prisma } from "@/libs/postgres";
import bcrypt from "bcrypt";
import { provideSessionAction } from "@/shared/actions/session";
import { tryCatch } from "@/utils/try-catch";
import { getUserByEmailAction } from "@/shared/actions/get-user";
import { cookies } from "next/headers";
import * as arctic from "arctic";
import { googleClient } from "@/libs/google/google-client";
import { redirect } from "next/navigation";
import { User } from "@/model/user";

export async function loginAction(_: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = (success: boolean, message: string, user?: User) => {
    return { success, message, user };
  };
  const user = await getUserByEmailAction(email);

  if (!user) {
    return response(false, "invalid credential");
  }

  const isValid = await bcrypt.compare(password, user.password || "");
  if (!isValid) {
    return response(false, "invalid credential");
  }

  await provideSessionAction(user.id);

  return response(true, "", {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
  });
}

export async function loginGoogleAction(_: any, formData: FormData) {
  const nextCookie = await tryCatch(cookies());
  if (nextCookie.error) {
    console.error(`login-google-action: ${nextCookie.error}`);
    return;
  }

  const cookie = nextCookie.data;
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];
  const url = googleClient().createAuthorizationURL(
    state,
    codeVerifier,
    scopes
  );

  cookie.set("codeVerifier", codeVerifier, { httpOnly: true });

  redirect(`${url.href}`);
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;

  const response = (success: boolean, message: string) => {
    return {
      success,
      message,
    };
  };

  const salt = process.env.BCRYPT_SALT || "";
  const hashPw = await bcrypt.hash(password, Number(salt));

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
    console.error(`register-action [ERROR]: ${error}`);
    return response(false, "failed register user");
  }

  await provideSessionAction(data.id);

  return response(true, "");
}
