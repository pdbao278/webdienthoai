import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const getStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // 1. Tổng đơn hàng đã hoàn thành
    const completedOrders = await prisma.order.findMany({
      where: { trangThai: 'HOAN_THANH' },
      select: { thanhTien: true, createdAt: true }
    });

    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.thanhTien, 0);
    const totalOrders = completedOrders.length;

    // 2. Doanh thu 7 ngày gần nhất
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const recentOrders = completedOrders.filter(o => new Date(o.createdAt) >= sevenDaysAgo);

    const revenueByDay: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      revenueByDay[d.toLocaleDateString('vi-VN')] = 0;
    }

    recentOrders.forEach(o => {
      const dateStr = new Date(o.createdAt).toLocaleDateString('vi-VN');
      if (revenueByDay[dateStr] !== undefined) {
        revenueByDay[dateStr] += o.thanhTien;
      }
    });

    const revenueChartData = Object.entries(revenueByDay).map(([date, value]) => ({ date, value }));

    // 3. Tổng số sản phẩm đang bán
    const totalProducts = await prisma.product.count();

    // 4. Tổng người dùng
    const totalUsers = await prisma.user.count({
      where: { role: 'CUSTOMER' }
    });

    res.status(200).json({
      totalRevenue,
      totalOrders,
      totalProducts,
      totalUsers,
      revenueChartData
    });

  } catch (error) {
    console.error('getStats Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};
