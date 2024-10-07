import { Injectable } from "@nestjs/common";
import { Prisma, User } from "libs/prisma/client";
import { UserSignUp } from "libs/shared-types";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: UserSignUp): Promise<User> {
    return this.prisma.user.create({
      data: userData,
    });
  }

  async find(where: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where,
    });
  }

  async count(where: Prisma.UserWhereInput): Promise<number> {
    return this.prisma.user.count({
      where,
    });
  }
}
