'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { QRCodeSVG } from 'qrcode.react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const maNhanHang = searchParams.get('order');

  if (!maNhanHang) {
    return (
      <div className="text-center">
        <p className="text-slate-500 mb-6">Không tìm thấy mã đơn hàng.</p>
        <Link href="/" className="inline-block bg-sky-600 text-white font-medium py-3 px-8 rounded-xl hover:bg-sky-700 transition">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
        <i className="fa-solid fa-check"></i>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Đặt hàng thành công!</h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Cảm ơn bạn đã mua sắm tại PhoneStore. Đơn hàng của bạn đã được ghi nhận. Vui lòng lưu lại mã QR dưới đây hoặc mã nhận hàng để thanh toán và nhận máy tại cửa hàng.
      </p>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8 inline-block">
        <div className="mb-4">
          <p className="text-sm text-slate-500 mb-1">Mã nhận hàng (Click & Collect)</p>
          <p className="text-2xl font-bold text-slate-800 tracking-wider">{maNhanHang}</p>
        </div>
        <div className="flex justify-center p-4 bg-white border-2 border-dashed border-slate-200 rounded-xl mb-4">
          <QRCodeSVG value={maNhanHang} size={180} />
        </div>
        <p className="text-xs text-slate-400">Đưa mã này cho nhân viên tại quầy</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/orders" className="inline-block bg-slate-100 text-slate-700 font-medium py-3 px-8 rounded-xl hover:bg-slate-200 transition">
          Xem đơn hàng
        </Link>
        <Link href="/" className="inline-block bg-sky-600 text-white font-medium py-3 px-8 rounded-xl hover:bg-sky-700 transition shadow-sm shadow-sky-600/20">
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <Suspense fallback={<div className="text-center p-10">Đang tải...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
