'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    sanPham: '',
    hang: '',
    phanKhuc: 'TAM_TRUNG',
    moTa: '',
  });
  
  const [variants, setVariants] = useState<any[]>([{
    sku: '', ramGb: 8, dungLuongGb: 256, mauSac: '', giaGoc: 0, giaBan: 0, tonKho: 10
  }]);

  const [media, setMedia] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/products` : 'http://localhost:3001/api/products';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Lỗi tải sản phẩm');
      const data = await res.json();
      setProducts(data.data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Xóa thất bại');
      toast.success('Xóa sản phẩm thành công');
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ảnh không được vượt quá 5MB');
      return;
    }

    setIsUploading(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      });
      
      if (!res.ok) throw new Error('Upload thất bại');
      const data = await res.json();
      
      setMedia([...media, { url: data.secure_url, publicId: data.public_id, isThumbnail: media.length === 0 }]);
      toast.success('Upload ảnh thành công');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!formData.sanPham || !formData.hang || variants.length === 0) {
      toast.error('Vui lòng nhập đủ thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          variants,
          media
        })
      });

      if (!res.ok) throw new Error('Tạo sản phẩm thất bại');
      toast.success('Thêm sản phẩm thành công');
      setShowModal(false);
      setFormData({ sanPham: '', hang: '', phanKhuc: 'TAM_TRUNG', moTa: '' });
      setVariants([{ sku: '', ramGb: 8, dungLuongGb: 256, mauSac: '', giaGoc: 0, giaBan: 0, tonKho: 10 }]);
      setMedia([]);
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Quản lý Sản phẩm</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-plus mr-2"></i> Thêm sản phẩm
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                <th className="px-6 py-4 font-semibold">Hãng</th>
                <th className="px-6 py-4 font-semibold">Phân khúc</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Đang tải...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Chưa có sản phẩm nào</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{p.sanPham}</td>
                    <td className="px-6 py-4 text-slate-600">{p.hang}</td>
                    <td className="px-6 py-4 text-slate-600">{p.phanKhuc}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 p-2">
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-800">Thêm sản phẩm mới</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Tên sản phẩm" value={formData.sanPham} onChange={e => setFormData({...formData, sanPham: e.target.value})} required />
                <Input label="Hãng" value={formData.hang} onChange={e => setFormData({...formData, hang: e.target.value})} required />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">Phân khúc</label>
                  <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={formData.phanKhuc} onChange={e => setFormData({...formData, phanKhuc: e.target.value})}>
                    <option value="FLAGSHIP">Flagship</option>
                    <option value="TAM_TRUNG">Tầm trung</option>
                    <option value="PHO_THONG">Phổ thông</option>
                    <option value="GAMING">Gaming</option>
                  </select>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Hình ảnh</h4>
                <div className="flex flex-wrap gap-4 mb-4">
                  {media.map((m, i) => (
                    <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
                      <img src={m.url} alt="preview" className="w-full h-full object-cover" />
                      <button onClick={() => setMedia(media.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500 shadow hover:bg-red-50">
                        <i className="fa-solid fa-times text-xs"></i>
                      </button>
                    </div>
                  ))}
                  <div className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-50 hover:border-sky-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
                    {isUploading ? <i className="fa-solid fa-spinner fa-spin text-xl"></i> : <i className="fa-solid fa-plus text-xl"></i>}
                    <span className="text-xs mt-1">Upload</span>
                  </div>
                  <input type="file" className="hidden" ref={fileInputRef} onChange={handleUploadImage} accept="image/*" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-slate-800">Phiên bản (Variants)</h4>
                  <Button variant="outline" onClick={() => setVariants([...variants, { sku: '', ramGb: 8, dungLuongGb: 256, mauSac: '', giaGoc: 0, giaBan: 0, tonKho: 10 }])}>
                    <i className="fa-solid fa-plus mr-2"></i> Thêm phiên bản
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {variants.map((v, i) => (
                    <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                      {variants.length > 1 && (
                        <button onClick={() => setVariants(variants.filter((_, idx) => idx !== i))} className="absolute -top-3 -right-3 bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-200">
                          <i className="fa-solid fa-trash text-sm"></i>
                        </button>
                      )}
                      <Input label="SKU" value={v.sku} onChange={e => { const newV = [...variants]; newV[i].sku = e.target.value; setVariants(newV); }} />
                      <Input label="Màu sắc" value={v.mauSac} onChange={e => { const newV = [...variants]; newV[i].mauSac = e.target.value; setVariants(newV); }} />
                      <Input label="RAM (GB)" type="number" value={v.ramGb} onChange={e => { const newV = [...variants]; newV[i].ramGb = Number(e.target.value); setVariants(newV); }} />
                      <Input label="ROM (GB)" type="number" value={v.dungLuongGb} onChange={e => { const newV = [...variants]; newV[i].dungLuongGb = Number(e.target.value); setVariants(newV); }} />
                      <Input label="Giá gốc" type="number" value={v.giaGoc} onChange={e => { const newV = [...variants]; newV[i].giaGoc = Number(e.target.value); setVariants(newV); }} />
                      <Input label="Giá bán" type="number" value={v.giaBan} onChange={e => { const newV = [...variants]; newV[i].giaBan = Number(e.target.value); setVariants(newV); }} />
                      <Input label="Tồn kho" type="number" value={v.tonKho} onChange={e => { const newV = [...variants]; newV[i].tonKho = Number(e.target.value); setVariants(newV); }} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <Button variant="outline" onClick={() => setShowModal(false)}>Hủy</Button>
              <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>Lưu sản phẩm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
