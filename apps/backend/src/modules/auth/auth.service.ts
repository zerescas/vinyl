import * as bcrypt from "bcrypt";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { UsersService } from "../users/users.service";
import { ITokens } from "./types/tokens.interface";
import { UserSignIn, UserSignUp } from "libs/shared-types";
import { TokensPairService } from "src/modules/tokensPair/tokensPair.service";
import { TokensRefreshService } from "../tokensRefresh/tokensRefresh.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensPairService: TokensPairService,
    private tokensRefreshService: TokensRefreshService,
  ) {}

  async isUsernameFree(username: string): Promise<boolean> {
    if (!username || !username.trim()) {
      throw new BadRequestException({
        code: "EMPTY_USERNAME",
        message: "No username provided",
      });
    }

    return !(await this.usersService.count({ username }));
  }

  async signUp(userData: UserSignUp): Promise<ITokens> {
    if (!userData.username.trim()) {
      throw new BadRequestException({
        code: "EMPTY_USERNAME",
        message: "No username provided",
      });
    }

    if (!userData.password.trim()) {
      throw new BadRequestException({
        code: "EMPTY_PASSWORD",
        message: "No password provided",
      });
    }

    if (!userData.email.trim()) {
      throw new BadRequestException({
        code: "EMPTY_EMAIL",
        message: "No email provided",
      });
    }

    if (!userData.name.trim()) {
      throw new BadRequestException({
        code: "EMPTY_NAME",
        message: "No name provided",
      });
    }

    const existingUser = await this.usersService.find({
      OR: [{ username: userData.username }, { email: userData.email }],
    });

    // Check if user already exists
    if (existingUser) {
      // Username conflict
      if (userData.username === existingUser.username) {
        throw new ConflictException({
          code: "USERNAME_TAKEN",
          message: "That username is already taken",
        });
      }

      // Email conflict
      if (userData.email === existingUser.email) {
        throw new ConflictException({
          code: "EMAIL_TAKEN",
          message: "That email is already taken",
        });
      }
    }

    // Hash password before new user creation
    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = await this.usersService.create(userData);

    // Create tokens pair
    const tokens = await this.tokensPairService.create({
      id: newUser.id,
      username: newUser.username,
    });

    this.tokensRefreshService.create(tokens.refresh_token, newUser);

    return tokens;
  }

  async signIn(userData: UserSignIn): Promise<ITokens> {
    if (!userData.username.trim()) {
      throw new BadRequestException({
        code: "EMPTY_USERNAME",
        message: "No username provided",
      });
    }

    if (!userData.password.trim()) {
      throw new BadRequestException({
        code: "EMPTY_PASSWORD",
        message: "No password provided",
      });
    }

    const user = await this.usersService.find({ username: userData.username });

    // Check if user exists
    if (!user) {
      throw new UnauthorizedException({
        code: "WRONG_CREDENTIALS",
        message: "Wrong username or password",
      });
    }

    // Check if password right
    const isPasswordRight = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isPasswordRight) {
      throw new UnauthorizedException({
        code: "WRONG_CREDENTIALS",
        message: "Wrong username or password",
      });
    }

    // Create tokens pair
    const tokens = await this.tokensPairService.create({
      id: user.id,
      username: user.username,
    });

    this.tokensRefreshService.create(tokens.refresh_token, user);

    return tokens;
  }

  async refresh(refreshToken: string): Promise<ITokens> {
    return this.tokensPairService.refresh(refreshToken);
  }

  async signOut(refreshToken: string) {
    this.tokensRefreshService.delete(refreshToken);
  }
}
