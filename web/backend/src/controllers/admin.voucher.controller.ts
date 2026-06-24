import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';
import { createVoucherSchema, updateVoucherSchema } from '@phonestore/shared';

export const getVouchers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const vouchers = await prisma.voucher.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(vouchers);
  } catch (error) {
    console.error('getVouchers Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const createVoucher = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Validate input với Zod
    const parsed = createVoucherSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
      return;
    }

    const { maVoucher, loaiGiamGia, giaTri, toiDaGiam, donToiThieu, batDau, ketThuc, soLuong, isActive } = parsed.data;

    const existing = await prisma.voucher.findUnique({ where: { maVoucher: maVoucher.toUpperCase() } });
    if (existing) {
      res.status(400).json({ error: 'Mã voucher đã tồn tại' });
      return;
    }

    const newVoucher = await prisma.voucher.create({
      data: {
        maVoucher: maVoucher.toUpperCase(),
        loaiGiamGia: loaiGiamGia as any,
        giaTri,
        toiDaGiam: toiDaGiam ?? null,
        donToiThieu: donToiThieu ?? 0,
        batDau: new Date(batDau),
        ketThuc: new Date(ketThuc),
        soLuong: soLuong ?? 1,
        isActive: isActive !== undefined ? isActive : true,
        nguoiTaoId: userId
      }
    });

    res.status(201).json(newVoucher);
  } catch (error) {
    console.error('createVoucher Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const updateVoucher = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate input với Zod
    const parsed = updateVoucherSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
      return;
    }

    const voucher = await prisma.voucher.findUnique({ where: { id } });
    if (!voucher) {
      res.status(404).json({ error: 'Voucher không tồn tại' });
      return;
    }

    const { maVoucher, loaiGiamGia, giaTri, toiDaGiam, donToiThieu, batDau, ketThuc, soLuong, isActive } = parsed.data;

    if (maVoucher && maVoucher.toUpperCase() !== voucher.maVoucher) {
      const existing = await prisma.voucher.findUnique({ where: { maVoucher: maVoucher.toUpperCase() } });
      if (existing) {
        res.status(400).json({ error: 'Mã voucher mới đã tồn tại' });
        return;
      }
    }

    const updated = await prisma.voucher.update({
      where: { id },
      data: {
        maVoucher: maVoucher ? maVoucher.toUpperCase() : undefined,
        loaiGiamGia: loaiGiamGia as any,
        giaTri,
        toiDaGiam: toiDaGiam !== undefined ? toiDaGiam : undefined,
        donToiThieu: donToiThieu !== undefined ? donToiThieu : undefined,
        batDau: batDau ? new Date(batDau) : undefined,
        ketThuc: ketThuc ? new Date(ketThuc) : undefined,
        soLuong: soLuong !== undefined ? soLuong : undefined,
        isActive: isActive !== undefined ? isActive : undefined
      }
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error('updateVoucher Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const deleteVoucher = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Kiểm tra voucher tồn tại
    const voucher = await prisma.voucher.findUnique({ 
      where: { id },
      include: {
        _count: { select: { orders: true } }
      }
    });
    
    if (!voucher) {
      res.status(404).json({ error: 'Voucher không tồn tại' });
      return;
    }

    // Nếu voucher đã được sử dụng, tiến hành soft delete (vô hiệu hóa)
    if (voucher._count.orders > 0) {
      await prisma.voucher.update({
        where: { id },
        data: { isActive: false }
      });
      res.status(200).json({ message: 'Voucher đã được vô hiệu hóa do đang nằm trong đơn hàng' });
      return;
    }

    // Nếu chưa được sử dụng, xóa vĩnh viễn
    await prisma.voucher.delete({ where: { id } });
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error('deleteVoucher Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};
