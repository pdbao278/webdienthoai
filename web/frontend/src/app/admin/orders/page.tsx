'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import { authFetch, authFetchJson } from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const formatDateTime = (dateStr: string) => {
  const d = new Date(dateStr);
  const time = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const date = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `${time} ngày ${date}`;
};

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
  donGia: number;
  productVariant: OrderItemVariant;
}

interface OrderVoucher {
  maVoucher: string;
  giaTri: number;
  loaiGiamGia: string;
}

interface OrderData {
  id: string;
  maNhanHang: string;
  tongTienHang: number;
  tienGiamGia: number;
  thanhTien: number;
  trangThai: string;
  createdAt: string;
  user: OrderUser;
  items: OrderItem[];
  voucher?: OrderVoucher | null;
  sdtLienHe: string;
  ghiChu: string | null;
  thoiGianHenLayHang: string;
  phuongThucThanhToan: string | null;
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
  'DA_DAT': ['DANG_CHUAN_BI', 'CHO_NHAN_HANG', 'HOAN_THANH', 'DA_HUY'],
  'DANG_CHUAN_BI': ['CHO_NHAN_HANG', 'HOAN_THANH', 'DA_HUY'],
  'CHO_NHAN_HANG': ['HOAN_THANH', 'DA_HUY'],
  'HOAN_THANH': [],
  'DA_HUY': [],
};

