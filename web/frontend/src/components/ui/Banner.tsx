import React from 'react';
import Link from 'next/link';

interface BannerProps {
  title: string;
  description: string;
  ctaText?: string;
  href?: string;
  badge?: string;
  imageUrl?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Banner = ({
  title,
  description,
  ctaText = 'Xem ngay',
  href = '#',
  badge,
  imageUrl,
  variant = 'primary',
  className = ''
}: BannerProps) => {
  // If href is not provided, empty, or just '#', redirect to home page
  const validHref = (!href || href === '#' || href === '') ? '/' : href;

  return (
    <div className={`relative rounded-2xl overflow-hidden group border border-slate-200/50 shadow-card hover:shadow-elevated transition-all duration-500 p-8 md:p-10 ${
      variant === 'primary' 
        ? 'bg-gradient-to-br from-sky-50 via-white to-blue-50/40 min-h-[280px]' 
        : 'bg-gradient-to-br from-blue-50/50 via-white to-sky-100/30 min-h-[280px]'
    } ${className}`}>
      {/* Background Pattern / Effect */}
      <div className="absolute inset-0 opacity-[0.03] text-sky-500 transition-transform duration-700 group-hover:scale-[1.03]" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      {/* Decorative Glow Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-300/10 rounded-full blur-3xl group-hover:bg-sky-300/20 group-hover:scale-110 transition-all duration-700" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl group-hover:bg-blue-300/20 group-hover:scale-110 transition-all duration-700" />

      {/* Grid Layout to isolate text and image */}
      <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-6 items-center h-full relative z-10 w-full">
        {/* Content */}
        <div className="flex flex-col justify-center">
          {badge && (
            <span className="inline-block self-start px-3.5 py-1.5 rounded-lg font-semibold text-xs mb-4 tracking-wide shadow-sm border border-sky-100 bg-sky-50 text-sky-600">
              {badge}
            </span>
          )}
          <h3 className="font-[var(--font-outfit)] text-2xl md:text-3xl font-bold leading-tight mb-3 tracking-tight text-slate-800 transition-all duration-300 group-hover:text-sky-600">
            {title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-slate-500 transition-colors duration-300">
            {description}
          </p>
          <div>
            <Link href={validHref} className="inline-flex items-center justify-center bg-sky-600 text-white border border-transparent px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-sky-700 hover:shadow-md active:scale-[0.97] group-hover:scale-105">
              {ctaText}
            </Link>
          </div>
        </div>

        {/* Image (if provided) */}
        {imageUrl ? (
          <div className="hidden md:flex items-center justify-center pointer-events-none h-full min-h-[200px]">
             <img 
               src={imageUrl} 
               alt={title} 
               className="max-h-[220px] w-auto object-contain transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-2" 
             />
          </div>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </div>
  );
};

export default Banner;
