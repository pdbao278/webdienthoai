import React from 'react';

interface FlashSaleProgressBarProps {
  sold: number;
  total: number;
}

export function FlashSaleProgressBar({ sold, total }: FlashSaleProgressBarProps) {
  // Ensure we don't divide by zero and cap at 100%
  const safeTotal = Math.max(1, total);
  const percentage = Math.min(100, Math.round((sold / safeTotal) * 100));
  
  const isAlmostSoldOut = percentage >= 80;
  const isSoldOut = sold >= total;

  return (
    <div className="w-full mt-3">
      <div className="flex justify-between text-xs font-bold mb-1.5">
        <span className="text-slate-600">Đã bán {sold}/{total}</span>
        {isSoldOut ? (
          <span className="text-slate-400">Hết suất</span>
        ) : isAlmostSoldOut ? (
          <span className="text-rose-500 animate-pulse">Sắp hết!</span>
        ) : null}
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${isSoldOut ? 'bg-slate-300' : 'bg-gradient-to-r from-rose-400 to-rose-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
