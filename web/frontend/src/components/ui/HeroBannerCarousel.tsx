'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface BannerSlide {
  id: number;
  tag: string;
  title: string;
  description: string;
  btnText: string;
  href: string;
  imageUrl: string;
  bgGradient: string;
  glowColor1: string;
  glowColor2: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 1,
    tag: 'Siêu phẩm mới',
    title: 'iPhone 16 Pro Max - Đỉnh cao Titan',
    description: 'Chất liệu Titan cấp hàng không bền nhẹ tuyệt đối, nút Camera Control độc đáo nâng tầm trải nghiệm quay chụp chuyên nghiệp.',
    btnText: 'Mua ngay',
    href: '/phone?hang=Apple',
    imageUrl: '/banners/iphone_banner.png',
    bgGradient: 'from-slate-950 via-zinc-900 to-slate-900',
    glowColor1: 'bg-amber-500/10',
    glowColor2: 'bg-slate-400/20'
  },
  {
    id: 2,
    tag: 'Sản phẩm nổi bật',
    title: 'Galaxy S26 Ultra - Tuyệt tác công nghệ',
    description: 'Mở ra kỷ nguyên di động tối tân cùng vi xử lý Snapdragon mạnh mẽ, camera 200MP siêu zoom bắt trọn mọi chi tiết đêm.',
    btnText: 'Đặt trước ngay',
    href: '/phone?hang=Samsung',
    imageUrl: '/banners/samsung_banner.png',
    bgGradient: 'from-slate-950 via-sky-950 to-indigo-950',
    glowColor1: 'bg-sky-500/20',
    glowColor2: 'bg-indigo-500/20'
  },
  {
    id: 3,
    tag: 'Ống kính Leica',
    title: 'Xiaomi 16 Ultra - Đẳng cấp nhiếp ảnh',
    description: 'Đột phá nhiếp ảnh cùng ống kính Leica quang học thế hệ mới, cảm biến siêu lớn và công nghệ sạc siêu tốc 120W.',
    btnText: 'Khám phá ngay',
    href: '/phone?hang=Xiaomi',
    imageUrl: '/banners/xiaomi_banner.png',
    bgGradient: 'from-slate-950 via-neutral-900 to-emerald-950',
    glowColor1: 'bg-emerald-500/20',
    glowColor2: 'bg-teal-500/15'
  }
];

export default function HeroBannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl min-h-[380px] flex items-center p-8 md:p-12 transition-all duration-700 ease-in-out select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background slides */}
      {SLIDES.map((slide, idx) => {
        const isCurrent = idx === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-opacity duration-700 ease-in-out ${
              isCurrent ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
            }`}
          >
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
            
            {/* Gradient glows */}
            <div className={`absolute -top-24 -right-24 w-80 h-80 ${slide.glowColor1} rounded-full blur-3xl`} />
            <div className={`absolute -bottom-24 -left-24 w-80 h-80 ${slide.glowColor2} rounded-full blur-3xl`} />
          </div>
        );
      })}

      {/* Main Slide Layout (Flex container for Text + Image) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left text section */}
        <div className="md:col-span-7 text-white flex flex-col items-start justify-center">
          <span className="inline-block bg-white/10 text-sky-300 border border-white/10 px-3.5 py-1 rounded-lg font-semibold text-xs mb-4 tracking-wide backdrop-blur-md">
            {SLIDES[current].tag}
          </span>
          <h1 
            key={`title-${current}`}
            className="font-[var(--font-outfit)] text-3xl md:text-4xl font-bold leading-tight mb-4 text-white tracking-tight animate-[fadeIn_0.5s_ease-out]"
          >
            {SLIDES[current].title}
          </h1>
          <p 
            key={`desc-${current}`}
            className="text-slate-300 mb-6 text-sm leading-relaxed max-w-[420px] animate-[fadeIn_0.6s_ease-out]"
          >
            {SLIDES[current].description}
          </p>
          <Link 
            href={SLIDES[current].href}
            className="inline-block bg-sky-600 text-white hover:bg-sky-700 active:scale-95 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-sky-500/20"
          >
            {SLIDES[current].btnText}
          </Link>
        </div>

        {/* Right product image section */}
        <div className="hidden md:flex md:col-span-5 justify-center items-center h-[280px] relative">
          {SLIDES.map((slide, idx) => {
            const isCurrent = idx === current;
            return (
              <img
                key={slide.id}
                src={slide.imageUrl}
                alt={slide.title}
                className={`absolute max-h-[280px] w-auto object-contain transition-all duration-700 ease-out transform ${
                  isCurrent 
                    ? 'opacity-100 translate-x-0 scale-100 rotate-0' 
                    : 'opacity-0 translate-x-12 scale-90 rotate-6 pointer-events-none'
                }`}
              />
            );
          })}
        </div>
        
      </div>

      {/* Nav dots */}
      <div className="absolute bottom-5 right-8 z-10 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-sky-500 w-6' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Left/Right controls */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 active:scale-90"
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 active:scale-90"
        >
          &rarr;
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
