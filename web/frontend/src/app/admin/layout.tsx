'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import AdminGuard from '@/components/layout/AdminGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const menu = [
    { name: 'Tổng quan', href: '/admin', icon: 'fa-solid fa-chart-line', roles: ['ADMIN'] },
    { name: 'Đơn hàng', href: '/admin/orders', icon: 'fa-solid fa-clipboard-list', roles: ['ADMIN', 'MANAGER'] },
    { name: 'Sản phẩm', href: '/admin/products', icon: 'fa-solid fa-box', roles: ['ADMIN'] },
    { name: 'Khuyến mãi', href: '/admin/vouchers', icon: 'fa-solid fa-ticket', roles: ['ADMIN'] },
    { name: 'Người dùng', href: '/admin/users', icon: 'fa-solid fa-users', roles: ['ADMIN'] },
  ].filter(item => item.roles.includes(user?.role as string));

  return (
    <AdminGuard>
      <div className="flex h-screen bg-slate-50 text-slate-800">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <Link href="/admin" className="text-xl font-bold text-sky-600">PhoneStore Admin</Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {menu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-sky-50 text-sky-600 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <i className={`${item.icon} w-5`}></i>
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold uppercase">
                {user?.hoTen?.charAt(0) || user?.email?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{user?.hoTen || 'Admin'}</p>
                <p className="text-xs text-slate-500 truncate">{user?.role}</p>
              </div>
            </div>
            <button onClick={() => { logout(); router.push('/login'); }} className="w-full mt-2 flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
              <i className="fa-solid fa-arrow-right-from-bracket w-5"></i>
              Đăng xuất
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
            <h2 className="text-lg font-semibold text-slate-800">
              {menu.find(m => m.href === pathname)?.name || 'Trang Quản Trị'}
            </h2>
            <div className="flex-1 max-w-md mx-8 hidden sm:block">
              <div className="relative">
                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="text" 
                  placeholder="Tìm kiếm nhanh..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" 
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
               <Link href="/" className="text-sm text-slate-500 hover:text-sky-600 flex items-center gap-2 transition-colors">
                 <i className="fa-solid fa-store"></i> Xem cửa hàng
               </Link>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
