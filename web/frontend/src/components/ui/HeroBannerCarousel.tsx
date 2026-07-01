'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  hang: string;
  sanPham: string;
  phanKhuc?: string;
  moTa?: string;
  media?: Array<{ url: string; loai: string; isThumbnail: boolean }>;
}

interface HeroBannerCarouselProps {
  products?: Product[];
}

interface BannerSlide {
  id: string | number;
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

const STATIC_SLIDES: BannerSlide[] = [
  {
    id: 'static-1',
    tag: 'Siêu phẩm mới',
    title: 'iPhone 16 Pro Max - Đỉnh cao Titan',
    description: 'Chất liệu Titan cấp hàng không bền nhẹ tuyệt đối, nút Camera Control độc đáo nâng tầm trải nghiệm quay chụp chuyên nghiệp.',
    btnText: 'Mua ngay',
    href: '/phone?hang=Apple',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop',
    bgGradient: 'from-sky-50 via-white to-blue-50/40',
    glowColor1: 'bg-sky-400/10',
    glowColor2: 'bg-blue-400/10'
  },
  {
    id: 'static-2',
    tag: 'Sản phẩm nổi bật',
    title: 'Galaxy S26 Ultra - Tuyệt tác công nghệ',
    description: 'Mở ra kỷ nguyên di động tối tân cùng vi xử lý Snapdragon mạnh mẽ, camera 200MP siêu zoom bắt trọn mọi chi tiết.',
    btnText: 'Đặt trước ngay',
    href: '/phone?hang=Samsung',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
    bgGradient: 'from-blue-50/50 via-white to-sky-100/30',
    glowColor1: 'bg-blue-300/10',
    glowColor2: 'bg-sky-300/10'
  }
];

export default function HeroBannerCarousel({ products = [] }: HeroBannerCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Map products from DB to slides dynamically
  const featuredProducts = products
    .filter(p => p.media && p.media.length > 0)
    .slice(0, 3);

  const slides: BannerSlide[] = featuredProducts.length > 0
    ? featuredProducts.map((p, idx) => {
        const gradients = [
          { bg: 'from-sky-50 via-white to-blue-50/40', g1: 'bg-sky-400/10', g2: 'bg-blue-400/10' },
          { bg: 'from-blue-50/50 via-white to-sky-100/30', g1: 'bg-blue-300/10', g2: 'bg-sky-300/10' },
          { bg: 'from-sky-50/60 via-white to-blue-50/30', g1: 'bg-sky-400/10', g2: 'bg-teal-400/10' }
        ];
        const grad = gradients[idx % gradients.length];
        return {
          id: p.id,
          tag: p.phanKhuc === 'FLAGSHIP' ? 'Siêu phẩm cao cấp' : 'Sản phẩm nổi bật',
          title: p.sanPham,
          description: p.moTa || 'Trải nghiệm cấu hình vượt trội cùng mức giá cực kỳ hấp dẫn tại PhoneStore.',
          btnText: 'Mua ngay',
          href: `/phone/${p.slug}`,
          imageUrl: p.media?.[0]?.url || 'https://placehold.co/600x600/png?text=No+Image',
          bgGradient: grad.bg,
          glowColor1: grad.g1,
          glowColor2: grad.g2
        };
      })
    : STATIC_SLIDES;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  // If current slide index is out of bounds due to changing products list
  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0);
    }
  }, [slides.length, current]);

  const currentSlide = slides[current] || slides[0] || STATIC_SLIDES[0];

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-slate-200/50 bg-white min-h-[380px] flex items-center p-8 md:p-12 transition-all duration-700 ease-in-out select-none shadow-card hover:shadow-elevated"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background slides */}
      {slides.map((slide, idx) => {
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
              className="absolute inset-0 opacity-[0.03] text-sky-500"
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
        <div className="md:col-span-7 flex flex-col items-start justify-center">
          <span className="inline-block bg-sky-50 text-sky-600 border border-sky-100/80 px-3.5 py-1 rounded-lg font-bold text-xs mb-4 tracking-wide">
            {currentSlide.tag}
          </span>
          <h1 
            key={`title-${current}`}
            className="font-[var(--font-outfit)] text-3xl md:text-4xl font-bold leading-tight mb-4 text-slate-800 tracking-tight animate-[fadeIn_0.5s_ease-out]"
          >
            {currentSlide.title}
          </h1>
          <p 
            key={`desc-${current}`}
            className="text-slate-500 mb-6 text-sm leading-relaxed max-w-[420px] animate-[fadeIn_0.6s_ease-out]"
          >
            {currentSlide.description}
          </p>
          <Link 
            href={currentSlide.href}
            className="inline-block bg-sky-600 text-white hover:bg-sky-700 active:scale-95 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-sky-500/10"
          >
            {currentSlide.btnText}
          </Link>
        </div>

        {/* Right product image section */}
        <div className="hidden md:flex md:col-span-5 justify-center items-center h-[280px] relative">
          {slides.map((slide, idx) => {
            const isCurrent = idx === current;
            return (
              <img
                key={slide.id}
                src={slide.imageUrl}
                alt={slide.title}
                className={`absolute max-h-[260px] w-auto object-contain transition-all duration-700 ease-out transform ${
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
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-sky-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Left/Right controls */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/40 flex items-center justify-center transition-all duration-200 active:scale-90"
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/40 flex items-center justify-center transition-all duration-200 active:scale-90"
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
