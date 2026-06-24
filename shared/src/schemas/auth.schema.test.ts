import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema, verifyEmailSchema } from './auth.schema';

describe('Auth Schemas', () => {
  it('validates register schema correctly', () => {
    // Missing hoTen should be OK? No, let's make hoTen required for register based on PRD.
    // Let's assume hoTen is required. Password min 6 chars.
    expect(registerSchema.safeParse({ email: 'test@example.com', password: 'password123', hoTen: 'Test User' }).success).toBe(true);
    expect(registerSchema.safeParse({ email: 'invalid-email', password: '123' }).success).toBe(false); // bad email, short password
  });

  it('validates login schema correctly', () => {
    expect(loginSchema.safeParse({ email: 'test@example.com', password: 'password123' }).success).toBe(true);
    expect(loginSchema.safeParse({ email: 'invalid' }).success).toBe(false);
  });

  it('validates verify schema correctly', () => {
    expect(verifyEmailSchema.safeParse({ identifier: 'test@example.com', token: '123456' }).success).toBe(true);
    expect(verifyEmailSchema.safeParse({ identifier: 'test@example.com' }).success).toBe(false);
  });
});
