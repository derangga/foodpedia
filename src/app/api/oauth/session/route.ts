import { provideSessionAction } from "@/shared/actions/session";
import { validateBearer } from "@/utils/authorization";
import responseBuilder from "@/utils/response-builder";

export async function POST(request: Request) {
  const authorization = request.headers.get("Authorization") || "";

  const secret = process.env.JWT_AUTH || "";
  const result = await validateBearer(authorization, secret);
  if (result.error) {
    console.error(`[ERROR] ${result.error}`);
    return responseBuilder(
      { errors: [{ message: "failed request session" }] },
      result.code
    );
  }

  if (result.claims?.grant_type !== "oauth") {
    return responseBuilder({ message: "Unauthorize" }, 401);
  }
  const token = await provideSessionAction(Number(result.claims.aud));

  return responseBuilder({ token });
}
