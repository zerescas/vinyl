import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserJwtPayload } from "libs/shared-types";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: UserJwtPayload) {
    return payload;
  }
}
