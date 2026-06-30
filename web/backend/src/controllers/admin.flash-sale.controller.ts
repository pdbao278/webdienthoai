import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { createFlashSaleSchema, updateFlashSaleSchema } from '@phonestore/shared';
import prisma from '../lib/prisma';

export const getFlashSales = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const flashSales = await prisma.flashSale.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { items: true } }
      }
    });
    res.status(200).json({ data: flashSales });
  } catch (error: any) {
    res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
  }
};

export const getFlashSaleById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const flashSale = await prisma.flashSale.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            productVariant: {
              include: {
                product: { select: { sanPham: true } }
              }
            }
          }
        }
      }
    });

    if (!flashSale) {
      res.status(404).json({ error: 'Không tìm thấy chương trình' });
      return;
    }

    res.status(200).json({ data: flashSale });
  } catch (error: any) {
    res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
  }
};

export const createFlashSale = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = createFlashSaleSchema.parse(req.body);

    const flashSale = await prisma.flashSale.create({
      data: {
        ten: data.ten,
        batDau: new Date(data.batDau),
        ketThuc: new Date(data.ketThuc),
        isActive: data.isActive,
        items: {
          create: data.items.map(item => ({
            productVariantId: item.productVariantId,
            giaFlashSale: item.giaFlashSale,
            soLuong: item.soLuong,
            daBan: 0
          }))
        }
      },
      include: { items: true }
    });

    res.status(201).json({ message: 'Tạo chương trình thành công', data: flashSale });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.issues || error.errors });
    } else {
      res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
    }
  }
};

export const updateFlashSale = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = updateFlashSaleSchema.parse(req.body);

    const existing = await prisma.flashSale.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Không tìm thấy chương trình' });
      return;
    }

    const flashSale = await prisma.$transaction(async (tx) => {
      // Update main flash sale info
      const updated = await tx.flashSale.update({
        where: { id },
        data: {
          ten: data.ten,
          batDau: data.batDau ? new Date(data.batDau) : undefined,
          ketThuc: data.ketThuc ? new Date(data.ketThuc) : undefined,
          isActive: data.isActive,
        }
      });

      // Update items if provided (complete replacement to simplify)
      if (data.items) {
        await tx.flashSaleItem.deleteMany({ where: { flashSaleId: id } });
        await tx.flashSaleItem.createMany({
          data: data.items.map(item => ({
            flashSaleId: id,
            productVariantId: item.productVariantId,
            giaFlashSale: item.giaFlashSale,
            soLuong: item.soLuong,
            daBan: 0
          }))
        });
      }

      return updated;
    });

    res.status(200).json({ message: 'Cập nhật chương trình thành công', data: flashSale });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.issues || error.errors });
    } else {
      res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
    }
  }
};

export const deleteFlashSale = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existing = await prisma.flashSale.findUnique({ where: { id } });
    
    if (!existing) {
      res.status(404).json({ error: 'Không tìm thấy chương trình' });
      return;
    }

    await prisma.flashSale.delete({ where: { id } });
    res.status(200).json({ message: 'Xóa chương trình thành công' });
  } catch (error: any) {
    res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
  }
};
