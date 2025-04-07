"use server";

import { prisma } from "@/libs/postgres";
import { googleClient } from "@/libs/google/google-client";
import { cookies } from "next/headers";
import { QueryParams } from "@/shared/params";
import { GoogleUserInfo } from "@/libs/google/user";
import { joseBuildAndSign } from "@/utils/jwt";

export async function validateGoogleAuth(params: QueryParams) {
  try {
    const cookie = await cookies();
    const code = params.code as string;
    const codeVerifier = cookie.get("codeVerifier")?.value || "";
    const tokens = await googleClient().validateAuthorizationCode(
      code,
      codeVerifier
    );
    const accessToken = tokens.accessToken();

    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const user: GoogleUserInfo = await response.json();
    return response.ok ? user : null;
  } catch (e) {
    return null;
  }
}

export async function appAuthFlow(googleAccount: GoogleUserInfo) {
  const user = await prisma.user.findUnique({
    where: { email: googleAccount.email },
  });
  const jwtSignature = process.env.JWT_AUTH || "";
  if (user) {
    const token = await joseBuildAndSign({
      grantType: "oauth",
      expiration: "3m",
      userId: user.id,
      jwtSignature,
    });
    return { token, authType: "login" };
  } else {
    return { authType: "register" };
  }
}

export async function registerGoogleAction(googleAccount: GoogleUserInfo) {
  const name = googleAccount.name;
  const email = googleAccount.email;

  const response = (success: boolean, message: string, token?: string) => {
    return {
      success,
      message,
      token,
    };
  };

  const user = await prisma.user.create({
    data: {
      name,
      email,
      registerType: "GOOGLE",
    },
  });

  if (!user) {
    return response(false, "failed register user");
  }

  const jwtSignature = process.env.JWT_AUTH || "";

  const token = await joseBuildAndSign({
    grantType: "oauth",
    expiration: "3m",
    userId: user.id,
    jwtSignature,
  });

  if (!token) {
    return response(false, "failed create session");
  }

  return response(true, "", token);
}
