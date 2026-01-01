import 'dotenv/config';

export const PORT: number = Number(process.env.PORT) || 3000;
export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const DATABASE_URL: string = process.env.DATABASE_URL || '';
export const FRONTEND_URL: string = process.env.FRONTEND_URL || 'http://localhost:5000';