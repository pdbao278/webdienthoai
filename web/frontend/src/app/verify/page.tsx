'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyEmailSchema, VerifyEmailInput } from '@phonestore/shared';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyForm() {
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      identifier: emailParam,
    }
  });

  const onSubmit = async (data: VerifyEmailInput) => {
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Xác thực thất bại');
      }

      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleResend = async () => {
    if (!emailParam) return;
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailParam }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Không thể gửi lại mã');
      }

      setTimeLeft(60);
      alert('Đã gửi lại mã xác nhận mới!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Xác minh Email</h1>
            <p className="text-slate-500 mt-2">Nhập mã 6 số chúng tôi vừa gửi đến email của bạn.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              readOnly
              className="bg-slate-100 text-slate-500 cursor-not-allowed"
              {...register('identifier')}
              error={errors.identifier?.message}
            />

            <Input
              label="Mã xác nhận (OTP)"
              type="text"
              placeholder="123456"
              maxLength={6}
              className="text-center tracking-widest text-lg font-bold"
              {...register('token')}
              error={errors.token?.message}
            />

            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}

            {timeLeft > 0 ? (
              <p className="text-sm text-slate-500 text-center">
                Mã sẽ hết hạn sau: <span className="font-bold text-sky-600">{timeLeft}s</span>
              </p>
            ) : (
              <div className="text-center">
                <p className="text-sm text-red-500 font-semibold mb-2">
                  Mã OTP đã hết hạn.
                </p>
                <Button type="button" variant="outline" onClick={handleResend} className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                  Gửi lại mã xác nhận
                </Button>
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={isSubmitting} disabled={timeLeft <= 0}>
              Xác thực
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
