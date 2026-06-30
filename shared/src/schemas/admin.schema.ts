import { z } from 'zod';

// ─── Order Status ────────────────────────────────────────────────
export const OrderStatusEnum = z.enum([
  'DA_DAT',
  'DANG_CHUAN_BI',
  'CHO_NHAN_HANG',
  'HOAN_THANH',
  'DA_HUY',
]);

export type OrderStatusType = z.infer<typeof OrderStatusEnum>;

/**
 * Máy trạng thái đơn hàng — chỉ cho phép chuyển đổi hợp lệ.
 * DA_DAT → DANG_CHUAN_BI → CHO_NHAN_HANG → HOAN_THANH
 *                                          → DA_HUY (từ bất kỳ trạng thái nào trước HOAN_THANH)
 */
export const VALID_ORDER_TRANSITIONS: Record<string, string[]> = {
  DA_DAT: ['DANG_CHUAN_BI', 'CHO_NHAN_HANG', 'HOAN_THANH', 'DA_HUY'],
  DANG_CHUAN_BI: ['CHO_NHAN_HANG', 'HOAN_THANH', 'DA_HUY'],
  CHO_NHAN_HANG: ['HOAN_THANH', 'DA_HUY'],
  HOAN_THANH: [],
  DA_HUY: [],
};

export const updateOrderStatusSchema = z.object({
  status: OrderStatusEnum,
});

export const scanOrderQrSchema = z.object({
  maNhanHang: z.string().min(1, 'Mã nhận hàng là bắt buộc'),
});

// ─── Product ─────────────────────────────────────────────────────
export const ProductSegmentEnum = z.enum([
  'FLAGSHIP',
  'TAM_TRUNG',
  'PHO_THONG',
  'GAMING',
]);

const variantSchema = z.object({
  sku: z.string().optional(), // SKU tự sinh bởi backend, Admin không cần nhập
  ramGb: z.number().int().positive(),
  dungLuongGb: z.number().int().positive(),
  mauSac: z.string().min(1, 'Màu sắc là bắt buộc'),
  imageUrl: z.string().optional().nullable(),
  giaGoc: z.number().int().nonnegative(),
  giaBan: z.number().int().nonnegative(),
  tonKho: z.number().int().nonnegative(),
});

const mediaSchema = z.object({
  url: z.string(),
  publicId: z.string().optional().nullable(),
  loai: z.enum(['IMAGE', 'VIDEO']).default('IMAGE'),
  isThumbnail: z.boolean().default(false),
});

export const createProductSchema = z.object({
  sanPham: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  hang: z.string().min(1, 'Hãng sản xuất là bắt buộc'),
  phanKhuc: ProductSegmentEnum,
  moTa: z.string().optional(),
  // Thông số kỹ thuật (tất cả optional)
  manHinhCongNghe: z.string().optional(),
  manHinhKichThuoc: z.number().optional(),
  manHinhDoPhanGiai: z.string().optional(),
  manHinhTanSoQuet: z.number().int().optional(),
  cameraSau: z.string().optional(),
  cameraSauTinhNang: z.string().optional(),
  cameraTruoc: z.string().optional(),
  chip: z.string().optional(),
  heDieuHanh: z.string().optional(),
  pinMah: z.number().int().optional(),
  sacNhanhW: z.number().int().optional(),
  hoTro5g: z.boolean().optional(),
  nfc: z.boolean().optional(),
  sim: z.string().optional(),
  trongLuongG: z.number().int().optional(),
  chongNuoc: z.string().optional(),
  // Nested
  variants: z.array(variantSchema).min(1, 'Cần ít nhất 1 phiên bản'),
  media: z.array(mediaSchema).optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateProductSchema = createProductSchema.partial();

// ─── Voucher ─────────────────────────────────────────────────────
export const DiscountTypeEnum = z.enum(['PERCENTAGE', 'FIXED_AMOUNT']);

export const createVoucherSchema = z.object({
  maVoucher: z.string().min(1, 'Mã voucher là bắt buộc'),
  loaiGiamGia: DiscountTypeEnum,
  giaTri: z.number().positive('Giá trị phải lớn hơn 0'),
  toiDaGiam: z.number().int().nonnegative().optional().nullable(),
  donToiThieu: z.number().int().nonnegative().default(0),
  batDau: z.string().datetime({ message: 'Thời gian bắt đầu không hợp lệ' }),
  ketThuc: z.string().datetime({ message: 'Thời gian kết thúc không hợp lệ' }),
  soLuong: z.number().int().positive().default(1),
  isActive: z.boolean().default(true),
});

export const updateVoucherSchema = createVoucherSchema.partial();

// ─── Review ──────────────────────────────────────────────────────
export const addReviewSchema = z.object({
  rating: z.number().int().min(1, 'Đánh giá tối thiểu 1 sao').max(5, 'Đánh giá tối đa 5 sao'),
  comment: z.string().optional().nullable(),
});

// ─── User ────────────────────────────────────────────────────────
export const UserRoleEnum = z.enum(['CUSTOMER', 'MANAGER', 'ADMIN']);

export const updateUserRoleSchema = z.object({
  role: UserRoleEnum,
});

// ─── Exports types ───────────────────────────────────────────────
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type ScanOrderQrInput = z.infer<typeof scanOrderQrSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateVoucherInput = z.infer<typeof createVoucherSchema>;
export type UpdateVoucherInput = z.infer<typeof updateVoucherSchema>;
export type AddReviewInput = z.infer<typeof addReviewSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;

// ─── Flash Sale ──────────────────────────────────────────────────
const flashSaleItemSchema = z.object({
  productVariantId: z.string().min(1, 'Phiên bản sản phẩm là bắt buộc'),
  giaFlashSale: z.number().int().nonnegative(),
  soLuong: z.number().int().positive(),
});

export const createFlashSaleSchema = z.object({
  ten: z.string().min(1, 'Tên chương trình là bắt buộc'),
  batDau: z.string().datetime({ message: 'Thời gian bắt đầu không hợp lệ' }),
  ketThuc: z.string().datetime({ message: 'Thời gian kết thúc không hợp lệ' }),
  isActive: z.boolean().default(true),
  items: z.array(flashSaleItemSchema).min(1, 'Cần ít nhất 1 sản phẩm khuyến mãi'),
});

export const updateFlashSaleSchema = createFlashSaleSchema.partial();

export type CreateFlashSaleInput = z.infer<typeof createFlashSaleSchema>;
export type UpdateFlashSaleInput = z.infer<typeof updateFlashSaleSchema>;
