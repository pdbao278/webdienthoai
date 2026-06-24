import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { registerSchema, loginSchema, verifyEmailSchema } from '@phonestore/shared';
import { sendEmail } from '../services/email.service';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { email, password, hoTen } = validatedData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Email đã được sử dụng' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        hoTen,
      }
    });

    const token = crypto.randomInt(100000, 1000000).toString(); // 6 digit code
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    });

    await sendEmail(
      email,
      'Mã xác nhận tài khoản PhoneStore',
      `<p>Xin chào ${hoTen},</p><p>Mã xác nhận của bạn là: <strong>${token}</strong></p>`
    );

    res.status(201).json({ message: 'Đăng ký thành công, vui lòng kiểm tra email để xác nhận' });
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, token } = verifyEmailSchema.parse(req.body);

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: { identifier, token }
      }
    });

    if (!verificationToken) {
      res.status(400).json({ error: 'Mã xác nhận không đúng hoặc đã hết hạn' });
      return;
    }

    if (verificationToken.expires < new Date()) {
      res.status(400).json({ error: 'Mã xác nhận đã hết hạn' });
      return;
    }

    await prisma.user.update({
      where: { email: identifier },
      data: { emailVerified: new Date() }
    });

    await prisma.verificationToken.delete({
      where: {
        identifier_token: { identifier, token }
      }
    });

    res.status(200).json({ message: 'Xác thực email thành công' });
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
      return;
    }

    if (!user.emailVerified) {
      res.status(403).json({ error: 'Vui lòng xác thực email trước khi đăng nhập' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user.id,
        email: user.email,
        hoTen: user.hoTen,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
};
