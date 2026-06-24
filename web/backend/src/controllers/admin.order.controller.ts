import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';
import {
  updateOrderStatusSchema,
  scanOrderQrSchema,
  VALID_ORDER_TRANSITIONS,
} from '@phonestore/shared';

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const status = req.query.status as string | undefined;
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const whereClause: Record<string, unknown> = {};
    if (status) {
      // Validate status enum
      const parsed = updateOrderStatusSchema.shape.status.safeParse(status);
      if (parsed.success) {
        whereClause.trangThai = parsed.data;
      }
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        include: {
          user: { select: { hoTen: true, email: true, sdt: true } },
          items: {
            include: {
              productVariant: {
                select: { dungLuongGb: true, mauSac: true, product: { select: { sanPham: true } } }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.order.count({ where: whereClause }),
    ]);

    res.status(200).json({ data: orders, total, page, limit });
  } catch (error) {
    console.error('getOrders Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Validate input với Zod
    const parsed = updateOrderStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const { status: newStatus } = parsed.data;

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
      return;
    }

    // Kiểm tra máy trạng thái — chỉ cho phép chuyển đổi hợp lệ
    const currentStatus = order.trangThai;
    const allowedNext = VALID_ORDER_TRANSITIONS[currentStatus] || [];
    if (!allowedNext.includes(newStatus)) {
      res.status(400).json({
        error: `Không thể chuyển từ trạng thái "${currentStatus}" sang "${newStatus}". Cho phép: ${allowedNext.join(', ') || 'không có'}`
      });
      return;
    }

    const updatedOrder = await prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({
        where: { id },
        data: { trangThai: newStatus as any }
      });

      await tx.orderActivityLog.create({
        data: {
          orderId: id,
          hanhDong: `Cập nhật trạng thái: ${currentStatus} → ${newStatus}`,
          nguoiThucHienId: userId
        }
      });

      return updated;
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('updateOrderStatus Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const scanOrderQr = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Validate input với Zod
    const parsed = scanOrderQrSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const { maNhanHang } = parsed.data;

    const order = await prisma.order.findUnique({ where: { maNhanHang } });
    if (!order) {
      res.status(404).json({ error: 'Mã nhận hàng không hợp lệ hoặc đơn hàng không tồn tại' });
      return;
    }

    // Chỉ cho phép quét QR khi đơn đang ở trạng thái CHO_NHAN_HANG
    if (order.trangThai !== 'CHO_NHAN_HANG') {
      res.status(400).json({
        error: `Đơn hàng đang ở trạng thái "${order.trangThai}". Chỉ có thể quét QR hoàn thành khi ở trạng thái "CHO_NHAN_HANG".`
      });
      return;
    }

    const updatedOrder = await prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({
        where: { id: order.id },
        data: { trangThai: 'HOAN_THANH' }
      });

      await tx.orderActivityLog.create({
        data: {
          orderId: order.id,
          hanhDong: 'Hoàn thành qua quét QR tại quầy',
          nguoiThucHienId: userId
        }
      });

      return updated;
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('scanOrderQr Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};
