'use client';

import { useState, useEffect } from 'react';

interface ProductSpecsProps {
  product: any;
  variant: any;
}

export default function ProductSpecs({ product, variant }: ProductSpecsProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getSpecValue = (val: any, suffix = '') => {
    if (val === null || val === undefined || val === '') return 'Chưa cập nhật';
    if (typeof val === 'boolean') return val ? 'Có' : 'Không';
    return `${val}${suffix}`;
  };

  const summarySpecs = [
    { label: 'Màn hình', value: `${getSpecValue(product.manHinhCongNghe)} / ${getSpecValue(product.manHinhKichThuoc, ' inch')}` },
    { label: 'Hệ điều hành', value: getSpecValue(product.heDieuHanh) },
    { label: 'Chipset (CPU)', value: getSpecValue(product.chip) },
    { label: 'RAM', value: `${variant?.ramGb || '?'} GB` },
    { label: 'Bộ nhớ trong', value: `${variant?.dungLuongGb || '?'} GB` },
    { label: 'Camera sau', value: getSpecValue(product.cameraSau) },
    { label: 'Camera trước', value: getSpecValue(product.cameraTruoc) },
    { label: 'Pin & Sạc', value: `${getSpecValue(product.pinMah, ' mAh')} / ${getSpecValue(product.sacNhanhW, ' W')}` },
  ];

  const allSpecs = [
    {
      group: 'Màn hình',
      items: [
        { label: 'Công nghệ màn hình', value: getSpecValue(product.manHinhCongNghe) },
        { label: 'Kích thước màn hình', value: getSpecValue(product.manHinhKichThuoc, ' inch') },
        { label: 'Độ phân giải', value: getSpecValue(product.manHinhDoPhanGiai) },
        { label: 'Tần số quét', value: getSpecValue(product.manHinhTanSoQuet, ' Hz') },
      ]
    },
    {
      group: 'Camera',
      items: [
        { label: 'Camera sau', value: getSpecValue(product.cameraSau) },
        { label: 'Tính năng camera sau', value: getSpecValue(product.cameraSauTinhNang) },
        { label: 'Camera trước', value: getSpecValue(product.cameraTruoc) },
      ]
    },
    {
      group: 'Vi xử lý & Đồ họa',
      items: [
        { label: 'Chipset (CPU)', value: getSpecValue(product.chip) },
        { label: 'Hệ điều hành', value: getSpecValue(product.heDieuHanh) },
      ]
    },
    {
      group: 'Bộ nhớ',
      items: [
        { label: 'Dung lượng RAM', value: `${variant?.ramGb || '?'} GB` },
        { label: 'Bộ nhớ trong', value: `${variant?.dungLuongGb || '?'} GB` },
      ]
    },
    {
      group: 'Pin & Sạc',
      items: [
        { label: 'Dung lượng Pin', value: getSpecValue(product.pinMah, ' mAh') },
        { label: 'Công nghệ sạc nhanh', value: getSpecValue(product.sacNhanhW, ' W') },
      ]
    },
    {
      group: 'Kết nối & Tiện ích',
      items: [
        { label: 'Hỗ trợ 5G', value: getSpecValue(product.hoTro5g) },
        { label: 'Hỗ trợ NFC', value: getSpecValue(product.nfc) },
        { label: 'Thẻ SIM', value: getSpecValue(product.sim) },
        { label: 'Tiêu chuẩn chống nước', value: getSpecValue(product.chongNuoc) },
      ]
    },
    {
      group: 'Thiết kế',
      items: [
        { label: 'Trọng lượng', value: getSpecValue(product.trongLuongG, ' g') },
      ]
    }
  ];

  return (
    <>
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-5">Thông số kỹ thuật</h3>
        <div className="divide-y divide-slate-100 text-sm">
          {summarySpecs.map((spec, idx) => (
            <div key={idx} className="flex justify-between py-3">
              <span className="text-slate-500 w-1/3 font-medium">{spec.label}</span>
              <span className="text-slate-800 w-2/3 font-semibold text-right md:text-left line-clamp-2">{spec.value}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full mt-5 py-3 border border-blue-100 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50/50 hover:border-blue-200 transition-all text-sm flex items-center justify-center gap-2"
        >
          <span>Xem cấu hình chi tiết</span>
          <i className="fa-solid fa-chevron-right text-xs"></i>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Thông số kỹ thuật chi tiết</h3>
                <p className="text-slate-500 text-xs mt-0.5">{product.sanPham}</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-slate-100">
              {allSpecs.map((group, gIdx) => (
                <div key={gIdx} className={`${gIdx > 0 ? 'pt-6' : ''}`}>
                  <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2 text-sky-600">
                    <span className="w-1.5 h-4 bg-sky-500 rounded-full"></span>
                    {group.group}
                  </h4>
                  <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                    {group.items.map((item, iIdx) => (
                      <div 
                        key={iIdx} 
                        className={`flex p-3.5 text-sm border-b border-slate-100 last:border-0 ${
                          iIdx % 2 === 0 ? 'bg-slate-50/40' : 'bg-white'
                        }`}
                      >
                        <span className="w-2/5 text-slate-500 font-medium">{item.label}</span>
                        <span className="w-3/5 text-slate-800 font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50/50">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold text-sm transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
