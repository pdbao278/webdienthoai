import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  hoTen: z.string().min(1, 'Họ tên là bắt buộc'),
});

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu là bắt buộc'),
});

export const verifyEmailSchema = z.object({
  identifier: z.string().email('Email không hợp lệ'),
  token: z.string().min(1, 'Token là bắt buộc'),
});

export const resendOtpSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type ResendOtpInput = z.infer<typeof resendOtpSchema>;
