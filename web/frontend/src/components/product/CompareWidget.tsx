'use client';

import { useState, useEffect, useRef } from 'react';
import { getApiUrl } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Search, Loader2, X, PlusCircle, Scale, Sparkles } from 'lucide-react';

interface Variant {
  id: string;
  ramGb: number;
  dungLuongGb: number;
  mauSac: string;
  giaBan: number;
  giaGoc: number;
  tonKho: number;
}

interface Media {
  url: string;
  isThumbnail: boolean;
}

interface ProductDetail {
  id: string;
  slug: string;
  sanPham: string;
  hang: string;
  phanKhuc: string;
  moTa: string | null;
  manHinhCongNghe: string | null;
  manHinhKichThuoc: number | null;
  manHinhDoPhanGiai: string | null;
  manHinhTanSoQuet: number | null;
  cameraSau: string | null;
  cameraSauTinhNang: string | null;
  cameraTruoc: string | null;
  chip: string | null;
  heDieuHanh: string | null;
  pinMah: number | null;
  sacNhanhW: number | null;
  hoTro5g: boolean;
  nfc: boolean;
  sim: string | null;
  trongLuongG: number | null;
  chongNuoc: string | null;
  variants: Variant[];
  media: Media[];
}

export default function CompareWidget({ currentProduct }: { currentProduct: ProductDetail }) {
  const [comparedList, setComparedList] = useState<ProductDetail[]>([currentProduct]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch search results
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(getApiUrl(`/products/search?q=${encodeURIComponent(searchQuery)}`));
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSearchResults(data.data || []);
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Fetch suggestions
  useEffect(() => {
    if (!currentProduct?.slug) return;
    const fetchSuggestions = async () => {
      setIsLoadingSuggestions(true);
      try {
        const res = await fetch(getApiUrl(`/products/${currentProduct.slug}/suggestions`));
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch suggestions', err);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };
    fetchSuggestions();
  }, [currentProduct?.slug]);

  const handleAddProduct = async (slug: string) => {
    if (comparedList.some(p => p.slug === slug)) {
      toast.error('Sản phẩm này đã có trong danh sách so sánh');
      return;
    }
    if (comparedList.length >= 4) {
      toast.error('Chỉ so sánh tối đa 4 sản phẩm cùng lúc');
      return;
    }

    try {
      toast.loading('Đang tải cấu hình sản phẩm...', { id: 'fetch-compare' });
      const res = await fetch(getApiUrl(`/products/${slug}`));
      if (!res.ok) throw new Error();
      const product = await res.json();
      
      setComparedList([...comparedList, product]);
      setSearchQuery('');
      setShowDropdown(false);
      toast.success(`Đã thêm ${product.sanPham} vào so sánh`);
    } catch (err) {
      toast.error('Không thể lấy chi tiết sản phẩm');
    } finally {
      toast.dismiss('fetch-compare');
    }
  };

  const handleRemoveProduct = (index: number) => {
    if (index === 0) {
      toast.error('Không thể xóa sản phẩm hiện tại');
      return;
    }
    setComparedList(comparedList.filter((_, i) => i !== index));
  };

  const getMinPrice = (product: ProductDetail) => {
    if (!product.variants || product.variants.length === 0) return 0;
    return Math.min(...product.variants.map(v => v.giaBan));
  };

  const getVariantSummary = (product: ProductDetail, key: 'ramGb' | 'dungLuongGb') => {
    const vals = Array.from(new Set(product.variants.map(v => v[key]))).sort((a, b) => a - b);
    if (vals.length === 0) return 'N/A';
    if (vals.length === 1) return `${vals[0]} GB`;
    return `${vals[0]} - ${vals[vals.length - 1]} GB`;
  };

  const specsRows = [
    { label: 'Hãng sản xuất', key: 'hang' },
    { label: 'Phân khúc', key: 'phanKhuc' },
    { label: 'Chipset (CPU)', key: 'chip' },
    { label: 'Hệ điều hành', key: 'heDieuHanh' },
    { label: 'Màn hình công nghệ', key: 'manHinhCongNghe' },
    { label: 'Kích thước màn hình', key: 'manHinhKichThuoc', suffix: ' inch' },
    { label: 'Độ phân giải', key: 'manHinhDoPhanGiai' },
    { label: 'Tần số quét', key: 'manHinhTanSoQuet', suffix: ' Hz' },
    { label: 'Dung lượng PIN', key: 'pinMah', suffix: ' mAh' },
    { label: 'Sạc nhanh', key: 'sacNhanhW', suffix: ' W' },
    { label: 'Hỗ trợ 5G', key: 'hoTro5g', isBool: true },
    { label: 'NFC', key: 'nfc', isBool: true },
    { label: 'Thẻ SIM', key: 'sim' },
    { label: 'Trọng lượng', key: 'trongLuongG', suffix: ' g' },
    { label: 'Chống nước', key: 'chongNuoc' },
  ];

  return (
    <div className="mt-12 bg-white p-6 md:p-8 rounded-3xl shadow-card border border-slate-200/60 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">So sánh sản phẩm</h2>
          <p className="text-slate-500 text-sm mt-1">Chọn tối đa 4 điện thoại để so sánh thông số cấu hình</p>
        </div>
        
        {comparedList.length < 4 && (
          <div ref={dropdownRef} className="relative w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 text-sm transition-all duration-200"
                placeholder="Tìm sản phẩm khác để so sánh..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              <Search className="absolute left-3.5 top-3 text-slate-400" size={16} strokeWidth={2} />
              {isSearching && (
                <Loader2 className="absolute right-3.5 top-3 text-slate-400 animate-spin" size={16} strokeWidth={2} />
              )}
            </div>

            {showDropdown && searchQuery.trim().length >= 2 && (
              <div className="absolute right-0 left-0 mt-2 bg-white border border-slate-100 shadow-dropdown rounded-2xl overflow-hidden z-[var(--z-dropdown)] max-h-60 overflow-y-auto">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-slate-500 text-sm">Không tìm thấy sản phẩm nào</div>
                ) : (
                  searchResults.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleAddProduct(p.slug)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-left border-b border-slate-100 last:border-0 transition-colors"
                    >
                      <img
                        src={p.media?.[0]?.url || 'https://placehold.co/100x100?text=No+Image'}
                        alt={p.sanPham}
                        className="w-10 h-10 object-contain rounded border border-slate-100 p-0.5 bg-white"
                      />
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">{p.sanPham}</div>
                        <div className="text-xs text-sky-600 font-bold">{p.variants?.[0] ? formatCurrency(p.variants[0].giaBan) : 'N/A'}</div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Suggestions Section */}
      {(isLoadingSuggestions || suggestions.length > 0) && comparedList.length < 4 && (
        <div className="mt-2 bg-gradient-to-r from-sky-50/50 to-indigo-50/50 p-4 rounded-2xl border border-sky-100/50 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-sky-500" size={16} strokeWidth={2.5} />
            <span className="text-sm font-bold text-slate-700 tracking-tight">
              Gợi ý so sánh thông minh
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x">
            {isLoadingSuggestions ? (
              // Skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="flex-shrink-0 snap-start flex items-center gap-3 px-3 py-2 bg-white/60 border border-slate-200/40 rounded-xl w-[220px] animate-pulse">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0"></div>
                </div>
              ))
            ) : (
              // Actual suggestions
              suggestions.filter(s => !comparedList.some(c => c.id === s.id)).map(s => (
              <button
                key={s.id}
                onClick={() => handleAddProduct(s.slug)}
                className="flex-shrink-0 snap-start flex items-center gap-3 px-3 py-2 bg-white hover:bg-sky-50/80 border border-slate-200/60 hover:border-sky-300 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 group w-[220px]"
              >
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center p-1 border border-slate-100 shrink-0">
                  <img
                    src={s.media?.[0]?.url || '/placeholder.png'}
                    alt={s.sanPham}
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-slate-700 group-hover:text-sky-700 line-clamp-1">{s.sanPham}</div>
                  <div className="text-[11px] text-sky-600 font-extrabold mt-0.5">{s.variants?.[0] ? formatCurrency(s.variants[0].giaBan).replace('₫', 'đ') : 'N/A'}</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-50 shrink-0 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                  <PlusCircle size={14} className="text-slate-400 group-hover:text-sky-500" strokeWidth={2.5} />
                </div>
              </button>
            ))
            )}
          </div>
        </div>
      )}

      {/* Row of 4 Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {comparedList.map((product, idx) => (
          <div key={product.id} className="border border-slate-200/60 rounded-2xl p-4 relative bg-slate-50/50 flex flex-col justify-between h-48 hover:shadow-card transition-all duration-300">
            {idx > 0 && (
              <button
                onClick={() => handleRemoveProduct(idx)}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-700 flex items-center justify-center transition-colors active:scale-95"
                title="Xóa khỏi so sánh"
              >
                <X size={14} strokeWidth={2} />
              </button>
            )}
            <div className="text-center space-y-1.5 flex-1 flex flex-col justify-center">
              <img
                src={product.media.find(m => m.isThumbnail)?.url || '/placeholder.png'}
                alt={product.sanPham}
                className="w-16 h-16 object-contain mx-auto drop-shadow-sm mix-blend-multiply"
              />
              <div className="font-bold text-slate-800 text-xs line-clamp-2 mt-1">{product.sanPham}</div>
              <div className="text-sky-600 font-extrabold text-xs">{formatCurrency(getMinPrice(product)).replace('₫', 'đ')}</div>
            </div>
            <Link href={`/phone/${product.slug}`}>
              <span className="w-full text-center inline-block text-[10px] bg-white text-slate-700 font-bold py-2 border border-slate-200/80 rounded-xl hover:bg-slate-50 active:scale-95 cursor-pointer transition-all mt-2 shadow-xs hover:shadow-sm">
                Xem chi tiết
              </span>
            </Link>
          </div>
        ))}
        
        {/* Empty slots placeholders */}
        {Array.from({ length: 4 - comparedList.length }).map((_, i) => (
          <div key={`empty-card-${i}`} className="border-2 border-dashed border-slate-200/80 rounded-2xl p-4 flex flex-col items-center justify-center h-48 text-slate-400 bg-slate-50/50">
            <PlusCircle size={24} strokeWidth={1.5} className="text-slate-300 mb-2" />
            <span className="text-xs font-semibold text-slate-400">Thêm sản phẩm</span>
          </div>
        ))}
      </div>

      {/* Action Compare Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => {
            if (comparedList.length < 2) {
              toast.error('Vui lòng thêm ít nhất 2 sản phẩm để so sánh');
              return;
            }
            setIsModalOpen(true);
          }}
          disabled={comparedList.length < 2}
          className="px-8 py-3.5 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all duration-200 shadow-card hover:shadow-elevated active:scale-95 flex items-center gap-2 text-sm cursor-pointer"
        >
          <Scale size={18} strokeWidth={2} />
          <span>So sánh ngay ({comparedList.length} sản phẩm)</span>
        </button>
      </div>

      {/* Popup Comparison Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[var(--z-modal-backdrop)] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-modal w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col z-[var(--z-modal)] animate-fade-in-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Bảng so sánh thông số kỹ thuật</h3>
                <p className="text-slate-500 text-xs mt-0.5">So sánh chi tiết cấu hình và tính năng</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 hover:text-slate-700 flex items-center justify-center transition-colors active:scale-95"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse table-fixed min-w-[768px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="w-1/5 p-4 font-semibold text-slate-500 text-sm border-r border-slate-100">Thông số</th>
                    {comparedList.map((product) => (
                      <th key={product.id} className="p-4 text-center border-r border-slate-100 last:border-0">
                        <img
                          src={product.media.find(m => m.isThumbnail)?.url || '/placeholder.png'}
                          alt={product.sanPham}
                          className="w-16 h-16 object-contain mx-auto drop-shadow-sm mb-2 mix-blend-multiply"
                        />
                        <div className="font-bold text-slate-800 text-xs line-clamp-1">{product.sanPham}</div>
                        <div className="text-sky-600 font-extrabold text-xs mt-0.5">{formatCurrency(getMinPrice(product)).replace('₫', 'đ')}</div>
                      </th>
                    ))}
                    {Array.from({ length: 4 - comparedList.length }).map((_, i) => (
                      <th key={`modal-empty-th-${i}`} className="p-4 text-center text-slate-300 border-r border-slate-100 last:border-0">-</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  <tr className="hover:bg-slate-50/30">
                    <td className="p-4 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/50">Bộ nhớ RAM</td>
                    {comparedList.map(p => (
                      <td key={p.id} className="p-4 font-medium text-slate-800 text-center border-r border-slate-100 last:border-0">{getVariantSummary(p, 'ramGb')}</td>
                    ))}
                    {Array.from({ length: 4 - comparedList.length }).map((_, i) => (
                      <td key={`modal-empty-ram-${i}`} className="p-4 text-center text-slate-300 border-r border-slate-100 last:border-0">-</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="p-4 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/50">Bộ nhớ lưu trữ</td>
                    {comparedList.map(p => (
                      <td key={p.id} className="p-4 font-medium text-slate-800 text-center border-r border-slate-100 last:border-0">{getVariantSummary(p, 'dungLuongGb')}</td>
                    ))}
                    {Array.from({ length: 4 - comparedList.length }).map((_, i) => (
                      <td key={`modal-empty-rom-${i}`} className="p-4 text-center text-slate-300 border-r border-slate-100 last:border-0">-</td>
                    ))}
                  </tr>
                  {specsRows.map(row => (
                    <tr key={row.key} className="hover:bg-slate-50/30">
                      <td className="p-4 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/50">{row.label}</td>
                      {comparedList.map(p => {
                        const val = (p as any)[row.key];
                        let text = '-';
                        if (row.isBool) {
                          text = val ? 'Có' : 'Không';
                        } else if (val !== null && val !== undefined) {
                          text = `${val}${row.suffix || ''}`;
                        }
                        return (
                          <td key={p.id} className="p-4 text-center font-medium text-slate-800 border-r border-slate-100 last:border-0">
                            {row.isBool ? (
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${val ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                {text}
                              </span>
                            ) : (
                              text
                            )}
                          </td>
                        );
                      })}
                      {Array.from({ length: 4 - comparedList.length }).map((_, i) => (
                        <td key={`modal-empty-${row.key}-${i}`} className="p-4 text-center text-slate-300 border-r border-slate-100 last:border-0">-</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50/50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-card hover:shadow-elevated cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
