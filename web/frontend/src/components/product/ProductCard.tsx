import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    sanPham: string;
    giaBan: number;
    giaGoc: number;
    media: { url: string }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round((1 - product.giaBan / product.giaGoc) * 100);

  return (
    <Link href={`/phone/${product.slug}`} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full relative">
      {discount > 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
          -{discount}%
        </div>
      )}
      
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-4">
        {product.media && product.media.length > 0 ? (
          <img 
            src={product.media[0].url} 
            alt={product.sanPham}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.sanPham}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-red-600">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaBan)}
            </span>
            {product.giaGoc > product.giaBan && (
              <span className="text-sm text-slate-400 line-through">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaGoc)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
