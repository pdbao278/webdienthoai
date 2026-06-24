import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { getOrders, updateOrderStatus, scanOrderQr } from '../controllers/admin.order.controller';

const router = Router();

router.use(authenticate, authorize(['ADMIN', 'MANAGER']));

router.get('/orders', getOrders);
router.patch('/orders/:id/status', updateOrderStatus);
router.post('/orders/scan', scanOrderQr);

export default router;
