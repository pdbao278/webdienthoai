'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import AddToCartButton from './AddToCartButton';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';

interface Variant {
  id: string;
  sku: string;
  ramGb: number;
  dungLuongGb: number;
  mauSac: string;
  giaGoc: number;
  giaBan: number;
  tonKho: number;
  imageUrl?: string;
}

interface ProductInteractiveSectionProps {
  product: any;
  variants: Variant[];
  minVariant: Variant;
}

const colorMap: Record<string, string> = {
  'Đen': '#1f2937',
  'Xám': '#6b7280',
  'Bạc': '#cbd5e1',
  'Trắng': '#f8fafc',
  'Xanh nhạt': '#bae6fd',
  'Xanh': '#3b82f6',
  'Xanh dương': '#1d4ed8',
  'Xanh lá': '#22c55e',
  'Vàng': '#fef08a',
  'Hồng': '#fbcfe8',
  'Đỏ': '#ef4444',
  'Tím': '#c084fc',
  'Titan tự nhiên': '#bebebe',
  'Titan sa mạc': '#d2b48c',
  'Titan trắng': '#f3f4f6',
  'Titan đen': '#2b2b2a'
};

const getColorHex = (colorName: string): string => {
  const normalized = colorName.toLowerCase();
  for (const [key, value] of Object.entries(colorMap)) {
    if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
      return value;
    }
  }
  return '#cbd5e1'; // fallback gray
};

