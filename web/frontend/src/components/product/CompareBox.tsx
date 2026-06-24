import Link from 'next/link';

export default function CompareBox() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white mt-12 mb-12 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-4">Bạn phân vân chưa biết chọn máy nào?</h3>
          <p className="text-blue-100 text-lg mb-6 leading-relaxed">
            Sử dụng tính năng so sánh trực quan của PhoneStore để đưa ra quyết định mua sắm thông minh nhất.
          </p>
          <Link href="/compare">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
              So sánh ngay
            </button>
          </Link>
        </div>
        
        <div className="hidden md:flex justify-center items-center space-x-4">
          <div className="w-32 h-40 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-xl rotate-[-5deg]">
            <span className="text-white font-bold opacity-50">Máy A</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xl shadow-lg z-10">
            VS
          </div>
          <div className="w-32 h-40 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-xl rotate-[5deg]">
            <span className="text-white font-bold opacity-50">Máy B</span>
          </div>
        </div>
      </div>
    </div>
  );
}
