import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { productQuerySchema } from '@phonestore/shared';
import prisma from '../lib/prisma';
import { applyFlashSalePrices } from '../lib/flash-sale';

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
      // Step 1: Fetch only IDs and variant prices for matching products (extremely fast and lightweight)
      const matchingProducts = await prisma.product.findMany({
        where,
        select: {
          id: true,
          variants: {
            select: {
              giaBan: true
            }
          }
        }
      });
      
      // Step 2: Sort the lightweight product identifiers
      matchingProducts.sort((a: any, b: any) => {
        const getMinPrice = (p: any) => p.variants.length > 0 ? Math.min(...p.variants.map((v: any) => v.giaBan)) : Infinity;
        const minA = getMinPrice(a);
        const minB = getMinPrice(b);
        return query.sort === 'gia_asc' ? minA - minB : minB - minA;
      });
      
      total = matchingProducts.length;
      const pageProductIds = matchingProducts.slice(skip, skip + limit).map((p: any) => p.id);
      
      // Step 3: Hydrate only the products on the current page
      if (pageProductIds.length > 0) {
        const hydratedProducts = await prisma.product.findMany({
          where: {
            id: { in: pageProductIds }
          },
          include: {
            media: {
              where: { isThumbnail: true },
              take: 1
            },
            variants: true,
            reviews: {
              select: {
                rating: true
              }
            }
          }
        });
        
        // Map products to preserve sorted ID order
        const productsMap = new Map(hydratedProducts.map((p) => [p.id, p]));
        products = pageProductIds
          .map((id) => productsMap.get(id))
          .filter(Boolean) as any[];
      } else {
        products = [];
      }
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
            variants: true,
            reviews: {
              select: {
                rating: true
              }
            }
          }
        }),
        prisma.product.count({ where })
      ]);
      products = fetchedProducts;
      total = count;
    }

    // Apply Flash Sale pricing to all variants in the result set
    if (products.length > 0) {
      for (const p of products) {
        if (p.variants) {
          p.variants = await applyFlashSalePrices(p.variants);
          
          // Re-sort variants by price if needed after flash sale override
          p.variants.sort((a: any, b: any) => a.giaBan - b.giaBan);
        }
      }
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
        variants: true,
        reviews: {
          select: {
            rating: true
          }
        }
      }
    });

    if (!product) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      return;
    }

    if (product.variants) {
      product.variants = await applyFlashSalePrices(product.variants) as any;
      product.variants.sort((a: any, b: any) => a.giaBan - b.giaBan);
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

    if (products.length > 0) {
      for (const p of products) {
        if (p.variants) {
          p.variants = await applyFlashSalePrices(p.variants) as any;
          p.variants.sort((a: any, b: any) => a.giaBan - b.giaBan);
        }
      }
    }

    res.status(200).json({ data: products });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
