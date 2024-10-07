import type { JwtPayload } from "jwt-decode";

export type DecodedJwt<T> = T & JwtPayload;
