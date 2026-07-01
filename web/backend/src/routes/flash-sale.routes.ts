import { Router } from 'express';
import { getTodayFlashSales } from '../controllers/flash-sale.controller';

const router = Router();

router.get('/today', getTodayFlashSales);

export default router;
