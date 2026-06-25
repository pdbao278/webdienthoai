import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'So sánh sản phẩm | PhoneStore',
  description: 'So sánh thông số cấu hình điện thoại chi tiết để chọn được sản phẩm phù hợp nhất.',
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
