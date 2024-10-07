import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { UserSignIn, UserSignUp } from "libs/shared-types";
import { Public } from "src/common/decorators";
import { RtGuard } from "src/common/guards";
import { IRtStrategyAnswer } from "./strategies";
import { tokensSettings } from "../tokensPair/const";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Get("is-username-free")
  isUsernameFree(@Query() query: { username: string }): Promise<boolean> {
    return this.authService.isUsernameFree(query.username);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("sign-up")
  async signUp(
    @Body() signUpData: UserSignUp,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const tokens = await this.authService.signUp(signUpData);

    response.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: tokensSettings.refreshToken.maxAge,
    });

    return tokens.access_token;
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(
    @Body() signInData: UserSignIn,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const tokens = await this.authService.signIn(signInData);

    response.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: tokensSettings.refreshToken.maxAge,
    });

    return tokens.access_token;
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const { refreshToken } = req.user as IRtStrategyAnswer;
    const tokens = await this.authService.refresh(refreshToken);

    response.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: tokensSettings.refreshToken.maxAge,
    });

    return tokens.access_token;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RtGuard)
  @Post("logout")
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { refreshToken } = req.user as IRtStrategyAnswer;

    await this.authService.signOut(refreshToken);
    response.clearCookie("refresh_token");
  }
}
