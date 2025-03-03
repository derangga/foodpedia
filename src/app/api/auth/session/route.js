import { provideSessionAction } from "@/shared/actions/session";
import responseBuilder from "@/utils/response-builder";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const authorization = request.headers.get("Authorization") || "";
    const accessToken = authorization.split(" ");

    if (!authorization || accessToken[0] !== "Bearer") {
      return responseBuilder({ message: "Unauthorize" }, 401);
    }

    const tokenClaims = jwt.verify(accessToken[1], process.env.JWT_SECRET);
    await provideSessionAction(tokenClaims.uid);

    return responseBuilder();
  } catch (error) {
    console.log(`[ERROR] ${error}`);
    return responseBuilder(
      { errors: [{ message: "failed request session" }] },
      422
    );
  }
}
