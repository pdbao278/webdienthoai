import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import Banner from '@/components/ui/Banner';
import { Smartphone, Laptop, Cable, ChevronRight, Lock } from 'lucide-react';
import { FlashSaleSection } from '@/components/flash-sale/FlashSaleSection';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PhoneStore - Điện thoại chính hãng, giá tốt nhất',
  description: 'Trải nghiệm mua sắm điện thoại di động chính hãng với PhoneStore. Click & Collect tiện lợi, thanh toán tại cửa hàng.',
};

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const res = await fetch(`${apiUrl}/products?limit=8`, { cache: 'no-store' });
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
      <section className="pt-8 pb-4">
        <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
            {/* Left Category Menu */}
            <div className="hidden md:flex flex-col bg-white border border-slate-200/60 rounded-2xl p-3 shadow-card h-full">
                <div className="font-[var(--font-outfit)] text-xs font-semibold uppercase text-slate-400 tracking-wider px-3 py-2 border-b border-slate-100 mb-2">Danh Mục Sản Phẩm</div>
                <ul className="flex flex-col gap-1 list-none">
                    <li className="relative group">
                        <Link href="/phone" className="flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all duration-200 bg-sky-50/80 text-sky-600">
                            <span className="flex items-center gap-3"><Smartphone size={18} strokeWidth={1.8} />Điện thoại</span>
                            <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        {/* Mega Menu Dropdown */}
                        <div className="absolute left-full top-0 w-[608px] pl-2 hidden group-hover:block z-[var(--z-dropdown)]">
                            <div className="bg-white/98 backdrop-blur-lg border border-slate-200/60 rounded-2xl shadow-dropdown grid grid-cols-2 gap-6 p-6">
                                <div>
                                    <div className="font-[var(--font-outfit)] text-sm font-bold text-slate-800 mb-3 border-b border-slate-100 pb-1.5">Thương Hiệu Hot</div>
                                    <ul className="flex flex-col gap-2.5">
                                        <li><Link href="/phone?hang=Apple" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Apple (iPhone)</Link></li>
                                        <li><Link href="/phone?hang=Samsung" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Samsung Galaxy</Link></li>
                                        <li><Link href="/phone?hang=Xiaomi" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Xiaomi</Link></li>
                                        <li><Link href="/phone?hang=OPPO" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">OPPO</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="font-[var(--font-outfit)] text-sm font-bold text-slate-800 mb-3 border-b border-slate-100 pb-1.5">Theo Phân Khúc & Nhu Cầu</div>
                                    <ul className="flex flex-col gap-2.5">
                                        <li><Link href="/phone" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Điện thoại Flagship (Cao cấp)</Link></li>
                                        <li><Link href="/phone" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Phân khúc Tầm Trung</Link></li>
                                        <li><Link href="/phone" className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-medium">Gaming Phone</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="relative group opacity-50 cursor-not-allowed">
                        <span className="flex items-center justify-between p-3 rounded-xl text-sm font-medium">
                            <span className="flex items-center gap-3"><Laptop size={18} strokeWidth={1.8} />Laptop <Lock size={12} className="ml-1 text-slate-400" /></span>
                            <ChevronRight size={14} className="text-slate-400" />
                        </span>
                    </li>
                    <li className="relative group opacity-50 cursor-not-allowed">
                        <span className="flex items-center justify-between p-3 rounded-xl text-sm font-medium">
                            <span className="flex items-center gap-3"><Cable size={18} strokeWidth={1.8} />Phụ Kiện <Lock size={12} className="ml-1 text-slate-400" /></span>
                            <ChevronRight size={14} className="text-slate-400" />
                        </span>
                    </li>
                </ul>
            </div>

            {/* Right Banner */}
            <div className="relative rounded-2xl overflow-hidden shadow-card min-h-[380px] bg-gradient-to-br from-sky-50 via-slate-50 to-emerald-50/50 flex items-center p-8 md:p-12">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                <div className="max-w-[450px] relative z-10">
                    <span className="inline-block bg-sky-600/8 text-sky-600 px-3.5 py-1 rounded-lg font-semibold text-xs mb-4 tracking-wide">Sản phẩm nổi bật</span>
                    <h1 className="font-[var(--font-outfit)] text-3xl md:text-4xl font-bold leading-tight mb-4 text-slate-800 tracking-tight">Galaxy S24 Ultra - Đỉnh cao công nghệ AI</h1>
                    <p className="text-slate-500 mb-6 text-sm leading-relaxed max-w-[380px]">Khám phá quyền năng Galaxy AI giúp dịch thuật trực tiếp, tìm kiếm thông minh và chụp zoom chuyên nghiệp.</p>
                    <button className="bg-sky-600 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-sky-700 active:scale-[0.97] shadow-card hover:shadow-elevated">Đặt trước ngay</button>
                </div>
            </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-4">
        <div className="container mx-auto px-4 lg:px-6">
          <Banner 
            title="Săn Mùa Hè Sôi Động" 
            description="Ưu đãi lên đến 40% cho các dòng điện thoại Flagship. Khám phá các phần quà hấp dẫn đi kèm, số lượng có hạn!" 
            ctaText="Săn ngay" 
            href="/phone?minPrice=15000000"
            badge="Khuyến mãi Hot"
            variant="primary"
          />
        </div>
      </section>

      <FlashSaleSection />

      {/* Secondary Banners (Split Grid) - Moved above Products Filter */}
      <section className="py-4 pb-8">
        <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Banner 
            title="Thế Hệ Galaxy Mới" 
            description="Trải nghiệm quyền năng AI mạnh mẽ cùng dòng điện thoại Samsung Galaxy S24 Series mới nhất." 
            ctaText="Tìm hiểu thêm" 
            href="/phone?hang=Samsung"
            variant="secondary"
          />
          <Banner 
            title="Đặc Quyền Premium" 
            description="Tặng kèm gói bảo hành rơi vỡ 12 tháng cho mọi hóa đơn mua điện thoại trên 15 triệu." 
            ctaText="Xem chi tiết" 
            href="/chinh-sach-bao-hanh"
            variant="primary"
          />
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-12">
          <div className="container mx-auto px-4 lg:px-6">
              <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                      <h2 className="font-[var(--font-outfit)] text-xl font-bold text-slate-800 tracking-tight">Danh sách điện thoại</h2>
                      {/* Category Tabs */}
                      <div className="hidden md:flex gap-1.5 bg-slate-100/80 p-1 rounded-xl">
                          <Link href="/phone" className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white text-sky-600 shadow-xs transition-all duration-200">Tất cả</Link>
                          <Link href="/phone?minPrice=15000000" className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors duration-200">Flagship nổi bật</Link>
                          <Link href="/phone?minPrice=5000000&maxPrice=15000000" className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors duration-200">Tầm trung</Link>
                      </div>
                  </div>
              </div>

              {/* Brands Row */}
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-6 items-center">
                  <Link href="/phone" className="shrink-0 w-[100px] h-[44px] bg-white border border-blue-400 rounded-xl flex items-center justify-center font-[var(--font-outfit)] font-semibold text-[0.95rem] text-blue-500 transition-all hover:bg-blue-50 hover:-translate-y-0.5 active:scale-[0.97]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                      Lọc
                  </Link>

                  {[
                    { brand: 'Samsung', node: <span className="font-black text-slate-900 tracking-tighter text-lg uppercase">Samsung</span> },
                    { brand: 'Apple', node: <span className="flex items-center gap-1.5 font-medium text-slate-700"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-slate-400"><path d="M12 20.92c-1.35 0-2.69-.96-3.83-1.63-1.07-.63-2.14-1.25-3.08-1.25-1.54 0-2.91.82-3.88 2.05-1.55 1.95-2.26 4.74-1.6 7.42.54 2.15 1.57 4.09 3.01 5.39 1.45 1.3 3.07 1.87 4.54 1.87 1.25 0 2.51-.81 3.55-1.38 1.05-.58 2.09-1.16 3.08-1.16.94 0 1.94.57 2.97 1.15 1.05.58 2.36 1.39 3.65 1.39 1.54 0 3.25-.63 4.75-2.02 1.63-1.5 2.76-3.66 3.32-5.96-1.56-.63-3.1-1.74-3.1-3.6 0-1.87 1.2-3.16 2.45-4.14-1.35-1.92-3.44-2.31-4.32-2.31-1.35 0-2.69.96-3.83 1.63-1.07.63-2.14 1.25-3.08 1.25zM15.42 21.05c.78-1.02 1.24-2.33 1.14-3.61-1.22.06-2.58.74-3.41 1.76-.7.86-1.25 2.16-1.11 3.44 1.31.06 2.58-.6 3.38-1.59z"/></svg>iPhone</span> },
                    { brand: 'Xiaomi', node: <span className="font-semibold text-slate-500 tracking-[0.2em] text-[15px] lowercase">XIAOMI</span> },
                    { brand: 'OPPO', node: <span className="font-bold text-[#008154] tracking-widest text-[17px] lowercase">oppo</span> },
                    { brand: 'Vivo', node: <span className="font-black text-[#415FFF] italic tracking-wide text-xl lowercase">vivo</span> },
                    { brand: 'Realme', node: <span className="font-bold text-slate-800 text-[17px] lowercase">realme</span> },
                    { brand: 'Honor', node: <span className="font-black text-slate-900 tracking-[0.1em] text-lg uppercase">HONOR</span> },
                  ].map(({ brand, node }) => (
                    <Link key={brand} href={`/phone?hang=${brand}`} className="shrink-0 px-6 h-[44px] bg-slate-50 rounded-xl flex items-center justify-center transition-all hover:bg-slate-100 hover:-translate-y-0.5 active:scale-[0.97]">
                      {node}
                    </Link>
                  ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
