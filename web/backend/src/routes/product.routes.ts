import { Router } from 'express';
import { getProducts, getProductBySlug, searchProducts } from '../controllers/product.controller';
import { getProductReviews, addReview } from '../controllers/review.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getProducts);
router.get('/search', searchProducts); // Must be before /:slug
router.get('/:slug', getProductBySlug);
router.get('/:slug/reviews', getProductReviews);
router.post('/:slug/reviews', authenticate, addReview);

export default router;
