'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminVouchersPage() {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      const url = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/admin/vouchers` : 'http://localhost:3001/api/admin/vouchers';
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Lỗi tải danh sách voucher');
      const data = await res.json();
      setVouchers(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchVouchers();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa voucher này?')) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/admin/vouchers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Xóa thất bại');
      toast.success('Xóa voucher thành công');
      fetchVouchers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!formData.maVoucher || !formData.giaTri || !formData.batDau || !formData.ketThuc) {
      toast.error('Vui lòng nhập đủ thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/admin/vouchers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Thêm mới thất bại');
      }

      toast.success('Thêm voucher thành công');
      setShowModal(false);
      setFormData({ maVoucher: '', loaiGiamGia: 'FIXED_AMOUNT', giaTri: '', toiDaGiam: '', donToiThieu: '', batDau: '', ketThuc: '', soLuong: '10' });
      fetchVouchers();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Quản lý Voucher</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
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
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Chưa có voucher nào</td></tr>
              ) : (
                vouchers.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-sky-600">{v.maVoucher}</td>
                    <td className="px-6 py-4">{v.loaiGiamGia === 'PERCENTAGE' ? 'Phần trăm (%)' : 'Số tiền cố định'}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">
                      {v.loaiGiamGia === 'PERCENTAGE' ? `${v.giaTri}%` : formatCurrency(v.giaTri)}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(v.batDau).toLocaleDateString('vi-VN')} - {new Date(v.ketThuc).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">{v.daSuDung} / {v.soLuong}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700 p-2">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Thêm Voucher mới</h3>
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

              <Input label="Giá trị giảm" type="number" placeholder={formData.loaiGiamGia === 'PERCENTAGE' ? "VD: 10" : "VD: 50000"} value={formData.giaTri} onChange={e => setFormData({...formData, giaTri: e.target.value})} required />
              {formData.loaiGiamGia === 'PERCENTAGE' && (
                <Input label="Giảm tối đa (VNĐ)" type="number" placeholder="Bỏ trống nếu không giới hạn" value={formData.toiDaGiam} onChange={e => setFormData({...formData, toiDaGiam: e.target.value})} />
              )}
              
              <Input label="Đơn tối thiểu (VNĐ)" type="number" value={formData.donToiThieu} onChange={e => setFormData({...formData, donToiThieu: e.target.value})} />
              <Input label="Số lượng" type="number" value={formData.soLuong} onChange={e => setFormData({...formData, soLuong: e.target.value})} />
              
              <div className="grid grid-cols-2 gap-4">
                <Input label="Ngày bắt đầu" type="date" value={formData.batDau} onChange={e => setFormData({...formData, batDau: e.target.value})} required />
                <Input label="Ngày kết thúc" type="date" value={formData.ketThuc} onChange={e => setFormData({...formData, ketThuc: e.target.value})} required />
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <Button variant="outline" onClick={() => setShowModal(false)}>Hủy</Button>
              <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>Tạo Voucher</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
