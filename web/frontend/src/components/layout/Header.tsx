'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, Phone, User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function Header() {
  const { user, isLoggedIn, logout } = useAuthStore();

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold tracking-tight shrink-0">
            PhoneStore
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input
              type="text"
              placeholder="Hôm nay bạn cần tìm gì?"
              className="w-full pl-4 pr-10 py-2.5 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link href="/cart" className="flex items-center space-x-2 hover:text-blue-100 transition-colors">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="hidden lg:block font-medium">Giỏ hàng</span>
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4 group relative cursor-pointer">
                <div className="flex items-center space-x-2">
                  <User className="w-6 h-6" />
                  <span className="hidden lg:block font-medium truncate max-w-[100px]">
                    {user?.hoTen || 'Tài khoản'}
                  </span>
                </div>
                
                {/* Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user?.hoTen}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Tài khoản của tôi</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Đơn hàng</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                    <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors font-medium">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Menu (Desktop) */}
        <div className="hidden lg:flex items-center h-12 space-x-8 text-sm font-medium">
          <div className="relative group h-full flex items-center cursor-pointer">
            <div className="flex items-center space-x-2 bg-blue-700 px-4 h-full">
              <Menu className="w-5 h-5" />
              <span>DANH MỤC</span>
            </div>
            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-xl border border-t-0 border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <ul className="py-2 text-slate-700">
                <li className="px-4 py-3 hover:bg-slate-50 hover:text-blue-600 flex items-center cursor-pointer transition-colors">
                  <Phone className="w-5 h-5 mr-3" />
                  Điện thoại
                </li>
                {/* Disabled items */}
                <li className="px-4 py-3 opacity-50 cursor-not-allowed flex items-center" title="Sắp ra mắt">
                  Laptop (Sắp ra mắt)
                </li>
                <li className="px-4 py-3 opacity-50 cursor-not-allowed flex items-center" title="Sắp ra mắt">
                  Phụ kiện (Sắp ra mắt)
                </li>
              </ul>
            </div>
          </div>
          
          <Link href="/phone?hang=Apple" className="hover:text-yellow-400 transition-colors">iPhone</Link>
          <Link href="/phone?hang=Samsung" className="hover:text-yellow-400 transition-colors">Samsung</Link>
          <Link href="/phone?hang=Xiaomi" className="hover:text-yellow-400 transition-colors">Xiaomi</Link>
          <Link href="/phone?hang=OPPO" className="hover:text-yellow-400 transition-colors">OPPO</Link>
        </div>
      </div>
    </header>
  );
}
