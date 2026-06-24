'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import { authFetch, authFetchJson } from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface VoucherData {
  id: string;
  maVoucher: string;
  loaiGiamGia: 'PERCENTAGE' | 'FIXED_AMOUNT';
  giaTri: number;
  toiDaGiam?: number | null;
  donToiThieu: number;
  batDau: string;
  ketThuc: string;
  soLuong: number;
  daSuDung: number;
}

export default function AdminVouchersPage() {
  const [vouchers, setVouchers] = useState<VoucherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<VoucherData | null>(null);
  
  const [formData, setFormData] = useState({
    maVoucher: '',
    loaiGiamGia: 'FIXED_AMOUNT',
    giaTri: '',
    toiDaGiam: '',
    donToiThieu: '',
    batDau: '',
    ketThuc: '',
    soLuong: '10'
  });

  const fetchVouchers = async () => {
    try {
      const res = await authFetch('/admin/vouchers', token!);
      if (!res.ok) throw new Error('Lỗi tải');
      setVouchers(await res.json());
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Lỗi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchVouchers();
  }, [token]);

  const handleOpenAddModal = () => {
    setEditingVoucher(null);
    setFormData({
      maVoucher: '',
      loaiGiamGia: 'FIXED_AMOUNT',
      giaTri: '',
      toiDaGiam: '',
      donToiThieu: '0',
      batDau: '',
      ketThuc: '',
      soLuong: '10'
    });
    setShowModal(true);
  };

  const handleEdit = (voucher: VoucherData) => {
    setEditingVoucher(voucher);
    setFormData({
      maVoucher: voucher.maVoucher,
      loaiGiamGia: voucher.loaiGiamGia,
      giaTri: String(voucher.giaTri),
      toiDaGiam: voucher.toiDaGiam ? String(voucher.toiDaGiam) : '',
      donToiThieu: String(voucher.donToiThieu),
      batDau: new Date(voucher.batDau).toISOString().split('T')[0],
      ketThuc: new Date(voucher.ketThuc).toISOString().split('T')[0],
      soLuong: String(voucher.soLuong)
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa voucher này?')) return;
    try {
      const res = await authFetch(`/admin/vouchers/${id}`, token!, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xóa thất bại');
      toast.success('Đã xóa');
      fetchVouchers();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Lỗi');
    }
  };

  const handleSubmit = async () => {
    if (!formData.maVoucher || !formData.giaTri || !formData.batDau || !formData.ketThuc) {
      toast.error('Nhập đủ thông tin');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const url = editingVoucher ? `/admin/vouchers/${editingVoucher.id}` : '/admin/vouchers';
      const method = editingVoucher ? 'PATCH' : 'POST';

      const res = await authFetchJson(url, token!, {
        method,
        body: JSON.stringify({
          ...formData,
          giaTri: Number(formData.giaTri),
          toiDaGiam: formData.toiDaGiam ? Number(formData.toiDaGiam) : null,
          donToiThieu: Number(formData.donToiThieu) || 0,
          soLuong: Number(formData.soLuong) || 1,
          batDau: new Date(formData.batDau).toISOString(),
          ketThuc: new Date(formData.ketThuc).toISOString()
        })
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Thao tác thất bại');
      }
      
      toast.success(editingVoucher ? 'Cập nhật thành công' : 'Thêm thành công');
      setShowModal(false);
      fetchVouchers();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Lỗi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Quản lý Voucher</h1>
        <Button variant="primary" onClick={handleOpenAddModal}>
          <i className="fa-solid fa-plus mr-2"></i> Thêm Voucher
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Mã</th>
                <th className="px-6 py-4 font-semibold">Loại</th>
                <th className="px-6 py-4 font-semibold">Giá trị</th>
                <th className="px-6 py-4 font-semibold">Thời gian</th>
                <th className="px-6 py-4 font-semibold">Đã dùng / Tổng</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Đang tải...</td></tr>
              ) : vouchers.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Chưa có voucher</td></tr>
              ) : vouchers.map(v => (
                <tr key={v.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-sky-600">{v.maVoucher}</td>
                  <td className="px-6 py-4">{v.loaiGiamGia === 'PERCENTAGE' ? '% Phần trăm' : 'Số tiền'}</td>
                  <td className="px-6 py-4 font-medium">{v.loaiGiamGia === 'PERCENTAGE' ? `${v.giaTri}%` : formatCurrency(v.giaTri)}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(v.batDau).toLocaleDateString('vi-VN')} - {new Date(v.ketThuc).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4">{v.daSuDung} / {v.soLuong}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleEdit(v)} className="text-blue-500 hover:text-blue-700 p-2">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700 p-2">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                {editingVoucher ? 'Chỉnh sửa Voucher' : 'Thêm Voucher mới'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Input label="Mã Voucher" placeholder="VD: TET2025" value={formData.maVoucher} onChange={e => setFormData({...formData, maVoucher: e.target.value.toUpperCase()})} required />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Loại giảm giá</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.loaiGiamGia} onChange={e => setFormData({...formData, loaiGiamGia: e.target.value})}>
                  <option value="FIXED_AMOUNT">Số tiền cố định</option>
                  <option value="PERCENTAGE">Phần trăm (%)</option>
                </select>
              </div>
              <Input label="Giá trị giảm" type="number" value={formData.giaTri} onChange={e => setFormData({...formData, giaTri: e.target.value})} required />
              {formData.loaiGiamGia === 'PERCENTAGE' && <Input label="Giảm tối đa (VNĐ)" type="number" value={formData.toiDaGiam} onChange={e => setFormData({...formData, toiDaGiam: e.target.value})} />}
              <Input label="Đơn tối thiểu (VNĐ)" type="number" value={formData.donToiThieu} onChange={e => setFormData({...formData, donToiThieu: e.target.value})} />
              <Input label="Số lượng" type="number" value={formData.soLuong} onChange={e => setFormData({...formData, soLuong: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Ngày bắt đầu" type="date" value={formData.batDau} onChange={e => setFormData({...formData, batDau: e.target.value})} required />
                <Input label="Ngày kết thúc" type="date" value={formData.ketThuc} onChange={e => setFormData({...formData, ketThuc: e.target.value})} required />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <Button variant="outline" onClick={() => setShowModal(false)}>Hủy</Button>
              <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>Lưu Voucher</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
