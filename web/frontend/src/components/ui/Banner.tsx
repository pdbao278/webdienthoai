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
    <div className={`relative rounded-2xl overflow-hidden group shadow-card hover:shadow-elevated transition-all duration-500 flex items-center p-8 md:p-12 ${
      variant === 'primary' 
        ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 min-h-[280px]' 
        : 'bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 min-h-[220px]'
    } ${className}`}>
      {/* Background Pattern / Effect */}
      <div className="absolute inset-0 opacity-[0.1] transition-transform duration-700 group-hover:scale-[1.03]" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      {/* Decorative Glow Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-400/30 rounded-full blur-3xl group-hover:bg-sky-400/50 group-hover:scale-110 transition-all duration-700" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/40 group-hover:scale-110 transition-all duration-700" />

      {/* Content */}
      <div className="relative z-10 max-w-[500px]">
        {badge && (
          <span className={`inline-block px-3.5 py-1.5 rounded-lg font-semibold text-xs mb-4 tracking-wide shadow-sm border border-white/20 backdrop-blur-md ${
            variant === 'primary' ? 'bg-indigo-500/30 text-indigo-200' : 'bg-white/20 text-white'
          }`}>
            {badge}
          </span>
        )}
        <h3 className={`font-[var(--font-outfit)] text-2xl md:text-3xl font-bold leading-tight mb-3 tracking-tight transition-all duration-300 ${
          variant === 'primary' ? 'text-white group-hover:text-indigo-200' : 'text-white group-hover:text-sky-100'
        }`}>
          {title}
        </h3>
        <p className={`mb-6 text-sm leading-relaxed max-w-[380px] transition-colors duration-300 ${
          variant === 'primary' ? 'text-slate-300 group-hover:text-slate-200' : 'text-blue-100 group-hover:text-white'
        }`}>
          {description}
        </p>
        <Link href={validHref} className="inline-flex items-center justify-center bg-white text-slate-800 border border-transparent px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-lg active:scale-[0.97] group-hover:scale-105 group-hover:shadow-sky-500/20">
          {ctaText}
        </Link>
      </div>

      {/* Image (if provided) */}
      {imageUrl && (
        <div className="absolute right-4 bottom-0 top-0 w-[40%] hidden md:flex items-center justify-center pointer-events-none z-0">
           <img 
             src={imageUrl} 
             alt={title} 
             className="max-h-[80%] w-auto object-contain transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3" 
           />
        </div>
      )}
    </div>
  );
};

export default Banner;
