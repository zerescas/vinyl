import { Module } from "@nestjs/common";
import { TokensPairService } from "./tokensPair.service";
import { JwtModule } from "@nestjs/jwt";
import { TokensRefreshModule } from "../tokensRefresh/tokensRefresh.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    TokensRefreshModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [TokensPairService],
  exports: [TokensPairService],
})
export class TokensPairModule {}
