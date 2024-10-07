import { Module } from "@nestjs/common";
import { TokensRefreshService } from "./tokensRefresh.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [TokensRefreshService],
  exports: [TokensRefreshService],
})
export class TokensRefreshModule {}
