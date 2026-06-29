'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@phonestore/shared';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setError(null);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Đăng ký thất bại');
      }

      // Đăng ký thành công, chuyển tới trang verify
      router.push(`/verify?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tạo tài khoản</h1>
            <p className="text-slate-500 mt-2">Gia nhập PhoneStore ngay hôm nay</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Họ và tên"
              type="text"
              placeholder="Nguyễn Văn A"
              {...register('hoTen')}
              error={errors.hoTen?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="nhapemail@example.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Mật khẩu"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
            />

            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Đăng ký
            </Button>
          </form>

          <div className="text-center text-sm text-slate-500">
            Đã có tài khoản?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
