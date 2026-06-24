'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ComparePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [productA, setProductA] = useState<string>('');
  const [productB, setProductB] = useState<string>('');
  const [dataA, setDataA] = useState<any>(null);
  const [dataB, setDataB] = useState<any>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const res = await fetch(`${url}/products?limit=100`);
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchProduct = async (slug: string, setter: any) => {
      if (!slug) {
        setter(null);
        return;
      }
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const res = await fetch(`${url}/products/${slug}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setter(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct(productA, setDataA);
  }, [productA]);

  useEffect(() => {
    const fetchProduct = async (slug: string, setter: any) => {
      if (!slug) {
        setter(null);
        return;
      }
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const res = await fetch(`${url}/products/${slug}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setter(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct(productB, setDataB);
  }, [productB]);

  const renderSpecs = (data: any) => {
    if (!data || !data.variants || data.variants.length === 0) return null;
    const minVariant = data.variants.reduce(
      (prev: any, curr: any) => (prev.giaBan < curr.giaBan ? prev : curr),
      data.variants[0]
    );

    return (
      <div className="space-y-4 text-center mt-6 animate-fade-in">
        <img src={data.media.find((m:any) => m.isThumbnail)?.url || '/placeholder.png'} alt={data.sanPham} className="w-48 h-48 object-contain mx-auto mb-4 drop-shadow-md" />
        <h3 className="text-xl font-bold text-slate-800">{data.sanPham}</h3>
        <p className="text-2xl font-bold text-sky-600">{formatCurrency(minVariant.giaBan)}</p>
        <Link href={`/phone/${data.slug}`}>
          <Button variant="primary" className="mt-4">Xem chi tiết</Button>
        </Link>

        <div className="mt-8 space-y-4 text-sm text-slate-700 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left">
          <div className="border-b border-slate-100 pb-2">
            <span className="font-semibold text-slate-500 block">Thông tin cấu hình</span>
            <p className="line-clamp-3">{data.moTa || 'Chưa cập nhật'}</p>
          </div>
          <div className="border-b border-slate-100 pb-2">
            <span className="font-semibold text-slate-500 block">RAM tối thiểu</span>
            <p className="font-medium text-slate-900">{minVariant.ramGb} GB</p>
          </div>
          <div className="border-b border-slate-100 pb-2">
            <span className="font-semibold text-slate-500 block">ROM tối thiểu</span>
            <p className="font-medium text-slate-900">{minVariant.dungLuongGb} GB</p>
          </div>
          <div>
            <span className="font-semibold text-slate-500 block">Màu sắc</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {Array.from(new Set(data.variants.map((v:any) => v.mauSac))).map((m:any, i) => (
                <span key={i} className="px-2 py-1 bg-slate-100 rounded text-xs">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">So sánh sản phẩm</h1>
        <p className="text-center text-slate-500 mb-12">Chọn 2 sản phẩm để so sánh cấu hình chi tiết</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          
          {dataA && dataB && (
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-800 text-white items-center justify-center font-bold text-xl shadow-xl z-10 border-4 border-slate-50">
              VS
            </div>
          )}

          {/* Box A */}
          <div className="bg-white/50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-sky-500 bg-white shadow-sm"
              value={productA}
              onChange={(e) => setProductA(e.target.value)}
            >
              <option value="">-- Chọn sản phẩm 1 --</option>
              {products.map(p => (
                <option key={p.id} value={p.slug} disabled={p.slug === productB}>{p.sanPham}</option>
              ))}
            </select>
            {renderSpecs(dataA)}
          </div>

          {/* Box B */}
          <div className="bg-white/50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 bg-white shadow-sm"
              value={productB}
              onChange={(e) => setProductB(e.target.value)}
            >
              <option value="">-- Chọn sản phẩm 2 --</option>
              {products.map(p => (
                <option key={p.id} value={p.slug} disabled={p.slug === productA}>{p.sanPham}</option>
              ))}
            </select>
            {renderSpecs(dataB)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
