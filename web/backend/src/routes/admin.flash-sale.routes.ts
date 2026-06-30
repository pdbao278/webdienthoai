import { Router } from 'express';
import {
  getFlashSales,
  getFlashSaleById,
  createFlashSale,
  updateFlashSale,
  deleteFlashSale
} from '../controllers/admin.flash-sale.controller';

const router = Router();

router.get('/', getFlashSales);
router.get('/:id', getFlashSaleById);
router.post('/', createFlashSale);
router.put('/:id', updateFlashSale);
router.delete('/:id', deleteFlashSale);

export default router;
