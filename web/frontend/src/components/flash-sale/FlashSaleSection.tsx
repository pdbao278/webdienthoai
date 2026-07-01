'use client';

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Flame, Zap } from 'lucide-react';
import Link from 'next/link';

function BlockCountdown({ targetDate, onExpire }: { targetDate: string, onExpire: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00', expired: false });

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ h: '00', m: '00', s: '00', expired: true });
        if (onExpire) setTimeout(onExpire, 0);
        return;
      }
      setTimeLeft({
        h: String(Math.floor((difference / (1000 * 60 * 60)))).padStart(2, '0'),
        m: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        s: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
        expired: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  if (!mounted || timeLeft.expired) return <span>00 : 00 : 00</span>;

  return (
    <span className="flex items-center gap-1 font-bold tabular-nums text-sm">
      <span className="bg-rose-50 text-rose-600 border border-rose-100/40 px-1.5 py-0.5 rounded-md">{timeLeft.h}</span> : 
      <span className="bg-rose-50 text-rose-600 border border-rose-100/40 px-1.5 py-0.5 rounded-md">{timeLeft.m}</span> : 
      <span className="bg-rose-50 text-rose-600 border border-rose-100/40 px-1.5 py-0.5 rounded-md">{timeLeft.s}</span>
    </span>
  );
}

export function FlashSaleSection() {
  const [flashSales, setFlashSales] = useState<any[]>([]);
  const [displayTabs, setDisplayTabs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const fetchTodayFlashSales = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${apiUrl}/flash-sales/today`);
      if (res.ok) {
        const data = await res.json();
        setFlashSales(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch flash sales', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayFlashSales();
  }, []);

  useEffect(() => {
    // Generate 5 static slots for today
    const now = new Date();
    const staticHours = [0, 9, 12, 15, 18];
    const tabs = staticHours.map(h => {
      const batDau = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, 0, 0);
      let ketThucH = h === 0 ? 9 : h === 9 ? 12 : h === 12 ? 15 : h === 15 ? 18 : 24;
      const ketThuc = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ketThucH === 24 ? 0 : ketThucH, 0, 0);
      if (ketThucH === 24) ketThuc.setDate(ketThuc.getDate() + 1);

      const dbFs = flashSales.find(f => {
        const dbDate = new Date(f.batDau);
        return dbDate.getHours() === h && dbDate.getDate() === now.getDate();
      });

      return {
        id: dbFs?.id || `dummy-${h}`,
        batDau: dbFs?.batDau || batDau.toISOString(),
        ketThuc: dbFs?.ketThuc || ketThuc.toISOString(),
        items: dbFs?.items || []
      };
    });

    setDisplayTabs(tabs);

    // If activeTabId is not set, OR if the current activeTabId is no longer in the tabs (e.g. replaced by real ID from API)
    if (!activeTabId || !tabs.find(t => t.id === activeTabId)) {
      // Find currently running slot
      let current = tabs.find(fs => new Date(fs.batDau) <= now && new Date(fs.ketThuc) > now);
      // If none running, find next upcoming slot
      if (!current) {
        current = tabs.find(fs => new Date(fs.batDau) > now);
      }
      // If all passed, select the last one
      setActiveTabId(current ? current.id : tabs[tabs.length - 1].id);
    }
  }, [flashSales, activeTabId]);

  // Auto scroll to active tab
  useEffect(() => {
    if (activeTabId && !isLoading) {
      const el = document.getElementById(`flash-tab-${activeTabId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTabId, isLoading]);

  if (isLoading) return null;

  const currentFlashSale = displayTabs.find(fs => fs.id === activeTabId);

  return (
    <section className="py-8 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold uppercase text-slate-800">Khuyến mãi online</h2>
        </div>
        
        {/* Top Bar with Badges and Categories */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-sky-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
              <Zap size={16} className="fill-white" /> FLASH SALE
            </div>
            <div className="bg-sky-50 text-sky-600 px-3 py-1.5 rounded-lg font-bold text-sm border border-sky-100">
              GIẢM ĐẾN 50%
            </div>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['Điện Thoại', 'Apple', 'Laptop', 'Phụ Kiện', 'Đồng Hồ', 'PC, Màn hình'].map((cat, idx) => (
              <button 
                key={idx} 
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  idx === 0 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Bar */}
        <div className="flex overflow-x-auto pb-4 scrollbar-hide mb-4">
          <div className="flex bg-slate-100/80 rounded-full p-1.5 min-w-max items-center">
            {displayTabs.map((fs) => {
              const batDau = new Date(fs.batDau);
              const isSelected = activeTabId === fs.id;
              const isRunning = new Date(fs.batDau) <= new Date() && new Date(fs.ketThuc) > new Date();
              
              return (
                <button
                  key={fs.id}
                  id={`flash-tab-${fs.id}`}
                  onClick={() => setActiveTabId(fs.id)}
                  className={`min-w-[160px] flex flex-col items-center justify-center py-2 px-6 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isSelected && isRunning ? (
                    <>
                      <span className="text-[13px] mb-1">Chỉ còn:</span>
                      <BlockCountdown targetDate={fs.ketThuc} onExpire={fetchTodayFlashSales} />
                    </>
                  ) : (
                    <>
                      <span className="text-[13px] mb-0.5 opacity-80">{isSelected && !isRunning ? 'Chưa diễn ra' : 'Sắp diễn ra'}</span>
                      <span className={`text-lg ${isSelected ? 'font-bold' : 'font-medium'}`}>
                        {`${String(batDau.getHours()).padStart(2, '0')}:${String(batDau.getMinutes()).padStart(2, '0')}`}
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {!currentFlashSale?.items?.length ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Chưa có sản phẩm flash sale..</h3>
            <p className="text-slate-500">Vui lòng quay lại sau nhé!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentFlashSale.items.map((item: any) => {
              const product = item.productVariant.product;
              const variant = item.productVariant;
              const imageUrl = variant.imageUrl || product.imageUrl || '/placeholder-phone.png';
              const discountPercent = Math.round((1 - item.giaFlashSale / variant.giaGoc) * 100);
              const soldPercent = Math.min(100, Math.round((item.daBan / item.soLuong) * 100));
              const isRunning = new Date(currentFlashSale.batDau) <= new Date() && new Date(currentFlashSale.ketThuc) > new Date();

              return (
                <Link key={item.id} href={`/phone/${product.slug}`} className={`bg-white p-4 rounded-2xl border border-slate-100/85 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group flex flex-col h-full ${!isRunning ? 'opacity-80 grayscale-[15%]' : ''}`}>
                  <div className="relative aspect-square mb-4 flex items-center justify-center bg-white rounded-xl p-2 overflow-hidden">
                    <div className="absolute top-0 left-0 bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-1 rounded border border-rose-100/40 z-10">
                      GIẢM {discountPercent}%
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={imageUrl} 
                      alt={product.sanPham} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 min-h-[40px] mb-2 group-hover:text-rose-600 transition-colors">
                      {product.sanPham} {variant.dungLuongGb}GB
                    </h3>
                    <div className="mt-auto pt-2 space-y-2">
                      <div className="font-bold text-rose-600 text-[20px] tabular-nums tracking-tight leading-none">
                        {isRunning ? (
                          formatCurrency(item.giaFlashSale)
                        ) : (
                          formatCurrency(item.giaFlashSale).replace(/\d/g, (match, offset) => {
                            const firstDigitIndex = formatCurrency(item.giaFlashSale).search(/\d/);
                            return offset === firstDigitIndex ? match : '?';
                          })
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-slate-400 line-through font-medium tabular-nums">
                          {formatCurrency(variant.giaGoc)}
                        </span>
                        <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-100/40">
                          -{discountPercent}%
                        </span>
                      </div>
                      
                      {/* Orange/Red Progress Bar with Flame */}
                      <div className="mt-2 relative w-full h-[22px] bg-orange-100 rounded-full overflow-hidden flex items-center">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-rose-500 rounded-full transition-all duration-1000"
                          style={{ width: `${isRunning ? soldPercent : 0}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center gap-1 z-10 w-full px-2">
                          <Flame size={11} className="text-white fill-white animate-pulse" />
                          <span className="text-[11px] font-bold text-white tracking-wide">
                            {isRunning ? `Còn ${Math.max(0, item.soLuong - item.daBan)}/${item.soLuong} suất` : `Mở bán ${item.soLuong} suất`}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
