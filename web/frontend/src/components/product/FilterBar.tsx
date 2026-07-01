'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

// ─── Brand config ────────────────────────────────────────────────────────────
const BRANDS = [
  { id: 'Samsung',  label: 'SAMSUNG' },
  { id: 'Apple',    label: 'iPhone' },
  { id: 'Xiaomi',   label: 'Xiaomi' },
  { id: 'OPPO',     label: 'OPPO' },
  { id: 'vivo',     label: 'vivo' },
  { id: 'realme',   label: 'realme' },
  { id: 'HONOR',    label: 'HONOR' },
  { id: 'Motorola', label: 'motorola' },
];

// ─── Needs / special links ────────────────────────────────────────────────────
const NEEDS_LINKS = [
  { label: '📈 Điện thoại AI cao cấp', need: 'ai' },
  { label: '🔋 Pin trâu',               need: 'battery' },
  { label: '📸 Chụp ảnh đẹp',          need: 'camera' },
  { label: '🎮 Gaming',                  need: 'gaming' },
];

// ─── Advanced filter options ──────────────────────────────────────────────────
const RAM_OPTS   = ['3 GB', '4 GB', '6 GB', '8 GB', '12 GB', '16 GB'];
const RES_OPTS   = ['QQVGA', 'QVGA', 'HD+', 'Full HD+', '1.5K', '1.5K+', '2K+', 'QXGA+', 'Retina (iPhone)'];
const FREQ_OPTS  = ['60 Hz', '90 Hz', '120 Hz', '144 Hz', '165 Hz'];
const STOR_OPTS  = ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'];
const PRICE_OPTS = [
  { label: 'Dưới 3 triệu',    min: '',         max: '3000000' },
  { label: '3 - 7 triệu',     min: '3000000',  max: '7000000' },
  { label: '7 - 15 triệu',    min: '7000000',  max: '15000000' },
  { label: 'Trên 15 triệu',   min: '15000000', max: '' },
];
const CHARGE_OPTS = ['Sạc nhanh (từ 20W)', 'Sạc siêu nhanh (từ 60W)', 'Sạc không dây'];
const FEATURE_OPTS = ['Chỉnh ảnh AI', 'Hỗ trợ 5G', 'Kháng nước, bụi', 'Bảo mật khuôn mặt 3D', 'Công nghệ NFC'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseMulti(val: string | null): string[] {
  if (!val) return [];
  return val.split(',').filter(Boolean);
}

function toggleItem(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
}

// ─── Chip button ─────────────────────────────────────────────────────────────
function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-sm px-4 py-2 rounded-xl border font-medium transition-all duration-200 cursor-pointer active:scale-[0.95] select-none whitespace-nowrap ${
        active
          ? 'bg-sky-600 border-sky-600 text-white shadow-sm'
          : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600'
      }`}
    >
      {label}
    </button>
  );
}

// ─── FilterSection ────────────────────────────────────────────────────────────
function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[0.85rem] font-bold text-slate-800 mb-3 uppercase tracking-wide">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── current params ──
  const currentHang      = searchParams.get('hang') || '';
  const currentSort      = searchParams.get('sort') || 'newest';
  const currentQ         = searchParams.get('q') || '';
  const currentRam       = searchParams.get('ramGb') || '';
  const currentDungLuong = searchParams.get('dungLuongGb') || '';
  const currentMinPrice  = searchParams.get('minPrice') || '';
  const currentMaxPrice  = searchParams.get('maxPrice') || '';

  // pending local state for the popup (multi-select chips)
  const [pendingRam,      setPendingRam]      = useState<string[]>(parseMulti(currentRam));
  const [pendingStorage,  setPendingStorage]  = useState<string[]>(parseMulti(currentDungLuong));
  const [pendingMinPrice, setPendingMinPrice] = useState(currentMinPrice);
  const [pendingMaxPrice, setPendingMaxPrice] = useState(currentMaxPrice);
  // non-URL fields (UI-only for now, can be wired later)
  const [pendingRes,      setPendingRes]      = useState<string[]>([]);
  const [pendingFreq,     setPendingFreq]     = useState<string[]>([]);
  const [pendingCharge,   setPendingCharge]   = useState<string[]>([]);
  const [pendingFeature,  setPendingFeature]  = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ── helpers ──
  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else       params.delete(key);
      });
      params.set('page', '1');
      router.push(`/phone?${params.toString()}`);
    },
    [router, searchParams]
  );

  const updateSingleFilter = (key: string, value: string) => updateFilters({ [key]: value });

  const clearAllFilters = () => router.push('/phone');

  // Reset pending state to match current URL when popup opens
  const openPopup = () => {
    setPendingRam(parseMulti(currentRam));
    setPendingStorage(parseMulti(currentDungLuong));
    setPendingMinPrice(currentMinPrice);
    setPendingMaxPrice(currentMaxPrice);
    setPendingRes([]);
    setPendingFreq([]);
    setPendingCharge([]);
    setPendingFeature([]);
    setIsOpen(true);
  };

  const applyFilters = () => {
    updateFilters({
      ramGb:       pendingRam.join(','),
      dungLuongGb: pendingStorage.join(','),
      minPrice:    pendingMinPrice,
      maxPrice:    pendingMaxPrice,
    });
    setIsOpen(false);
  };

  const resetPopup = () => {
    setPendingRam([]);
    setPendingStorage([]);
    setPendingMinPrice('');
    setPendingMaxPrice('');
    setPendingRes([]);
    setPendingFreq([]);
    setPendingCharge([]);
    setPendingFeature([]);
  };

  const hasAdvancedActive =
    !!(currentRam || currentDungLuong || currentMinPrice || currentMaxPrice);

  const totalActiveFilters =
    (currentRam ? 1 : 0) +
    (currentDungLuong ? 1 : 0) +
    (currentMinPrice || currentMaxPrice ? 1 : 0);

  return (
    <>
      {/* ── Horizontal filter strip ─────────────────────────────────────── */}
      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-card mb-6 overflow-hidden">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          {/* Lọc button */}
          <button
            id="filter-popup-trigger"
            type="button"
            onClick={openPopup}
            className={`flex-shrink-0 flex items-center gap-2 h-[52px] px-5 border-r border-slate-200/60 font-semibold text-sm transition-all duration-200 cursor-pointer ${
              hasAdvancedActive
                ? 'bg-sky-600 text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal size={16} strokeWidth={2} />
            <span>Lọc</span>
            {totalActiveFilters > 0 && (
              <span className="bg-white text-sky-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalActiveFilters}
              </span>
            )}
          </button>

          {/* Brand chips */}
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {BRANDS.map((b) => {
              const isActive = currentHang === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() =>
                    updateSingleFilter('hang', isActive ? '' : b.id)
                  }
                  className={`flex-shrink-0 h-[52px] px-5 text-sm font-semibold border-r border-slate-200/60 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-sky-600 bg-sky-50'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {b.label}
                </button>
              );
            })}

            {/* Need / special links */}
            {NEEDS_LINKS.map((n) => (
              <button
                key={n.need}
                type="button"
                onClick={() => updateFilters({ need: n.need })}
                className="flex-shrink-0 h-[52px] px-5 text-sm font-medium border-r border-slate-200/60 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {n.label}
              </button>
            ))}
          </div>

          {/* Right: sort select */}
          <div className="flex-shrink-0 ml-auto flex items-center gap-2 px-4 h-[52px] border-l border-slate-200/60">
            <select
              value={currentSort}
              onChange={(e) => updateSingleFilter('sort', e.target.value)}
              className="text-sm font-medium text-slate-700 bg-transparent border-none outline-none cursor-pointer appearance-none pr-5 relative"
              aria-label="Sắp xếp"
            >
              <option value="newest">Mới nhất</option>
              <option value="gia_asc">Giá tăng dần</option>
              <option value="gia_desc">Giá giảm dần</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 pointer-events-none -ml-4" />
          </div>
        </div>

        {/* Active filter tags strip */}
        {(currentQ || hasAdvancedActive || currentHang) && (
          <div className="border-t border-slate-100 px-4 py-2.5 flex flex-wrap gap-2 items-center">
            {currentQ && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                Tìm: &ldquo;{currentQ}&rdquo;
                <button onClick={() => updateSingleFilter('q', '')} className="hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              </span>
            )}
            {currentHang && (
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-sky-200/60">
                Hãng: {currentHang}
                <button onClick={() => updateSingleFilter('hang', '')} className="hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              </span>
            )}
            {currentRam && (
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-sky-200/60">
                RAM: {currentRam} GB
                <button onClick={() => updateSingleFilter('ramGb', '')} className="hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              </span>
            )}
            {currentDungLuong && (
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-sky-200/60">
                Bộ nhớ: {currentDungLuong} GB
                <button onClick={() => updateSingleFilter('dungLuongGb', '')} className="hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors ml-auto"
            >
              Xóa tất cả
            </button>
          </div>
        )}
      </div>

      {/* ── Filter Popup Modal ───────────────────────────────────────────── */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(2px)' }}
          onClick={(e) => { if (e.target === overlayRef.current) setIsOpen(false); }}
        >
          {/* Panel — centered, anchored slightly above center */}
          <div
            className="bg-white rounded-2xl shadow-2xl mx-auto mt-[80px] w-full max-w-[640px] max-h-[calc(100vh-160px)] flex flex-col overflow-hidden"
            style={{ animation: 'slideDown 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-[var(--font-outfit)] text-base font-bold text-slate-800">
                Tất cả bộ lọc
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer"
              >
                <X size={14} />
                Đóng
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* RAM */}
              <FilterSection title="RAM">
                {RAM_OPTS.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    active={pendingRam.includes(opt.replace(' GB', ''))}
                    onClick={() =>
                      setPendingRam(toggleItem(pendingRam, opt.replace(' GB', '')))
                    }
                  />
                ))}
              </FilterSection>

              {/* Độ phân giải */}
              <FilterSection title="Độ phân giải">
                {RES_OPTS.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    active={pendingRes.includes(opt)}
                    onClick={() => setPendingRes(toggleItem(pendingRes, opt))}
                  />
                ))}
              </FilterSection>

              {/* Tần số quét */}
              <FilterSection title="Tần số quét">
                {FREQ_OPTS.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    active={pendingFreq.includes(opt)}
                    onClick={() => setPendingFreq(toggleItem(pendingFreq, opt))}
                  />
                ))}
              </FilterSection>

              {/* Dung lượng lưu trữ */}
              <FilterSection title="Dung lượng lưu trữ">
                {STOR_OPTS.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    active={pendingStorage.includes(opt.replace(' GB', '').replace(' TB', '000'))}
                    onClick={() =>
                      setPendingStorage(
                        toggleItem(
                          pendingStorage,
                          opt.replace(' GB', '').replace(' TB', '000')
                        )
                      )
                    }
                  />
                ))}
              </FilterSection>

              {/* Mức giá */}
              <FilterSection title="Mức giá">
                {PRICE_OPTS.map((p) => {
                  const isActive =
                    pendingMinPrice === p.min && pendingMaxPrice === p.max;
                  return (
                    <Chip
                      key={p.label}
                      label={p.label}
                      active={isActive}
                      onClick={() => {
                        if (isActive) {
                          setPendingMinPrice('');
                          setPendingMaxPrice('');
                        } else {
                          setPendingMinPrice(p.min);
                          setPendingMaxPrice(p.max);
                        }
                      }}
                    />
                  );
                })}
              </FilterSection>

              {/* Pin & Sạc */}
              <FilterSection title="Pin & Sạc">
                {CHARGE_OPTS.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    active={pendingCharge.includes(opt)}
                    onClick={() => setPendingCharge(toggleItem(pendingCharge, opt))}
                  />
                ))}
              </FilterSection>

              {/* Tính năng đặc biệt */}
              <FilterSection title="Tính năng đặc biệt">
                {FEATURE_OPTS.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    active={pendingFeature.includes(opt)}
                    onClick={() => setPendingFeature(toggleItem(pendingFeature, opt))}
                  />
                ))}
              </FilterSection>
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3 bg-white">
              <button
                type="button"
                onClick={resetPopup}
                className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                Bỏ chọn
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="flex-1 h-11 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-sm"
              >
                Xem kết quả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-down keyframe */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)      scale(1);    }
        }
      `}</style>
    </>
  );
}
