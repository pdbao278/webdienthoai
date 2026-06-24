'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import { authFetch, authFetchJson } from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface OrderUser {
  hoTen: string;
  email: string;
  sdt: string | null;
}

interface OrderItemVariant {
  dungLuongGb: number;
  mauSac: string;
  product: { sanPham: string };
}

interface OrderItem {
  soLuong: number;
  productVariant: OrderItemVariant;
}

interface OrderData {
  id: string;
  maNhanHang: string;
  thanhTien: number;
  trangThai: string;
  createdAt: string;
  user: OrderUser;
  items: OrderItem[];
}

const ORDER_STATUS_MAP: Record<string, string> = {
  'DA_DAT': 'Đã đặt',
  'DANG_CHUAN_BI': 'Đang chuẩn bị',
  'CHO_NHAN_HANG': 'Chờ nhận hàng',
  'HOAN_THANH': 'Hoàn thành',
  'DA_HUY': 'Đã hủy',
};

const STATUS_COLORS: Record<string, string> = {
  'DA_DAT': 'bg-blue-100 text-blue-800',
  'DANG_CHUAN_BI': 'bg-yellow-100 text-yellow-800',
  'CHO_NHAN_HANG': 'bg-orange-100 text-orange-800',
  'HOAN_THANH': 'bg-green-100 text-green-800',
  'DA_HUY': 'bg-red-100 text-red-800',
};

/** Chuyển đổi trạng thái hợp lệ (máy trạng thái) */
const VALID_TRANSITIONS: Record<string, string[]> = {
  'DA_DAT': ['DANG_CHUAN_BI', 'DA_HUY'],
  'DANG_CHUAN_BI': ['CHO_NHAN_HANG', 'DA_HUY'],
  'CHO_NHAN_HANG': ['HOAN_THANH', 'DA_HUY'],
  'HOAN_THANH': [],
  'DA_HUY': [],
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const { token } = useAuthStore();
  
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      const queryStr = params.toString();

      const res = await authFetch(`/admin/orders${queryStr ? `?${queryStr}` : ''}`, token!);
      if (!res.ok) throw new Error('Không thể tải danh sách đơn hàng');
      const data = await res.json();
      setOrders(data.data || []);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Lỗi tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, statusFilter]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await authFetchJson(`/admin/orders/${orderId}/status`, token!, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Cập nhật thất bại');
      }
      toast.success('Cập nhật trạng thái thành công');
      fetchOrders();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Lỗi cập nhật');
    }
  };

  const handleScanQR = async () => {
    if (!qrCode.trim()) return;
    setIsScanning(true);
    try {
      const res = await authFetchJson('/admin/orders/scan', token!, {
        method: 'POST',
        body: JSON.stringify({ maNhanHang: qrCode.trim() })
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Quét mã thất bại');
      }
      toast.success('Xác nhận giao hàng thành công');
      setShowQRModal(false);
      setQrCode('');
      fetchOrders();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Lỗi quét mã');
    } finally {
      setIsScanning(false);
    }
  };

  /** Lấy các trạng thái có thể chuyển sang từ trạng thái hiện tại */
  const getNextStatuses = (current: string): string[] => {
    return VALID_TRANSITIONS[current] || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Quản lý Đơn hàng</h1>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-sm"
          >
            <option value="">Tất cả trạng thái</option>
            {Object.entries(ORDER_STATUS_MAP).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>

          <Button 
            variant="primary" 
            onClick={() => setShowQRModal(true)}
            className="whitespace-nowrap"
          >
            <i className="fa-solid fa-qrcode mr-2"></i> Quét mã nhận hàng
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Mã đơn / QR</th>
                <th className="px-6 py-4 font-semibold">Khách hàng</th>
                <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                <th className="px-6 py-4 font-semibold">Tổng tiền</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Đang tải dữ liệu...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Không có đơn hàng nào</td>
                </tr>
              ) : (
                orders.map((order) => {
                  const nextStatuses = getNextStatuses(order.trangThai);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{order.maNhanHang}</div>
                        <div className="text-xs text-slate-500 mt-1">{new Date(order.createdAt).toLocaleString('vi-VN')}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{order.user.hoTen}</div>
                        <div className="text-xs text-slate-500">{order.user.sdt}</div>
                      </td>
                      <td className="px-6 py-4 max-w-[250px]">
                        <div className="truncate text-slate-700" title={order.items.map((i) => `${i.soLuong}x ${i.productVariant.product.sanPham} ${i.productVariant.dungLuongGb}GB - ${i.productVariant.mauSac}`).join(', ')}>
                          {order.items.map((i) => `${i.soLuong}x ${i.productVariant.product.sanPham} ${i.productVariant.dungLuongGb}GB`).join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-sky-700">
                        {formatCurrency(order.thanhTien)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[order.trangThai] || 'bg-slate-100 text-slate-800'}`}>
                          {ORDER_STATUS_MAP[order.trangThai]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {nextStatuses.length > 0 ? (
                          <select
                            value=""
                            onChange={(e) => {
                              if (e.target.value) handleUpdateStatus(order.id, e.target.value);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-sky-500 outline-none"
                          >
                            <option value="">Chuyển trạng thái...</option>
                            {nextStatuses.map((s) => (
                              <option key={s} value={s}>{ORDER_STATUS_MAP[s]}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showQRModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Giả lập máy quét QR</h3>
                <button onClick={() => setShowQRModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center mb-6">
                <i className="fa-solid fa-qrcode text-6xl text-slate-300 mb-4"></i>
                <p className="text-sm text-slate-500 text-center">Trong thực tế, bạn sẽ dùng máy quét mã vạch.<br/>Ở đây, hãy nhập mã nhận hàng thủ công.</p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Mã nhận hàng (QR Code)"
                  placeholder="Ví dụ: ORD-123456"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  autoFocus
                />
                <Button 
                  className="w-full" 
                  onClick={handleScanQR}
                  isLoading={isScanning}
                  disabled={!qrCode.trim()}
                >
                  Xác nhận giao hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
