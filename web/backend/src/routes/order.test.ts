import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

vi.mock('../services/email.service', () => ({
  sendEmail: vi.fn().mockResolvedValue(true)
}));

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev';

describe('Order API', () => {
  let userToken: string;
  let userId: string;
  let productVariantId: string;
  let productId: string;
  let voucherCode: string;
  let highSpendVoucherCode: string;

  beforeAll(async () => {
    const rand = Math.floor(Math.random() * 1000000);
    // Create test user
    const user = await prisma.user.create({
      data: {
        email: `orderuser_${Date.now()}_${rand}@example.com`,
        passwordHash: 'dummy',
        hoTen: 'Order User'
      }
    });
    userId = user.id;
    userToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);

    // Create test product
    const product = await prisma.product.create({
      data: {
        slug: `test-product-order-${Date.now()}-${rand}`,
        hang: 'Apple',
        sanPham: 'Test Product Order',
        phanKhuc: 'FLAGSHIP',
        variants: {
          create: [{
            sku: `test-variant-${Date.now()}-${rand}`,
            ramGb: 8,
            dungLuongGb: 256,
            mauSac: 'Đen',
            giaGoc: 20000000,
            giaBan: 18000000,
            tonKho: 5
          }]
        }
      },
      include: { variants: true }
    });
    productVariantId = product.variants[0].id;
    productId = product.id;

    // Add to cart
    await prisma.cartItem.create({
      data: {
        userId,
        productVariantId,
        soLuong: 1
      }
    });

    // Create test voucher
    voucherCode = `TESTVOUCHER${Date.now()}${rand}`;
    await prisma.voucher.create({
      data: {
        maVoucher: voucherCode,
        loaiGiamGia: 'FIXED_AMOUNT',
        giaTri: 500000,
        donToiThieu: 10000000,
        batDau: new Date(Date.now() - 86400000), // yesterday
        ketThuc: new Date(Date.now() + 86400000), // tomorrow
        soLuong: 10,
        daSuDung: 0,
        nguoiTaoId: user.id // Admin in real case
      }
    });

    // Create high-spend test voucher (e.g. requires 30M, but our order is only 18M)
    highSpendVoucherCode = `HIGHVOUCHER${Date.now()}${rand}`;
    await prisma.voucher.create({
      data: {
        maVoucher: highSpendVoucherCode,
        loaiGiamGia: 'FIXED_AMOUNT',
        giaTri: 1000000,
        donToiThieu: 30000000, // 30 million
        batDau: new Date(Date.now() - 86400000),
        ketThuc: new Date(Date.now() + 86400000),
        soLuong: 5,
        daSuDung: 0,
        nguoiTaoId: user.id
      }
    });
  });

  afterAll(async () => {
    if (voucherCode || highSpendVoucherCode) {
      await prisma.voucher.deleteMany({
        where: {
          maVoucher: { in: [voucherCode, highSpendVoucherCode].filter(Boolean) }
        }
      });
    }
    if (userId) {
      await prisma.orderActivityLog.deleteMany({ where: { order: { userId } } });
      await prisma.orderItem.deleteMany({ where: { order: { userId } } });
      await prisma.order.deleteMany({ where: { userId } });
      await prisma.cartItem.deleteMany({ where: { userId } });
      await prisma.user.deleteMany({ where: { id: userId } });
    }
    if (productId) {
      await prisma.productVariant.deleteMany({ where: { productId } });
      await prisma.product.deleteMany({ where: { id: productId } });
    }
    await prisma.$disconnect();
  });

  describe('POST /api/orders/validate-voucher', () => {
    it('should validate valid voucher', async () => {
      const res = await request(app)
        .post('/api/orders/validate-voucher')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ voucherCode });

      expect(res.status).toBe(200);
      expect(res.body.giaTri).toBe(500000);
    });

    it('should fail with invalid voucher', async () => {
      const res = await request(app)
        .post('/api/orders/validate-voucher')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ voucherCode: 'INVALID' });

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/orders', () => {
    let createdOrderId: string;

    it('should create order successfully and reduce stock', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          sdtLienHe: '0901234567',
          thoiGianHenLayHang: new Date(Date.now() + 86400000).toISOString(),
          voucherCode,
          phuongThucThanhToan: 'TienMat'
        });

      expect(res.status).toBe(201);
      expect(res.body.order.thanhTien).toBe(18000000 - 500000);
      expect(res.body.order.maNhanHang).toBeDefined();
      createdOrderId = res.body.order.id;

      // Check DB Cart
      const cart = await prisma.cartItem.findMany({ where: { userId } });
      expect(cart.length).toBe(0);

      // Check DB Stock
      const p = await prisma.productVariant.findUnique({ where: { id: productVariantId } });
      expect(p?.tonKho).toBe(4); // Was 5, bought 1

      // Check Voucher Usage
      const v = await prisma.voucher.findUnique({ where: { maVoucher: voucherCode } });
      expect(v?.daSuDung).toBe(1);
    });

    it('should fail to create order if voucher minimum spend is not met', async () => {
      // Re-add product variant to cart since previous test cleared it on success
      await prisma.cartItem.create({
        data: {
          userId,
          productVariantId,
          soLuong: 1
        }
      });

      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          sdtLienHe: '0901234567',
          thoiGianHenLayHang: new Date(Date.now() + 86400000).toISOString(),
          voucherCode: highSpendVoucherCode,
          phuongThucThanhToan: 'TienMat'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('tối thiểu');
    });

    it('should cancel order and restore stock', async () => {
      const res = await request(app)
        .post(`/api/orders/${createdOrderId}/cancel`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);

      // Check DB Stock Restored
      const p = await prisma.productVariant.findUnique({ where: { id: productVariantId } });
      expect(p?.tonKho).toBe(5); // Restored from 4

      const order = await prisma.order.findUnique({ where: { id: createdOrderId } });
      expect(order?.trangThai).toBe('DA_HUY');
    });

    it('should fail to cancel already cancelled order', async () => {
      const res = await request(app)
        .post(`/api/orders/${createdOrderId}/cancel`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Chỉ có thể hủy đơn hàng ở trạng thái Đã đặt');

      // Stock should remain 5, not incremented to 6
      const p = await prisma.productVariant.findUnique({ where: { id: productVariantId } });
      expect(p?.tonKho).toBe(5);
    });
  });
});
