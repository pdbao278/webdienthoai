import { Response } from 'express';
import { PrismaClient, OrderStatus } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const status = req.query.status as string;
    const whereClause: any = {};
    if (status && Object.values(OrderStatus).includes(status as OrderStatus)) {
      whereClause.trangThai = status;
    }

    const orders = await prisma.order.findMany({
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
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('getOrders Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user!.id;

    if (!status || !Object.values(OrderStatus).includes(status as OrderStatus)) {
      res.status(400).json({ error: 'Trạng thái không hợp lệ' });
      return;
    }

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id },
        data: { trangThai: status as OrderStatus }
      });

      await tx.orderActivityLog.create({
        data: {
          orderId: id,
          hanhDong: `Cập nhật trạng thái sang ${status}`,
          nguoiThucHienId: userId
        }
      });
    });

    const updatedOrder = await prisma.order.findUnique({ where: { id } });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('updateOrderStatus Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const scanOrderQr = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { maNhanHang } = req.body;
    const userId = req.user!.id;

    if (!maNhanHang) {
      res.status(400).json({ error: 'Mã nhận hàng là bắt buộc' });
      return;
    }

    const order = await prisma.order.findUnique({ where: { maNhanHang } });
    if (!order) {
      res.status(404).json({ error: 'Mã nhận hàng không hợp lệ hoặc đơn hàng không tồn tại' });
      return;
    }

    if (order.trangThai === 'HOAN_THANH' || order.trangThai === 'DA_HUY') {
      res.status(400).json({ error: `Đơn hàng đang ở trạng thái ${order.trangThai}, không thể quét QR hoàn thành` });
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
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
    });

    const updatedOrder = await prisma.order.findUnique({ where: { id: order.id } });
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('scanOrderQr Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};
