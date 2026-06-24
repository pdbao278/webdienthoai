import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';

export const revalidate = 60; // Revalidate every minute

async function getProducts() {
  try {
    const res = await fetch('http://localhost:3001/api/products?limit=8', { next: { revalidate: 60 } });
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
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-slate-50">
        {/* Hero Banner */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mừng Đại Lễ - Giảm Cực Lớn</h1>
            <p className="text-xl mb-8 opacity-90">Săn điện thoại xịn, giá tốt nhất thị trường.</p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Điện thoại Nổi bật</h2>
            <a href="/phone" className="text-blue-600 font-medium hover:underline">Xem tất cả &rarr;</a>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Không có sản phẩm nào
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
