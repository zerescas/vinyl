import { type User } from "../prisma/client";

export type UserJwtPayload = Pick<User, "id" | "username">;

export type UserRefreshJwtPayload = Pick<User, "id">;
