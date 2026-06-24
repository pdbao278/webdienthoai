'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Always reset page to 1 when changing filters
    params.set('page', '1');
    router.push(`/phone?${params.toString()}`);
  };

  const currentHang = searchParams.get('hang') || '';
  const currentSort = searchParams.get('sort') || 'newest';

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-slate-700">Hãng:</span>
        <select 
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={currentHang}
          onChange={(e) => updateFilter('hang', e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="OPPO">OPPO</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-slate-700">Sắp xếp:</span>
        <select 
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={currentSort}
          onChange={(e) => updateFilter('sort', e.target.value)}
        >
          <option value="newest">Mới nhất</option>
          <option value="gia_asc">Giá tăng dần</option>
          <option value="gia_desc">Giá giảm dần</option>
        </select>
      </div>
      
      {/* Mocking other filters like RAM, Price for visual */}
      <div className="flex items-center space-x-2 ml-auto">
        <button className="text-sm border border-slate-200 rounded-lg px-4 py-2 bg-white hover:bg-slate-50 flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          <span>Bộ lọc nâng cao</span>
        </button>
      </div>
    </div>
  );
}
