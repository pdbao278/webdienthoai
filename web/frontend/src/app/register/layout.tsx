import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng ký | PhoneStore',
  description: 'Tạo tài khoản mới tại PhoneStore để nhận nhiều ưu đãi.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
