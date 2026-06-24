import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Database Schema', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('can query products from the database', async () => {
    const products = await prisma.product.findMany();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('sanPham');
  });

  it('can query product media relations', async () => {
    const productWithMedia = await prisma.product.findFirst({
      include: { media: true }
    });
    expect(productWithMedia).toBeDefined();
    expect(productWithMedia?.media).toBeDefined();
    expect(Array.isArray(productWithMedia?.media)).toBe(true);
  });
});
