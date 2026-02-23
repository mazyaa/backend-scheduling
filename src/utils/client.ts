import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL; // get connection string from environment variable

const adapter = new PrismaPg({ connectionString }); // use adapter for connection to PostgreSQL
export const prisma = new PrismaClient({ adapter }); // initialize Prisma Client with the adapter


