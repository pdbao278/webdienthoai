import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đơn hàng của tôi | PhoneStore',
  description: 'Theo dõi và quản lý đơn hàng của bạn tại PhoneStore.',
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
