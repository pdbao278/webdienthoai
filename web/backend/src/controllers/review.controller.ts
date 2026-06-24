import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

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
    const { rating, comment } = req.body;
    const userId = req.user!.id;

    if (!rating || rating < 1 || rating > 5) {
      res.status(400).json({ error: 'Đánh giá không hợp lệ (1-5)' });
      return;
    }

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
        rating: Number(rating),
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
