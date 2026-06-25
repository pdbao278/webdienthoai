import { Router } from 'express';
import { chatWithBot } from '../controllers/chat.controller';
import { chatRateLimiter } from '../middlewares/rate-limit.middleware';

const router = Router();

router.post('/', chatRateLimiter, chatWithBot);

export default router;
