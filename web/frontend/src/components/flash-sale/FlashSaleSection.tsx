'use client';

import { useEffect, useState } from 'react';
import { CountdownTimer } from './CountdownTimer';
import { FlashSaleProgressBar } from './FlashSaleProgressBar';
import { formatCurrency } from '@/lib/utils';
import { Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function FlashSaleSection() {
  const [flashSale, setFlashSale] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentFlashSale = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const res = await fetch(`${apiUrl}/flash-sales/current`);
        if (res.ok) {
          const data = await res.json();
          setFlashSale(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch flash sale', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentFlashSale();
  }, []);

  if (isLoading || !flashSale) return null;

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-rose-100 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-rose-500">
                <Zap size={28} className="fill-rose-500 animate-pulse" />
                <h2 className="font-[var(--font-outfit)] text-2xl md:text-3xl font-bold tracking-tight uppercase">Giờ Vàng Giá Sốc</h2>
              </div>
              <CountdownTimer targetDate={flashSale.ketThuc} onExpire={() => window.location.reload()} />
            </div>
            <Link href="/phone" className="text-sm font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 group transition-colors">
              Xem tất cả <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {flashSale.items.slice(0, 5).map((item: any) => {
              const product = item.productVariant.product;
              const variant = item.productVariant;
              const imageUrl = variant.imageUrl || product.imageUrl || '/placeholder-phone.png';

              return (
                <Link key={item.id} href={`/phone/${product.slug}`} className="bg-slate-50/50 hover:bg-white p-4 rounded-2xl border border-slate-100 hover:border-rose-200 transition-all duration-300 hover:shadow-card hover:-translate-y-1 group flex flex-col">
                  <div className="relative aspect-square mb-4 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2">
                    <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg z-10">
                      -{Math.round((1 - item.giaFlashSale / variant.giaGoc) * 100)}%
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={imageUrl} 
                      alt={product.sanPham} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-1 group-hover:text-rose-600 transition-colors">
                      {product.sanPham} {variant.dungLuongGb}GB
                    </h3>
                    <div className="mt-auto pt-2 space-y-1">
                      <div className="font-bold text-rose-600 text-lg tabular-nums tracking-tight">
                        {formatCurrency(item.giaFlashSale)}
                      </div>
                      <div className="text-xs text-slate-400 line-through font-medium tabular-nums">
                        {formatCurrency(variant.giaGoc)}
                      </div>
                      <FlashSaleProgressBar sold={item.daBan} total={item.soLuong} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
