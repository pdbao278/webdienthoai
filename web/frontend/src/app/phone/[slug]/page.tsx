import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import { Button } from '@/components/ui/Button';
import ProductInteractiveSection from '@/components/product/ProductInteractiveSection';
import ProductReviews from '@/components/product/ProductReviews';
import ProductDescription from '@/components/product/ProductDescription';
import Banner from '@/components/ui/Banner';
import dynamic from 'next/dynamic';

const CompareWidget = dynamic(() => import('@/components/product/CompareWidget'), { 
  loading: () => <div className="h-64 bg-slate-50 animate-pulse mt-12 rounded-3xl border border-slate-100"></div>
});

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    return { title: 'Sản phẩm không tồn tại | PhoneStore' };
  }

  const desc = product.moTa || `Khám phá điện thoại ${product.sanPham} chính hãng.`;
  const img = product.media?.find((m: any) => m.isThumbnail)?.url || '/placeholder.png';

  return {
    title: `${product.sanPham} | PhoneStore`,
    description: desc.length > 150 ? desc.substring(0, 147) + '...' : desc,
    openGraph: {
      title: `${product.sanPham} | PhoneStore`,
      description: desc.length > 150 ? desc.substring(0, 147) + '...' : desc,
      images: [img],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.sanPham} | PhoneStore`,
      description: desc.length > 150 ? desc.substring(0, 147) + '...' : desc,
      images: [img],
    }
  };
}

export default async function ProductDetailPage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  if (!product.variants || product.variants.length === 0) {
    return <div className="p-8 text-center">Sản phẩm chưa có cấu hình (variants).</div>;
  }

  // Find variant by short 'v' from URL or full 'sku', or default to the min price variant
  const shortV = typeof resolvedSearchParams.v === 'string' ? resolvedSearchParams.v : null;
  const skuParam = typeof resolvedSearchParams.sku === 'string' ? resolvedSearchParams.sku : null;
  const targetSku = shortV ? `${product.slug}-${shortV}` : skuParam;
  
  let minVariant = targetSku ? product.variants.find((v: any) => v.sku === targetSku) : null;
  
  if (!minVariant) {
    minVariant = product.variants.reduce(
      (prev: any, curr: any) => (prev.giaBan < curr.giaBan ? prev : curr),
      product.variants[0]
    );
  }

  const reviews = product.reviews || [];
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0
    ? (reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / reviewCount).toFixed(1)
    : '5.0';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.sanPham,
              image: product.media?.find((m: any) => m.isThumbnail)?.url || undefined,
              description: product.moTa || undefined,
              brand: {
                "@type": "Brand",
                name: product.hang
              },
              sku: product.slug,
              offers: {
                "@type": "Offer",
                url: `https://phonestore.com/phone/${product.slug}`,
                priceCurrency: "VND",
                price: minVariant.giaBan,
                availability: "https://schema.org/InStock"
              }
            }).replace(/</g, '\\u003c')
          }}
        />

        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm text-slate-500 mb-5 flex items-center space-x-2">
          <a href="/" className="hover:text-sky-600 transition-colors">Trang chủ</a>
          <span>/</span>
          <a href="/phone" className="hover:text-sky-600 transition-colors">Điện thoại</a>
          <span>/</span>
          <a href={`/phone?hang=${product.hang}`} className="hover:text-sky-600 transition-colors">{product.hang}</a>
          <span>/</span>
          <span className="text-slate-800 font-medium">{product.sanPham}</span>
        </nav>

        {/* Product Title Section mimicking TGDD */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/60 pb-4 mb-6 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">{product.sanPham}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              <div className="flex items-center text-amber-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span className="text-slate-700 font-bold">{averageRating}</span>
                <span className="mx-1">/ 5</span>
                <span className="text-slate-400 ml-1">({reviewCount} đánh giá)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Gallery, Specs, Description */}
          <div className="lg:col-span-7 space-y-6">
            <ProductGallery media={product.media} />
            <ProductDescription moTa={product.moTa} />
            <ProductSpecs product={product} variant={minVariant} />
          </div>

          {/* Right Column: Info & Action & Reviews */}
          <div className="lg:col-span-5 space-y-6">
            <ProductInteractiveSection product={product} variants={product.variants} minVariant={minVariant} />
            <ProductReviews slug={product.slug} />
          </div>
        </div>

        {/* Promotional Banner */}
        <section className="mt-12">
          <Banner 
            title="Sắm Siêu Phẩm - Tặng Quà Khủng" 
            description="Tặng ngay tai nghe không dây hoặc ốp lưng MagSafe khi mua các dòng điện thoại cao cấp. Trả góp 0%." 
            ctaText="Tìm hiểu ngay" 
            href="/chinh-sach-tra-gop"
            badge="Ưu đãi Đặc quyền"
            variant="secondary"
          />
        </section>

        <CompareWidget currentProduct={product} />
      </main>

      <Footer />
    </div>
  );
}
