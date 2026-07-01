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
    } else if (error.code === 'P2002') {
      // Unique constraint on batDau — duplicate time slot
      res.status(409).json({ error: 'Đã tồn tại Flash Sale trong khung giờ này. Vui lòng chọn khung giờ khác.' });
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

      // Update items if provided (preserve daBan and perform safe upsert-like ops)
      if (data.items) {
        const existingItems = await tx.flashSaleItem.findMany({ where: { flashSaleId: id } });
        const existingVariantIds = existingItems.map(i => i.productVariantId);
        const newVariantIds = data.items.map((i: any) => i.productVariantId);

        const toDeleteIds = existingItems
          .filter(i => !newVariantIds.includes(i.productVariantId))
          .map(i => i.id);
        
        const toAdd = data.items.filter((i: any) => !existingVariantIds.includes(i.productVariantId));
        const toUpdate = data.items.filter((i: any) => existingVariantIds.includes(i.productVariantId));

        if (toDeleteIds.length > 0) {
          await tx.flashSaleItem.deleteMany({ where: { id: { in: toDeleteIds } } });
        }

        if (toAdd.length > 0) {
          await tx.flashSaleItem.createMany({
            data: toAdd.map((item: any) => ({
              flashSaleId: id,
              productVariantId: item.productVariantId,
              giaFlashSale: item.giaFlashSale,
              soLuong: item.soLuong,
              daBan: 0
            }))
          });
        }

        for (const item of toUpdate) {
          const existingItem = existingItems.find(i => i.productVariantId === item.productVariantId);
          if (existingItem) {
            await tx.flashSaleItem.update({
              where: { id: existingItem.id },
              data: {
                giaFlashSale: item.giaFlashSale,
                soLuong: item.soLuong
              }
            });
          }
        }
      }

      return updated;
    });

    res.status(200).json({ message: 'Cập nhật chương trình thành công', data: flashSale });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.issues || error.errors });
    } else if (error.code === 'P2002') {
      // Unique constraint on batDau — duplicate time slot
      res.status(409).json({ error: 'Đã tồn tại Flash Sale trong khung giờ này. Vui lòng chọn khung giờ khác.' });
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
