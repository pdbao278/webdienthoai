import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { createOrder, validateVoucher, getOrders, cancelOrder } from '../controllers/order.controller';

const router = Router();

router.use(authenticate);

router.get('/', getOrders);
router.post('/', createOrder);
router.post('/validate-voucher', validateVoucher);
router.post('/:id/cancel', cancelOrder);

export default router;
