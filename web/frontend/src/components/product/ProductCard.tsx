'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

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
    <Link href={`/phone/${product.slug}`} className="group bg-white border border-slate-200/60 rounded-2xl p-4 flex flex-col relative transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-elevated hover:border-slate-200">
      {discount > 0 && (
        <span className="absolute top-3.5 left-3.5 bg-rose-50 text-rose-600 border border-rose-100/40 px-2.5 py-0.5 rounded-lg font-semibold text-xs z-10">
          -{discount}%
        </span>
      )}
      
      <div className="h-[180px] flex items-center justify-center bg-slate-50/80 rounded-xl mb-4 overflow-hidden">
        {product.media && product.media.length > 0 ? (
          <Image 
            src={product.media[0].url} 
            alt={product.sanPham}
            width={200}
            height={200}
            className="max-h-[140px] w-auto object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
          <h3 className="text-[0.9rem] font-semibold text-slate-800 mb-2 leading-snug line-clamp-2">
            {product.sanPham}{dungLuongGb && !product.sanPham.includes(`${dungLuongGb}GB`) ? ` ${dungLuongGb}GB` : ''}
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
              <span className="font-[var(--font-outfit)] text-[1.1rem] font-bold text-rose-600 tabular-nums">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(giaBan)}</span>
              {giaGoc > giaBan && (
                <span className="text-xs text-slate-400 line-through tabular-nums">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(giaGoc)}</span>
              )}
          </div>
          <div className="flex items-center gap-1 mb-4">
              <Star size={12} fill="currentColor" className="text-amber-400" />
              <span className="text-xs font-semibold text-slate-700 tabular-nums">{averageRating}</span>
              <span className="text-xs text-slate-400">({reviewCount} đánh giá)</span>
          </div>
          <div className="mt-auto">
              <div className="w-full bg-sky-600 text-white font-semibold text-sm h-[38px] rounded-xl transition-all duration-200 hover:bg-sky-700 active:scale-[0.97] flex items-center justify-center">
                Mua ngay
              </div>
          </div>
      </div>
    </Link>
  );
}
