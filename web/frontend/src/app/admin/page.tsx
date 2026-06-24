'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/admin/stats` : 'http://localhost:3001/api/admin/stats';
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Không thể tải dữ liệu thống kê');
        const data = await res.json();
        setStats(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchStats();
  }, [token]);

  if (isLoading) {
    return <div className="flex justify-center p-10"><i className="fa-solid fa-spinner fa-spin text-2xl text-sky-500"></i></div>;
  }

  if (!stats) return null;

  const maxRevenue = Math.max(...(stats.revenueChartData?.map((d: any) => d.value) || [0]), 1);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Tổng quan hệ thống</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center text-xl mb-2">
            <i className="fa-solid fa-wallet"></i>
          </div>
          <p className="text-slate-500 text-sm font-medium">Tổng Doanh Thu</p>
          <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(stats.totalRevenue)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-xl mb-2">
            <i className="fa-solid fa-box-open"></i>
          </div>
          <p className="text-slate-500 text-sm font-medium">Đơn Hoàn Thành</p>
          <h3 className="text-2xl font-bold text-slate-800">{stats.totalOrders}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
          <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center text-xl mb-2">
            <i className="fa-solid fa-mobile-screen"></i>
          </div>
          <p className="text-slate-500 text-sm font-medium">Sản Phẩm Đang Bán</p>
          <h3 className="text-2xl font-bold text-slate-800">{stats.totalProducts}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center text-xl mb-2">
            <i className="fa-solid fa-users"></i>
          </div>
          <p className="text-slate-500 text-sm font-medium">Khách Hàng</p>
          <h3 className="text-2xl font-bold text-slate-800">{stats.totalUsers}</h3>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Doanh thu 7 ngày gần nhất</h3>
        
        <div className="h-64 flex items-end justify-between gap-2">
          {stats.revenueChartData.map((d: any, index: number) => {
            const heightPercent = (d.value / maxRevenue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div 
                  className="w-full bg-sky-500 rounded-t-md transition-all duration-500 hover:bg-sky-400 relative"
                  style={{ height: `${heightPercent}%`, minHeight: '4px' }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {formatCurrency(d.value)}
                  </div>
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap hidden sm:block">
                  {d.date.substring(0, 5)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
