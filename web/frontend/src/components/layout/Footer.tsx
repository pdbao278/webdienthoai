import Link from 'next/link';
import { Home, Search, ShoppingCart, User } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100/80 border-t border-slate-200/60 pt-14 mt-16">
          <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-10">
              <div>
                  <div className="font-[var(--font-outfit)] text-xl font-bold text-sky-600 mb-4 flex items-center gap-2.5">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                      PhoneStore
                  </div>
                  <p className="text-sm text-slate-500 max-w-[340px] mb-6 leading-relaxed">
                    Hệ thống phân phối điện thoại di động chính hãng theo mô hình Click & Collect. Mang lại trải nghiệm tối giản và thuận tiện nhất.
                  </p>
              </div>
              <div>
                  <h4 className="font-[var(--font-outfit)] text-sm font-bold text-slate-800 mb-4">Chính Sách</h4>
                  <ul className="flex flex-col gap-3">
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors duration-200">Chính sách bảo hành</Link></li>
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors duration-200">Quy trình Click & Collect</Link></li>
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors duration-200">Bảo mật thông tin</Link></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-[var(--font-outfit)] text-sm font-bold text-slate-800 mb-4">Hỗ Trợ</h4>
                  <ul className="flex flex-col gap-3">
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors duration-200">Hotline: 1800.xxxx (Miễn phí)</Link></li>
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors duration-200">Đóng góp ý kiến</Link></li>
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors duration-200">Hệ thống cửa hàng</Link></li>
                  </ul>
              </div>
          </div>
          <div className="container mx-auto px-4 lg:px-6 border-t border-slate-200/60 py-6 text-center text-xs text-slate-400">
              <p>&copy; 2026 PhoneStore. Thiết kế theo triết lý Soft & Clean.</p>
          </div>
      </footer>

      {/* Mobile Navigation Sticky Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/60 h-[60px] z-[var(--z-sticky)] md:hidden" aria-label="Mobile navigation">
          <div className="flex items-center justify-around h-full">
              <Link href="/" className="flex flex-col items-center gap-1 text-sky-600 text-[11px] font-medium">
                  <Home size={22} strokeWidth={1.8} />
                  <span>Trang Chủ</span>
              </Link>
              <Link href="/phone" className="flex flex-col items-center gap-1 text-slate-500 text-[11px] font-medium">
                  <Search size={22} strokeWidth={1.8} />
                  <span>Tìm Kiếm</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center gap-1 text-slate-500 text-[11px] font-medium">
                  <ShoppingCart size={22} strokeWidth={1.8} />
                  <span>Giỏ Hàng</span>
              </Link>
              <Link href="/login" className="flex flex-col items-center gap-1 text-slate-500 text-[11px] font-medium">
                  <User size={22} strokeWidth={1.8} />
                  <span>Tài Khoản</span>
              </Link>
          </div>
      </nav>
    </>
  );
}