export default function AdminOrdersPage() {
  const [allOrders, setAllOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuthStore();
  
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderData | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await authFetch('/admin/orders', token!);
      if (!res.ok) throw new Error('Không thể tải danh sách đơn hàng');
      const data = await res.json();
      setAllOrders(data.data || []);
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
  }, [token]);

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

  const getNextStatuses = (current: string): string[] => {
    return VALID_TRANSITIONS[current] || [];
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

  const tabFilteredOrders = activeTab === 'ALL' 
    ? allOrders 
    : allOrders.filter(o => o.trangThai === activeTab);

  const filteredOrders = tabFilteredOrders.filter(o => 
    o.maNhanHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.user.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.user.sdt && o.user.sdt.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Quản lý Đơn hàng</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Tìm kiếm mã đơn, tên, SĐT..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" 
            />
          </div>
          <Button 
            variant="primary" 
            onClick={() => setShowQRModal(true)}
            className="whitespace-nowrap w-full sm:w-auto"
          >
            <i className="fa-solid fa-qrcode mr-2"></i> Quét mã nhận hàng
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 overflow-x-auto">
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
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Không có đơn hàng nào</td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const nextStatuses = getNextStatuses(order.trangThai);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => setSelectedOrderDetail(order)}
                          className="font-semibold text-sky-600 hover:text-sky-800 hover:underline text-left block focus:outline-none"
                        >
                          {order.maNhanHang}
                        </button>
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

      {/* Order Detail Modal */}
      {selectedOrderDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-file-invoice text-sky-500"></i> Chi tiết đơn hàng: {selectedOrderDetail.maNhanHang}
                  </h3>
                  <span className={`inline-block mt-2 px-2.5 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[selectedOrderDetail.trangThai] || 'bg-slate-100 text-slate-800'}`}>
                    {ORDER_STATUS_MAP[selectedOrderDetail.trangThai]}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedOrderDetail(null)} 
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-2 rounded-full transition-colors"
                >
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Buyer info */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-800 text-sm border-b border-slate-200/60 pb-1 mb-2">Thông tin khách hàng</h4>
                  <div className="text-sm"><span className="text-slate-500">Họ tên:</span> <strong className="text-slate-800">{selectedOrderDetail.user.hoTen}</strong></div>
                  <div className="text-sm"><span className="text-slate-500">Email:</span> <span className="text-slate-800">{selectedOrderDetail.user.email}</span></div>
                  <div className="text-sm"><span className="text-slate-500">SĐT Liên hệ:</span> <span className="text-slate-800">{selectedOrderDetail.sdtLienHe || selectedOrderDetail.user.sdt || '—'}</span></div>
                  {selectedOrderDetail.ghiChu && (
                    <div className="text-sm mt-1 bg-white p-2.5 rounded-lg border border-slate-100"><span className="text-slate-500">Ghi chú:</span> <span className="text-slate-700 italic">{selectedOrderDetail.ghiChu}</span></div>
                  )}
                </div>

                {/* Date/time and payment info */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-800 text-sm border-b border-slate-200/60 pb-1 mb-2">Thời gian & Thanh toán</h4>
                  <div className="text-sm"><span className="text-slate-500">Ngày đặt hàng:</span> <span className="text-slate-800">{formatDateTime(selectedOrderDetail.createdAt)}</span></div>
                  <div className="text-sm"><span className="text-slate-500">Ngày giờ hẹn lấy:</span> <strong className="text-sky-700">{formatDateTime(selectedOrderDetail.thoiGianHenLayHang)}</strong></div>
                  <div className="text-sm"><span className="text-slate-500">Phương thức:</span> <span className="text-slate-800 font-medium">{selectedOrderDetail.phuongThucThanhToan === 'TienMat' ? 'Tiền mặt tại cửa hàng' : 'Chuyển khoản / Quét mã ngân hàng'}</span></div>
                </div>
              </div>

              {/* Products list */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 grid grid-cols-12 border-b border-slate-100">
                  <div className="col-span-1 text-center">STT</div>
                  <div className="col-span-5">Sản phẩm</div>
                  <div className="col-span-2 text-center">SL</div>
                  <div className="col-span-2 text-right">Đơn giá</div>
                  <div className="col-span-2 text-right">Tạm tính</div>
                </div>
                <div className="divide-y divide-slate-100 max-h-[160px] overflow-y-auto">
                  {selectedOrderDetail.items.map((item, idx) => (
                    <div key={idx} className="px-4 py-3 text-sm grid grid-cols-12 items-center">
                      <div className="col-span-1 text-center text-slate-500">{idx + 1}</div>
                      <div className="col-span-5 font-medium text-slate-800 truncate" title={`${item.productVariant.product.sanPham} ${item.productVariant.dungLuongGb}GB - ${item.productVariant.mauSac}`}>
                        {item.productVariant.product.sanPham}{!item.productVariant.product.sanPham.includes(`${item.productVariant.dungLuongGb}GB`) ? ` - ${item.productVariant.dungLuongGb}GB` : ''} - {item.productVariant.mauSac}
                      </div>
                      <div className="col-span-2 text-center text-slate-600">{item.soLuong}</div>
                      <div className="col-span-2 text-right text-slate-600">{formatCurrency(item.donGia)}</div>
                      <div className="col-span-2 text-right font-medium text-slate-800">{formatCurrency(item.donGia * item.soLuong)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing section (Before, after voucher) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tổng tiền hàng:</span>
                  <span className="font-medium text-slate-800">{formatCurrency(selectedOrderDetail.tongTienHang)}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    Khuyến mãi/Voucher:
                    {selectedOrderDetail.voucher ? (
                      <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-lg text-xs font-bold border border-rose-100 uppercase">
                        {selectedOrderDetail.voucher.maVoucher}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Không dùng</span>
                    )}
                  </span>
                  <span className="font-medium text-rose-600">
                    -{formatCurrency(selectedOrderDetail.tienGiamGia)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                  <span className="font-bold text-slate-800">Thành tiền thanh toán:</span>
                  <span className="font-bold text-lg text-sky-700">{formatCurrency(selectedOrderDetail.thanhTien)}</span>
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 pt-6">
                <Button variant="secondary" onClick={() => setSelectedOrderDetail(null)} className="w-full sm:w-auto">
                  Đóng
                </Button>
                
                {getNextStatuses(selectedOrderDetail.trangThai).length > 0 && (
                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Chuyển trạng thái:</span>
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          handleUpdateStatus(selectedOrderDetail.id, e.target.value);
                          setSelectedOrderDetail(null);
                        }
                      }}
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-sky-500 outline-none text-slate-700 font-semibold shadow-sm transition"
                    >
                      <option value="">Chọn trạng thái tiếp theo...</option>
                      {getNextStatuses(selectedOrderDetail.trangThai).map((s) => (
                        <option key={s} value={s}>
                          {ORDER_STATUS_MAP[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
