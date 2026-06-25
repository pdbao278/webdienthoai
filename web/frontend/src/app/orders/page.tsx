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
      case 'DA_DAT': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-semibold">Đã đặt</span>;
      case 'DANG_CHUAN_BI': return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-semibold">Đang chuẩn bị</span>;
      case 'CHO_NHAN_HANG': return <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-semibold">Chờ nhận hàng</span>;
      case 'HOAN_THANH': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-semibold">Hoàn thành</span>;
      case 'DA_HUY': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs font-semibold">Đã hủy</span>;
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
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <i className="fa-regular fa-clipboard"></i> Đơn hàng của tôi
        </h1>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 overflow-x-auto mb-6">
          <div className="flex space-x-2 min-w-max">
            {STATUS_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-sky-200 text-sky-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {counts[tab.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Đang tải...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500 mb-6">Bạn chưa có đơn hàng nào trong trạng thái này.</p>
            <Link href="/" className="inline-block bg-sky-600 text-white font-medium py-3 px-8 rounded-xl hover:bg-sky-700 transition">
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-slate-100 pb-4 mb-4 gap-4">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Mã đơn: <strong className="text-slate-800">{order.maNhanHang}</strong></div>
                    <div className="text-xs text-slate-400">Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.trangThai)}
                    {order.trangThai === 'DA_DAT' && (
                      <button 
                        onClick={() => handleCancel(order.id)}
                        className="text-xs text-red-600 border border-red-200 hover:bg-red-50 px-2 py-1 rounded-lg font-medium transition"
                      >
                        Hủy đơn
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex gap-4 items-center">
                        <div className="font-medium text-slate-800">{item.soLuong}x</div>
                        <div className="text-slate-600 line-clamp-1">{item.productVariant?.product?.sanPham}{!item.productVariant?.product?.sanPham.includes(`${item.productVariant?.dungLuongGb}GB`) ? ` - ${item.productVariant?.dungLuongGb}GB` : ''} - {item.productVariant?.mauSac}</div>
                      </div>
                      <div className="font-medium text-slate-800">{formatCurrency(item.donGia)}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-100 gap-6">
                  {order.trangThai !== 'DA_HUY' && order.trangThai !== 'HOAN_THANH' && (
                    <button 
                      onClick={() => setSelectedOrderForQr(order)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-sky-50 hover:bg-sky-100 border border-sky-100 hover:border-sky-200 rounded-xl text-sky-700 text-sm font-semibold transition"
                    >
                      <i className="fa-solid fa-qrcode text-base"></i> Mã QR Nhận Hàng
                    </button>
                  )}
                  <div className="text-right w-full sm:w-auto ml-auto">
                    <div className="text-sm text-slate-500 mb-1">Tổng tiền</div>
                    <div className="text-2xl font-bold text-rose-600">{formatCurrency(order.thanhTien)}</div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 transform scale-100 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Mã QR Nhận Hàng</h3>
                <p className="text-xs text-slate-500 mt-1">Đưa mã QR này cho nhân viên để nhận máy và thanh toán</p>
              </div>
              <button 
                onClick={() => setSelectedOrderForQr(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div className="flex flex-col items-center bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <QRCodeSVG value={selectedOrderForQr.maNhanHang} size={200} />
              </div>
              <div className="mt-4 font-bold text-slate-800 text-lg uppercase tracking-wider">
                {selectedOrderForQr.maNhanHang}
              </div>
            </div>

            <button 
              onClick={() => setSelectedOrderForQr(null)}
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl shadow-sm transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
