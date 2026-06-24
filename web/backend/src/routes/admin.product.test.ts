import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

vi.mock('cloudinary', () => ({
  v2: {
    config: vi.fn(),
    uploader: {
      upload: vi.fn().mockResolvedValue({ secure_url: 'http://test.url/img.webp', public_id: 'test_id' }),
      destroy: vi.fn().mockResolvedValue({ result: 'ok' })
    }
  },
  default: {
    v2: {
      config: vi.fn(),
      uploader: {
        upload: vi.fn().mockResolvedValue({ secure_url: 'http://test.url/img.webp', public_id: 'test_id' }),
        destroy: vi.fn().mockResolvedValue({ result: 'ok' })
      }
    }
  }
}));

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev';

describe('Admin Product API', () => {
  let adminToken: string;
  let productId: string;

  beforeAll(async () => {
    const admin = await prisma.user.create({
      data: { email: `admin_prod_${Date.now()}@test.com`, passwordHash: 'pwd', role: Role.ADMIN }
    });
    adminToken = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, JWT_SECRET);
  });

  afterAll(async () => {
    if (productId) {
      await prisma.productMedia.deleteMany({ where: { productId } });
      await prisma.productVariant.deleteMany({ where: { productId } });
      await prisma.product.deleteMany({ where: { id: productId } });
    }
    await prisma.user.deleteMany({ where: { email: { contains: '@test.com' } } });
    await prisma.$disconnect();
  });

  describe('POST /api/admin/products', () => {
    it('creates a new product with variants and media', async () => {
      const res = await request(app)
        .post('/api/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          sanPham: 'Test Product ' + Date.now(),
          hang: 'Apple',
          phanKhuc: 'FLAGSHIP',
          moTa: 'Desc',
          variants: [
            { sku: 'TEST-SKU-' + Date.now(), ramGb: 8, dungLuongGb: 256, mauSac: 'Den', giaGoc: 1000, giaBan: 900, tonKho: 10 }
          ],
          media: [
            { url: 'http://test/img', publicId: 'pub1', isThumbnail: true, loai: 'IMAGE' }
          ]
        });

      expect(res.status).toBe(201);
      expect(res.body.slug).toContain('test-product');
      expect(res.body.variants.length).toBe(1);
      expect(res.body.media.length).toBe(1);
      productId = res.body.id;
    });
  });

  describe('PATCH /api/admin/products/:id', () => {
    it('updates product and variants', async () => {
      const res = await request(app)
        .patch(`/api/admin/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          sanPham: 'Updated Test Product'
        });

      expect(res.status).toBe(200);
      expect(res.body.sanPham).toBe('Updated Test Product');
    });
  });

  describe('DELETE /api/admin/products/:id', () => {
    it('deletes product and calls cloudinary destroy', async () => {
      const res = await request(app)
        .delete(`/api/admin/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);

      const p = await prisma.product.findUnique({ where: { id: productId } });
      expect(p).toBeNull();
    });
  });
});
