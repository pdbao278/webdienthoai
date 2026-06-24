import { Response } from 'express';
import { PrismaClient, DiscountType } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

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
    const { maVoucher, loaiGiamGia, giaTri, toiDaGiam, donToiThieu, batDau, ketThuc, soLuong } = req.body;
    const userId = req.user!.id;

    if (!maVoucher || !loaiGiamGia || !giaTri || !batDau || !ketThuc) {
      res.status(400).json({ error: 'Vui lòng nhập đủ thông tin bắt buộc' });
      return;
    }

    const existing = await prisma.voucher.findUnique({ where: { maVoucher } });
    if (existing) {
      res.status(400).json({ error: 'Mã voucher đã tồn tại' });
      return;
    }

    const newVoucher = await prisma.voucher.create({
      data: {
        maVoucher: maVoucher.toUpperCase(),
        loaiGiamGia: loaiGiamGia as DiscountType,
        giaTri: Number(giaTri),
        toiDaGiam: toiDaGiam ? Number(toiDaGiam) : null,
        donToiThieu: Number(donToiThieu) || 0,
        batDau: new Date(batDau),
        ketThuc: new Date(ketThuc),
        soLuong: Number(soLuong) || 1,
        nguoiTaoId: userId
      }
    });

    res.status(201).json(newVoucher);
  } catch (error) {
    console.error('createVoucher Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const deleteVoucher = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.voucher.delete({ where: { id } });
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error('deleteVoucher Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};
