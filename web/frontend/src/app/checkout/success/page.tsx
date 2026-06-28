'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { QRCodeSVG } from 'qrcode.react';
import { Check } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const maNhanHang = searchParams.get('order');

  if (!maNhanHang) {
    return (
      <div className="text-center bg-white rounded-3xl p-16 shadow-card border border-slate-200/60 max-w-lg mx-auto">
        <p className="text-slate-500 mb-8 font-medium">Không tìm thấy mã đơn hàng.</p>
        <Link href="/" className="inline-block bg-slate-800 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-slate-900 transition-all duration-200 shadow-card hover:shadow-elevated active:scale-95">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="w-24 h-24 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        <Check size={40} strokeWidth={2.5} />
      </div>
      <h1 className="text-3xl font-[var(--font-outfit)] font-bold text-slate-800 mb-4 tracking-tight">Đặt hàng thành công!</h1>
      <p className="text-slate-500 mb-8 leading-relaxed max-w-xl mx-auto">
        Cảm ơn bạn đã mua sắm tại PhoneStore. Đơn hàng của bạn đã được ghi nhận. Vui lòng lưu lại mã QR dưới đây hoặc mã nhận hàng để thanh toán và nhận máy tại cửa hàng.
      </p>

      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-card border border-slate-200/60 mb-8 inline-block w-full max-w-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-500 mb-2 tracking-wide uppercase">Mã nhận hàng</p>
          <p className="text-3xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-widest">{maNhanHang}</p>
        </div>
        <div className="flex justify-center p-5 bg-slate-50/50 border-2 border-dashed border-slate-200/80 rounded-2xl mb-5 mx-auto max-w-max">
          <QRCodeSVG value={maNhanHang} size={200} />
        </div>
        <p className="text-xs font-medium text-slate-400 bg-slate-50 py-2 px-4 rounded-lg inline-block">Đưa mã này cho nhân viên tại quầy</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/orders" className="inline-block bg-white text-slate-700 font-bold py-3.5 px-8 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-200 active:scale-95 shadow-sm">
          Xem đơn hàng
        </Link>
        <Link href="/" className="inline-block bg-slate-800 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-slate-900 transition-all duration-200 shadow-card hover:shadow-elevated active:scale-95">
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
        <Suspense fallback={<div className="text-center p-10 text-slate-400 flex items-center justify-center gap-2"><div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div> Đang tải...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
