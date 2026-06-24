import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import FilterBar from '@/components/product/FilterBar';
import { Suspense } from 'react';
import Link from 'next/link';

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
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Điện thoại di động</h1>
          
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
              
              {/* Simple Pagination Mock */}
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
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
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
