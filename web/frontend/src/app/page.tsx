import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import Banner from '@/components/ui/Banner';
import { Smartphone, Laptop, Cable, ChevronRight, Lock } from 'lucide-react';
import { FlashSaleSection } from '@/components/flash-sale/FlashSaleSection';
import HeroBannerCarousel from '@/components/ui/HeroBannerCarousel';

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

            {/* Right Banner Carousel */}
            <HeroBannerCarousel />
        </div>
      </section>

      <FlashSaleSection />

      {/* Secondary Banners (Split Grid) - Moved above Products Filter */}
      <section className="py-4 pb-8">
        <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Banner 
            title="Thế Hệ Galaxy Mới" 
            description="Trải nghiệm quyền năng AI mạnh mẽ cùng dòng điện thoại Samsung Galaxy S26 Series mới nhất." 
            ctaText="Tìm hiểu thêm" 
            href="/phone?hang=Samsung"
            variant="secondary"
            imageUrl="/data/dienthoai/Samsung/galaxy-s26-ultra-256gb/images/front.png"
          />
          <Banner 
            title="Đặc Quyền Premium" 
            description="Tặng kèm gói bảo hành rơi vỡ 12 tháng cho mọi hóa đơn mua điện thoại trên 15 triệu." 
            ctaText="Xem chi tiết" 
            href="/chinh-sach-bao-hanh"
            variant="primary"
            imageUrl="/data/dienthoai/Apple/iphone-16-pro-max-256gb/images/front.png"
          />
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-12 bg-slate-50 border-t border-slate-200/40">
          <div className="container mx-auto px-4 lg:px-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                      <h2 className="font-[var(--font-outfit)] text-xl font-bold text-slate-800 tracking-tight">Sản phẩm nổi bật</h2>
                      <p className="text-xs text-slate-400 mt-1">Tổng hợp những mẫu điện thoại được quan tâm và săn đón nhất</p>
                  </div>
                  {/* Category Tabs */}
                  <div className="flex gap-1.5 bg-slate-200/50 p-1 rounded-xl">
                      <Link href="/phone" className="px-4 py-2 rounded-lg text-xs font-bold bg-white text-sky-600 shadow-xs transition-all duration-200">Tất cả</Link>
                      <Link href="/phone?minPrice=15000000" className="px-4 py-2 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors duration-200">Flagship</Link>
                      <Link href="/phone?minPrice=5000000&maxPrice=15000000" className="px-4 py-2 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors duration-200">Tầm trung</Link>
                  </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {products.slice(0, 8).map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
              </div>

              {products.length > 8 && (
                <div className="text-center mt-12">
                  <Link href="/phone" className="inline-flex items-center justify-center bg-sky-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:bg-sky-700 hover:shadow-md active:scale-[0.97]">
                    Xem tất cả sản phẩm
                  </Link>
                </div>
              )}
          </div>
      </section>

      {/* Premium Click & Collect Service Intro Banner */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50/40 border border-slate-200/50 p-8 md:p-12 text-slate-800 shadow-card">
            <div className="absolute inset-0 opacity-[0.02] text-sky-500" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl" />
            
            <div className="max-w-[600px] relative z-10">
              <span className="bg-sky-50 text-sky-600 border border-sky-100/80 px-3.5 py-1 rounded-lg font-bold text-xs mb-4 tracking-wide inline-block">Trải nghiệm mua sắm mới</span>
              <h2 className="font-[var(--font-outfit)] text-2xl md:text-3xl font-bold leading-tight mb-4 tracking-tight text-slate-800">Đặt Online - Nhận Tại Cửa Hàng cực nhanh</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Chỉ với vài thao tác đơn giản, bạn có thể giữ trước chiếc máy mình yêu thích với mức giá ưu đãi nhất. Đến cửa hàng trải nghiệm thực tế, nhận tư vấn trực tiếp từ nhân viên và thanh toán dễ dàng tại quầy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/phone" className="bg-sky-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-700 transition-all duration-200 shadow-md hover:shadow-sky-500/10">Tìm cửa hàng gần nhất</Link>
                <Link href="/phone" className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200">Xem chính sách đặt mua</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
