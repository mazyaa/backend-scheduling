import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL_PRODUCTION } from './env';

const connectionString = DATABASE_URL_PRODUCTION;

const adapter = new PrismaPg({ connectionString }); // use adapter for connection to PostgreSQL
export const prisma = new PrismaClient({ adapter }); // initialize Prisma Client with the adapter


