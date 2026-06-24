import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';
import { createOrderSchema, validateVoucherSchema } from '@phonestore/shared';

const prisma = new PrismaClient();

const generateMaNhanHang = () => {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
};

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const data = createOrderSchema.parse(req.body);

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      res.status(400).json({ error: 'Giỏ hàng trống' });
      return;
    }

    let tongTienHang = 0;
    for (const item of cartItems) {
      tongTienHang += item.soLuong * item.product.giaBan;
      if (item.product.tonKho < item.soLuong) {
        res.status(400).json({ error: `Sản phẩm ${item.product.sanPham} không đủ tồn kho` });
        return;
      }
    }

    let tienGiamGia = 0;
    let voucherId = null;

    if (data.voucherCode) {
      const voucher = await prisma.voucher.findUnique({ where: { maVoucher: data.voucherCode } });
      if (!voucher) {
        res.status(400).json({ error: 'Mã voucher không tồn tại' });
        return;
      }
      const now = new Date();
      if (now < voucher.batDau || now > voucher.ketThuc) {
        res.status(400).json({ error: 'Mã voucher không trong thời gian sử dụng' });
        return;
      }
      if (voucher.soLuong <= voucher.daSuDung) {
        res.status(400).json({ error: 'Mã voucher đã hết lượt sử dụng' });
        return;
      }
      if (tongTienHang < voucher.donToiThieu) {
        res.status(400).json({ error: `Đơn hàng tối thiểu ${voucher.donToiThieu}đ để áp dụng voucher này` });
        return;
      }

      if (voucher.loaiGiamGia === 'PERCENTAGE') {
        tienGiamGia = Math.floor((tongTienHang * voucher.giaTri) / 100);
        if (voucher.toiDaGiam && tienGiamGia > voucher.toiDaGiam) {
          tienGiamGia = voucher.toiDaGiam;
        }
      } else {
        tienGiamGia = voucher.giaTri;
      }

      if (tienGiamGia > tongTienHang) tienGiamGia = tongTienHang;
      voucherId = voucher.id;
    }

    const thanhTien = tongTienHang - tienGiamGia;
    const maNhanHang = generateMaNhanHang();

    const order = await prisma.$transaction(async (tx) => {
      // Create Order
      const newOrder = await tx.order.create({
        data: {
          userId,
          tongTienHang,
          voucherId,
          tienGiamGia,
          thanhTien,
          sdtLienHe: data.sdtLienHe,
          ghiChu: data.ghiChu,
          thoiGianHenLayHang: new Date(data.thoiGianHenLayHang),
          phuongThucThanhToan: data.phuongThucThanhToan,
          maNhanHang,
        }
      });

      // Create Order Items and decrease tonKho
      for (const item of cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            soLuong: item.soLuong,
            donGia: item.product.giaBan,
          }
        });

        await tx.product.update({
          where: { id: item.productId },
          data: { tonKho: { decrement: item.soLuong } }
        });
      }

      // Update Voucher if used
      if (voucherId) {
        await tx.voucher.update({
          where: { id: voucherId },
          data: { daSuDung: { increment: 1 } }
        });
      }

      // Create Activity Log
      await tx.orderActivityLog.create({
        data: {
          orderId: newOrder.id,
          hanhDong: 'Khách hàng đặt trước online (Click & Collect)',
          nguoiThucHienId: userId,
        }
      });

      // Clear Cart
      await tx.cartItem.deleteMany({
        where: { userId }
      });

      return newOrder;
    });

    res.status(201).json({ message: 'Đặt hàng thành công', order });
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
    }
  }
};

export const validateVoucher = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { voucherCode } = validateVoucherSchema.parse(req.body);

    const voucher = await prisma.voucher.findUnique({ where: { maVoucher: voucherCode } });
    if (!voucher) {
      res.status(404).json({ error: 'Mã voucher không tồn tại' });
      return;
    }

    const now = new Date();
    if (now < voucher.batDau || now > voucher.ketThuc) {
      res.status(400).json({ error: 'Mã voucher không trong thời gian sử dụng' });
      return;
    }

    if (voucher.soLuong <= voucher.daSuDung) {
      res.status(400).json({ error: 'Mã voucher đã hết lượt sử dụng' });
      return;
    }

    res.status(200).json(voucher);
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
    }
  }
};
