import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function reproduce() {
  try {
    const user = await prisma.user.create({
      data: {
        email: `test_${Date.now()}@example.com`,
        passwordHash: 'dummy',
        emailVerified: new Date(),
        hoTen: 'Test'
      }
    });

    const loginRes = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password: 'password123' }) // won't work because password hash is dummy, wait! I will just generate a token
    });
  } catch (e) {
    console.error(e);
  }
}
reproduce();
