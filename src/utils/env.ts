import 'dotenv/config';

// application environment variables
export const PORT: number = Number(process.env.PORT) || 3000;
export const NODE_ENV: string = process.env.NODE_ENV || '';
export const DATABASE_URL: string = process.env.DATABASE_URL || '';
export const FRONTEND_URL: string = process.env.FRONTEND_URL || '';
export const FRONTEND_URL_PRODUCTION: string = process.env.FRONTEND_URL_PRODUCTION || '';

// production database environment variables
export const DATABASE_URL_PRODUCTION: string = process.env.DATABASE_URL_PRODUCTION || '';

// user roles credentials
export const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL || '';
export const ADMIN_NOWA: string = process.env.ADMIN_NOWA || '';
export const ADMIN_PASSWORD: string = process.env.ADMIN_PASSWORD || '';

export const PESERTA_EMAIL: string = process.env.PESERTA_EMAIL || '';
export const PESERTA_NOWA: string = process.env.PESERTA_NOWA || '';
export const PESERTA_PASSWORD: string = process.env.PESERTA_PASSWORD || '';

export const INSTRUKTUR_EMAIL: string = process.env.INSTRUKTUR_EMAIL || '';
export const INSTRUKTUR_NOWA: string = process.env.INSTRUKTUR_NOWA || '';
export const INSTRUKTUR_PASSWORD: string = process.env.INSTRUKTUR_PASSWORD || '';

export const ASESOR_EMAIL: string = process.env.ASESOR_EMAIL || '';
export const ASESOR_NOWA: string = process.env.ASESOR_NOWA || '';
export const ASESOR_PASSWORD: string = process.env.ASESOR_PASSWORD || '';

export const DIREKTUR_EMAIL: string = process.env.DIREKTUR_EMAIL || '';
export const DIREKTUR_NOWA: string = process.env.DIREKTUR_NOWA || '';
export const DIREKTUR_PASSWORD: string = process.env.DIREKTUR_PASSWORD || '';

// JWT Secret
export const JWT_SECRET: string = process.env.JWT_SECRET || '';
