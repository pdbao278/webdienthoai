import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold tracking-tight mb-4">PhoneStore</h3>
          <p className="text-sm leading-relaxed mb-4">
            Hệ thống bán lẻ điện thoại di động chính hãng uy tín nhất. Trải nghiệm mô hình Click & Collect siêu tốc.
          </p>
          <p className="text-sm font-medium">Hotline: 1900 1234</p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Danh mục</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/phone?hang=Apple" className="hover:text-white transition-colors">Điện thoại iPhone</Link></li>
            <li><Link href="/phone?hang=Samsung" className="hover:text-white transition-colors">Điện thoại Samsung</Link></li>
            <li><Link href="/phone?hang=Xiaomi" className="hover:text-white transition-colors">Điện thoại Xiaomi</Link></li>
            <li><Link href="/phone?hang=OPPO" className="hover:text-white transition-colors">Điện thoại OPPO</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Chính sách</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn mua hàng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Bảo mật thông tin</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Kết nối với chúng tôi</h4>
          <p className="text-sm mb-4">Đăng ký nhận tin khuyến mãi</p>
          <div className="flex">
            <input type="email" placeholder="Email của bạn" className="px-4 py-2 bg-slate-800 rounded-l-lg outline-none focus:ring-1 focus:ring-blue-500 w-full" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">Gửi</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} PhoneStore. All rights reserved.
      </div>
    </footer>
  );
}
