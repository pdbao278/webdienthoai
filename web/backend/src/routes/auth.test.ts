import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Auth API', () => {
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'password123';
  let verifyToken: string;

  beforeAll(async () => {
    // Clean up
    await prisma.verificationToken.deleteMany({ where: { identifier: testEmail } });
    await prisma.user.deleteMany({ where: { email: testEmail } });
  });

  afterAll(async () => {
    await prisma.verificationToken.deleteMany({ where: { identifier: testEmail } });
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: testEmail,
          password: testPassword,
          hoTen: 'Test User'
        });

      expect(res.status).toBe(201);
      expect(res.body.message).toBeDefined();

      // Check DB
      const user = await prisma.user.findUnique({ where: { email: testEmail } });
      expect(user).toBeDefined();
      expect(user?.emailVerified).toBeNull();

      const tokenObj = await prisma.verificationToken.findFirst({ where: { identifier: testEmail } });
      expect(tokenObj).toBeDefined();
      if (tokenObj) {
        verifyToken = tokenObj.token;
      }
    });

    it('should return error for invalid data', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid',
          password: '123'
        });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/verify-email', () => {
    it('should verify email with valid token', async () => {
      // Need a valid token from previous step
      expect(verifyToken).toBeDefined();
      
      const res = await request(app)
        .post('/api/auth/verify-email')
        .send({
          identifier: testEmail,
          token: verifyToken
        });

      expect(res.status).toBe(200);

      const user = await prisma.user.findUnique({ where: { email: testEmail } });
      expect(user?.emailVerified).toBeDefined();
      expect(user?.emailVerified).not.toBeNull();
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login and return JWT', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: testPassword
        });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('should fail with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
    });
  });
});
