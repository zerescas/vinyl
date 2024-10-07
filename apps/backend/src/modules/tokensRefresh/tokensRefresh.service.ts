import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRefreshToken } from "libs/prisma/client";
import { UserRefreshJwtPayload } from "libs/shared-types";
import { decodeToken, hashToken } from "src/common/utils";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
/**
 * Service to work with "refresh_token"
 */
export class TokensRefreshService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(
    refreshToken: string,
    payload: UserRefreshJwtPayload,
  ): Promise<void> {
    const hashedToken = await hashToken(refreshToken);
    const decodedToken = decodeToken(this.jwtService, refreshToken);

    await this.prisma.userRefreshToken.create({
      data: {
        userId: payload.id,
        token: hashedToken,
        createdAt: Date.now(),
        usedAt: Date.now(),
        expiresAt: decodedToken.payload.exp!,
      },
    });
  }

  async findByToken(refreshToken: string): Promise<UserRefreshToken | null> {
    const hashedToken = await hashToken(refreshToken);

    return await this.prisma.userRefreshToken.findFirst({
      where: {
        token: hashedToken,
      },
    });
  }

  async update(tokenId: number, newToken: string): Promise<void> {
    const hashedToken = await hashToken(newToken);
    const decodedToken = decodeToken(this.jwtService, newToken);

    await this.prisma.userRefreshToken.update({
      where: {
        id: tokenId,
      },
      data: {
        token: hashedToken,
        usedAt: Date.now(),
        expiresAt: decodedToken.payload.exp!,
      },
    });
  }

  async delete(token: string): Promise<void> {
    const hashedToken = await hashToken(token);

    await this.prisma.userRefreshToken.deleteMany({
      where: {
        token: hashedToken,
      },
    });
  }
}
