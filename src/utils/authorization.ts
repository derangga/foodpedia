import { AuthJwtPayload } from "@/libs/custom-token";
import { joseVerify } from "@/utils/jwt";
import { JWTExpired } from "jose/errors";

export async function validateBearer(authorization: string, signature: string) {
  try {
    const accessToken = authorization.split(" ");
    if (!authorization || accessToken[0] !== "Bearer") {
      return { error: "unauthorize", code: 401 };
    }

    const tokenClaims = await joseVerify<AuthJwtPayload>(
      accessToken[1],
      signature
    );
    return { claims: tokenClaims };
  } catch (error) {
    if (error instanceof JWTExpired) {
      return { error: "token expired", code: 401 };
    }
    return { error: "internal server error", code: 500 };
  }
}
