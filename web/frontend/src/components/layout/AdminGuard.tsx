'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
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
      } else if (user?.role === 'MANAGER') {
        const allowedPaths = ['/admin/orders'];
        if (!allowedPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) {
          router.push('/admin/orders');
        }
      }
    }
  }, [isMounted, isLoggedIn, user, router, pathname]);

  if (!isMounted) return null;
  if (!isLoggedIn || (user?.role !== 'ADMIN' && user?.role !== 'MANAGER')) return null;

  return <>{children}</>;
}
