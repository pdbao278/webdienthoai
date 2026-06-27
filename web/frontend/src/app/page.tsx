import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PhoneStore - Điện thoại chính hãng, giá tốt nhất',
  description: 'Trải nghiệm mua sắm điện thoại di động chính hãng với PhoneStore. Click & Collect tiện lợi, thanh toán tại cửa hàng.',
};

export const revalidate = 60; // Revalidate every minute

async function getProducts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const res = await fetch(`${apiUrl}/products?limit=8`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch products', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
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
                                        <li><Link href="/phone?hang=Apple" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Apple (iPhone)</Link></li>
                                        <li><Link href="/phone?hang=Samsung" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Samsung Galaxy</Link></li>
                                        <li><Link href="/phone?hang=Xiaomi" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Xiaomi</Link></li>
                                        <li><Link href="/phone?hang=OPPO" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">OPPO</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="font-[Outfit] text-sm font-bold text-slate-800 mb-3 border-b border-slate-200 pb-1">Theo Phân Khúc & Nhu Cầu</div>
                                    <ul className="flex flex-col gap-2">
                                        <li><Link href="/phone" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Điện thoại Flagship (Cao cấp)</Link></li>
                                        <li><Link href="/phone" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Phân khúc Tầm Trung</Link></li>
                                        <li><Link href="/phone" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Gaming Phone</Link></li>
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
                    <span className="inline-block bg-sky-600/10 text-sky-600 px-3 py-1 rounded-full font-semibold text-xs mb-4">Sản phẩm nổi bật</span>
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
      <section className="py-10">
          <div className="container mx-auto px-4 lg:px-6">
              <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                      <h2 className="font-[Outfit] text-[1.35rem] font-bold text-slate-800">Danh sách điện thoại</h2>
                      {/* Category Tabs */}
                      <div className="hidden md:flex gap-2 bg-slate-100 p-1 rounded-full">
                          <Link href="/phone" className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-sky-600 shadow-sm">Tất cả</Link>
                          <Link href="/phone?minPrice=15000000" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">Flagship nổi bật</Link>
                          <Link href="/phone?minPrice=5000000&maxPrice=15000000" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">Tầm trung</Link>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
