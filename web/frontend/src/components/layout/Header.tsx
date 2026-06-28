'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useEffect } from 'react';
import { Search, ShoppingCart, Receipt, ShieldCheck, User, LogOut } from 'lucide-react';

export default function Header() {
  const { user, isLoggedIn, logout } = useAuthStore();
  const { items, fetchCart } = useCartStore();

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn, fetchCart]);

  const cartCount = items.reduce((acc, item) => acc + item.soLuong, 0);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-[var(--z-sticky)]">
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href="/" className="font-[var(--font-outfit)] text-2xl font-bold text-sky-600 flex items-center gap-2.5 tracking-tight">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                <span>PhoneStore</span>
            </Link>

            {/* Search Autocomplete */}
            <form 
              className="relative w-full max-w-[320px] hidden md:block" 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem('q') as HTMLInputElement;
                if (input.value.trim()) {
                  window.location.href = `/phone?q=${encodeURIComponent(input.value.trim())}`;
                } else {
                  window.location.href = '/phone';
                }
              }}
            >
                <input 
                  type="text" 
                  name="q"
                  className="w-full h-[42px] pl-10 pr-4 bg-slate-100/80 border border-slate-200/60 rounded-full text-sm text-slate-800 transition-all duration-300 ease-[var(--ease-out-expo)] focus:bg-white focus:border-sky-500 focus:ring-[3px] focus:ring-sky-500/10 outline-none placeholder:text-slate-400" 
                  placeholder="Tìm kiếm hãng, tên điện thoại, chip xử lý..." 
                />
                <button type="submit" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600 transition-colors">
                  <Search size={16} strokeWidth={2} />
                </button>
            </form>

            {/* Header Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
                <Link href="/cart" className="flex items-center gap-2 text-slate-700 font-medium text-sm px-3 py-2 rounded-xl transition-all duration-200 hover:bg-slate-100 active:scale-[0.97] flex-shrink-0">
                    <ShoppingCart size={20} strokeWidth={1.8} className="text-slate-500" />
                    <span className="hidden lg:inline whitespace-nowrap">Giỏ Hàng</span>
                    <span className="bg-sky-600 text-white text-[11px] min-w-[20px] h-5 px-1.5 rounded-full font-semibold inline-flex items-center justify-center tabular-nums">{cartCount}</span>
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link href="/orders" className="flex items-center gap-2 text-slate-700 font-medium text-sm px-3 py-2 rounded-xl transition-all duration-200 hover:bg-slate-100 active:scale-[0.97] hidden sm:flex flex-shrink-0">
                        <Receipt size={20} strokeWidth={1.8} className="text-slate-500" />
                        <span className="hidden lg:inline whitespace-nowrap">Đơn Hàng</span>
                    </Link>
                    {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
                      <Link href="/admin" className="flex items-center gap-2 text-sky-600 font-semibold text-sm px-3 py-2 rounded-xl transition-all duration-200 hover:bg-sky-50 active:scale-[0.97] flex-shrink-0">
                        <ShieldCheck size={20} strokeWidth={1.8} />
                        <span className="hidden lg:inline whitespace-nowrap">Quản trị</span>
                      </Link>
                    )}
                    <div className="relative group cursor-pointer flex-shrink-0">
                      <div className="flex items-center gap-2 text-slate-700 font-medium text-sm px-3 py-2 rounded-xl transition-all duration-200 hover:bg-slate-100">
                        <User size={20} strokeWidth={1.8} className="text-slate-500" />
                        <span className="hidden lg:inline truncate max-w-[120px] whitespace-nowrap">{user?.hoTen || 'Tài khoản'}</span>
                      </div>
                      <div className="absolute top-full right-0 mt-1.5 w-52 bg-white rounded-xl shadow-dropdown border border-slate-100/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-[var(--ease-out-expo)] py-1.5 translate-y-1 group-hover:translate-y-0">
                        <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                          <p className="text-sm font-semibold text-slate-800 truncate">{user?.hoTen}</p>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{user?.email}</p>
                        </div>
                        <Link href="/orders" className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 sm:hidden transition-colors">
                          <Receipt size={16} strokeWidth={1.8} className="text-slate-400" /> Đơn hàng
                        </Link>

                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors">
                          <LogOut size={16} strokeWidth={1.8} /> Đăng xuất
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 text-slate-700 font-medium text-sm px-3 py-2 rounded-xl transition-all duration-200 hover:bg-slate-100 active:scale-[0.97] flex-shrink-0">
                      <User size={20} strokeWidth={1.8} className="text-slate-500" />
                      <span className="hidden lg:inline whitespace-nowrap">Đăng nhập</span>
                  </Link>
                )}
            </div>
        </div>
    </header>
  );
}
