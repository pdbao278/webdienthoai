import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cart.controller';

const router = Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/', addToCart);
router.patch('/:id', updateCartItem);
router.delete('/:id', removeFromCart);

export default router;
