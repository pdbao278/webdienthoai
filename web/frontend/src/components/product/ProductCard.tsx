'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    sanPham: string;
    variants: {
      giaBan: number;
      giaGoc: number;
      dungLuongGb: number;
    }[];
    media: { url: string }[];
    reviews?: {
      rating: number;
    }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // Find variant with the lowest price
  const minVariant = product.variants?.reduce(
    (prev, curr) => (prev.giaBan < curr.giaBan ? prev : curr),
    product.variants[0]
  );
  
  const giaBan = minVariant?.giaBan || 0;
  const giaGoc = minVariant?.giaGoc || 0;
  const dungLuongGb = minVariant?.dungLuongGb || '';

  const discount = giaGoc > 0 ? Math.round((1 - giaBan / giaGoc) * 100) : 0;

  const reviews = product.reviews || [];
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1)
    : '5.0';

  return (
    <Link href={`/phone/${product.slug}`} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col relative transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-sky-600/20 group">
      {discount > 0 && (
        <span className="absolute top-4 left-4 bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-semibold text-xs z-10">
          -{discount}%
        </span>
      )}
      
      <div className="h-[180px] flex items-center justify-center bg-slate-50 rounded-xl mb-4 overflow-hidden">
        {product.media && product.media.length > 0 ? (
          <Image 
            src={product.media[0].url} 
            alt={product.sanPham}
            width={200}
            height={200}
            className="max-h-[140px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
          <h3 className="text-[0.925rem] font-semibold text-slate-800 mb-2 leading-snug line-clamp-2">
            {product.sanPham}{dungLuongGb && !product.sanPham.includes(`${dungLuongGb}GB`) ? ` ${dungLuongGb}GB` : ''}
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
              <span className="font-[Outfit] text-[1.1rem] font-bold text-rose-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(giaBan)}</span>
              {giaGoc > giaBan && (
                <span className="text-xs text-slate-500 line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(giaGoc)}</span>
              )}
          </div>
          <div className="flex items-center gap-1 mb-4">
              <i className="fa-solid fa-star text-amber-400 text-xs"></i>
              <span className="text-xs font-semibold text-slate-800">{averageRating}</span>
              <span className="text-xs text-slate-500">({reviewCount} đánh giá)</span>
          </div>
          <div className="mt-auto flex gap-2">
              <div className="flex-1 bg-sky-600 text-white font-semibold text-sm h-[38px] rounded-xl transition-colors hover:bg-sky-700 flex items-center justify-center">
                Mua ngay
              </div>
          </div>
      </div>
    </Link>
  );
}
