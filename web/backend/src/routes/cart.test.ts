import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev';

describe('Cart API', () => {
  let userToken: string;
  let userId: string;
  let productVariantId: string;
  let productId: string;

  beforeAll(async () => {
    // Create test user
    const user = await prisma.user.create({
      data: {
        email: `cartuser_${Date.now()}@example.com`,
        passwordHash: 'dummy',
        hoTen: 'Cart User'
      }
    });
    userId = user.id;
    userToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);

    // Create test product
    const product = await prisma.product.create({
      data: {
        slug: `test-product-cart-${Date.now()}`,
        hang: 'Samsung',
        sanPham: 'Test Product Cart',
        phanKhuc: 'TAM_TRUNG',
        variants: {
          create: [{
            sku: `test-variant-${Date.now()}`,
            ramGb: 8,
            dungLuongGb: 256,
            mauSac: 'Đen',
            giaGoc: 1000,
            giaBan: 900,
            tonKho: 10
          }]
        }
      },
      include: { variants: true }
    });
    productVariantId = product.variants[0].id;
    productId = product.id;
  });

  afterAll(async () => {
    await prisma.cartItem.deleteMany({ where: { userId } });
    await prisma.product.deleteMany({ where: { id: productId } });
    await prisma.user.delete({ where: { id: userId } });
    await prisma.$disconnect();
  });

  describe('POST /api/cart', () => {
    it('should add item to cart', async () => {
      const res = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          productVariantId,
          soLuong: 2
        });

      expect(res.status).toBe(201);
      expect(res.body.cartItem.soLuong).toBe(2);
      expect(res.body.cartItem.productVariantId).toBe(productVariantId);
    });

    it('should fail if tonKho < soLuong', async () => {
      const res = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          productVariantId,
          soLuong: 20
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should increment quantity if item already in cart', async () => {
      const res = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          productVariantId,
          soLuong: 3
        });

      expect(res.status).toBe(200);
      expect(res.body.cartItem.soLuong).toBe(5); // 2 + 3
    });
  });

  describe('GET /api/cart', () => {
    it('should get cart items for user', async () => {
      const res = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].soLuong).toBe(5);
      expect(res.body[0].productVariant.product.sanPham).toBe('Test Product Cart');
    });
  });

  describe('PATCH /api/cart/:id', () => {
    it('should update cart item quantity', async () => {
      const cartItems = await prisma.cartItem.findMany({ where: { userId } });
      const cartItemId = cartItems[0].id;

      const res = await request(app)
        .patch(`/api/cart/${cartItemId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ soLuong: 1 });

      expect(res.status).toBe(200);
      expect(res.body.cartItem.soLuong).toBe(1);
    });
  });

  describe('DELETE /api/cart/:id', () => {
    it('should remove item from cart', async () => {
      const cartItems = await prisma.cartItem.findMany({ where: { userId } });
      const cartItemId = cartItems[0].id;

      const res = await request(app)
        .delete(`/api/cart/${cartItemId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);

      const verifyCart = await prisma.cartItem.findMany({ where: { userId } });
      expect(verifyCart.length).toBe(0);
    });
  });
});
