import { Router } from 'express';
import { getProducts, getProductBySlug, searchProducts } from '../controllers/product.controller';
import { getProductReviews, addReview, deleteReview, checkReviewEligibility } from '../controllers/review.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getProducts);
router.get('/search', searchProducts); // Must be before /:slug
router.get('/:slug', getProductBySlug);
router.get('/:slug/reviews', getProductReviews);
router.get('/:slug/review-eligibility', authenticate, checkReviewEligibility);
router.post('/:slug/reviews', authenticate, addReview);
router.delete('/:slug/reviews/:id', authenticate, deleteReview);

export default router;
