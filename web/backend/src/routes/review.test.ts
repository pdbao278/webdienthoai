import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('Review API', () => {
  let customerToken: string;
  let customerId: string;
  let productId: string;
  const productSlug = `test-product-review-${Date.now()}`;

  beforeAll(async () => {
    const customer = await prisma.user.create({
      data: { email: `cust_review_${Date.now()}@test.com`, passwordHash: 'hash', hoTen: 'Customer Review', role: Role.CUSTOMER }
    });
    customerId = customer.id;
    customerToken = jwt.sign({ id: customer.id, role: customer.role }, process.env.JWT_SECRET || 'super-secret-key-for-dev');

    const product = await prisma.product.create({
      data: {
        slug: productSlug,
        sanPham: 'Test Product For Review',
        hang: 'Apple',
        phanKhuc: 'TAM_TRUNG',
        variants: {
          create: [{ sku: `${productSlug}-1`, giaGoc: 1000, giaBan: 900, tonKho: 10, ramGb: 8, dungLuongGb: 256, mauSac: 'Black' }]
        }
      },
      include: { variants: true }
    });
    productId = product.id;

    // Create a completed order for the user so they can review
    await prisma.order.create({
      data: {
        userId: customerId,
        tongTienHang: 900,
        thanhTien: 900,
        trangThai: 'HOAN_THANH',
        phuongThucThanhToan: 'CASH',
        thoiGianHenLayHang: new Date(),
        maNhanHang: `MNH_REV_${Date.now()}`,
        sdtLienHe: '0123456789',
        items: {
          create: [{ productVariantId: product.variants[0].id, soLuong: 1, donGia: 900 }]
        }
      }
    });
  });

  afterAll(async () => {
    // Dùng deleteMany thay vì delete để tránh lỗi cascade
    await prisma.review.deleteMany({ where: { productId } });
    await prisma.orderItem.deleteMany({ where: { order: { userId: customerId } } });
    await prisma.orderActivityLog.deleteMany({ where: { order: { userId: customerId } } });
    await prisma.order.deleteMany({ where: { userId: customerId } });
    await prisma.productVariant.deleteMany({ where: { productId } });
    await prisma.product.deleteMany({ where: { id: productId } });
    await prisma.user.deleteMany({ where: { id: customerId } });
    await prisma.$disconnect();
  });

  it('should allow customer to add a review after purchase', async () => {
    const res = await request(app)
      .post(`/api/products/${productSlug}/reviews`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        rating: 5,
        comment: 'Great product!'
      });

    expect(res.status).toBe(201);
    expect(res.body.rating).toBe(5);
    expect(res.body.comment).toBe('Great product!');
    expect(res.body.userId).toBe(customerId);
  });

  it('should not allow duplicate review', async () => {
    const res = await request(app)
      .post(`/api/products/${productSlug}/reviews`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        rating: 4,
        comment: 'Second thought...'
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Bạn đã đánh giá sản phẩm này rồi');
  });

  it('should fetch reviews for a product', async () => {
    const res = await request(app)
      .get(`/api/products/${productSlug}/reviews`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].rating).toBe(5);
    expect(res.body[0].user.hoTen).toBe('Customer Review');
  });

  it('should block review if not purchased', async () => {
    // Create another user without purchase
    const unverifiedUser = await prisma.user.create({
      data: { email: `unverified_${Date.now()}@test.com`, passwordHash: 'hash', role: Role.CUSTOMER }
    });
    const unverifiedToken = jwt.sign({ id: unverifiedUser.id, role: unverifiedUser.role }, process.env.JWT_SECRET || 'super-secret-key-for-dev');

    const res = await request(app)
      .post(`/api/products/${productSlug}/reviews`)
      .set('Authorization', `Bearer ${unverifiedToken}`)
      .send({
        rating: 5,
        comment: 'I want to review!'
      });

    expect(res.status).toBe(403);
    
    // Clean up
    await prisma.user.deleteMany({ where: { id: unverifiedUser.id } });
  });

  it('should allow customer to delete their own review', async () => {
    const reviews = await prisma.review.findMany({ where: { productId } });
    const reviewId = reviews[0].id;

    const res = await request(app)
      .delete(`/api/products/${productSlug}/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Xóa đánh giá thành công');

    const check = await prisma.review.findUnique({ where: { id: reviewId } });
    expect(check).toBeNull();
  });

  it('should allow admin/manager to delete any customer review', async () => {
    const newReview = await prisma.review.create({
      data: {
        userId: customerId,
        productId: productId,
        rating: 4,
        comment: 'Nice product!'
      }
    });

    const admin = await prisma.user.create({
      data: { email: `admin_review_${Date.now()}@test.com`, passwordHash: 'hash', role: Role.ADMIN }
    });
    const adminToken = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET || 'super-secret-key-for-dev');

    const res = await request(app)
      .delete(`/api/products/${productSlug}/reviews/${newReview.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Xóa đánh giá thành công');

    const check = await prisma.review.findUnique({ where: { id: newReview.id } });
    expect(check).toBeNull();

    await prisma.user.delete({ where: { id: admin.id } });
  });
});
