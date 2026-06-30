import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getCurrentFlashSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const now = new Date();
    const activeFlashSale = await prisma.flashSale.findFirst({
      where: {
        isActive: true,
        batDau: { lte: now },
        ketThuc: { gte: now }
      },
      orderBy: { batDau: 'desc' },
      include: {
        items: {
          include: {
            productVariant: {
              include: {
                product: {
                  select: {
                    id: true,
                    sanPham: true,
                    slug: true,
                    hang: true,
                    phanKhuc: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!activeFlashSale) {
      res.status(200).json({ data: null });
      return;
    }

    res.status(200).json({ data: activeFlashSale });
  } catch (error: any) {
    res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
  }
};
