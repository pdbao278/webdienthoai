'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import AdminGuard from '@/components/layout/AdminGuard';
import { LayoutDashboard, ClipboardList, Package, Ticket, Users, LogOut, Search, Store, Zap } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const menu = [
    { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard, roles: ['ADMIN'] },
    { name: 'Đơn hàng', href: '/admin/orders', icon: ClipboardList, roles: ['ADMIN', 'MANAGER'] },
    { name: 'Sản phẩm', href: '/admin/products', icon: Package, roles: ['ADMIN'] },
    { name: 'Khuyến mãi', href: '/admin/vouchers', icon: Ticket, roles: ['ADMIN'] },
    { name: 'Flash Sale', href: '/admin/flash-sales', icon: Zap, roles: ['ADMIN'] },
    { name: 'Người dùng', href: '/admin/users', icon: Users, roles: ['ADMIN'] },
  ].filter(item => item.roles.includes(user?.role as string));

  return (
    <AdminGuard>
      <div className="flex h-screen bg-slate-50 text-slate-800">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200/60 flex flex-col shadow-sm">
          <div className="h-[72px] flex items-center px-7 border-b border-slate-100 shrink-0">
            <Link href="/admin" className="text-xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center text-white">
                <Store size={18} strokeWidth={2.5} />
              </div>
              PhoneStore
            </Link>
          </div>
          <nav className="flex-1 p-5 space-y-1.5 overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Quản lý</div>
            {menu.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 active:scale-[0.98] ${isActive ? 'bg-slate-800 text-white shadow-card font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-5 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 px-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 font-bold uppercase shadow-sm">
                {user?.hoTen?.charAt(0) || user?.email?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{user?.hoTen || 'Admin'}</p>
                <p className="text-[11px] font-semibold text-slate-500 truncate uppercase tracking-wider">{user?.role}</p>
              </div>
            </div>
            <button onClick={() => { logout(); router.push('/login'); }} className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-rose-600 bg-white border border-rose-200 hover:bg-rose-50 hover:border-rose-300 rounded-xl transition-all active:scale-[0.98] shadow-sm">
              <LogOut size={16} strokeWidth={2} />
              Đăng xuất
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
            <h2 className="text-lg font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">
              {menu.find(m => m.href === pathname)?.name || 'Trang Quản Trị'}
            </h2>
            <div className="flex-1 max-w-md mx-8 hidden sm:block">
              <div className="relative group">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm nhanh..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm font-medium focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 outline-none transition-all" 
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
               <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-sky-600 flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/80 hover:bg-white transition-all active:scale-[0.98] shadow-sm">
                 <Store size={16} strokeWidth={2} /> Xem cửa hàng
               </Link>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8 bg-slate-50/50">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
