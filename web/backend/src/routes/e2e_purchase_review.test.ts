import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import app from '../index';
import { Role } from '@prisma/client';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';

vi.mock('../services/email.service', () => ({
  sendEmail: vi.fn().mockResolvedValue(true)
}));

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev';

describe('E2E Purchase and Review Flow', () => {
  const rand = Math.floor(Math.random() * 1000000);
  const email = `e2e_customer_${Date.now()}_${rand}@example.com`;
  const password = 'Password123!';
  const hoTen = 'E2E Customer';
  
  let customerToken: string;
  let customerId: string;
  let adminToken: string;
  let adminId: string;
  
  let productSlug: string;
  let productVariantId: string;
  let productId: string;
  let orderId: string;

  beforeAll(async () => {
    // 1. Create an admin user for order completion
    const admin = await prisma.user.create({
      data: {
        email: `e2e_admin_${Date.now()}_${rand}@example.com`,
        passwordHash: 'dummy_hash',
        hoTen: 'E2E Admin',
        role: Role.ADMIN
      }
    });
    adminId = admin.id;
    adminToken = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, JWT_SECRET);

    // 2. Create test product & variant
    productSlug = `e2e-test-phone-${Date.now()}-${rand}`;
    const product = await prisma.product.create({
      data: {
        slug: productSlug,
        hang: 'Apple',
        sanPham: 'E2E Test iPhone',
        phanKhuc: 'FLAGSHIP',
        variants: {
          create: [{
            sku: `${productSlug}-variant`,
            ramGb: 8,
            dungLuongGb: 128,
            mauSac: 'Gold',
            giaGoc: 30000000,
            giaBan: 28000000,
            tonKho: 5
          }]
        }
      },
      include: { variants: true }
    });
    productId = product.id;
    productVariantId = product.variants[0].id;
  });

  afterAll(async () => {
    // Clean up created entities
    if (orderId) {
      await prisma.orderActivityLog.deleteMany({ where: { orderId } });
      await prisma.orderItem.deleteMany({ where: { orderId } });
      await prisma.order.deleteMany({ where: { id: orderId } });
    }
    if (productId) {
      await prisma.review.deleteMany({ where: { productId } });
      await prisma.productVariant.deleteMany({ where: { productId } });
      await prisma.product.deleteMany({ where: { id: productId } });
    }
    if (customerId) {
      await prisma.cartItem.deleteMany({ where: { userId: customerId } });
      await prisma.user.deleteMany({ where: { id: customerId } });
    }
    if (adminId) {
      await prisma.user.deleteMany({ where: { id: adminId } });
    }
    await prisma.verificationToken.deleteMany({ where: { identifier: email } });
    await prisma.$disconnect();
  });

  it('should successfully register a customer account', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email, password, hoTen });

    expect(res.status).toBe(201);
    expect(res.body.message).toBeDefined();

    // Verify user was created and verification token is present
    const user = await prisma.user.findUnique({ where: { email } });
    expect(user).toBeDefined();
    expect(user?.emailVerified).toBeNull();
    customerId = user!.id;
  });

  it('should verify the customer email using the OTP', async () => {
    // Retrieve OTP token directly from DB
    const verification = await prisma.verificationToken.findFirst({
      where: { identifier: email }
    });
    expect(verification).toBeDefined();
    expect(verification?.token).toBeDefined();

    const res = await request(app)
      .post('/api/auth/verify-email')
      .send({
        identifier: email,
        token: verification!.token
      });

    expect(res.status).toBe(200);

    // Verify email status in DB
    const user = await prisma.user.findUnique({ where: { email } });
    expect(user?.emailVerified).not.toBeNull();
  });

  it('should authenticate the customer and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    customerToken = res.body.token;
  });

  it('should add the product to the shopping cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        productVariantId,
        soLuong: 1
      });

    expect(res.status).toBe(201);
    expect(res.body.cartItem.productVariantId).toBe(productVariantId);
    expect(res.body.cartItem.soLuong).toBe(1);
  });

  it('should check out the cart to place a Click & Collect order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        sdtLienHe: '0987654321',
        thoiGianHenLayHang: new Date(Date.now() + 86400000).toISOString(), // tomorrow
        phuongThucThanhToan: 'TienMat'
      });

    expect(res.status).toBe(201);
    expect(res.body.order).toBeDefined();
    expect(res.body.order.trangThai).toBe('DA_DAT');
    orderId = res.body.order.id;

    // Verify cart is cleared
    const cartItems = await prisma.cartItem.findMany({ where: { userId: customerId } });
    expect(cartItems.length).toBe(0);
  });

  it('should block review submission while order is not completed', async () => {
    // 1. Check eligibility (should be false)
    const eligibilityRes = await request(app)
      .get(`/api/products/${productSlug}/review-eligibility`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(eligibilityRes.status).toBe(200);
    expect(eligibilityRes.body.eligible).toBe(false);

    // 2. Try posting a review (should fail with 403 Forbidden)
    const reviewRes = await request(app)
      .post(`/api/products/${productSlug}/reviews`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        rating: 5,
        comment: 'Tuyệt vời!'
      });

    expect(reviewRes.status).toBe(403);
    expect(reviewRes.body.error).toContain('mua và nhận hàng');
  });

  it('should allow admin to complete the order', async () => {
    const res = await request(app)
      .patch(`/api/admin/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'HOAN_THANH' });

    expect(res.status).toBe(200);
    expect(res.body.trangThai).toBe('HOAN_THANH');
  });

  it('should allow review submission now that the order is completed', async () => {
    // 1. Check eligibility (should now be true)
    const eligibilityRes = await request(app)
      .get(`/api/products/${productSlug}/review-eligibility`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(eligibilityRes.status).toBe(200);
    expect(eligibilityRes.body.eligible).toBe(true);

    // 2. Post a review
    const reviewRes = await request(app)
      .post(`/api/products/${productSlug}/reviews`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        rating: 5,
        comment: 'Tuyệt vời! Máy dùng rất tốt.'
      });

    expect(reviewRes.status).toBe(201);
    expect(reviewRes.body.rating).toBe(5);
    expect(reviewRes.body.comment).toBe('Tuyệt vời! Máy dùng rất tốt.');
    expect(reviewRes.body.user.hoTen).toBe(hoTen);
  });

  it('should list the review on the product review endpoint', async () => {
    const res = await request(app)
      .get(`/api/products/${productSlug}/reviews`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].rating).toBe(5);
    expect(res.body[0].comment).toBe('Tuyệt vời! Máy dùng rất tốt.');
    expect(res.body[0].user.hoTen).toBe(hoTen);
  });

  it('should allow customer to delete their review', async () => {
    const reviews = await prisma.review.findMany({ where: { productId } });
    expect(reviews.length).toBe(1);
    const reviewId = reviews[0].id;

    const res = await request(app)
      .delete(`/api/products/${productSlug}/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Xóa đánh giá thành công');

    const check = await prisma.review.findUnique({ where: { id: reviewId } });
    expect(check).toBeNull();
  });
});
