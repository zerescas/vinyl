import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/modules/users/users.module";
import { TokensPairModule } from "src/modules/tokensPair/tokensPair.module";
import { TokensRefreshModule } from "../tokensRefresh/tokensRefresh.module";
import { AtStrategy, RtStrategy } from "./strategies";

@Module({
  imports: [UsersModule, TokensRefreshModule, TokensPairModule],
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
