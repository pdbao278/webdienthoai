'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import { authFetch, authFetchJson } from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';

interface FlashSaleItemData {
  id?: string;
  productVariantId: string;
  giaFlashSale: number;
  soLuong: number;
  daBan?: number;
  productVariant?: {
    giaBan: number;
    dungLuongGb: number;
    mauSac: string;
    product: { sanPham: string };
  };
}

interface FlashSaleData {
  id: string;
  ten: string;
  batDau: string;
  ketThuc: string;
  isActive: boolean;
  _count?: { items: number };
  items?: FlashSaleItemData[];
}

interface ProductData {
  id: string;
  sanPham: string;
  variants: {
    id: string;
    giaBan: number;
    dungLuongGb: number;
    mauSac: string;
  }[];
}

export default function AdminFlashSalesPage() {
  const [flashSales, setFlashSales] = useState<FlashSaleData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingFlashSale, setEditingFlashSale] = useState<FlashSaleData | null>(null);
  
  const [formData, setFormData] = useState({
    ten: '',
    batDau: '',
    ketThuc: '',
    isActive: true,
    items: [] as any[]
  });

  const fetchFlashSales = async () => {
    try {
      const res = await authFetch('/admin/flash-sales', token!);
      if (!res.ok) throw new Error('Lỗi tải danh sách Flash Sale');
      const data = await res.json();
      setFlashSales(data.data);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Lỗi');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await authFetch('/admin/products', token!);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFlashSales();
      fetchProducts();
    }
  }, [token]);

  const handleOpenAddModal = () => {
    setEditingFlashSale(null);
    setFormData({
      ten: '',
      batDau: '',
      ketThuc: '',
      isActive: true,
      items: []
    });
    setShowModal(true);
  };

  const handleEdit = async (fs: FlashSaleData) => {
    try {
      // Fetch full details
      const res = await authFetch(`/admin/flash-sales/${fs.id}`, token!);
      if (!res.ok) throw new Error('Không thể tải chi tiết');
      const data = await res.json();
      const fullFS = data.data;

      setEditingFlashSale(fullFS);
      setFormData({
        ten: fullFS.ten,
        batDau: new Date(fullFS.batDau).toISOString().slice(0, 16),
        ketThuc: new Date(fullFS.ketThuc).toISOString().slice(0, 16),
        isActive: fullFS.isActive,
        items: fullFS.items.map((i: any) => ({
          productVariantId: i.productVariantId,
          giaFlashSale: String(i.giaFlashSale),
          soLuong: String(i.soLuong)
        }))
      });
      setShowModal(true);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa chương trình Flash Sale này?')) return;
    try {
      const res = await authFetch(`/admin/flash-sales/${id}`, token!, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xóa thất bại');
      toast.success('Đã xóa');
      fetchFlashSales();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Lỗi');
    }
  };

  const handleSubmit = async () => {
    if (!formData.ten || !formData.batDau || !formData.ketThuc || formData.items.length === 0) {
      toast.error('Vui lòng nhập đủ thông tin và chọn ít nhất 1 sản phẩm');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const url = editingFlashSale ? `/admin/flash-sales/${editingFlashSale.id}` : '/admin/flash-sales';
      const method = editingFlashSale ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        batDau: new Date(formData.batDau).toISOString(),
        ketThuc: new Date(formData.ketThuc).toISOString(),
        items: formData.items.map(i => ({
          productVariantId: i.productVariantId,
          giaFlashSale: Number(i.giaFlashSale),
          soLuong: Number(i.soLuong)
        }))
      };

      const res = await authFetchJson(url, token!, {
        method,
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Thao tác thất bại');
      }
      
      toast.success(editingFlashSale ? 'Cập nhật thành công' : 'Thêm thành công');
      setShowModal(false);
      fetchFlashSales();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Lỗi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productVariantId: '', giaFlashSale: '', soLuong: '10' }]
    });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  const filteredFlashSales = flashSales.filter(fs => 
    fs.ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">Quản lý Flash Sale</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative group">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-sm font-medium focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none transition-all shadow-sm" 
            />
          </div>
          <Button variant="primary" onClick={handleOpenAddModal} className="w-full sm:w-auto whitespace-nowrap bg-slate-800 hover:bg-slate-900 flex items-center justify-center gap-2 shadow-card hover:shadow-elevated rounded-xl font-bold transition-all active:scale-95">
            <Plus size={18} strokeWidth={2.5} /> Thêm Flash Sale
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Tên chương trình</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Thời gian</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Số lượng SP</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Trạng thái</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500"><Loader2 className="animate-spin inline-block mr-2" size={20} /> Đang tải...</td></tr>
              ) : filteredFlashSales.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">Không có chương trình Flash Sale nào</td></tr>
              ) : filteredFlashSales.map(fs => {
                const now = new Date();
                const isComing = new Date(fs.batDau) > now;
                const isExpired = new Date(fs.ketThuc) < now;
                const statusColor = !fs.isActive || isExpired ? 'bg-slate-100 text-slate-600' : isComing ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';
                const statusText = !fs.isActive ? 'Đã tắt' : isExpired ? 'Kết thúc' : isComing ? 'Sắp diễn ra' : 'Đang diễn ra';

                return (
                  <tr key={fs.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-sky-600 tracking-wider">{fs.ten}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {new Date(fs.batDau).toLocaleString('vi-VN')} <br />
                      <span className="text-xs text-slate-400">đến</span> {new Date(fs.ketThuc).toLocaleString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">{fs._count?.items || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusColor}`}>{statusText}</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleEdit(fs)} className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 p-2.5 rounded-xl transition-colors active:scale-95" title="Chỉnh sửa">
                        <Edit size={18} strokeWidth={2} />
                      </button>
                      <button onClick={() => handleDelete(fs.id)} className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2.5 rounded-xl transition-colors active:scale-95" title="Xóa">
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[var(--z-modal-backdrop)] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-modal w-full max-w-2xl overflow-hidden animate-fade-in-up border border-slate-200/60 flex flex-col max-h-[90vh]">
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">
                {editingFlashSale ? 'Chỉnh sửa Flash Sale' : 'Thêm Flash Sale'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors active:scale-95">
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            <div className="p-6 md:p-8 space-y-5 overflow-y-auto">
              <Input label="Tên chương trình" value={formData.ten} onChange={e => setFormData({...formData, ten: e.target.value})} required />
              
              <div className="grid grid-cols-2 gap-4">
                <Input label="Bắt đầu" type="datetime-local" value={formData.batDau} onChange={e => setFormData({...formData, batDau: e.target.value})} required />
                <Input label="Kết thúc" type="datetime-local" value={formData.ketThuc} onChange={e => setFormData({...formData, ketThuc: e.target.value})} required />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 text-sky-600 rounded" />
                <label htmlFor="isActive" className="text-sm font-bold text-slate-700">Kích hoạt</label>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800">Sản phẩm khuyến mãi</h4>
                  <Button variant="outline" onClick={addItem} type="button" className="text-xs py-1 px-3 h-8">
                    <Plus size={14} className="mr-1" /> Thêm SP
                  </Button>
                </div>
                
                {formData.items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="w-full">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Chọn phiên bản</label>
                      <select 
                        className="w-full px-3 py-2 bg-white border border-slate-200/80 rounded-lg text-sm"
                        value={item.productVariantId}
                        onChange={e => updateItem(index, 'productVariantId', e.target.value)}
                      >
                        <option value="">-- Chọn sản phẩm --</option>
                        {products.map(p => (
                          <optgroup key={p.id} label={p.sanPham}>
                            {p.variants.map(v => (
                              <option key={v.id} value={v.id}>
                                {p.sanPham} {v.dungLuongGb}GB - {v.mauSac} (Giá: {formatCurrency(v.giaBan)})
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div className="w-full sm:w-32 shrink-0">
                      <Input label="Giá Flash Sale" type="number" value={item.giaFlashSale} onChange={e => updateItem(index, 'giaFlashSale', e.target.value)} required />
                    </div>
                    <div className="w-full sm:w-24 shrink-0">
                      <Input label="Số lượng" type="number" value={item.soLuong} onChange={e => updateItem(index, 'soLuong', e.target.value)} required />
                    </div>
                    <button type="button" onClick={() => removeItem(index)} className="p-2 mb-1 text-rose-500 hover:bg-rose-100 rounded-lg shrink-0">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {formData.items.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                    Chưa có sản phẩm nào. Bấm &quot;Thêm SP&quot; để chọn.
                  </p>
                )}
              </div>
            </div>
            <div className="p-6 md:p-8 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50 shrink-0">
              <Button variant="outline" onClick={() => setShowModal(false)} className="rounded-xl px-5 font-bold">Hủy</Button>
              <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting} className="rounded-xl px-5 font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-card">Lưu Flash Sale</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
