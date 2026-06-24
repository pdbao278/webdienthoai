import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';
import { addReviewSchema } from '@phonestore/shared';

export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    
    const product = await prisma.product.findUnique({
      where: { slug }
    });

    if (!product) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      return;
    }

    const reviews = await prisma.review.findMany({
      where: { productId: product.id },
      include: {
        user: { select: { hoTen: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('getProductReviews Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const addReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const userId = req.user!.id;

    // Validate input với Zod
    const parsed = addReviewSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
      return;
    }
    const { rating, comment } = parsed.data;

    const product = await prisma.product.findUnique({
      where: { slug }
    });

    if (!product) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      return;
    }

    const hasPurchased = await prisma.order.findFirst({
      where: {
        userId,
        trangThai: 'HOAN_THANH',
        items: {
          some: {
            productVariant: {
              productId: product.id
            }
          }
        }
      }
    });

    if (!hasPurchased) {
      res.status(403).json({ error: 'Bạn phải mua và nhận hàng sản phẩm này để có thể đánh giá' });
      return;
    }

    const existingReview = await prisma.review.findFirst({
      where: { userId, productId: product.id }
    });

    if (existingReview) {
      res.status(400).json({ error: 'Bạn đã đánh giá sản phẩm này rồi' });
      return;
    }

    const review = await prisma.review.create({
      data: {
        userId,
        productId: product.id,
        rating,
        comment: comment || null
      },
      include: {
        user: { select: { hoTen: true } }
      }
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('addReview Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const checkReviewEligibility = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const userId = req.user!.id;

    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      res.status(404).json({ error: 'Sản phẩm không tồn tại' });
      return;
    }

    const orderWithProduct = await prisma.order.findFirst({
      where: {
        userId,
        trangThai: 'HOAN_THANH',
        items: {
          some: {
            productVariant: {
              productId: product.id
            }
          }
        }
      }
    });

    res.status(200).json({ eligible: !!orderWithProduct });
  } catch (error) {
    console.error('checkReviewEligibility Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      res.status(404).json({ error: 'Không tìm thấy đánh giá' });
      return;
    }

    // Admin/Manager can delete any review, customer can only delete their own
    if (userRole !== 'ADMIN' && userRole !== 'MANAGER' && review.userId !== userId) {
      res.status(403).json({ error: 'Bạn không có quyền xóa đánh giá này' });
      return;
    }

    await prisma.review.delete({ where: { id } });
    res.status(200).json({ message: 'Xóa đánh giá thành công' });
  } catch (error) {
    console.error('deleteReview Error:', error);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};
