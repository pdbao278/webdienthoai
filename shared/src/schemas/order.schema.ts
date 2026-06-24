import { z } from 'zod';

export const createOrderSchema = z.object({
  sdtLienHe: z.string().min(10, { message: 'Số điện thoại không hợp lệ' }),
  ghiChu: z.string().optional(),
  thoiGianHenLayHang: z.string().datetime({ message: 'Thời gian hẹn không hợp lệ' }),
  voucherCode: z.string().optional(),
  phuongThucThanhToan: z.string().default('TienMat'),
  cartItemIds: z.array(z.string().uuid()).optional(),
});

export const validateVoucherSchema = z.object({
  voucherCode: z.string().min(1, 'Mã voucher không được để trống'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ValidateVoucherInput = z.infer<typeof validateVoucherSchema>;
