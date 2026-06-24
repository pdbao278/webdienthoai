import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import { Button } from '@/components/ui/Button';
import ProductInteractiveSection from '@/components/product/ProductInteractiveSection';
import ProductReviews from '@/components/product/ProductReviews';
import CompareWidget from '@/components/product/CompareWidget';
import ProductDescription from '@/components/product/ProductDescription';

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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm text-slate-500 mb-5 flex items-center space-x-2">
          <a href="/" className="hover:text-blue-600">Trang chủ</a>
          <span>/</span>
          <a href="/phone" className="hover:text-blue-600">Điện thoại</a>
          <span>/</span>
          <a href={`/phone?hang=${product.hang}`} className="hover:text-blue-600">{product.hang}</a>
          <span>/</span>
          <span className="text-slate-800 font-medium">{product.sanPham}</span>
        </nav>

        {/* Product Title Section mimicking TGDD */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">{product.sanPham}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              <div className="flex items-center text-amber-400">
                <i className="fa-solid fa-star mr-1"></i>
                <span className="text-slate-700 font-bold">4.8</span>
                <span className="mx-1">/ 5</span>
                <span className="text-slate-400 ml-1">(24 đánh giá)</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center text-sky-600 font-semibold cursor-pointer hover:underline">
                <i className="fa-solid fa-circle-plus mr-1"></i> So sánh cấu hình
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

          {/* Right Column: Info & Action */}
          <div className="lg:col-span-5">
            <ProductInteractiveSection product={product} variants={product.variants} minVariant={minVariant} />
          </div>
        </div>

        <CompareWidget currentProduct={product} />

        <ProductReviews slug={product.slug} />
      </main>

      <Footer />
    </div>
  );
}
