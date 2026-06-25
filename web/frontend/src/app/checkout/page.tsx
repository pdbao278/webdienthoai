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
        <h1 className="text-2xl font-bold text-slate-900 mb-8"><i className="fa-solid fa-clipboard-check"></i> Thanh toán (Click & Collect)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Info */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2"><i className="fa-regular fa-user mr-2"></i> 1. Thông tin khách hàng</h2>
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên *</label>
                    <input 
                      type="text" 
                      defaultValue={user?.hoTen || ''}
                      onChange={(e) => {}}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                      placeholder="Nhập họ và tên..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại *</label>
                    <input 
                      type="text" 
                      {...register('sdtLienHe')}
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                      placeholder="Nhập số điện thoại liên hệ..."
                    />
                    {errors.sdtLienHe && <p className="text-red-500 text-xs mt-1">{errors.sdtLienHe.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ Email *</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email || ''}
                    onChange={(e) => {}}
                    className="w-full md:w-1/2 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                    placeholder="Nhập địa chỉ email..."
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2"><i className="fa-solid fa-store mr-2"></i> 2. Địa điểm & thời gian nhận máy (Click & Collect)</h2>
              
              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-2">Cửa hàng nhận máy duy nhất:</p>
                <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl">
                  <p className="font-bold text-sky-800"><i className="fa-solid fa-location-dot mr-2"></i> PhoneStore Central - Chi nhánh Quận 10</p>
                  <p className="text-sm text-sky-700 mt-1">Địa chỉ: 123 Đường 3/2, Phường 11, Quận 10, TP. Hồ Chí Minh</p>
                  <p className="text-sm text-sky-700">Giờ hoạt động: 08:30 - 21:30 hàng ngày</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Chọn ngày nhận máy *</label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  >
                    {generateDates.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Khung giờ nhận máy *</label>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  >
                    {timeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <input type="hidden" {...register('thoiGianHenLayHang')} />
                {errors.thoiGianHenLayHang && <p className="text-red-500 text-xs mt-1 col-span-2">{errors.thoiGianHenLayHang.message}</p>}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú thêm (không bắt buộc)</label>
                <textarea 
                  {...register('ghiChu')}
                  rows={3}
                  form="checkout-form"
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                  placeholder="Nhập yêu cầu đặc biệt hoặc ghi chú khác cho nhân viên tại quầy..."
                />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2"><i className="fa-regular fa-credit-card mr-2"></i> 3. Phương thức thanh toán tại quầy</h2>
              <div className="space-y-3">
                <label className="flex items-start p-4 border border-sky-600 bg-sky-50 rounded-xl cursor-pointer">
                  <input type="radio" value="TienMat" form="checkout-form" {...register('phuongThucThanhToan')} className="w-4 h-4 text-sky-600 border-slate-300 focus:ring-sky-500 mt-1" />
                  <div className="ml-3">
                    <span className="block font-medium text-slate-800">Thanh toán trực tiếp khi nhận hàng</span>
                    <span className="block text-xs text-slate-500 mt-1">Bạn sẽ kiểm tra tình trạng máy, phụ kiện tại quầy và thực hiện thanh toán (Tiền mặt hoặc Quẹt QR Chuyển khoản) trước khi mang máy về.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Sản phẩm đặt mua ({selectedItems.length})</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {selectedItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex gap-3 flex-1 pr-4">
                      <span className="text-slate-600 line-clamp-2">{item.productVariant?.product?.sanPham}{!item.productVariant?.product?.sanPham.includes(`${item.productVariant?.dungLuongGb}GB`) ? ` - ${item.productVariant?.dungLuongGb}GB` : ''} - {item.productVariant?.mauSac}</span>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-slate-500 text-xs block">{item.soLuong} × {formatCurrency(item.productVariant?.giaBan || 0)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-100 pt-4 mb-4">
                <div className="border border-dashed border-slate-300 bg-slate-50 p-4 rounded-xl mb-4">
                  <label className="block text-sm font-medium text-slate-800 mb-2">Nhập mã giảm giá (Voucher)</label>
                  {voucherCode ? (
                    <div className="flex flex-col bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <i className="fa-solid fa-ticket text-emerald-600"></i>
                          <span className="font-semibold text-emerald-800 uppercase">{voucherCode}</span>
                        </div>
                        <button 
                          onClick={() => {
                            clearVoucher();
                            setVoucherCodeInput('');
                            setAppliedVoucher(null);
                            toast.success('Đã hủy áp dụng voucher');
                          }}
                          className="text-slate-400 hover:text-rose-500 p-1 transition"
                          title="Hủy áp dụng"
                        >
                          <i className="fa-solid fa-xmark text-lg"></i>
                        </button>
                      </div>
                      <div className="mt-1.5 flex items-center space-x-1.5 text-xs text-emerald-600 font-medium">
                        <i className="fa-solid fa-circle-check text-[10px]"></i>
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
                        className="flex-1 min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none uppercase"
                      />
                      <button 
                        className="whitespace-nowrap flex-shrink-0 px-4 py-2 border border-sky-600 text-sky-600 bg-white rounded-lg text-sm font-medium hover:bg-sky-50 transition disabled:opacity-50"
                        onClick={handleApplyVoucher} 
                        disabled={isValidatingVoucher || !voucherCodeInput}
                      >
                        {isValidatingVoucher ? 'Đang áp dụng...' : 'Áp dụng'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính</span>
                    <span className="font-medium text-slate-800">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Giảm giá</span>
                    <span className="font-medium text-teal-600">{discount > 0 ? `-${formatCurrency(discount)}` : '0đ'}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-800">Cần thanh toán</span>
                  <span className="text-2xl font-bold text-rose-600">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full text-lg py-4 bg-teal-600 hover:bg-teal-700 text-white" 
                onClick={() => document.getElementById('checkout-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng trước'}
              </Button>
              <p className="text-center text-[11px] text-slate-500 mt-4 leading-relaxed px-2">
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
