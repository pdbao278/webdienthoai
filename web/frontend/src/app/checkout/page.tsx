'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrderSchema, CreateOrderInput } from '@phonestore/shared';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, fetchCart, clearCart } = useCartStore();
  const { user, isLoggedIn, token } = useAuthStore();
  const router = useRouter();

  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isValidatingVoucher, setIsValidatingVoucher] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema) as any,
    defaultValues: {
      sdtLienHe: '',
      ghiChu: '',
      thoiGianHenLayHang: new Date(Date.now() + 86400000).toISOString().slice(0, 16), // Tomorrow
      phuongThucThanhToan: 'TienMat',
    }
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      fetchCart();
    }
  }, [isLoggedIn, router, fetchCart]);

  const subtotal = items.reduce((acc, item) => acc + (item.product.giaBan * item.soLuong), 0);
  const total = subtotal - discount;

  const handleApplyVoucher = async () => {
    if (!voucherCode) return;
    setIsValidatingVoucher(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${API_URL}/orders/validate-voucher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ voucherCode })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi voucher');
      
      if (subtotal < data.donToiThieu) {
        throw new Error(`Đơn hàng tối thiểu ${formatCurrency(data.donToiThieu)}`);
      }

      let d = 0;
      if (data.loaiGiamGia === 'PERCENTAGE') {
        d = Math.floor((subtotal * data.giaTri) / 100);
        if (data.toiDaGiam && d > data.toiDaGiam) d = data.toiDaGiam;
      } else {
        d = data.giaTri;
      }
      setDiscount(d);
      toast.success('Áp dụng voucher thành công');
    } catch (err: any) {
      toast.error(err.message);
      setDiscount(0);
    } finally {
      setIsValidatingVoucher(false);
    }
  };

  const onSubmit = async (data: CreateOrderInput) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const payload = { ...data, voucherCode: voucherCode || undefined };
      // append :00.000Z to local datetime-local
      payload.thoiGianHenLayHang = new Date(data.thoiGianHenLayHang).toISOString();

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Lỗi đặt hàng');

      clearCart();
      router.push(`/checkout/success?order=${result.order.maNhanHang}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (!isLoggedIn || items.length === 0) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-8"><i className="fa-solid fa-clipboard-check"></i> Thanh toán (Click & Collect)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Info */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Thông tin người nhận</h2>
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Họ tên</label>
                  <input 
                    type="text" 
                    value={user?.hoTen || ''} 
                    disabled 
                    className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại liên hệ *</label>
                  <input 
                    type="text" 
                    {...register('sdtLienHe')}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.sdtLienHe && <p className="text-red-500 text-xs mt-1">{errors.sdtLienHe.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Thời gian đến lấy hàng dự kiến *</label>
                  <input 
                    type="datetime-local" 
                    {...register('thoiGianHenLayHang')}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                  {errors.thoiGianHenLayHang && <p className="text-red-500 text-xs mt-1">{errors.thoiGianHenLayHang.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú (tùy chọn)</label>
                  <textarea 
                    {...register('ghiChu')}
                    rows={3}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                    placeholder="Ghi chú cho cửa hàng..."
                  />
                </div>
              </form>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Phương thức thanh toán</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-sky-600 bg-sky-50 rounded-xl cursor-pointer">
                  <input type="radio" value="TienMat" {...register('phuongThucThanhToan')} className="w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-500" />
                  <span className="ml-3 font-medium text-slate-800">Thanh toán 100% tại cửa hàng (Tiền mặt / Quẹt thẻ)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Đơn hàng của bạn</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex gap-3 flex-1 pr-4">
                      <span className="font-medium text-slate-800">{item.soLuong}x</span>
                      <span className="text-slate-600 line-clamp-2">{item.product.sanPham}</span>
                    </div>
                    <span className="font-medium text-slate-800">{formatCurrency(item.product.giaBan * item.soLuong)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-100 pt-4 mb-4">
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Mã giảm giá" 
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  />
                  <Button variant="outline" className="px-3 py-2 text-sm h-auto" onClick={handleApplyVoucher} disabled={isValidatingVoucher || !voucherCode}>Áp dụng</Button>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính</span>
                    <span className="font-medium text-slate-800">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Giảm giá</span>
                    <span className="font-medium text-teal-600">-{formatCurrency(discount)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-800">Tổng thanh toán</span>
                  <span className="text-2xl font-bold text-rose-600">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full text-lg py-4" 
                onClick={() => document.getElementById('checkout-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
