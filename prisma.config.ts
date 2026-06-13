import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "src/utils/prisma/schema.prisma",
  migrations: {
    path: "src/utils/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL")!,
  }
});