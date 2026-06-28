'use client';

import { useEffect, useState, useMemo } from 'react';
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
import { ClipboardCheck, User, Store, MapPin, CreditCard, Ticket, X, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { items, fetchCart, clearCart, voucherCode, discount, setVoucher, clearVoucher, selectedItemIds, isLoading } = useCartStore();
  const { user, isLoggedIn, token, _hasHydrated } = useAuthStore();
  const router = useRouter();

  const [voucherCodeInput, setVoucherCodeInput] = useState(voucherCode || '');
  const [isValidatingVoucher, setIsValidatingVoucher] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<any>(null);

  useEffect(() => {
    setVoucherCodeInput(voucherCode || '');
    if (!voucherCode) {
      setAppliedVoucher(null);
    }
  }, [voucherCode]);

  useEffect(() => {
    if (voucherCode && !appliedVoucher && token) {
      const fetchVoucher = async () => {
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
          if (res.ok) {
            const data = await res.json();
            setAppliedVoucher(data);
          } else {
            clearVoucher();
          }
        } catch (e) {
          clearVoucher();
        }
      };
      fetchVoucher();
    }
  }, [voucherCode, token, appliedVoucher, clearVoucher]);

  const generateDates = useMemo(() => {
    const dates = [];
    const labels = ['Hôm nay', 'Ngày mai', 'Ngày kia'];
    for (let i = 0; i < 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        value: d.toISOString().split('T')[0],
        label: `${labels[i]} (${d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })})`
      });
    }
    return dates;
  }, []);

  const timeOptions = [
    { value: '08:30', label: 'Sáng (08:30 - 11:30)' },
    { value: '11:30', label: 'Trưa (11:30 - 14:30)' },
    { value: '14:30', label: 'Chiều (14:30 - 17:30)' },
    { value: '17:30', label: 'Tối (17:30 - 20:30)' },
  ];

  const [selectedDate, setSelectedDate] = useState(generateDates[0].value);
  const [selectedTime, setSelectedTime] = useState(timeOptions[0].value);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema) as any,
    defaultValues: {
      sdtLienHe: '',
      ghiChu: '',
      thoiGianHenLayHang: '',
      phuongThucThanhToan: 'TienMat',
    }
  });

  useEffect(() => {
    const dtStr = `${selectedDate}T${selectedTime}:00`;
    try {
      const dt = new Date(dtStr);
      setValue('thoiGianHenLayHang', dt.toISOString());
    } catch(e) {}
  }, [selectedDate, selectedTime, setValue]);

  useEffect(() => {
    if (_hasHydrated) {
      if (!isLoggedIn) {
        router.push('/login');
      } else {
        fetchCart();
      }
    }
  }, [isLoggedIn, router, fetchCart, _hasHydrated]);

  const selectedItems = useMemo(() => items.filter(item => selectedItemIds.includes(item.id)), [items, selectedItemIds]);

  useEffect(() => {
    if (isLoggedIn && !isLoading && selectedItems.length === 0) {
      router.push('/cart');
    }
  }, [isLoggedIn, isLoading, selectedItems.length, router]);
  const subtotal = selectedItems.reduce((acc, item) => acc + (item.productVariant?.giaBan * item.soLuong || 0), 0);
  
  const calculateVoucherDiscount = (itemsList: typeof items, voucher: any) => {
    if (!voucher) return 0;
    
    let eligibleSubtotal = 0;
    const apDungCho = voucher.apDungCho || 'tat_ca';
    
    if (apDungCho === 'tat_ca') {
      eligibleSubtotal = subtotal;
    } else if (apDungCho.startsWith('hang:')) {
      const brand = apDungCho.replace('hang:', '').toLowerCase();
      eligibleSubtotal = itemsList
        .filter(item => item.productVariant?.product?.hang?.toLowerCase() === brand)
        .reduce((acc, item) => acc + (item.productVariant?.giaBan * item.soLuong || 0), 0);
    } else if (apDungCho.startsWith('phan_khuc:')) {
      const segment = apDungCho.replace('phan_khuc:', '').toLowerCase();
      eligibleSubtotal = itemsList
        .filter(item => item.productVariant?.product?.phanKhuc?.toLowerCase() === segment)
        .reduce((acc, item) => acc + (item.productVariant?.giaBan * item.soLuong || 0), 0);
    }

    if (eligibleSubtotal === 0 || eligibleSubtotal < voucher.donToiThieu) {
      return 0;
    }

    let d = 0;
    if (voucher.loaiGiamGia === 'PERCENTAGE') {
      d = Math.floor((eligibleSubtotal * voucher.giaTri) / 100);
      if (voucher.toiDaGiam && d > voucher.toiDaGiam) {
        d = voucher.toiDaGiam;
      }
    } else {
      d = voucher.giaTri;
    }

    if (d > eligibleSubtotal) d = eligibleSubtotal;
    return d;
  };

  useEffect(() => {
    if (appliedVoucher) {
      let eligibleSubtotal = 0;
      const apDungCho = appliedVoucher.apDungCho || 'tat_ca';
      if (apDungCho === 'tat_ca') {
        eligibleSubtotal = subtotal;
      } else if (apDungCho.startsWith('hang:')) {
        const brand = apDungCho.replace('hang:', '').toLowerCase();
        eligibleSubtotal = selectedItems
          .filter(item => item.productVariant?.product?.hang?.toLowerCase() === brand)
          .reduce((acc, item) => acc + (item.productVariant?.giaBan * item.soLuong || 0), 0);
      } else if (apDungCho.startsWith('phan_khuc:')) {
        const segment = apDungCho.replace('phan_khuc:', '').toLowerCase();
        eligibleSubtotal = selectedItems
          .filter(item => item.productVariant?.product?.phanKhuc?.toLowerCase() === segment)
          .reduce((acc, item) => acc + (item.productVariant?.giaBan * item.soLuong || 0), 0);
      }

      if (eligibleSubtotal === 0 || eligibleSubtotal < appliedVoucher.donToiThieu) {
        clearVoucher();
        setVoucherCodeInput('');
        setAppliedVoucher(null);
        toast.error(`Mã giảm giá đã bị hủy do đơn hàng không còn đủ điều kiện áp dụng (tối thiểu ${formatCurrency(appliedVoucher.donToiThieu).replace('₫', 'đ')})`);
      } else {
        const d = calculateVoucherDiscount(selectedItems, appliedVoucher);
        if (d !== discount) {
          setVoucher(appliedVoucher.maVoucher, d);
        }
      }
    }
  }, [selectedItems, appliedVoucher, discount, subtotal, setVoucher, clearVoucher]);

  const handleApplyVoucher = async () => {
    if (!voucherCodeInput) return;
    setIsValidatingVoucher(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${API_URL}/orders/validate-voucher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ voucherCode: voucherCodeInput })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi voucher');
      
      // Check scope and minimum spend
      let eligibleSubtotal = 0;
      const apDungCho = data.apDungCho || 'tat_ca';
      if (apDungCho === 'tat_ca') {
        eligibleSubtotal = subtotal;
      } else if (apDungCho.startsWith('hang:')) {
        const brand = apDungCho.replace('hang:', '').toLowerCase();
        eligibleSubtotal = selectedItems
          .filter(item => item.productVariant?.product?.hang?.toLowerCase() === brand)
          .reduce((acc, item) => acc + (item.productVariant?.giaBan * item.soLuong || 0), 0);
      } else if (apDungCho.startsWith('phan_khuc:')) {
        const segment = apDungCho.replace('phan_khuc:', '').toLowerCase();
        eligibleSubtotal = selectedItems
          .filter(item => item.productVariant?.product?.phanKhuc?.toLowerCase() === segment)
          .reduce((acc, item) => acc + (item.productVariant?.giaBan * item.soLuong || 0), 0);
      }

      if (eligibleSubtotal === 0) {
        throw new Error('Đơn hàng không có sản phẩm nào thuộc phạm vi áp dụng của voucher');
      }

      if (eligibleSubtotal < data.donToiThieu) {
        throw new Error(`Tổng giá trị các sản phẩm được áp dụng voucher phải tối thiểu ${formatCurrency(data.donToiThieu)}`);
      }

      const d = calculateVoucherDiscount(selectedItems, data);
      
      setAppliedVoucher(data);
      setVoucher(voucherCodeInput, d);
      toast.success('Áp dụng voucher thành công');
    } catch (err: any) {
      toast.error(err.message);
      clearVoucher();
      setAppliedVoucher(null);
    } finally {
      setIsValidatingVoucher(false);
    }
  };

  const total = subtotal - discount;

  const onSubmit = async (data: CreateOrderInput) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const payload = { 
        ...data, 
        voucherCode: voucherCode || undefined,
        cartItemIds: selectedItemIds.length > 0 ? selectedItemIds : undefined
      };
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

      // Refresh cart to remove checked out items
      await fetchCart();
      router.push(`/checkout/success?order=${result.order.maNhanHang}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (!isLoggedIn || !_hasHydrated || selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-[var(--font-outfit)] font-bold text-slate-900 mb-8 tracking-tight flex items-center gap-3">
          <ClipboardCheck size={28} className="text-sky-600" /> Thanh toán (Click & Collect)
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Info */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-card border border-slate-200/60 mb-6 transition-all">
              <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2"><User size={20} className="text-sky-600" /> 1. Thông tin khách hàng</h2>
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên *</label>
                    <input 
                      type="text" 
                      defaultValue={user?.hoTen || ''}
                      onChange={(e) => {}}
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none transition-all duration-200"
                      placeholder="Nhập họ và tên..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại *</label>
                    <input 
                      type="text" 
                      {...register('sdtLienHe')}
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none transition-all duration-200"
                      placeholder="Nhập số điện thoại liên hệ..."
                    />
                    {errors.sdtLienHe && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.sdtLienHe.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Địa chỉ Email *</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email || ''}
                    onChange={(e) => {}}
                    className="w-full md:w-1/2 px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none transition-all duration-200"
                    placeholder="Nhập địa chỉ email..."
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-card border border-slate-200/60 mb-6 transition-all">
              <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2"><Store size={20} className="text-sky-600" /> 2. Địa điểm & thời gian nhận máy (Click & Collect)</h2>
              
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-3">Cửa hàng nhận máy duy nhất:</p>
                <div className="p-5 bg-sky-50/80 border border-sky-100/80 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                  <p className="font-bold text-sky-800 flex items-center gap-2 mb-2"><MapPin size={18} /> PhoneStore Central - Chi nhánh Quận 10</p>
                  <p className="text-sm text-sky-700/80 mb-1 font-medium">Địa chỉ: 123 Đường 3/2, Phường 11, Quận 10, TP. Hồ Chí Minh</p>
                  <p className="text-sm text-sky-700/80 font-medium">Giờ hoạt động: 08:30 - 21:30 hàng ngày</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Chọn ngày nhận máy *</label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none transition-all duration-200 cursor-pointer"
                  >
                    {generateDates.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Khung giờ nhận máy *</label>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none transition-all duration-200 cursor-pointer"
                  >
                    {timeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <input type="hidden" {...register('thoiGianHenLayHang')} />
                {errors.thoiGianHenLayHang && <p className="text-rose-500 text-xs mt-1 col-span-2 font-medium">{errors.thoiGianHenLayHang.message}</p>}
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ghi chú thêm (không bắt buộc)</label>
                <textarea 
                  {...register('ghiChu')}
                  rows={3}
                  form="checkout-form"
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none transition-all duration-200 resize-none"
                  placeholder="Nhập yêu cầu đặc biệt hoặc ghi chú khác cho nhân viên tại quầy..."
                />
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-card border border-slate-200/60 mb-6 transition-all">
              <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2"><CreditCard size={20} className="text-sky-600" /> 3. Phương thức thanh toán tại quầy</h2>
              <div className="space-y-4">
                <label className="flex items-start p-5 border-2 border-sky-500/30 bg-sky-50/30 rounded-2xl cursor-pointer hover:bg-sky-50/50 transition-colors">
                  <input type="radio" value="TienMat" form="checkout-form" {...register('phuongThucThanhToan')} className="w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-500/20 mt-1 cursor-pointer transition-colors" />
                  <div className="ml-4">
                    <span className="block font-bold text-slate-800">Thanh toán trực tiếp khi nhận hàng</span>
                    <span className="block text-sm text-slate-500 mt-1.5 leading-relaxed">Bạn sẽ kiểm tra tình trạng máy, phụ kiện tại quầy và thực hiện thanh toán (Tiền mặt hoặc Quẹt QR Chuyển khoản) trước khi mang máy về.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[420px]">
            <div className="bg-white rounded-3xl shadow-card border border-slate-200/60 p-6 lg:p-8 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-5 tracking-tight">Sản phẩm đặt mua ({selectedItems.length})</h3>
              
              <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-2">
                {selectedItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm py-2">
                    <div className="flex gap-3 flex-1 pr-4">
                      <span className="text-slate-700 font-medium line-clamp-2">{item.productVariant?.product?.sanPham}{!item.productVariant?.product?.sanPham.includes(`${item.productVariant?.dungLuongGb}GB`) ? ` - ${item.productVariant?.dungLuongGb}GB` : ''} - {item.productVariant?.mauSac}</span>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-slate-500 text-xs font-semibold block">{item.soLuong} × {formatCurrency(item.productVariant?.giaBan || 0)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-100 pt-5 mb-5">
                <div className="border border-dashed border-slate-300/80 bg-slate-50/50 p-4 rounded-2xl mb-5">
                  <label className="block text-sm font-bold text-slate-800 mb-3 tracking-tight">Nhập mã giảm giá (Voucher)</label>
                  {voucherCode ? (
                    <div className="flex flex-col bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <Ticket size={16} className="text-emerald-600" strokeWidth={2} />
                          <span className="font-bold text-emerald-800 uppercase tracking-wider">{voucherCode}</span>
                        </div>
                        <button 
                          onClick={() => {
                            clearVoucher();
                            setVoucherCodeInput('');
                            setAppliedVoucher(null);
                            toast.success('Đã hủy áp dụng voucher');
                          }}
                          className="text-emerald-600 hover:text-emerald-800 p-1 hover:bg-emerald-100 rounded-lg transition-colors active:scale-95"
                          title="Hủy áp dụng"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                      <div className="mt-2.5 pt-2.5 border-t border-emerald-100 flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold">
                        <CheckCircle size={14} strokeWidth={2} />
                        <span>Đã áp dụng thành công</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={voucherCodeInput}
                        onChange={(e) => setVoucherCodeInput(e.target.value)}
                        placeholder="MÃ GIẢM GIÁ" 
                        className="flex-1 min-w-0 px-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-sm font-medium focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none uppercase transition-all duration-200"
                      />
                      <button 
                        className="whitespace-nowrap flex-shrink-0 px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-900 transition-colors active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-card hover:shadow-elevated"
                        onClick={handleApplyVoucher} 
                        disabled={isValidatingVoucher || !voucherCodeInput}
                      >
                        {isValidatingVoucher ? 'Đang áp dụng...' : 'Áp dụng'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính</span>
                    <span className="font-semibold text-slate-800 tabular-nums">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Giảm giá</span>
                    <span className="font-semibold text-teal-600 tabular-nums">{discount > 0 ? `-${formatCurrency(discount)}` : '0đ'}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-5 border-t border-slate-100">
                  <span className="font-bold text-slate-800">Cần thanh toán</span>
                  <span className="text-2xl font-[var(--font-outfit)] font-bold text-rose-600 tabular-nums">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full text-base font-bold uppercase tracking-wide py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-all duration-200 shadow-card hover:shadow-elevated active:scale-95" 
                onClick={() => document.getElementById('checkout-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng trước'}
              </Button>
              <p className="text-center text-[11px] text-slate-500 mt-5 leading-relaxed px-2">
                Bằng cách nhấp vào nút này, bạn đồng ý đặt trước sản phẩm và sẽ tới nhận máy trong vòng 24 giờ sau thời điểm đã hẹn.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