export default function ProductInteractiveSection({ product, variants, minVariant }: ProductInteractiveSectionProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(minVariant);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const deselectAll = useCartStore(state => state.deselectAll);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // If minVariant changes from server, update local state
  useEffect(() => {
    setSelectedVariant(minVariant);
  }, [minVariant]);

  // Group unique configurations (combinations of ramGb and dungLuongGb)
  const uniqueConfigs = variants.reduce((acc: { ramGb: number; dungLuongGb: number }[], v) => {
    if (!acc.some(item => item.ramGb === v.ramGb && item.dungLuongGb === v.dungLuongGb)) {
      acc.push({ ramGb: v.ramGb, dungLuongGb: v.dungLuongGb });
    }
    return acc;
  }, []).sort((a, b) => {
    if (a.ramGb !== b.ramGb) return a.ramGb - b.ramGb;
    return a.dungLuongGb - b.dungLuongGb;
  });

  // Get available colors for the selected configuration
  const availableColorsForConfig = Array.from(
    new Set(
      variants
        .filter(v => v.ramGb === selectedVariant.ramGb && v.dungLuongGb === selectedVariant.dungLuongGb)
        .map(v => v.mauSac)
    )
  );

  const updateUrl = (variant: Variant) => {
    const params = new URLSearchParams(searchParams.toString());
    const shortVariantId = variant.sku.replace(`${product.slug}-`, '');
    params.set('v', shortVariantId);
    params.delete('sku');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleConfigSelect = (ramGb: number, dungLuongGb: number) => {
    let nextVariant = variants.find(
      v => v.ramGb === ramGb && v.dungLuongGb === dungLuongGb && v.mauSac === selectedVariant.mauSac
    );
    if (!nextVariant) {
      nextVariant = variants.find(v => v.ramGb === ramGb && v.dungLuongGb === dungLuongGb);
    }
    if (nextVariant) {
      setSelectedVariant(nextVariant);
      updateUrl(nextVariant);
    }
  };

  const handleColorSelect = (color: string) => {
    const nextVariant = variants.find(
      v => v.ramGb === selectedVariant.ramGb && v.dungLuongGb === selectedVariant.dungLuongGb && v.mauSac === color
    );
    if (nextVariant) {
      setSelectedVariant(nextVariant);
      updateUrl(nextVariant);
    }
  };

  const giaBan = selectedVariant.giaBan;
  const giaGoc = selectedVariant.giaGoc;
  const discount = giaGoc > 0 ? Math.round((1 - giaBan / giaGoc) * 100) : 0;

  const handleBuyNow = async () => {
    try {
      setIsBuyingNow(true);
      deselectAll(); // Clear other selections so only this item is checked out
      await addToCart(selectedVariant.id, 1);
      router.push('/checkout');
    } catch (error: any) {
      if (error.message.includes('Vui lòng đăng nhập')) {
        toast.error('Bạn cần đăng nhập để mua hàng');
        router.push('/login');
      } else {
        toast.error(error.message || 'Lỗi xử lý');
      }
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* Configuration Selectors */}
      <div className="space-y-4">
        {/* Configuration Selector */}
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">1. Chọn dung lượng:</span>
          <div className="flex flex-wrap gap-2">
            {uniqueConfigs.map(config => {
              const isSelected = selectedVariant.ramGb === config.ramGb && selectedVariant.dungLuongGb === config.dungLuongGb;
              return (
                <button
                  key={`${config.ramGb}-${config.dungLuongGb}`}
                  onClick={() => handleConfigSelect(config.ramGb, config.dungLuongGb)}
                  className={`px-3.5 py-1.5 border rounded-xl text-xs md:text-sm font-semibold transition-all outline-none cursor-pointer ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50/50 text-blue-600 ring-1 ring-blue-500/10' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  {config.ramGb}GB - {config.dungLuongGb}GB
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Selector */}
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">2. Chọn màu sắc:</span>
          <div className="flex flex-wrap gap-2">
            {availableColorsForConfig.map(color => {
              const isSelected = selectedVariant.mauSac === color;
              const colorHex = getColorHex(color);
              return (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs md:text-sm font-medium transition-all outline-none cursor-pointer ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50/50 text-blue-600 ring-1 ring-blue-500/10' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-slate-300/40 inline-block shrink-0" 
                    style={{ backgroundColor: colorHex }}
                  />
                  <span>{color}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price tag mimicking TGDD's Flash Sale or online promo */}
      <div className="bg-rose-50/30 rounded-2xl p-4 border border-rose-100 flex flex-col justify-center">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">Giá bán Online:</span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-rose-600">
            {formatCurrency(giaBan).replace('₫', 'đ')}
          </span>
          {giaGoc > giaBan && (
            <span className="text-slate-400 line-through text-sm">
              {formatCurrency(giaGoc).replace('₫', 'đ')}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-lg">
              -{discount}%
            </span>
          )}
        </div>
        {selectedVariant.tonKho <= 0 && (
          <p className="text-rose-600 text-xs font-bold mt-2 flex items-center gap-1">
            <i className="fa-solid fa-circle-exclamation"></i> Tạm hết hàng tại hệ thống
          </p>
        )}
      </div>

      {/* Action Buttons: AddToCart on Left, BuyNow on Right */}
      <div className="grid grid-cols-2 gap-3">
        <div className={selectedVariant.tonKho <= 0 ? 'opacity-50 pointer-events-none' : ''}>
          <AddToCartButton 
            productId={selectedVariant.id} 
            className="h-14 rounded-2xl border-rose-500 hover:border-rose-600 text-rose-600 hover:bg-rose-50/50 active:scale-95" 
          />
        </div>
        <button 
          disabled={selectedVariant.tonKho <= 0 || isBuyingNow}
          onClick={handleBuyNow}
          className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl shadow-sm hover:shadow active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer text-sm uppercase tracking-wider"
        >
          {isBuyingNow ? 'Đang xử lý...' : 'MUA NGAY'}
        </button>
      </div>

      {/* Purchase Policies Card */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 space-y-3.5">
        <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Chính sách mua hàng & Bảo hành:</h5>
        <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-600">
          <div className="flex items-start gap-2.5">
            <i className="fa-solid fa-arrows-rotate text-blue-500 mt-0.5"></i>
            <span>Hư gì đổi nấy 12 tháng tại các cửa hàng liên kết toàn quốc.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <i className="fa-solid fa-shield-halved text-blue-500 mt-0.5"></i>
            <span>Bảo hành chính hãng điện thoại 1 năm tại trung tâm ủy quyền.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <i className="fa-solid fa-box-open text-blue-500 mt-0.5"></i>
            <span>Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Type-C.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
