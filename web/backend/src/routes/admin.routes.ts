import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { getOrders, updateOrderStatus, scanOrderQr } from '../controllers/admin.order.controller';
import { getAdminProducts, createProduct, updateProduct, deleteProduct, uploadImage } from '../controllers/admin.product.controller';
import { getVouchers, createVoucher, updateVoucher, deleteVoucher } from '../controllers/admin.voucher.controller';
import { getStats } from '../controllers/admin.stats.controller';
import { getUsers, updateUserRole } from '../controllers/admin.user.controller';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

// ─── Xác thực chung cho tất cả route admin ───────────────────────
router.use(authenticate);

// ─── Đơn hàng — ADMIN + MANAGER ─────────────────────────────────
router.get('/orders', authorize(['ADMIN', 'MANAGER']), getOrders);
router.patch('/orders/:id/status', authorize(['ADMIN', 'MANAGER']), updateOrderStatus);
router.post('/orders/scan', authorize(['ADMIN', 'MANAGER']), scanOrderQr);

// ─── Sản phẩm — Chỉ ADMIN ──────────────────────────────────────
router.get('/products', authorize(['ADMIN', 'MANAGER']), getAdminProducts);
router.post('/products', authorize(['ADMIN']), createProduct);
router.patch('/products/:id', authorize(['ADMIN']), updateProduct);
router.delete('/products/:id', authorize(['ADMIN']), deleteProduct);
router.post('/upload', authorize(['ADMIN']), upload.single('file'), uploadImage);

// ─── Voucher — Chỉ ADMIN ───────────────────────────────────────
router.get('/vouchers', authorize(['ADMIN', 'MANAGER']), getVouchers);
router.post('/vouchers', authorize(['ADMIN']), createVoucher);
router.patch('/vouchers/:id', authorize(['ADMIN']), updateVoucher);
router.delete('/vouchers/:id', authorize(['ADMIN']), deleteVoucher);

// ─── Thống kê — Chỉ ADMIN ──────────────────────────────────────
router.get('/stats', authorize(['ADMIN']), getStats);

// ─── Người dùng — Chỉ ADMIN ─────────────────────────────────────
router.get('/users', authorize(['ADMIN']), getUsers);
router.patch('/users/:id/role', authorize(['ADMIN']), updateUserRole);

export default router;
