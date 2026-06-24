import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Product API', () => {
  let productSlug: string;
  let productId: string;

  beforeAll(async () => {
    productSlug = `prod-api-${Date.now()}`;
    const product = await prisma.product.create({
      data: {
        slug: productSlug,
        hang: 'Apple',
        sanPham: 'API Test Product',
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

  describe('GET /api/products', () => {
    it('should return paginated products', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.pagination).toBeDefined();
    });

    it('should filter by hang', async () => {
      const res = await request(app).get('/api/products?hang=Apple');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data.every((p: any) => p.hang.toLowerCase().includes('apple'))).toBe(true);
    });
  });

  describe('GET /api/products/:slug', () => {
    it('should return product details including media', async () => {
      const res = await request(app).get(`/api/products/${productSlug}`);
      expect(res.status).toBe(200);
      expect(res.body.slug).toBe(productSlug);
      expect(res.body.media).toBeDefined();
    });

    it('should return 404 for invalid slug', async () => {
      const res = await request(app).get('/api/products/invalid-slug-1234');
      expect(res.status).toBe(404);
    });


  });

  describe('GET /api/search', () => {
    it('should return search suggestions', async () => {
      const res = await request(app).get('/api/search?q=iPhone');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
