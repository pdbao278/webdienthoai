import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('Admin Stats API', () => {
  let adminToken: string;
  let adminId: string;

  beforeAll(async () => {
    // Create Admin
    const admin = await prisma.user.create({
      data: { email: `admin_stats_${Date.now()}@test.com`, passwordHash: 'hash', hoTen: 'Admin Stats', role: Role.ADMIN }
    });
    adminId = admin.id;
    adminToken = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET || 'super-secret-key-for-dev');
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: adminId } });
    await prisma.$disconnect();
  });

  it('should return stats for admin', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalRevenue');
    expect(res.body).toHaveProperty('totalOrders');
    expect(res.body).toHaveProperty('totalProducts');
    expect(res.body).toHaveProperty('totalUsers');
    expect(res.body).toHaveProperty('revenueChartData');
    expect(Array.isArray(res.body.revenueChartData)).toBe(true);
  });
});
