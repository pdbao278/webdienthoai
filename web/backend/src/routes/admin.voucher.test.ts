import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import prisma from '../lib/prisma';

describe('Admin Voucher Management API', () => {
  let adminToken: string;
  let customerToken: string;
  let adminId: string;
  let customerId: string;
  let voucherId: string;
  const testVoucherCode = 'TESTVOUCHER2026';

  beforeAll(async () => {
    // Clean up if exists
    await prisma.voucher.deleteMany({ where: { maVoucher: testVoucherCode } });

    // Create Admin
    const admin = await prisma.user.create({
      data: { email: `admin_voucher_${Date.now()}@test.com`, passwordHash: 'hash', hoTen: 'Admin', role: Role.ADMIN }
    });
    adminId = admin.id;
    adminToken = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET || 'super-secret-key-for-dev');

    // Create Customer
    const customer = await prisma.user.create({
      data: { email: `cust_voucher_${Date.now()}@test.com`, passwordHash: 'hash', hoTen: 'Customer', role: Role.CUSTOMER }
    });
    customerId = customer.id;
    customerToken = jwt.sign({ id: customer.id, role: customer.role }, process.env.JWT_SECRET || 'super-secret-key-for-dev');
  });

  afterAll(async () => {
    await prisma.voucher.deleteMany({ where: { maVoucher: testVoucherCode } });
    if (adminId) {
      await prisma.user.deleteMany({ where: { id: adminId } });
    }
    if (customerId) {
      await prisma.user.deleteMany({ where: { id: customerId } });
    }
    await prisma.$disconnect();
  });

  it('should not allow customer to access vouchers', async () => {
    const res = await request(app)
      .get('/api/admin/vouchers')
      .set('Authorization', `Bearer ${customerToken}`);
    expect(res.status).toBe(403);
  });

  it('should create a new voucher (Admin)', async () => {
    const res = await request(app)
      .post('/api/admin/vouchers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        maVoucher: testVoucherCode,
        loaiGiamGia: 'FIXED_AMOUNT',
        giaTri: 50000,
        batDau: new Date().toISOString(),
        ketThuc: new Date(Date.now() + 86400000).toISOString(),
        soLuong: 10
      });

    expect(res.status).toBe(201);
    expect(res.body.maVoucher).toBe(testVoucherCode);
    voucherId = res.body.id;
  });

  it('should list vouchers (Admin)', async () => {
    const res = await request(app)
      .get('/api/admin/vouchers')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((v: any) => v.maVoucher === testVoucherCode)).toBe(true);
  });

  it('should prevent creating duplicate voucher', async () => {
    const res = await request(app)
      .post('/api/admin/vouchers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        maVoucher: testVoucherCode,
        loaiGiamGia: 'FIXED_AMOUNT',
        giaTri: 50000,
        batDau: new Date().toISOString(),
        ketThuc: new Date(Date.now() + 86400000).toISOString(),
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Mã voucher đã tồn tại');
  });

  it('should delete voucher (Admin)', async () => {
    const res = await request(app)
      .delete(`/api/admin/vouchers/${voucherId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Xóa thành công');

    const dbVoucher = await prisma.voucher.findUnique({ where: { id: voucherId } });
    expect(dbVoucher).toBeNull();
  });

  it('should not allow deleting a voucher used in an order', async () => {
    // 1. Create a voucher
    const rand = Math.floor(Math.random() * 1000000);
    const voucher = await prisma.voucher.create({
      data: {
        maVoucher: `USEDVOUCHER${Date.now()}${rand}`,
        loaiGiamGia: 'FIXED_AMOUNT',
        giaTri: 100,
        batDau: new Date(Date.now() - 86400000),
        ketThuc: new Date(Date.now() + 86400000),
        soLuong: 10,
        daSuDung: 1, // 1 used
        nguoiTaoId: adminId
      }
    });

    // 2. Create an order that uses this voucher
    const order = await prisma.order.create({
      data: {
        userId: customerId,
        tongTienHang: 1000,
        thanhTien: 900,
        voucherId: voucher.id,
        tienGiamGia: 100,
        sdtLienHe: '0123456789',
        thoiGianHenLayHang: new Date(),
        maNhanHang: `QR-${Date.now()}-${rand}`,
        trangThai: 'DA_DAT'
      }
    });

    try {
      // 3. Admin tries to delete the voucher
      const res = await request(app)
        .delete(`/api/admin/vouchers/${voucher.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      // Should return 200 and soft-delete because it's linked to an order
      expect(res.status).toBe(200);
      expect(res.body.message).toContain('vô hiệu hóa');

      const updatedVoucher = await prisma.voucher.findUnique({ where: { id: voucher.id } });
      expect(updatedVoucher?.isActive).toBe(false);
    } finally {
      // Cleanup
      await prisma.order.deleteMany({ where: { id: order.id } });
      await prisma.voucher.deleteMany({ where: { id: voucher.id } });
    }
  });
});
