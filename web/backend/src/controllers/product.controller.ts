import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { productQuerySchema } from '@phonestore/shared';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = productQuerySchema.parse(req.query);
    
    const where: Prisma.ProductWhereInput = {};
    
    if (query.hang) {
      where.hang = { contains: query.hang, mode: 'insensitive' };
    }
    
    if (query.minPrice || query.maxPrice) {
      where.giaBan = {};
      if (query.minPrice) where.giaBan.gte = query.minPrice;
      if (query.maxPrice) where.giaBan.lte = query.maxPrice;
    }

    if (query.ramGb) {
      where.ramGb = query.ramGb;
    }

    if (query.dungLuongGb) {
      where.dungLuongGb = query.dungLuongGb;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (query.sort === 'gia_asc') orderBy = { giaBan: 'asc' };
    if (query.sort === 'gia_desc') orderBy = { giaBan: 'desc' };
    
    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          media: {
            where: { isThumbnail: true },
            take: 1
          }
        }
      }),
      prisma.product.count({ where })
    ]);

    res.status(200).json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        media: {
          orderBy: { thuTu: 'asc' }
        }
      }
    });

    if (!product) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      return;
    }

    res.status(200).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      res.status(200).json({ data: [] });
      return;
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { sanPham: { contains: q, mode: 'insensitive' } },
          { hang: { contains: q, mode: 'insensitive' } }
        ]
      },
      take: 5,
      select: {
        id: true,
        slug: true,
        sanPham: true,
        giaBan: true,
        media: {
          where: { isThumbnail: true },
          take: 1,
          select: { url: true }
        }
      }
    });

    res.status(200).json({ data: products });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
