"use server";

import { prisma } from "@/libs/postgres";
import { googleClient } from "@/libs/google";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function validateGoogleAuth(params) {
  try {
    const cookie = await cookies();
    const code = params?.code;
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
    const user = await response.json();
    return response.ok ? user : null;
  } catch (e) {
    return null;
  }
}

export const appAuthFlow = async (googleAccount) => {
  const user = await prisma.user.findUnique({
    where: { email: googleAccount.email },
  });

  if (user) {
    const token = jwt.sign(
      {
        uid: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: 3 * 60 }
    );
    return { token, authType: "login" };
  } else {
    return { authType: "register" };
  }
};

export async function registerGoogleAction(googleAccount) {
  const name = googleAccount.name;
  const email = googleAccount.email;

  const response = (success, message, token) => {
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

  const token = jwt.sign(
    {
      uid: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: 3 * 60 }
  );

  return response(true, "", token);
}
