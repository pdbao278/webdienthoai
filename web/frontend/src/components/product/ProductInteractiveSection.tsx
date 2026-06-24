'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import AddToCartButton from './AddToCartButton';
import ProductSpecs from './ProductSpecs';
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

export default function ProductInteractiveSection({ product, variants, minVariant }: ProductInteractiveSectionProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(minVariant);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const deselectAll = useCartStore(state => state.deselectAll);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // If minVariant changes from server (e.g. initial load or navigation), update local state
  useEffect(() => {
    setSelectedVariant(minVariant);
  }, [minVariant]);

  // Group variants by storage and color for the selector
  // 1. Get unique storages
  const uniqueStorages = Array.from(new Set(variants.map(v => v.dungLuongGb))).sort((a, b) => a - b);
  
  // 2. Get available colors for the selected storage
  const availableColorsForStorage = variants.filter(v => v.dungLuongGb === selectedVariant.dungLuongGb);

  const updateUrl = (variant: Variant) => {
    const params = new URLSearchParams(searchParams.toString());
    const shortVariantId = variant.sku.replace(`${product.slug}-`, '');
    params.set('v', shortVariantId);
    params.delete('sku'); // Clean up old sku param if it exists
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleStorageSelect = (storage: number) => {
    // Find the first variant with this storage
    const variant = variants.find(v => v.dungLuongGb === storage);
    if (variant) {
      setSelectedVariant(variant);
      updateUrl(variant);
    }
  };

  const handleColorSelect = (color: string) => {
    const variant = variants.find(v => v.dungLuongGb === selectedVariant.dungLuongGb && v.mauSac === color);
    if (variant) {
      setSelectedVariant(variant);
      updateUrl(variant);
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
      {/* Variant Selectors */}
      <div className="mb-6 pb-6 border-b border-slate-100 space-y-4">
        {/* Storage Selector */}
        <div>
          <h4 className="text-sm font-medium text-slate-800 mb-3">Chọn dung lượng:</h4>
          <div className="flex flex-wrap gap-2">
            {uniqueStorages.map(storage => {
              const isSelected = selectedVariant.dungLuongGb === storage;
              const storageVariants = variants.filter(v => v.dungLuongGb === storage);
              const minStoragePrice = Math.min(...storageVariants.map(v => v.giaBan));

              return (
                <button
                  key={storage}
                  onClick={() => handleStorageSelect(storage)}
                  className={`flex flex-col items-center justify-center px-4 py-2 border rounded-xl transition-all ${
                    isSelected 
                      ? 'border-sky-600 bg-sky-50 text-sky-800 ring-1 ring-sky-600' 
                      : 'border-slate-200 hover:border-sky-400 text-slate-600 bg-white'
                  }`}
                >
                  <span className="font-semibold">{storage}GB</span>
                  <span className="text-xs mt-1 opacity-80">{formatCurrency(minStoragePrice)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Selector */}
        <div>
          <h4 className="text-sm font-medium text-slate-800 mb-3">Chọn màu sắc:</h4>
          <div className="flex flex-wrap gap-2">
            {availableColorsForStorage.map(v => {
              const isSelected = selectedVariant.mauSac === v.mauSac;
              return (
                <button
                  key={v.mauSac}
                  onClick={() => handleColorSelect(v.mauSac)}
                  className={`flex flex-col items-center justify-center px-4 py-2 border rounded-xl transition-all ${
                    isSelected 
                      ? 'border-sky-600 bg-sky-50 text-sky-800 ring-1 ring-sky-600' 
                      : 'border-slate-200 hover:border-sky-400 text-slate-600 bg-white'
                  }`}
                >
                  <span className="font-medium text-sm">{v.mauSac}</span>
                  <span className="text-xs mt-1 opacity-80">{formatCurrency(v.giaBan)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <div className="flex items-end space-x-3 mb-2">
          <span className="text-3xl font-bold text-rose-600">
            {formatCurrency(giaBan)}
          </span>
          {giaGoc > giaBan && (
            <span className="text-lg text-slate-400 line-through mb-1">
              {formatCurrency(giaGoc)}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-rose-100 text-rose-600 text-sm font-bold px-2 py-1 rounded-lg mb-1">
              -{discount}%
            </span>
          )}
        </div>
        {selectedVariant.tonKho <= 0 && (
          <p className="text-rose-500 text-sm font-medium mt-2">Sản phẩm này hiện đang tạm hết hàng.</p>
        )}
      </div>

      {/* Promotions mock */}
      <div className="bg-slate-50 border border-sky-100 rounded-xl p-4 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
        <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
          <i className="fa-solid fa-gift text-sky-500 mr-2"></i> Khuyến mãi đặc biệt
        </h4>
        <ul className="text-sm text-slate-600 space-y-2">
          <li className="flex items-start"><span className="text-sky-500 mr-2">•</span> Giảm thêm 500.000đ khi thanh toán qua thẻ tín dụng.</li>
          <li className="flex items-start"><span className="text-sky-500 mr-2">•</span> Trợ giá thu cũ lên đời đến 2 triệu đồng.</li>
          <li className="flex items-start"><span className="text-sky-500 mr-2">•</span> Tặng gói bảo hành VIP 12 tháng.</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          variant="primary" 
          className="w-full text-lg py-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50" 
          disabled={selectedVariant.tonKho <= 0 || isBuyingNow}
          onClick={handleBuyNow}
        >
          {isBuyingNow ? 'Đang xử lý...' : 'Mua ngay'}
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <div className={selectedVariant.tonKho <= 0 ? 'opacity-50 pointer-events-none' : ''}>
            <AddToCartButton productId={selectedVariant.id} />
          </div>
          <Button variant="outline" className="w-full text-sky-600 border-sky-200 hover:bg-sky-50 hover:border-sky-300">
            Mua trả góp 0%
          </Button>
        </div>
      </div>

      <ProductSpecs product={product} variant={selectedVariant} />
    </div>
  );
}
