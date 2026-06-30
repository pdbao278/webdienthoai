'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface MediaItem {
  url: string;
  isThumbnail: boolean;
  loai?: 'IMAGE' | 'VIDEO';
}

export default function ProductGallery({ media }: { media: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!media || media.length === 0) {
    return <div className="aspect-square bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 border border-slate-200/60 shadow-card">Không có ảnh</div>;
  }

  const isVideoItem = (item: MediaItem) => {
    if (item.loai === 'VIDEO') return true;
    return item.url.toLowerCase().endsWith('.webm') || item.url.toLowerCase().endsWith('.mp4');
  };

  const currentMedia = media[activeIndex];
  const currentIsVideo = isVideoItem(currentMedia);

  return (
    <div className="flex flex-col space-y-3">
      {/* Main viewport (Double-Bezel approach) */}
      <div className="aspect-[4/3] bg-white rounded-3xl p-3 border border-slate-200/60 flex items-center justify-center shadow-card relative overflow-hidden group">
        <div className="w-full h-full relative bg-slate-50/50 rounded-2xl flex items-center justify-center overflow-hidden">
          {currentIsVideo ? (
            <video
              src={currentMedia.url}
              controls
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain rounded-xl"
              key={currentMedia.url}
            />
          ) : (
            <Image 
              src={currentMedia.url} 
              alt="Product image" 
              fill
              priority={true}
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out-expo)]"
            />
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide px-1">
        {media.map((img, idx) => {
          const isImgVideo = isVideoItem(img);
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-[68px] h-[68px] rounded-2xl border-2 p-1 overflow-hidden transition-all duration-300 ease-[var(--ease-out-expo)] active:scale-95 ${
                isActive ? 'border-sky-500 shadow-elevated' : 'border-transparent hover:border-slate-300 hover:shadow-card bg-white shadow-xs'
              }`}
            >
              <div className="w-full h-full bg-slate-50/80 rounded-xl flex items-center justify-center relative overflow-hidden">
                {isImgVideo ? (
                  <>
                    <video src={img.url} className="w-full h-full object-cover p-1 pointer-events-none opacity-80" preload="metadata" />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 hover:bg-slate-900/30 transition-colors">
                      <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm">
                        <Play size={10} fill="currentColor" className="text-slate-800 ml-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <Image src={img.url} alt={`Thumbnail ${idx}`} fill sizes="68px" className="object-contain p-1.5" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
