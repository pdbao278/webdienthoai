import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { createOrder, validateVoucher } from '../controllers/order.controller';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.post('/validate-voucher', validateVoucher);

export default router;
