'use client';

import { useState } from 'react';

export default function ProductDescription({ moTa }: { moTa: string | null }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!moTa) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mt-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Đặc điểm nổi bật</h3>
        <p className="text-slate-500 text-sm">Chưa có thông tin mô tả chi tiết cho sản phẩm này.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mt-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Đặc điểm nổi bật</h3>
      <div className="relative">
        <div 
          className={`prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-none' : 'max-h-[350px]'
          }`}
        >
          <div className="whitespace-pre-line space-y-4">
            {moTa}
          </div>
        </div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-4 py-3 border border-slate-100 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50/50 hover:border-slate-200 transition-all text-sm flex items-center justify-center gap-2"
      >
        <span>{isExpanded ? 'Thu gọn bài viết' : 'Xem thêm đặc điểm nổi bật'}</span>
        <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}></i>
      </button>
    </div>
  );
}
