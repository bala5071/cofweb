import { PrismaClient } from '@prisma/client';

// Single shared Prisma client instance — avoid multiple clients during hot reload
declare global {
  // eslint-disable-next-line no-var
  var __prisma?: PrismaClient;
}

const prisma = global.__prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma;

export default prisma;
