import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
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
    await prisma.orderActivityLog.deleteMany({ where: { orderId } });
    await prisma.order.deleteMany({ where: { id: orderId } });
    await prisma.user.deleteMany({ where: { id: { in: [adminId, customerId] } } });
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
