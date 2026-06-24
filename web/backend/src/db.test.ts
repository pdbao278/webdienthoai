import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Database Schema', () => {
  let productId: string;

  beforeAll(async () => {
    const product = await prisma.product.create({
      data: {
        slug: `db-test-${Date.now()}`,
        hang: 'Apple',
        sanPham: 'DB Test Product',
        phanKhuc: 'FLAGSHIP',
        media: {
          create: [{ url: 'http://test', isThumbnail: true }]
        }
      }
    });
    productId = product.id;
  });

  afterAll(async () => {
    await prisma.productMedia.deleteMany({ where: { productId } });
    await prisma.product.delete({ where: { id: productId } });
    await prisma.$disconnect();
  });

  it('can query products from the database', async () => {
    const products = await prisma.product.findMany();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('sanPham');
  });

  it('can query product media relations', async () => {
    const productWithMedia = await prisma.product.findUnique({
      where: { id: productId },
      include: { media: true }
    });
    expect(productWithMedia).toBeDefined();
    expect(productWithMedia?.media).toBeDefined();
    expect(Array.isArray(productWithMedia?.media)).toBe(true);
    expect(productWithMedia?.media.length).toBeGreaterThan(0);
  });
});
