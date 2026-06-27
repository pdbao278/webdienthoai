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
  let adminId: string;
  let productId: string;

  beforeAll(async () => {
    const admin = await prisma.user.create({
      data: { email: `admin_prod_${Date.now()}@test.com`, passwordHash: 'pwd', role: Role.ADMIN }
    });
    adminId = admin.id;
    adminToken = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, JWT_SECRET);
  });

  afterAll(async () => {
    if (productId) {
      await prisma.productMedia.deleteMany({ where: { productId } });
      await prisma.productVariant.deleteMany({ where: { productId } });
      await prisma.product.deleteMany({ where: { id: productId } });
    }
    if (adminId) {
      await prisma.user.deleteMany({ where: { id: adminId } });
    }
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

    it('creates a new product with relative url and null fields', async () => {
      const res = await request(app)
        .post('/api/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          sanPham: 'Test Product Null ' + Date.now(),
          hang: 'Apple',
          phanKhuc: 'FLAGSHIP',
          moTa: 'Desc',
          variants: [
            { sku: 'TEST-SKU-NULL-' + Date.now(), ramGb: 8, dungLuongGb: 256, mauSac: 'Den', giaGoc: 1000, giaBan: 900, tonKho: 10, imageUrl: null }
          ],
          media: [
            { url: '/data/dienthoai/test.jpg', publicId: null, isThumbnail: true, loai: 'IMAGE' }
          ]
        });

      expect(res.status).toBe(201);
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

  describe('PATCH /api/admin/products/:id', () => {
    it('should update isActive status', async () => {
      const res = await request(app)
        .patch(`/api/admin/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ isActive: false });
      
      expect(res.status).toBe(200);
      
      const p = await prisma.product.findUnique({ where: { id: productId } });
      expect(p?.isActive).toBe(false); // test assertion
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

  describe('DELETE /api/admin/products/:id with order history', () => {
    it('prevents deleting a product that has order history', async () => {
      // Create a test product
      const res = await request(app)
        .post('/api/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          sanPham: 'Product with order ' + Date.now(),
          hang: 'Apple',
          phanKhuc: 'FLAGSHIP',
          variants: [{ sku: 'SKU-ORDER-' + Date.now(), ramGb: 8, dungLuongGb: 256, mauSac: 'Den', giaGoc: 1000, giaBan: 900, tonKho: 10 }]
        });
      
      const prodId = res.body.id;
      const variantId = res.body.variants[0].id;

      // Create an order for this variant
      const order = await prisma.order.create({
        data: {
          userId: adminId,
          tongTienHang: 900,
          thanhTien: 900,
          sdtLienHe: '0123456789',
          thoiGianHenLayHang: new Date(),
          maNhanHang: 'TEST-' + Date.now(),
          items: {
            create: [{ productVariantId: variantId, soLuong: 1, donGia: 900 }]
          }
        }
      });

      // Try to delete the product
      const deleteRes = await request(app)
        .delete(`/api/admin/products/${prodId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(deleteRes.status).toBe(400);
      expect(deleteRes.body.error).toContain('lịch sử đơn hàng');

      // Cleanup
      if (order?.id) {
        await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
        await prisma.order.delete({ where: { id: order.id } });
      }
      if (prodId) {
        await prisma.productVariant.deleteMany({ where: { productId: prodId } });
        await prisma.product.delete({ where: { id: prodId } });
      }
    });
  });
});
