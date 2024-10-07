import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { UserJwtPayload } from "libs/shared-types";

export interface IRtStrategyAnswer {
  refreshToken: string;
  payload: UserJwtPayload;
}

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies["refresh_token"];
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: UserJwtPayload,
  ): Promise<IRtStrategyAnswer> {
    const refreshToken = req.cookies["refresh_token"];

    return {
      refreshToken,
      payload,
    };
  }
}
