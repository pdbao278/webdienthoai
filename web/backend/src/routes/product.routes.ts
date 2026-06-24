import { Router } from 'express';
import { getProducts, getProductBySlug, searchProducts } from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts);
router.get('/search', searchProducts); // Must be before /:slug
router.get('/:slug', getProductBySlug);

export default router;
