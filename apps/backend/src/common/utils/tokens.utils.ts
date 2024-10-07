import * as crypto from "crypto";

import { JwtService } from "@nestjs/jwt";
import { UserJwtPayload } from "libs/shared-types";

export interface IDecodedJwt<T> {
  payload: T & {
    iat: number;
    exp: number;
  };
}

export async function hashToken(token: string): Promise<string> {
  const secret = process.env.JWT_SECRET;
  return crypto.createHmac("sha256", secret).update(token).digest("hex");
}

export function decodeToken(
  jwtService: JwtService,
  token: string,
): IDecodedJwt<UserJwtPayload> {
  return jwtService.decode(token, {
    complete: true,
  });
}
