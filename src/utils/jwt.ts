import { AuthJwtPayload } from "@/libs/custom-token";
import { jwtVerify, SignJWT } from "jose";

export async function joseVerify<T>(
  token: string,
  secret: string
): Promise<T | null> {
  try {
    const result = await jwtVerify<T>(token, new TextEncoder().encode(secret));
    return result.payload;
  } catch (error) {
    return null;
  }
}

/**
 *
 * @param expiration Valid units are: "sec", "secs", "second", "seconds", "s", "minute", "minutes", "min", "mins",
 * "m", "hour", "hours", "hr", "hrs", "h", "day", "days", "d", "week", "weeks", "w", "year",
 * "years", "yr", "yrs", and "y". It is not possible to specify months. 365.25 days is used as an
 * alias for a year.
 * for example: "1h"
 * @returns token
 */
export async function joseBuildAndSign({
  grantType,
  expiration,
  userId,
  jti,
  jwtSignature,
}: {
  grantType: string;
  expiration: string;
  userId: number;
  jti?: string;
  jwtSignature: string;
}): Promise<string | null> {
  try {
    const secret = new TextEncoder().encode(jwtSignature);
    const alg = "HS256";
    const token = await new SignJWT({ grant_type: grantType, jti })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setAudience(`${userId}`)
      .setExpirationTime(expiration)
      .sign(secret);
    return token;
  } catch (error) {
    return null;
  }
}
