'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MediaItem {
  url: string;
  isThumbnail: boolean;
  loai?: 'IMAGE' | 'VIDEO';
}

export default function ProductGallery({ media }: { media: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!media || media.length === 0) {
    return <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">Không có ảnh</div>;
  }

  const isVideoItem = (item: MediaItem) => {
    if (item.loai === 'VIDEO') return true;
    return item.url.toLowerCase().endsWith('.webm') || item.url.toLowerCase().endsWith('.mp4');
  };

  const currentMedia = media[activeIndex];
  const currentIsVideo = isVideoItem(currentMedia);

  return (
    <div className="flex flex-col space-y-4">
      <div className="aspect-square bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-center shadow-sm relative overflow-hidden group">
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
            className="object-contain group-hover:scale-110 transition-transform duration-500 p-4"
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {media.map((img, idx) => {
          const isImgVideo = isVideoItem(img);
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 p-1 overflow-hidden transition-all ${
                activeIndex === idx ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-slate-300'
              }`}
            >
              <div className="w-full h-full bg-white rounded-lg flex items-center justify-center relative">
                {isImgVideo ? (
                  <>
                    <video src={img.url} className="w-full h-full object-contain p-0.5 pointer-events-none" preload="metadata" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded-lg">
                      <i className="fa-solid fa-play text-white text-base shadow-sm"></i>
                    </div>
                  </>
                ) : (
                  <Image src={img.url} alt={`Thumbnail ${idx}`} fill className="object-contain p-1" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

