'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { formatCurrency } from '@/lib/utils';
import { authFetch } from '@/lib/api';
import toast from 'react-hot-toast';
import { Loader2, Wallet, PackageOpen, Smartphone, Users } from 'lucide-react';

interface StatsData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueChartData: { date: string; value: number }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await authFetch('/admin/stats', token!);
        if (!res.ok) throw new Error('Không thể tải dữ liệu thống kê');
        const data = await res.json();
        setStats(data);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Lỗi tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchStats();
  }, [token]);

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-sky-500" size={32} /></div>;
  }

  if (!stats) return null;

  const maxRevenue = Math.max(...(stats.revenueChartData?.map((d) => d.value) || [0]), 1);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">Tổng quan hệ thống</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-card border border-slate-200/60 flex flex-col gap-3 hover:shadow-elevated transition-shadow duration-300 group">
          <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <Wallet size={24} strokeWidth={2} />
          </div>
          <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Tổng Doanh Thu</p>
          <h3 className="text-2xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">{formatCurrency(stats.totalRevenue)}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-slate-200/60 flex flex-col gap-3 hover:shadow-elevated transition-shadow duration-300 group">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <PackageOpen size={24} strokeWidth={2} />
          </div>
          <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Đơn Hoàn Thành</p>
          <h3 className="text-2xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">{stats.totalOrders}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-slate-200/60 flex flex-col gap-3 hover:shadow-elevated transition-shadow duration-300 group">
          <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <Smartphone size={24} strokeWidth={2} />
          </div>
          <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Sản Phẩm Đang Bán</p>
          <h3 className="text-2xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">{stats.totalProducts}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card border border-slate-200/60 flex flex-col gap-3 hover:shadow-elevated transition-shadow duration-300 group">
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <Users size={24} strokeWidth={2} />
          </div>
          <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Khách Hàng</p>
          <h3 className="text-2xl font-[var(--font-outfit)] font-bold text-slate-800 tracking-tight">{stats.totalUsers}</h3>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-8 rounded-3xl shadow-card border border-slate-200/60">
        <h3 className="text-lg font-bold text-slate-800 mb-8 tracking-tight">Doanh thu 7 ngày gần nhất</h3>
        
        <div className="h-72 flex items-end justify-between gap-3">
          {stats.revenueChartData.map((d, index) => {
            const heightPercent = (d.value / maxRevenue) * 100;
            return (
               <div key={index} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end">
                <div 
                  className="w-full bg-sky-500/80 rounded-t-xl transition-all duration-500 group-hover:bg-sky-500 relative cursor-pointer"
                  style={{ height: `${heightPercent}%`, minHeight: '6px' }}
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm z-10">
                    {formatCurrency(d.value)}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap hidden sm:block">
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
