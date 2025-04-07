import { JWTPayload } from "jose";

export interface AuthJwtPayload extends JWTPayload {
  grant_type: string;
}
