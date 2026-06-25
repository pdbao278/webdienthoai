import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thanh toán | PhoneStore',
  description: 'Thanh toán đơn hàng nhanh chóng tại PhoneStore.',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
