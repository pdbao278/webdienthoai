'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useEffect } from 'react';

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
    <header className="bg-white/85 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[100]">
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-[70px]">
            {/* Logo */}
            <Link href="/" className="font-[Outfit] text-2xl font-bold text-sky-600 flex items-center gap-2">
                <i className="fa-solid fa-mobile-screen-button"></i>
                <span>PhoneStore</span>
            </Link>

            {/* Search Autocomplete */}
            <div className="relative w-full max-w-[450px] hidden md:block">
                <input type="text" className="w-full h-[42px] pl-10 pr-4 bg-slate-100 border border-slate-200 rounded-full text-sm text-slate-800 transition-all focus:bg-white focus:border-sky-600 focus:ring-[3px] focus:ring-sky-600/10 outline-none" placeholder="Tìm kiếm hãng, tên điện thoại, chip xử lý..." />
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-6">
                <Link href="/cart" className="flex items-center gap-2 text-slate-800 font-medium text-sm px-3 py-2 rounded-xl transition-all hover:bg-black/5">
                    <i className="fa-solid fa-basket-shopping text-lg text-slate-500"></i>
                    <span className="hidden lg:inline">Giỏ Hàng</span>
                    <span className="bg-sky-600 text-white text-[12px] px-1.5 py-0.5 rounded-full font-semibold">{cartCount}</span>
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link href="/orders" className="flex items-center gap-2 text-slate-800 font-medium text-sm px-3 py-2 rounded-xl transition-all hover:bg-black/5 hidden sm:flex">
                        <i className="fa-solid fa-receipt text-lg text-slate-500"></i>
                        <span className="hidden lg:inline">Đơn Hàng</span>
                    </Link>
                    <div className="relative group cursor-pointer">
                      <div className="flex items-center gap-2 text-slate-800 font-medium text-sm px-3 py-2 rounded-xl transition-all hover:bg-black/5">
                        <i className="fa-regular fa-user text-lg text-slate-500"></i>
                        <span className="hidden lg:inline truncate max-w-[120px]">{user?.hoTen || 'Tài khoản'}</span>
                      </div>
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                        <div className="px-4 py-2 border-b border-slate-100 mb-1">
                          <p className="text-sm font-semibold text-slate-800 truncate">{user?.hoTen}</p>
                          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                        <Link href="/orders" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 sm:hidden">Đơn hàng</Link>
                        {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
                          <Link href="/admin" className="block px-4 py-2 text-sm text-sky-600 font-medium hover:bg-sky-50">
                            <i className="fa-solid fa-shield-halved w-5"></i> Quản trị
                          </Link>
                        )}
                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                          <i className="fa-solid fa-right-from-bracket mr-2"></i> Đăng xuất
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 text-slate-800 font-medium text-sm px-3 py-2 rounded-xl transition-all hover:bg-black/5">
                      <i className="fa-regular fa-user text-lg text-slate-500"></i>
                      <span className="hidden lg:inline">Đăng nhập</span>
                  </Link>
                )}
            </div>
        </div>
    </header>
  );
}
