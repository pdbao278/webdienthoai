import { PrismaClient } from '@prisma/client';

/**
 * Prisma Singleton — tránh tạo nhiều connection pool.
 * Tất cả controller/service phải import prisma từ file này.
 */
const prisma = new PrismaClient();

export default prisma;
