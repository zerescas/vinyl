import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

function checkEnvironmentVariables() {
  if (!process.env.JWT_SECRET) throw new Error(`"JWT_SECRET" is empty!`);
}

async function bootstrap() {
  checkEnvironmentVariables();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.enableCors({ origin: ["http://localhost:3000"], credentials: true });

  await app.listen(9000);
}
bootstrap();
