import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserJwtPayload, UserRefreshJwtPayload } from "libs/shared-types";
import { decodeToken } from "src/common/utils";
import { ITokens } from "src/modules/auth/types";
import { TokensRefreshService } from "../tokensRefresh/tokensRefresh.service";
import { tokensSettings } from "./const";
import { UsersService } from "../users/users.service";

@Injectable()
/**
 * Service to work with "access_token", "refresh_token"
 */
export class TokensPairService {
  constructor(
    private jwtService: JwtService,
    private tokensRefreshService: TokensRefreshService,
    private usersService: UsersService,
  ) {}

  /**
   * Create access/refresh JWT tokens pair
   * @returns JSON tokens pair
   */
  async create(userData: UserJwtPayload): Promise<ITokens> {
    const accessPayload: UserJwtPayload = {
      id: userData.id,
      username: userData.username,
    };
    const refreshPayload: UserRefreshJwtPayload = {
      id: userData.id,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        expiresIn: tokensSettings.accessToken.expiresIn,
      }),
      this.jwtService.signAsync(refreshPayload, {
        expiresIn: tokensSettings.refreshToken.expiresIn,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  /**
   * Get refresh_token and create new access/refresh JWT tokens pair
   * @returns JSON tokens pair
   */
  async refresh(refreshToken: string): Promise<ITokens> {
    const existingToken =
      await this.tokensRefreshService.findByToken(refreshToken);

    // Check if refresh_token exists
    if (!existingToken) {
      throw new ForbiddenException("refresh_token doesn't exist in database");
    }

    if (existingToken.expiresAt >= Date.now()) {
      throw new ForbiddenException("refresh_token is expired", {
        description: "REFRESH_TOKEN_EXPIRED",
      });
    }

    // Create new tokens pair
    const decodedToken = decodeToken(this.jwtService, refreshToken);
    const user = await this.usersService.find({ id: decodedToken.payload.id });

    if (!user) {
      throw new ForbiddenException(
        "User that wants to refresh tokens pair doesn't exists",
      );
    }

    const tokens = await this.create({
      id: user.id,
      username: user.username,
    });

    // Update existing refresh_token
    this.tokensRefreshService.update(existingToken.id, tokens.refresh_token);

    return tokens;
  }
}
