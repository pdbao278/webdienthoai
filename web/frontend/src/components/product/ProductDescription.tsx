'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductDescription({ moTa }: { moTa: string | null }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!moTa) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-card mt-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">Đặc điểm nổi bật</h3>
        <p className="text-slate-500 text-sm">Chưa có thông tin mô tả chi tiết cho sản phẩm này.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-card mt-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">Đặc điểm nổi bật</h3>
      <div className="relative">
        <div 
          className={`prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-500 ease-[var(--ease-out-expo)] ${
            isExpanded ? 'max-h-none' : 'max-h-[350px]'
          }`}
        >
          <div className="whitespace-pre-line space-y-4">
            {moTa}
          </div>
        </div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-4 py-3 border border-slate-200/80 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50/80 hover:border-slate-300 transition-all text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
      >
        <span>{isExpanded ? 'Thu gọn bài viết' : 'Xem thêm đặc điểm nổi bật'}</span>
        {isExpanded ? <ChevronUp size={16} strokeWidth={2} /> : <ChevronDown size={16} strokeWidth={2} />}
      </button>
    </div>
  );
}
