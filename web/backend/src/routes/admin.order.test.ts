import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import prisma from '../lib/prisma';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev';

describe('Admin Order API', () => {
  let adminToken: string;
  let customerToken: string;
  let adminId: string;
  let customerId: string;
  let orderId: string;
  let maNhanHang: string;

  beforeAll(async () => {
    const admin = await prisma.user.create({
      data: { email: `admin_order_${Date.now()}@test.com`, passwordHash: 'pwd', role: Role.ADMIN }
    });
    adminId = admin.id;
    adminToken = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, JWT_SECRET);

    const customer = await prisma.user.create({
      data: { email: `cust_order_${Date.now()}@test.com`, passwordHash: 'pwd', role: Role.CUSTOMER }
    });
    customerId = customer.id;
    customerToken = jwt.sign({ id: customer.id, email: customer.email, role: customer.role }, JWT_SECRET);

    const order = await prisma.order.create({
      data: {
        userId: customer.id,
        tongTienHang: 1000,
        thanhTien: 1000,
        sdtLienHe: '0123456789',
        thoiGianHenLayHang: new Date(),
        maNhanHang: `QR-${Date.now()}`
      }
    });
    orderId = order.id;
    maNhanHang = order.maNhanHang;
  });

  afterAll(async () => {
    if (orderId) {
      await prisma.orderActivityLog.deleteMany({ where: { orderId } });
      await prisma.order.deleteMany({ where: { id: orderId } });
    }
    if (adminId && customerId) {
      await prisma.user.deleteMany({ where: { id: { in: [adminId, customerId] } } });
    }
    await prisma.$disconnect();
  });

  describe('GET /api/admin/orders', () => {
    it('rejects CUSTOMER access', async () => {
      const res = await request(app).get('/api/admin/orders').set('Authorization', `Bearer ${customerToken}`);
      expect(res.status).toBe(403);
    });

    it('returns orders for ADMIN', async () => {
      const res = await request(app).get('/api/admin/orders').set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('PATCH /api/admin/orders/:id/status', () => {
    it('updates order status and logs activity', async () => {
      const res = await request(app)
        .patch(`/api/admin/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'DANG_CHUAN_BI' });

      expect(res.status).toBe(200);
      expect(res.body.trangThai).toBe('DANG_CHUAN_BI');

      const logs = await prisma.orderActivityLog.findMany({ where: { orderId } });
      expect(logs.length).toBe(1);
      expect(logs[0].hanhDong).toContain('DANG_CHUAN_BI');
    });

    it('restores inventory and voucher when status is changed to DA_HUY', async () => {
      // 1. Create a product variant
      const rand = Math.floor(Math.random() * 1000000);
      const product = await prisma.product.create({
        data: {
          slug: `admin-cancel-test-${Date.now()}-${rand}`,
          hang: 'Apple',
          sanPham: 'Test Product',
          phanKhuc: 'FLAGSHIP',
          variants: {
            create: [{
              sku: `variant-cancel-${Date.now()}-${rand}`,
              ramGb: 8,
              dungLuongGb: 256,
              mauSac: 'Đen',
              giaGoc: 1000,
              giaBan: 1000,
              tonKho: 9 // Initially 10, but 1 is in the order
            }]
          }
        },
        include: { variants: true }
      });

      // 2. Create a voucher
      const voucher = await prisma.voucher.create({
        data: {
          maVoucher: `CANCELVOUCHER${Date.now()}${rand}`,
          loaiGiamGia: 'FIXED_AMOUNT',
          giaTri: 100,
          donToiThieu: 0,
          batDau: new Date(Date.now() - 86400000),
          ketThuc: new Date(Date.now() + 86400000),
          soLuong: 10,
          daSuDung: 1, // 1 used by the order
          nguoiTaoId: adminId
        }
      });

      // 3. Create an order with the variant and voucher
      const cancelOrder = await prisma.order.create({
        data: {
          userId: customerId,
          tongTienHang: 1000,
          thanhTien: 900,
          voucherId: voucher.id,
          tienGiamGia: 100,
          sdtLienHe: '0123456789',
          thoiGianHenLayHang: new Date(),
          maNhanHang: `QRC-${Date.now()}-${rand}`,
          trangThai: 'DA_DAT',
          items: {
            create: [{
              productVariantId: product.variants[0].id,
              soLuong: 1,
              donGia: 1000
            }]
          }
        }
      });

      try {
        // 4. Admin cancels the order
        const res = await request(app)
          .patch(`/api/admin/orders/${cancelOrder.id}/status`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ status: 'DA_HUY' });

        expect(res.status).toBe(200);
        expect(res.body.trangThai).toBe('DA_HUY');

        // 5. Verify inventory and voucher restored
        const updatedVariant = await prisma.productVariant.findUnique({ where: { id: product.variants[0].id } });
        expect(updatedVariant?.tonKho).toBe(10); // Restored from 9

        const updatedVoucher = await prisma.voucher.findUnique({ where: { id: voucher.id } });
        expect(updatedVoucher?.daSuDung).toBe(0); // Restored from 1
      } finally {
        // Cleanup
        await prisma.orderActivityLog.deleteMany({ where: { orderId: cancelOrder.id } });
        await prisma.orderItem.deleteMany({ where: { orderId: cancelOrder.id } });
        await prisma.order.deleteMany({ where: { id: cancelOrder.id } });
        await prisma.voucher.deleteMany({ where: { id: voucher.id } });
        await prisma.productVariant.deleteMany({ where: { productId: product.id } });
        await prisma.product.deleteMany({ where: { id: product.id } });
      }
    });
  });

  describe('POST /api/admin/orders/scan', () => {
    it('completes order via QR scan (after transitioning to CHO_NHAN_HANG)', async () => {
      // Đơn hàng đã ở DANG_CHUAN_BI từ test trước, chuyển sang CHO_NHAN_HANG
      await request(app)
        .patch(`/api/admin/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'CHO_NHAN_HANG' });

      // Giờ quét QR hoàn thành
      const res = await request(app)
        .post('/api/admin/orders/scan')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ maNhanHang });

      expect(res.status).toBe(200);
      expect(res.body.trangThai).toBe('HOAN_THANH');

      const logs = await prisma.orderActivityLog.findMany({ where: { orderId } });
      expect(logs.some(l => l.hanhDong.includes('Hoàn thành qua quét QR'))).toBe(true);
    });
  });
});
