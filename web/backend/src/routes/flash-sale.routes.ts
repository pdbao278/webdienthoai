import { Router } from 'express';
import { getCurrentFlashSale } from '../controllers/flash-sale.controller';

const router = Router();

router.get('/current', getCurrentFlashSale);

export default router;
