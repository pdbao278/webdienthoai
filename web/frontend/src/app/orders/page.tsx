'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';
import { ClipboardList, QrCode, X } from 'lucide-react';

interface OrderItem {
  id: string;
  soLuong: number;
  donGia: number;
  productVariant: {
    dungLuongGb: number;
    mauSac: string;
    product: {
      sanPham: string;
    }
  }
}

interface Order {
  id: string;
  maNhanHang: string;
  tongTienHang: number;
  tienGiamGia: number;
  thanhTien: number;
  trangThai: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { isLoggedIn, token, _hasHydrated } = useAuthStore();
  const router = useRouter();
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedOrderForQr, setSelectedOrderForQr] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Không thể tải đơn hàng');
      const data = await res.json();
      setAllOrders(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (_hasHydrated) {
      if (!isLoggedIn) {
        router.push('/login');
      } else {
        fetchOrders();
      }
    }
  }, [isLoggedIn, router, _hasHydrated, token]);

  const handleCancel = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const res = await fetch(`${API_URL}/orders/${id}/cancel`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Lỗi hủy đơn');
        }
        toast.success('Đã hủy đơn hàng');
        fetchOrders();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DA_DAT': return <span className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide">Đã đặt</span>;
      case 'DANG_CHUAN_BI': return <span className="bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide">Đang chuẩn bị</span>;
      case 'CHO_NHAN_HANG': return <span className="bg-purple-50 border border-purple-200 text-purple-700 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide">Chờ nhận hàng</span>;
      case 'HOAN_THANH': return <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide">Hoàn thành</span>;
      case 'DA_HUY': return <span className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide">Đã hủy</span>;
      default: return null;
    }
  };

  const STATUS_TABS = [
    { id: 'ALL', label: 'Tất cả' },
    { id: 'DA_DAT', label: 'Đã đặt' },
    { id: 'DANG_CHUAN_BI', label: 'Đang chuẩn bị' },
    { id: 'CHO_NHAN_HANG', label: 'Chờ nhận hàng' },
    { id: 'HOAN_THANH', label: 'Hoàn thành' },
    { id: 'DA_HUY', label: 'Đã hủy' },
  ];

  const counts = STATUS_TABS.reduce((acc, tab) => {
    if (tab.id === 'ALL') {
      acc[tab.id] = allOrders.length;
    } else {
      acc[tab.id] = allOrders.filter((o) => o.trangThai === tab.id).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const filteredOrders = activeTab === 'ALL' 
    ? allOrders 
    : allOrders.filter(o => o.trangThai === activeTab);

  if (!isLoggedIn || !_hasHydrated) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-2xl font-[var(--font-outfit)] font-bold text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
          <ClipboardList size={28} className="text-sky-600" /> Đơn hàng của tôi
        </h1>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-card border border-slate-200/60 p-2 overflow-x-auto mb-8">
          <div className="flex space-x-2 min-w-max">
            {STATUS_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 active:scale-95 ${
                  activeTab === tab.id 
                    ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200/60' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === tab.id ? 'bg-sky-200/50 text-sky-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {counts[tab.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-slate-400 flex items-center justify-center gap-2"><div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div> Đang tải...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-slate-200/60 flex flex-col items-center">
            <ClipboardList size={64} strokeWidth={1} className="text-slate-200 mb-6" />
            <p className="text-slate-500 mb-8 font-medium">Bạn chưa có đơn hàng nào trong trạng thái này.</p>
            <Link href="/" className="inline-flex items-center justify-center bg-slate-800 text-white font-semibold py-3.5 px-8 rounded-xl hover:bg-slate-900 transition-all duration-200 shadow-card hover:shadow-elevated active:scale-95">
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-3xl shadow-card border border-slate-200/60 p-6 md:p-8 hover:shadow-elevated transition-shadow duration-300">
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-slate-100 pb-5 mb-5 gap-4">
                  <div>
                    <div className="text-sm text-slate-500 mb-1.5 font-medium">Mã đơn: <strong className="text-slate-800 font-bold tracking-wide uppercase">{order.maNhanHang}</strong></div>
                    <div className="text-xs font-medium text-slate-400">Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.trangThai)}
                    {order.trangThai === 'DA_DAT' && (
                      <button 
                        onClick={() => handleCancel(order.id)}
                        className="text-xs text-rose-600 border border-rose-200 hover:bg-rose-50 px-3 py-1.5 rounded-xl font-bold transition-colors active:scale-95"
                      >
                        Hủy đơn
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-5 mb-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex gap-4 items-center">
                        <div className="font-bold text-slate-800 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">{item.soLuong}x</div>
                        <div className="text-slate-700 font-medium line-clamp-2">{item.productVariant?.product?.sanPham}{!item.productVariant?.product?.sanPham.includes(`${item.productVariant?.dungLuongGb}GB`) ? ` - ${item.productVariant?.dungLuongGb}GB` : ''} - {item.productVariant?.mauSac}</div>
                      </div>
                      <div className="font-bold text-slate-800 tabular-nums">{formatCurrency(item.donGia)}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-slate-100 gap-6">
                  {order.trangThai !== 'DA_HUY' && order.trangThai !== 'HOAN_THANH' && (
                    <button 
                      onClick={() => setSelectedOrderForQr(order)}
                      className="flex items-center justify-center gap-2 px-5 py-3 bg-sky-50/80 hover:bg-sky-100 border border-sky-200/60 rounded-xl text-sky-700 text-sm font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto"
                    >
                      <QrCode size={18} strokeWidth={2} /> Mã QR Nhận Hàng
                    </button>
                  )}
                  <div className="text-right w-full sm:w-auto ml-auto">
                    <div className="text-sm font-semibold text-slate-500 mb-1.5">Tổng tiền</div>
                    <div className="text-2xl font-[var(--font-outfit)] font-bold text-rose-600 tabular-nums">{formatCurrency(order.thanhTien)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />

      {/* QR Code Popup Modal */}
      {selectedOrderForQr && (
        <div className="fixed inset-0 z-[var(--z-modal-backdrop)] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-modal border border-slate-200/60 transform scale-100 transition-all animate-fade-in-up">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Mã QR Nhận Hàng</h3>
                <p className="text-xs font-medium text-slate-500 mt-1">Đưa mã QR này cho nhân viên để nhận máy và thanh toán</p>
              </div>
              <button 
                onClick={() => setSelectedOrderForQr(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors active:scale-95 bg-slate-50"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-col items-center bg-slate-50/80 p-6 rounded-3xl border border-slate-200/60 mb-8">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <QRCodeSVG value={selectedOrderForQr.maNhanHang} size={200} />
              </div>
              <div className="mt-5 font-[var(--font-outfit)] font-bold text-slate-800 text-xl uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                {selectedOrderForQr.maNhanHang}
              </div>
            </div>

            <button 
              onClick={() => setSelectedOrderForQr(null)}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-card hover:shadow-elevated transition-all duration-200 active:scale-95 text-sm"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
