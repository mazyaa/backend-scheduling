import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/utils/prisma/schema.prisma",
  migrations: {
    path: "src/utils/prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL!
  }
});