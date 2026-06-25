'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { 
    items, fetchCart, updateQuantity, removeItem, isLoading, 
    voucherCode, discount, setVoucher, clearVoucher,
    selectedItemIds, toggleItemSelection, selectAll, deselectAll
  } = useCartStore();
  const { isLoggedIn, token, _hasHydrated } = useAuthStore();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [voucherCodeInput, setVoucherCodeInput] = useState(voucherCode || '');
  const [isValidatingVoucher, setIsValidatingVoucher] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<any>(null);

  useEffect(() => {
    if (_hasHydrated) {
      if (!isLoggedIn) {
        router.push('/login');
      } else {
        fetchCart();
      }
    }
  }, [isLoggedIn, router, fetchCart, _hasHydrated]);

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

  const handleUpdateQuantity = async (id: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;
    setIsUpdating(true);
    try {
      await updateQuantity(id, newQty);
    } catch (error: any) {
      toast.error(error.message || 'Lỗi cập nhật số lượng');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      setIsUpdating(true);
      try {
        await removeItem(id);
        toast.success('Đã xóa sản phẩm');
      } catch (error: any) {
        toast.error(error.message || 'Lỗi xóa sản phẩm');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const selectedItems = items.filter(item => selectedItemIds.includes(item.id));
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
        toast.error(`Mã giảm giá đã bị hủy do giỏ hàng không còn đủ điều kiện áp dụng (tối thiểu ${formatCurrency(appliedVoucher.donToiThieu).replace('₫', 'đ')})`);
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
  const isAllSelected = items.length > 0 && selectedItemIds.length === items.length;

  const handleToggleAll = () => {
    if (isAllSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  };

  if (!isLoggedIn || !_hasHydrated) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-sm text-slate-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-sky-600">Trang chủ</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Giỏ hàng</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <i className="fa-solid fa-basket-shopping"></i> Giỏ hàng của bạn
        </h1>

        {items.length === 0 && !isLoading ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <i className="fa-solid fa-cart-shopping text-6xl text-slate-200 mb-4"></i>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-slate-500 mb-6">Hãy khám phá các dòng điện thoại mới nhất và thêm vào giỏ hàng nhé!</p>
            <Link href="/" className="inline-block bg-sky-600 text-white font-medium py-3 px-8 rounded-xl hover:bg-sky-700 transition">
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50/50 border-b border-slate-100 text-sm font-medium text-slate-500 items-center">
                  <div className="col-span-5 flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={isAllSelected}
                      onChange={handleToggleAll}
                      className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                    <span>Sản phẩm</span>
                  </div>
                  <div className="col-span-2 text-center">Đơn giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-2 text-right">Thành tiền</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Items */}
                <div className={`divide-y divide-slate-100 ${isUpdating || isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                  {items.map(item => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-1 md:col-span-5 flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={selectedItemIds.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                        />
                        <div className="w-20 h-20 bg-slate-50 rounded-lg relative overflow-hidden flex-shrink-0 p-2">
                          {item.productVariant?.imageUrl ? (
                            <Image 
                              src={item.productVariant.imageUrl} 
                              alt={item.productVariant?.product?.sanPham || ''} 
                              fill 
                              className="object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <i className="fa-solid fa-image"></i>
                            </div>
                          )}
                        </div>
                        <div>
                          <Link href={`/phone/${item.productVariant?.product?.slug}`} className="font-medium text-slate-800 hover:text-sky-600 line-clamp-2">
                            {item.productVariant?.product?.sanPham}{!item.productVariant?.product?.sanPham.includes(`${item.productVariant?.dungLuongGb}GB`) ? ` - ${item.productVariant?.dungLuongGb}GB` : ''} - {item.productVariant?.mauSac}
                          </Link>
                        </div>
                      </div>
                      
                      <div className="col-span-1 md:col-span-2 text-center font-medium text-slate-800">
                        {formatCurrency(item.productVariant?.giaBan || 0)}
                      </div>
                      
                      <div className="col-span-1 md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-9 w-24">
                          <button 
                            className="w-8 h-full flex items-center justify-center hover:bg-slate-50 text-slate-500 disabled:opacity-50"
                            onClick={() => handleUpdateQuantity(item.id, item.soLuong, -1)}
                            disabled={item.soLuong <= 1}
                          >
                            <i className="fa-solid fa-minus text-xs"></i>
                          </button>
                          <div className="flex-1 text-center text-sm font-medium">
                            {item.soLuong}
                          </div>
                          <button 
                            className="w-8 h-full flex items-center justify-center hover:bg-slate-50 text-slate-500"
                            onClick={() => handleUpdateQuantity(item.id, item.soLuong, 1)}
                          >
                            <i className="fa-solid fa-plus text-xs"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-1 md:col-span-2 text-right font-bold text-rose-600">
                        {formatCurrency((item.productVariant?.giaBan || 0) * item.soLuong)}
                      </div>
                      
                      <div className="col-span-1 flex justify-end md:justify-center">
                        <button 
                          className="text-slate-400 hover:text-rose-500 p-2"
                          onClick={() => handleRemove(item.id)}
                          title="Xóa"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <Link href="/" className="inline-flex items-center text-sky-600 font-medium hover:text-sky-700">
                  <i className="fa-solid fa-arrow-left mr-2"></i> Tiếp tục chọn sản phẩm
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-80">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Tóm tắt đơn hàng</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính</span>
                    <span className="font-medium text-slate-800">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Giảm giá</span>
                    <span className="font-medium text-teal-600">{discount > 0 ? `-${formatCurrency(discount)}` : '0đ'}</span>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Tổng tiền</span>
                    <span className="text-2xl font-bold text-rose-600">{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="border border-dashed border-slate-300 bg-slate-50 p-4 rounded-xl mb-6">
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

                <Link 
                  href={selectedItemIds.length > 0 ? "/checkout" : "#"} 
                  className={`block w-full text-center font-medium py-4 rounded-xl transition shadow-sm ${
                    selectedItemIds.length > 0 
                      ? "bg-rose-600 text-white hover:bg-rose-700 shadow-rose-600/20" 
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (selectedItemIds.length === 0) {
                      e.preventDefault();
                      toast.error('Vui lòng chọn ít nhất 1 sản phẩm để thanh toán');
                    }
                  }}
                >
                  Tiến hành đặt hàng ({selectedItemIds.length})
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
