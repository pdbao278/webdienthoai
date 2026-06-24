import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

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
});
