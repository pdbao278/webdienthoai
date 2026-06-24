import { z } from 'zod';

export const addToCartSchema = z.object({
  productVariantId: z.string().uuid({ message: 'ID phiên bản sản phẩm không hợp lệ' }),
  soLuong: z.number().int().min(1, { message: 'Số lượng phải lớn hơn 0' }).default(1),
  overrideQuantity: z.boolean().optional(),
});

export const updateCartItemSchema = z.object({
  soLuong: z.number().int().min(1, { message: 'Số lượng phải lớn hơn 0' }),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
