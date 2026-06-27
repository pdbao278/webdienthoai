import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const FilterBar = dynamic(() => import('@/components/product/FilterBar'), {
  ssr: true,
  loading: () => <div className="h-16 bg-white rounded-xl shadow-sm border border-slate-100 animate-pulse mb-6"></div>
});

export const metadata: Metadata = {
  title: 'Điện thoại di động chính hãng | PhoneStore',
  description: 'Khám phá các dòng điện thoại thông minh mới nhất từ Apple, Samsung, Xiaomi, OPPO. Giá tốt, bảo hành chính hãng.',
};

async function getProducts(searchParams: { [key: string]: string | string[] | undefined }) {
  try {
    const query = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === 'string') {
        query.set(key, value);
      }
    });
    
    if (!query.has('limit')) {
      query.set('limit', '12');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const res = await fetch(`${apiUrl}/products?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) return { data: [], pagination: null };
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch products', error);
    return { data: [], pagination: null };
  }
}

export default async function PhonePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const { data: products, pagination } = await getProducts(resolvedParams);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero & Menu Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
            {/* Left Category Menu */}
            <div className="hidden md:flex flex-col bg-white border border-slate-200 rounded-2xl p-3 shadow-sm h-full">
                <div className="font-[Outfit] text-sm font-semibold uppercase text-slate-500 px-3 py-2 border-b border-slate-200 mb-2">Danh Mục Sản Phẩm</div>
                <ul className="flex flex-col gap-1 list-none">
                    <li className="relative group">
                        <Link href="/phone" className="flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors bg-sky-600/5 text-sky-600">
                            <span><i className="fa-solid fa-mobile-button mr-3 text-[1.1rem]"></i>Điện thoại</span>
                            <i className="fa-solid fa-chevron-right text-xs text-slate-500 group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                        {/* Mega Menu Dropdown */}
                        <div className="absolute left-full top-0 w-[608px] pl-2 hidden group-hover:block z-50">
                            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl grid grid-cols-2 gap-6 p-6">
                                <div>
                                    <div className="font-[Outfit] text-sm font-bold text-slate-800 mb-3 border-b border-slate-200 pb-1">Thương Hiệu Hot</div>
                                    <ul className="flex flex-col gap-2">
                                        <li><Link href="/phone?hang=Apple" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Apple (iPhone)</Link></li>
                                        <li><Link href="/phone?hang=Samsung" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Samsung Galaxy</Link></li>
                                        <li><Link href="/phone?hang=Xiaomi" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Xiaomi</Link></li>
                                        <li><Link href="/phone?hang=OPPO" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">OPPO</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="font-[Outfit] text-sm font-bold text-slate-800 mb-3 border-b border-slate-200 pb-1">Theo Phân Khúc & Nhu Cầu</div>
                                    <ul className="flex flex-col gap-2">
                                        <li><Link href="/phone" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Điện thoại Flagship (Cao cấp)</Link></li>
                                        <li><Link href="/phone" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Phân khúc Tầm Trung</Link></li>
                                        <li><Link href="/phone" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Gaming Phone</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="relative group opacity-50 cursor-not-allowed">
                        <span className="flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors hover:bg-slate-50">
                            <span><i className="fa-solid fa-laptop mr-3 text-[1.1rem]"></i>Laptop <i className="fa-solid fa-lock text-xs ml-1"></i></span>
                            <i className="fa-solid fa-chevron-right text-xs text-slate-500"></i>
                        </span>
                    </li>
                    <li className="relative group opacity-50 cursor-not-allowed">
                        <span className="flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors hover:bg-slate-50">
                            <span><i className="fa-solid fa-plug mr-3 text-[1.1rem]"></i>Phụ Kiện <i className="fa-solid fa-lock text-xs ml-1"></i></span>
                            <i className="fa-solid fa-chevron-right text-xs text-slate-500"></i>
                        </span>
                    </li>
                </ul>
            </div>

            {/* Right Banner Carousel */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm min-h-[380px] bg-gradient-to-br from-green-50 to-sky-100 flex items-center p-8 md:p-12">
                <div className="max-w-[450px] relative z-10">
                    <span className="inline-block bg-sky-600/10 text-sky-600 px-3 py-1 rounded-full font-semibold text-xs mb-4 font-semibold">Sản phẩm nổi bật</span>
                    <h1 className="font-[Outfit] text-3xl md:text-4xl font-bold leading-tight mb-4 text-slate-800">Galaxy S24 Ultra - Đỉnh cao công nghệ AI</h1>
                    <p className="text-slate-500 mb-6 text-sm">Khám phá quyền năng Galaxy AI giúp dịch thuật trực tiếp, tìm kiếm thông minh và chụp zoom chuyên nghiệp.</p>
                    <button className="bg-sky-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors hover:bg-sky-700">Đặt trước ngay</button>
                </div>
            </div>
        </div>
      </section>

      {/* Brands Row */}
      <section className="py-6">
          <div className="container mx-auto px-4 lg:px-6">
              <div className="flex justify-between gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme', 'Honor'].map(brand => (
                    <Link key={brand} href={`/phone?hang=${brand}`} className="flex-1 min-w-[120px] h-[54px] bg-white border border-slate-200 rounded-xl flex items-center justify-center font-[Outfit] font-semibold text-[0.95rem] text-slate-500 transition-all hover:border-sky-600 hover:text-sky-600 hover:-translate-y-0.5 hover:shadow-sm">
                      {brand}
                    </Link>
                  ))}
              </div>
          </div>
      </section>

      {/* Products Grid Section */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 lg:px-6">
          <h1 className="font-[Outfit] text-[1.35rem] font-bold text-slate-800 mb-6">Danh sách điện thoại</h1>
          
          <Suspense fallback={<div className="h-16 bg-white rounded-xl shadow-sm border border-slate-100 animate-pulse mb-6" />}>
            <FilterBar />
          </Suspense>

          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p: any) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  {Array.from({ length: pagination.totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === (pagination.page || 1);
                    
                    const pageQuery = new URLSearchParams();
                    Object.entries(resolvedParams).forEach(([key, value]) => {
                      if (typeof value === 'string') pageQuery.set(key, value);
                    });
                    pageQuery.set('page', pageNum.toString());

                    return (
                      <Link 
                        key={pageNum}
                        href={`/phone?${pageQuery.toString()}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${isActive ? 'bg-sky-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
              <div className="text-slate-400 mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-700">Không tìm thấy sản phẩm phù hợp</h3>
              <p className="text-slate-500 mt-2">Vui lòng thử điều chỉnh lại bộ lọc.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
