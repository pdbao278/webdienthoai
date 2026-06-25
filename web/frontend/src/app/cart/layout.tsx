import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giỏ hàng | PhoneStore',
  description: 'Quản lý giỏ hàng của bạn tại PhoneStore.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
