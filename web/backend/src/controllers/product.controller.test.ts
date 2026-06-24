import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import productRoutes from '../routes/product.routes';

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

const prisma = new PrismaClient();

describe('Product Controller', () => {
  // We rely on seeded data or we create test data
  beforeAll(async () => {
    // We assume the DB is seeded. We can just test the response format.
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return products with variants array', async () => {
    const res = await request(app).get('/api/products');
    
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    
    if (res.body.data.length > 0) {
      const product = res.body.data[0];
      // Assert that variants are included
      expect(product.variants).toBeDefined();
      expect(product.variants).toBeInstanceOf(Array);
      if (product.variants.length > 0) {
        expect(product.variants[0]).toHaveProperty('giaBan');
        expect(product.variants[0]).toHaveProperty('dungLuongGb');
      }
    }
  });

  it('should filter products by minPrice and maxPrice based on variants', async () => {
    // We filter products between 20M and 25M
    const res = await request(app).get('/api/products?minPrice=20000000&maxPrice=25000000');
    
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    
    // Each returned product should have at least one variant in the price range
    res.body.data.forEach((product: any) => {
      const hasValidVariant = product.variants.some(
        (v: any) => v.giaBan >= 20000000 && v.giaBan <= 25000000
      );
      expect(hasValidVariant).toBe(true);
    });
  });

  it('should search products and return summarized variant price', async () => {
    const res = await request(app).get('/api/products/search?q=iPhone');
    
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    if (res.body.data.length > 0) {
      const product = res.body.data[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('sanPham');
      expect(product.variants).toBeDefined();
      expect(product.variants).toBeInstanceOf(Array);
      // The search endpoint only returns 1 variant for pricing
      expect(product.variants.length).toBeLessThanOrEqual(1);
    }
  });
});
