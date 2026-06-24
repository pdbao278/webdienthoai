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
  const { isLoggedIn, token } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Không thể tải đơn hàng');
      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      fetchOrders();
    }
  }, [isLoggedIn, router]);

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

  if (!isLoggedIn) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <i className="fa-regular fa-clipboard"></i> Đơn hàng của tôi
        </h1>

        {isLoading ? (
          <div className="text-center py-10">Đang tải...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500 mb-6">Bạn chưa có đơn hàng nào.</p>
            <Link href="/" className="inline-block bg-sky-600 text-white font-medium py-3 px-8 rounded-xl hover:bg-sky-700 transition">
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
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
                    <div className="flex gap-4 items-center bg-sky-50 p-3 rounded-xl border border-sky-100 w-full sm:w-auto">
                      <div className="bg-white p-1 rounded-lg">
                        <QRCodeSVG value={order.maNhanHang} size={60} />
                      </div>
                      <div className="text-xs text-slate-600">
                        Đưa mã QR này<br/>cho nhân viên để nhận máy
                      </div>
                    </div>
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
    </div>
  );
}
