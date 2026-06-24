import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Product API', () => {
  afterAll(async () => {
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
      expect(res.body.data.every((p: any) => p.hang === 'Apple')).toBe(true);
    });
  });

  describe('GET /api/products/:slug', () => {
    it('should return product details including media', async () => {
      // Find a valid slug first
      const p = await prisma.product.findFirst();
      if (!p) return; // Skip if db is empty, but we seeded it

      const res = await request(app).get(`/api/products/${p.slug}`);
      expect(res.status).toBe(200);
      expect(res.body.slug).toBe(p.slug);
      expect(res.body.media).toBeDefined();
    });

    it('should return 404 for invalid slug', async () => {
      const res = await request(app).get('/api/products/invalid-slug-1234');
      expect(res.status).toBe(404);
    });

    it('should have 35M price for Titan Tự nhiên variant of iPhone 15 Pro Max 256GB', async () => {
      const p = await prisma.product.findUnique({
        where: { slug: 'iphone-15-pro-max-256gb' },
        include: { variants: true }
      });
      expect(p).toBeDefined();
      const variant = p?.variants.find(v => v.mauSac === 'Titan Tự nhiên');
      expect(variant).toBeDefined();
      expect(variant?.giaBan).toBe(35000000);
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
