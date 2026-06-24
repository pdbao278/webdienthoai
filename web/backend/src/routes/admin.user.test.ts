import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev';

describe('Admin User Routes', () => {
  let adminToken: string;
  let managerToken: string;
  let customerToken: string;
  let testUserId: string;

  beforeAll(async () => {
    // Create users for testing
    const admin = await prisma.user.create({
      data: {
        email: `admin_user_test_${Date.now()}@example.com`,
        passwordHash: 'hash',
        hoTen: 'Admin Test',
        sdt: '0900000000',
        role: Role.ADMIN,
        emailVerified: new Date(),
      },
    });
    adminToken = jwt.sign({ id: admin.id, role: admin.role, email: admin.email }, JWT_SECRET);

    const manager = await prisma.user.create({
      data: {
        email: `manager_user_test_${Date.now()}@example.com`,
        passwordHash: 'hash',
        hoTen: 'Manager Test',
        sdt: '0900000001',
        role: Role.MANAGER,
        emailVerified: new Date(),
      },
    });
    managerToken = jwt.sign({ id: manager.id, role: manager.role, email: manager.email }, JWT_SECRET);

    const customer = await prisma.user.create({
      data: {
        email: `customer_user_test_${Date.now()}@example.com`,
        passwordHash: 'hash',
        hoTen: 'Customer Test',
        sdt: '0900000002',
        role: Role.CUSTOMER,
        emailVerified: new Date(),
      },
    });
    customerToken = jwt.sign({ id: customer.id, role: customer.role, email: customer.email }, JWT_SECRET);
    testUserId = customer.id;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          contains: 'user_test_',
        },
      },
    });
    await prisma.$disconnect();
  });

  describe('GET /api/admin/users', () => {
    it('should allow ADMIN to get users', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should deny MANAGER access', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${managerToken}`);

      expect(res.status).toBe(403);
    });

    it('should deny CUSTOMER access', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('PATCH /api/admin/users/:id/role', () => {
    it('should allow ADMIN to update user role', async () => {
      const res = await request(app)
        .patch(`/api/admin/users/${testUserId}/role`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ role: 'MANAGER' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.role).toBe('MANAGER');
    });

    it('should fail with invalid role', async () => {
      const res = await request(app)
        .patch(`/api/admin/users/${testUserId}/role`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ role: 'INVALID_ROLE' });

      expect(res.status).toBe(400);
    });
  });
});
