import dotenv from 'dotenv';

dotenv.config();

export interface AppConfig {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD_HASH?: string;
  NODE_ENV: string;
  LOG_LEVEL: string;
  ALLOW_ORIGIN: string;
}

function getEnv(name: string, fallback?: string, required = false): string {
  const val = process.env[name] ?? fallback;
  if (required && (!val || val.length === 0)) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return val as string;
}

const config: AppConfig = {
  PORT: Number(getEnv('PORT', '4000')),
  DATABASE_URL: getEnv('DATABASE_URL', undefined, true),
  JWT_SECRET: getEnv('JWT_SECRET', undefined, true),
  ADMIN_USERNAME: getEnv('ADMIN_USERNAME', 'admin'),
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  LOG_LEVEL: getEnv('LOG_LEVEL', 'info'),
  ALLOW_ORIGIN: getEnv('ALLOW_ORIGIN', 'http://localhost:5173')
};

export default config;
