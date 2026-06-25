import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập | PhoneStore',
  description: 'Đăng nhập vào tài khoản PhoneStore của bạn.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
