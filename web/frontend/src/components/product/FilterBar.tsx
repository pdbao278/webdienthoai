'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentHang = searchParams.get('hang') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentQ = searchParams.get('q') || '';
  const currentRam = searchParams.get('ramGb') || '';
  const currentDungLuong = searchParams.get('dungLuongGb') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';

  const hasAdvancedActive = !!(currentRam || currentDungLuong || currentMinPrice || currentMaxPrice);
  const [showAdvanced, setShowAdvanced] = useState(hasAdvancedActive);

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    router.push(`/phone?${params.toString()}`);
  };

  const updateSingleFilter = (key: string, value: string) => {
    updateFilters({ [key]: value });
  };

  const clearAllFilters = () => {
    router.push('/phone');
  };

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="bg-white p-4 rounded-2xl shadow-card border border-slate-200/60 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          {currentQ && (
            <div className="flex items-center space-x-2 bg-sky-50 text-sky-700 px-3 py-1.5 rounded-xl text-sm font-medium">
              <span>Tìm kiếm: &quot;{currentQ}&quot;</span>
              <button onClick={() => updateSingleFilter('q', '')} className="hover:text-red-500 ml-2 transition-colors">
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-slate-700">Hãng:</span>
            <select 
              className="text-sm border border-slate-200/80 rounded-xl px-3 py-2 bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-sky-500/15 focus:border-sky-500 font-medium text-slate-700 transition-all duration-200"
              value={currentHang}
              onChange={(e) => updateSingleFilter('hang', e.target.value)}
            >
              <option value="">Tất cả hãng</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="OPPO">OPPO</option>
              <option value="Vivo">Vivo</option>
              <option value="Realme">Realme</option>
              <option value="Honor">Honor</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-slate-700">Sắp xếp:</span>
            <select 
              className="text-sm border border-slate-200/80 rounded-xl px-3 py-2 bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-sky-500/15 focus:border-sky-500 font-medium text-slate-700 transition-all duration-200"
              value={currentSort}
              onChange={(e) => updateSingleFilter('sort', e.target.value)}
            >
              <option value="newest">Mới nhất</option>
              <option value="gia_asc">Giá tăng dần</option>
              <option value="gia_desc">Giá giảm dần</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          {(hasAdvancedActive || currentHang || currentSort !== 'newest') && (
            <button 
              onClick={clearAllFilters}
              className="text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-xl border border-rose-200/80 transition-all duration-200 font-medium cursor-pointer active:scale-[0.97]"
            >
              Xóa lọc
            </button>
          )}
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`text-sm border rounded-xl px-4 py-2 flex items-center space-x-2 font-medium transition-all duration-200 cursor-pointer active:scale-[0.97] ${
              showAdvanced 
                ? 'bg-sky-50 border-sky-300/80 text-sky-600 shadow-card' 
                : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal size={15} strokeWidth={2} />
            <span>Bộ lọc nâng cao</span>
          </button>
        </div>
      </div>

      {showAdvanced && (
        <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-200/60 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Range Filter */}
          <div>
            <div className="text-sm font-semibold text-slate-800 mb-3">Mức giá</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Tất cả', min: '', max: '' },
                { label: 'Dưới 5 triệu', min: '', max: '5000000' },
                { label: '5 - 15 triệu', min: '5000000', max: '15000000' },
                { label: 'Trên 15 triệu', min: '15000000', max: '' },
              ].map((p) => {
                const isActive = currentMinPrice === p.min && currentMaxPrice === p.max;
                return (
                  <button
                    key={p.label}
                    onClick={() => updateFilters({ minPrice: p.min, maxPrice: p.max })}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 font-medium cursor-pointer active:scale-[0.95] ${
                      isActive
                        ? 'bg-sky-600 border-sky-600 text-white shadow-card'
                        : 'bg-slate-50/80 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RAM Filter */}
          <div>
            <div className="text-sm font-semibold text-slate-800 mb-3">Dung lượng RAM</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Tất cả', val: '' },
                { label: '4 GB', val: '4' },
                { label: '6 GB', val: '6' },
                { label: '8 GB', val: '8' },
                { label: '12 GB', val: '12' },
              ].map((r) => {
                const isActive = currentRam === r.val;
                return (
                  <button
                    key={r.label}
                    onClick={() => updateSingleFilter('ramGb', r.val)}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 font-medium cursor-pointer active:scale-[0.95] ${
                      isActive
                        ? 'bg-sky-600 border-sky-600 text-white shadow-card'
                        : 'bg-slate-50/80 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Internal Storage Filter */}
          <div>
            <div className="text-sm font-semibold text-slate-800 mb-3">Bộ nhớ trong</div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Tất cả', val: '' },
                { label: '64 GB', val: '64' },
                { label: '128 GB', val: '128' },
                { label: '256 GB', val: '256' },
                { label: '512 GB', val: '512' },
              ].map((d) => {
                const isActive = currentDungLuong === d.val;
                return (
                  <button
                    key={d.label}
                    onClick={() => updateSingleFilter('dungLuongGb', d.val)}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 font-medium cursor-pointer active:scale-[0.95] ${
                      isActive
                        ? 'bg-sky-600 border-sky-600 text-white shadow-card'
                        : 'bg-slate-50/80 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
