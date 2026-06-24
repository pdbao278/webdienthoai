'use client';

import { useState } from 'react';

export default function ProductGallery({ media }: { media: { url: string; isThumbnail: boolean }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!media || media.length === 0) {
    return <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">Không có ảnh</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-center shadow-sm relative overflow-hidden group">
        <img 
          src={media[activeIndex].url} 
          alt="Product image" 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {media.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 p-1 overflow-hidden transition-all ${
              activeIndex === idx ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-slate-300'
            }`}
          >
            <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
              <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
