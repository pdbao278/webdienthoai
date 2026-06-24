import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 border-t border-slate-200 pt-12 mt-12">
          <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-8">
              <div>
                  <div className="font-[Outfit] text-xl font-bold text-sky-600 mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-mobile-screen-button"></i> PhoneStore
                  </div>
                  <p className="text-sm text-slate-500 max-w-[320px] mb-6">
                    Hệ thống phân phối điện thoại di động chính hãng theo mô hình Click & Collect. Mang lại trải nghiệm tối giản và thuận tiện nhất.
                  </p>
              </div>
              <div>
                  <h4 className="font-[Outfit] text-sm font-bold text-slate-800 mb-4">Chính Sách</h4>
                  <ul className="flex flex-col gap-3">
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Chính sách bảo hành</Link></li>
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Quy trình Click & Collect</Link></li>
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Bảo mật thông tin</Link></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-[Outfit] text-sm font-bold text-slate-800 mb-4">Hỗ Trợ</h4>
                  <ul className="flex flex-col gap-3">
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Hotline: 1800.xxxx (Miễn phí)</Link></li>
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Đóng góp ý kiến</Link></li>
                      <li><Link href="#" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Hệ thống cửa hàng</Link></li>
                  </ul>
              </div>
          </div>
          <div className="container mx-auto px-4 lg:px-6 border-t border-slate-200 py-6 text-center text-xs text-slate-500">
              <p>&copy; 2026 PhoneStore. Thiết kế bởi Antigravity (AI Assistant) theo triết lý Soft & Clean.</p>
          </div>
      </footer>

      {/* Mobile Navigation Sticky Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/92 backdrop-blur-md border-t border-slate-200 h-[60px] z-[99] md:hidden">
          <div className="flex items-center justify-around h-full">
              <Link href="/" className="flex flex-col items-center gap-1 text-sky-600 text-[11px] font-medium">
                  <i className="fa-solid fa-house text-xl"></i>
                  <span>Trang Chủ</span>
              </Link>
              <Link href="#" className="flex flex-col items-center gap-1 text-slate-500 text-[11px] font-medium">
                  <i className="fa-solid fa-magnifying-glass text-xl"></i>
                  <span>Tìm Kiếm</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center gap-1 text-slate-500 text-[11px] font-medium">
                  <i className="fa-solid fa-basket-shopping text-xl"></i>
                  <span>Giỏ Hàng</span>
              </Link>
              <Link href="/login" className="flex flex-col items-center gap-1 text-slate-500 text-[11px] font-medium">
                  <i className="fa-solid fa-user text-xl"></i>
                  <span>Tài Khoản</span>
              </Link>
          </div>
      </nav>
    </>
  );
}
