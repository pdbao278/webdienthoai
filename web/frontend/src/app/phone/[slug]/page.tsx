import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import CompareBox from '@/components/product/CompareBox';
import { Button } from '@/components/ui/Button';

async function getProduct(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const res = await fetch(`${apiUrl}/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch product');
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const discount = Math.round((1 - product.giaBan / product.giaGoc) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb mock */}
        <nav className="text-sm text-slate-500 mb-6 flex items-center space-x-2">
          <a href="/" className="hover:text-blue-600">Trang chủ</a>
          <span>/</span>
          <a href="/phone" className="hover:text-blue-600">Điện thoại</a>
          <span>/</span>
          <a href={`/phone?hang=${product.hang}`} className="hover:text-blue-600">{product.hang}</a>
          <span>/</span>
          <span className="text-slate-800 font-medium">{product.sanPham}</span>
        </nav>

        {/* Product Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{product.sanPham}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery media={product.media} />
            <CompareBox />
          </div>

          {/* Right Column: Info & Action */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
              
              {/* Pricing */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-end space-x-3 mb-2">
                  <span className="text-3xl font-bold text-red-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaBan)}
                  </span>
                  {product.giaGoc > product.giaBan && (
                    <span className="text-lg text-slate-400 line-through mb-1">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaGoc)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded-lg mb-1">
                      -{discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Promotions mock */}
              <div className="bg-slate-50 border border-blue-100 rounded-xl p-4 mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                  Khuyến mãi đặc biệt
                </h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start"><span className="text-blue-500 mr-2">•</span> Giảm thêm 500.000đ khi thanh toán qua thẻ tín dụng.</li>
                  <li className="flex items-start"><span className="text-blue-500 mr-2">•</span> Trợ giá thu cũ lên đời đến 2 triệu đồng.</li>
                  <li className="flex items-start"><span className="text-blue-500 mr-2">•</span> Tặng gói bảo hành VIP 12 tháng.</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button variant="primary" className="w-full text-lg py-4">
                  Mua ngay
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    Thêm vào giỏ
                  </Button>
                  <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                    Mua trả góp 0%
                  </Button>
                </div>
              </div>

              <ProductSpecs product={product} />

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
