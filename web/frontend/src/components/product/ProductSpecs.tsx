export default function ProductSpecs({ product }: { product: any }) {
  const specs = [
    { label: 'Hãng sản xuất', value: product.hang },
    { label: 'Dung lượng RAM', value: `${product.ramGb} GB` },
    { label: 'Bộ nhớ trong', value: `${product.dungLuongGb} GB` },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mt-8">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Thông số kỹ thuật</h3>
      <div className="space-y-0">
        {specs.map((spec, idx) => (
          <div key={idx} className={`flex items-center justify-between p-4 rounded-xl ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
            <span className="text-slate-500 font-medium">{spec.label}</span>
            <span className="text-slate-800 font-semibold">{spec.value}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-blue-600 font-medium hover:underline text-sm flex items-center justify-center">
        Xem cấu hình chi tiết <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
    </div>
  );
}
