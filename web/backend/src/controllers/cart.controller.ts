import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { addToCartSchema, updateCartItemSchema } from '@phonestore/shared';
import prisma from '../lib/prisma';
import { applyFlashSalePrices } from '../lib/flash-sale';

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        productVariant: {
          select: {
            id: true,
            sku: true,
            giaBan: true,
            tonKho: true,
            mauSac: true,
            dungLuongGb: true,
            imageUrl: true,
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
      },
      orderBy: { createdAt: 'desc' }
    });

    if (cartItems.length > 0) {
      const variants = cartItems.map(item => item.productVariant);
      const updatedVariants = await applyFlashSalePrices(variants);
      
      // Re-map the variants back to cartItems
      updatedVariants.forEach((variant, index) => {
        (cartItems[index] as any).productVariant = variant;
      });
    }

    res.status(200).json(cartItems);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
  }
};

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { productVariantId, soLuong, overrideQuantity } = addToCartSchema.parse(req.body);

    const variant = await prisma.productVariant.findUnique({ where: { id: productVariantId } });
    if (!variant) {
      res.status(404).json({ error: 'Phiên bản sản phẩm không tồn tại' });
      return;
    }

    if (variant.tonKho < soLuong) {
      res.status(400).json({ error: 'Sản phẩm đã hết hàng hoặc không đủ số lượng' });
      return;
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productVariantId: { userId, productVariantId }
      }
    });

    if (existingCartItem) {
      const newQty = overrideQuantity ? soLuong : existingCartItem.soLuong + soLuong;
      if (variant.tonKho < newQty) {
        res.status(400).json({ error: 'Không đủ số lượng tồn kho' });
        return;
      }
      const updated = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { soLuong: newQty }
      });
      res.status(200).json({ message: 'Đã cập nhật giỏ hàng', cartItem: updated });
      return;
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId,
        productVariantId,
        soLuong
      }
    });

    res.status(201).json({ message: 'Đã thêm vào giỏ hàng', cartItem });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.issues || error.errors });
    } else if (error.code === 'P2003') {
      res.status(401).json({ error: 'Tài khoản không hợp lệ hoặc đã bị xóa. Vui lòng đăng nhập lại.' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
    }
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const cartItemId = req.params.id;
    const { soLuong } = updateCartItemSchema.parse(req.body);

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { productVariant: true }
    });

    if (!cartItem || cartItem.userId !== userId) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm trong giỏ hàng' });
      return;
    }

    if (cartItem.productVariant.tonKho < soLuong) {
      res.status(400).json({ error: 'Không đủ số lượng tồn kho' });
      return;
    }

    const updated = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { soLuong }
    });

    res.status(200).json({ message: 'Đã cập nhật số lượng', cartItem: updated });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({ error: error.issues || error.errors });
    } else if (error.code === 'P2003') {
      res.status(401).json({ error: 'Tài khoản không hợp lệ hoặc đã bị xóa. Vui lòng đăng nhập lại.' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
    }
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const cartItemId = req.params.id;

    const cartItem = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!cartItem || cartItem.userId !== userId) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm trong giỏ hàng' });
      return;
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    res.status(200).json({ message: 'Đã xóa sản phẩm khỏi giỏ hàng' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi hệ thống nội bộ' });
  }
};
