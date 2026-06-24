'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!isLoggedIn) {
        router.push('/login');
      } else if (user?.role !== 'ADMIN' && user?.role !== 'MANAGER') {
        router.push('/');
      }
    }
  }, [isMounted, isLoggedIn, user, router]);

  if (!isMounted) return null;
  if (!isLoggedIn || (user?.role !== 'ADMIN' && user?.role !== 'MANAGER')) return null;

  return <>{children}</>;
}
