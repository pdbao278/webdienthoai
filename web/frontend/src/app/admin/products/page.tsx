'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import { getApiUrl, authFetch, authFetchJson } from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ProductData {
  id: string;
  sanPham: string;
  hang: string;
  phanKhuc: string;
  slug: string;
  isActive: boolean;
}

interface MediaItem {
  url: string;
  publicId?: string;
  isThumbnail: boolean;
}

interface VariantForm {
  sku: string;
  ramGb: number;
  dungLuongGb: number;
  mauSac: string;
  giaGoc: number;
  giaBan: number;
  tonKho: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
  const { token } = useAuthStore();
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    sanPham: '',
    hang: '',
    phanKhuc: 'TAM_TRUNG',
    moTa: '',
    isActive: true,
  });
  
  const [variants, setVariants] = useState<VariantForm[]>([{
    sku: '', ramGb: 8, dungLuongGb: 256, mauSac: '', giaGoc: 0, giaBan: 0, tonKho: 10
  }]);

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    try {
      const res = await authFetch('/admin/products', token!);
      if (!res.ok) throw new Error('Lỗi tải sản phẩm');
      const data = await res.json();
      setProducts(data.data || []);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Lỗi tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({ sanPham: '', hang: '', phanKhuc: 'TAM_TRUNG', moTa: '' });
    setVariants([{ sku: '', ramGb: 8, dungLuongGb: 256, mauSac: '', giaGoc: 0, giaBan: 0, tonKho: 10 }]);
    setMedia([]);
    setShowModal(true);
  };

  const handleEdit = async (product: ProductData) => {
    try {
      toast.loading('Đang tải chi tiết sản phẩm...', { id: 'fetch-detail' });
      const res = await fetch(getApiUrl(`/products/${product.slug}`));
      if (!res.ok) throw new Error('Không thể tải chi tiết sản phẩm');
      const data = await res.json();
      
      setEditingProduct(data);
      setFormData({
        sanPham: data.sanPham,
        hang: data.hang,
        phanKhuc: data.phanKhuc,
        moTa: data.moTa || '',
        isActive: data.isActive,
      });
      setVariants(data.variants.map((v: any) => ({
        sku: v.sku,
        ramGb: v.ramGb,
        dungLuongGb: v.dungLuongGb,
        mauSac: v.mauSac,
        giaGoc: v.giaGoc,
        giaBan: v.giaBan,
        tonKho: v.tonKho
      })));
      setMedia(data.media.map((m: any) => ({
        url: m.url,
        publicId: m.publicId,
        isThumbnail: m.isThumbnail
      })));
      
      toast.dismiss('fetch-detail');
      setShowModal(true);
    } catch (error: any) {
      toast.dismiss('fetch-detail');
      toast.error(error.message || 'Lỗi tải dữ liệu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      const res = await authFetch(`/admin/products/${id}`, token!, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Xóa thất bại');
      }
      toast.success('Xóa sản phẩm thành công');
      fetchProducts();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Lỗi xóa');
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
      const res = await authFetch('/admin/upload', token!, {
        method: 'POST',
        body: form
      });
      
      if (!res.ok) throw new Error('Upload thất bại');
      const data = await res.json();
      
      setMedia([...media, { url: data.secure_url, publicId: data.public_id, isThumbnail: media.length === 0 }]);
      toast.success('Upload ảnh thành công');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Lỗi upload');
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
      const url = editingProduct ? `/admin/products/${editingProduct.id}` : '/admin/products';
      const method = editingProduct ? 'PATCH' : 'POST';

      const res = await authFetchJson(url, token!, {
        method,
        body: JSON.stringify({
          ...formData,
          variants,
          media
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Thao tác thất bại');
      }
      
      toast.success(editingProduct ? 'Cập nhật sản phẩm thành công' : 'Thêm sản phẩm thành công');
      setShowModal(false);
      fetchProducts();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Lỗi lưu sản phẩm');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (product: ProductData) => {
    try {
      const newStatus = product.isActive === false ? true : false;
      const res = await authFetchJson(`/admin/products/${product.id}`, token!, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: newStatus })
      });
      if (!res.ok) throw new Error('Cập nhật trạng thái thất bại');
      toast.success(newStatus ? 'Sản phẩm đã được mở lại' : 'Đã ẩn sản phẩm');
      fetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Lỗi hệ thống');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === 'ACTIVE' ? p.isActive !== false : p.isActive === false;
    const matchesSearch = p.sanPham.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.hang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phanKhuc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Quản lý Sản phẩm</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm, hãng..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" 
            />
          </div>
          <Button variant="primary" onClick={handleOpenAddModal} className="w-full sm:w-auto whitespace-nowrap">
            <i className="fa-solid fa-plus mr-2"></i> Thêm sản phẩm
          </Button>
        </div>
      </div>

      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('ACTIVE')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'ACTIVE' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Khả dụng
        </button>
        <button
          onClick={() => setActiveTab('INACTIVE')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'INACTIVE' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Đã ngừng kinh doanh
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                <th className="px-6 py-4 font-semibold">Hãng</th>
                <th className="px-6 py-4 font-semibold">Phân khúc</th>
                <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Đang tải...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Không tìm thấy sản phẩm nào</td></tr>
              ) : (
                filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{p.sanPham}</td>
                    <td className="px-6 py-4 text-slate-600">{p.hang}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                        {p.phanKhuc === 'FLAGSHIP' ? 'Flagship' : p.phanKhuc === 'TAM_TRUNG' ? 'Tầm trung' : p.phanKhuc === 'PHO_THONG' ? 'Phổ thông' : 'Gaming'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <label className="relative inline-flex items-center cursor-pointer" title={p.isActive === false ? 'Bật để hiển thị' : 'Tắt để ẩn'}>
                        <input type="checkbox" className="sr-only peer" checked={p.isActive !== false} onChange={() => handleToggleStatus(p)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="Chỉnh sửa">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Xóa vĩnh viễn">
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
              <h3 className="text-xl font-bold text-slate-800">
                {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h3>
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
                <div className="space-y-1.5 flex items-center h-full pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-sky-500 rounded border-slate-300 focus:ring-sky-500" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
                    <span className="text-sm font-medium text-slate-700">Đang bán (Hiển thị cho khách hàng)</span>
                  </label>
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
            
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 actions sticky bottom-0 bg-white">
              <Button variant="outline" onClick={() => setShowModal(false)}>Hủy</Button>
              <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>Lưu sản phẩm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
