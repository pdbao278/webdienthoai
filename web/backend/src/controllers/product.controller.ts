import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { productQuerySchema } from '@phonestore/shared';
import prisma from '../lib/prisma';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = productQuerySchema.parse(req.query);
    
    const where: Prisma.ProductWhereInput = {
      isActive: true
    };
    
    if (query.hang) {
      where.hang = { contains: query.hang, mode: 'insensitive' };
    }
    if (query.q) {
      where.OR = [
        { sanPham: { contains: query.q, mode: 'insensitive' } },
        { hang: { contains: query.q, mode: 'insensitive' } }
      ];
    }
    
    const variantQuery: any = {};
    if (query.minPrice || query.maxPrice) {
      variantQuery.giaBan = {};
      if (query.minPrice) variantQuery.giaBan.gte = query.minPrice;
      if (query.maxPrice) variantQuery.giaBan.lte = query.maxPrice;
    }

    if (query.ramGb) {
      variantQuery.ramGb = query.ramGb;
    }

    if (query.dungLuongGb) {
      variantQuery.dungLuongGb = query.dungLuongGb;
    }

    if (Object.keys(variantQuery).length > 0) {
      where.variants = { some: variantQuery };
    }

    let orderBy: any = { createdAt: 'desc' };
    
    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    // We fetch all matching products if sorting by price, since Prisma doesn't support 
    // sorting by aggregate of a relation directly in findMany.
    const requiresPriceSort = query.sort === 'gia_asc' || query.sort === 'gia_desc';

    let products: any[] = [];
    let total = 0;

    if (requiresPriceSort) {
      // In-memory sort approach (acceptable for small catalogs)
      let allProducts = await prisma.product.findMany({
        where,
        include: {
          media: {
            where: { isThumbnail: true },
            take: 1
          },
          variants: true
        }
      });
      
      allProducts.sort((a, b) => {
        const getMinPrice = (p: any) => p.variants.length > 0 ? Math.min(...p.variants.map((v: any) => v.giaBan)) : Infinity;
        const minA = getMinPrice(a);
        const minB = getMinPrice(b);
        return query.sort === 'gia_asc' ? minA - minB : minB - minA;
      });
      
      total = allProducts.length;
      products = allProducts.slice(skip, skip + limit);
    } else {
      // Standard database pagination
      const [fetchedProducts, count] = await Promise.all([
        prisma.product.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: {
            media: {
              where: { isThumbnail: true },
              take: 1
            },
            variants: true
          }
        }),
        prisma.product.count({ where })
      ]);
      products = fetchedProducts;
      total = count;
    }

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
      where: { slug, isActive: true },
      include: {
        media: {
          orderBy: { thuTu: 'asc' }
        },
        variants: true
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
        isActive: true,
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
        variants: {
          take: 1,
          orderBy: { giaBan: 'asc' },
          select: { giaBan: true, giaGoc: true, dungLuongGb: true }
        },
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
