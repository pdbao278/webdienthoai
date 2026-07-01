'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface BannerSlide {
  id: string;
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

/**
 * Banner slides cố định — chỉnh sửa trực tiếp tại đây để thay đổi nội dung banner.
 * imageUrl lấy từ Cloudinary (trường media.images[0] trong data.json của sản phẩm tương ứng).
 */
const SLIDES: BannerSlide[] = [
  {
    id: 'banner-iphone-16-pro-max',
    tag: 'Siêu phẩm Apple',
    title: 'iPhone 16 Pro Max - Đỉnh cao Titan',
    description: 'Trải nghiệm chip Apple A18 Pro siêu mạnh mẽ, màn hình 6.9 inch tuyệt mỹ cùng camera cải tiến vượt bậc.',
    btnText: 'Mua ngay',
    href: '/phone/iphone-16-pro-max-256gb',
    imageUrl: 'https://res.cloudinary.com/dw9catzob/image/upload/v1782227152/phonestore/products/Apple/iphone-16-pro-max-256gb/front.webp',
    bgGradient: 'from-sky-50 via-white to-blue-50/40',
    glowColor1: 'bg-sky-400/10',
    glowColor2: 'bg-blue-400/10'
  },
  {
    id: 'banner-galaxy-s26-ultra',
    tag: 'Siêu phẩm Samsung',
    title: 'Galaxy S26 Ultra - Quyền năng AI mới',
    description: 'Khám phá chụp ảnh zoom siêu đỉnh 200MP, cấu hình mạnh mẽ với Snapdragon 8 Gen 5 cùng các quyền năng Galaxy AI tối tân.',
    btnText: 'Đặt trước ngay',
    href: '/phone/galaxy-s26-ultra-256gb',
    imageUrl: 'https://res.cloudinary.com/dw9catzob/image/upload/v1782227546/phonestore/products/Samsung/galaxy-s26-ultra-256gb/front.webp',
    bgGradient: 'from-blue-50/50 via-white to-sky-100/30',
    glowColor1: 'bg-blue-300/10',
    glowColor2: 'bg-sky-300/10'
  },
  {
    id: 'banner-xiaomi-16-ultra',
    tag: 'Đột phá Xiaomi',
    title: 'Xiaomi 16 Ultra - Ống kính Leica thế hệ mới',
    description: 'Đột phá nhiếp ảnh di động với cảm biến lớn và ống kính Leica chất lượng cao, kết hợp sạc siêu tốc 120W.',
    btnText: 'Khám phá ngay',
    href: '/phone/xiaomi-16-ultra-512gb',
    imageUrl: 'https://res.cloudinary.com/dw9catzob/image/upload/v1782227695/phonestore/products/Xiaomi/xiaomi-16-ultra-512gb/front.webp',
    bgGradient: 'from-sky-50/60 via-white to-blue-50/30',
    glowColor1: 'bg-sky-400/10',
    glowColor2: 'bg-teal-400/10'
  }
];

export default function HeroBannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = SLIDES;

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

  // Ensure current slide index is valid if list length changes
  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0);
    }
  }, [slides.length, current]);

  const currentSlide = slides[current] || slides[0] || SLIDES[0];

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
