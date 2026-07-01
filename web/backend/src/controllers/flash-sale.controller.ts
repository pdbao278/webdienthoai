import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getTodayFlashSales = async (req: Request, res: Response): Promise<void> => {
  try {
    const now = new Date();
    // Get all flash sales that have not ended yet (active or upcoming)
    const flashSales = await prisma.flashSale.findMany({
      where: {
        isActive: true,
        ketThuc: { gt: now }
      },
      orderBy: { batDau: 'asc' },
      take: 4, // Get next 4 slots for timeline
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

    res.status(200).json({ data: flashSales });
  } catch (error: any) {
    res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
  }
};
