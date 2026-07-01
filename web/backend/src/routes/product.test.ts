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
        isActive: true,
        media: {
          create: [{ url: 'http://test', isThumbnail: true }]
        }
      }
    });
    productId = product.id;

    // Create an inactive product
    const inactiveProduct = await prisma.product.create({
      data: {
        slug: 'inactive-' + Date.now(),
        hang: 'Apple',
        sanPham: 'Inactive Product',
        phanKhuc: 'PHO_THONG',
        isActive: false
      }
    });
    (global as any).inactiveProductId = inactiveProduct.id;
    (global as any).inactiveProductSlug = inactiveProduct.slug;
  });

  afterAll(async () => {
    if (productId) {
      await prisma.productMedia.deleteMany({ where: { productId } });
      await prisma.product.delete({ where: { id: productId } });
    }
    if ((global as any).inactiveProductId) {
      await prisma.product.delete({ where: { id: (global as any).inactiveProductId } });
    }
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

    it('should NOT return inactive products', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body.data.some((p: any) => p.slug === (global as any).inactiveProductSlug)).toBe(false);
    });

    it('should filter by search query (q)', async () => {
      const res = await request(app).get('/api/products?q=API Test');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data.some((p: any) => p.sanPham.includes('API Test'))).toBe(true);
    });

    it('should sort by price ascending (gia_asc)', async () => {
      // Create a test product with variants to ensure sorting works
      const cheapProd = await prisma.product.create({
        data: {
          slug: `cheap-${Date.now()}`,
          hang: 'Apple',
          sanPham: 'Cheap Phone',
          phanKhuc: 'PHO_THONG',
          variants: {
            create: [{ sku: `cheap-var-${Date.now()}`, ramGb: 4, dungLuongGb: 64, mauSac: 'Den', giaGoc: 100, giaBan: 50, tonKho: 10 }]
          }
        }
      });
      
      const res = await request(app).get('/api/products?sort=gia_asc');
      expect(res.status).toBe(200);
      // Only include products that have variants to avoid Math.min() returning Infinity
      const productsWithVariants = res.body.data.filter((p: any) => p.variants && p.variants.length > 0);
      const prices = productsWithVariants.map((p: any) => Math.min(...p.variants.map((v:any) => v.giaBan)));
      // Ensure sorted ascending
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i+1]);
      }
      
      await prisma.productVariant.deleteMany({ where: { productId: cheapProd.id } });
      await prisma.product.delete({ where: { id: cheapProd.id } });
    });

    it('should sort by price descending (gia_desc)', async () => {
      // Create an extremely expensive test product to ensure descending sort works
      const expensiveProd = await prisma.product.create({
        data: {
          slug: `expensive-${Date.now()}`,
          hang: 'Apple',
          sanPham: 'Expensive Phone',
          phanKhuc: 'FLAGSHIP',
          variants: {
            create: [{ sku: `exp-var-${Date.now()}`, ramGb: 16, dungLuongGb: 1024, mauSac: 'Gold', giaGoc: 100000000, giaBan: 90000000, tonKho: 10 }]
          }
        }
      });
      
      const res = await request(app).get('/api/products?sort=gia_desc');
      expect(res.status).toBe(200);
      // Only include products that have variants to avoid Math.min() returning Infinity
      const productsWithVariants = res.body.data.filter((p: any) => p.variants && p.variants.length > 0);
      const prices = productsWithVariants.map((p: any) => Math.min(...p.variants.map((v:any) => v.giaBan)));
      // Ensure sorted descending
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i+1]);
      }
      
      await prisma.productVariant.deleteMany({ where: { productId: expensiveProd.id } });
      await prisma.product.delete({ where: { id: expensiveProd.id } });
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

    it('should return 404 for inactive product', async () => {
      const res = await request(app).get(`/api/products/${(global as any).inactiveProductSlug}`);
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
