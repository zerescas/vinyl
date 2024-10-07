import { type User } from "../prisma/client";

export type UserSignUp = Pick<
  User,
  "username" | "email" | "password" | "name" | "lastName"
>;

export type UserSignIn = Pick<User, "username" | "password">;
