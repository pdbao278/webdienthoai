import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { getOrders, updateOrderStatus, scanOrderQr } from '../controllers/admin.order.controller';
import { createProduct, updateProduct, deleteProduct, uploadImage } from '../controllers/admin.product.controller';
import { getVouchers, createVoucher, deleteVoucher } from '../controllers/admin.voucher.controller';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

router.use(authenticate, authorize(['ADMIN', 'MANAGER']));

router.get('/orders', getOrders);
router.patch('/orders/:id/status', updateOrderStatus);
router.post('/orders/scan', scanOrderQr);

router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/upload', upload.single('file'), uploadImage);

router.get('/vouchers', getVouchers);
router.post('/vouchers', createVoucher);
router.delete('/vouchers/:id', deleteVoucher);

export default router;
