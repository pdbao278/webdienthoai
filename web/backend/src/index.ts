import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ping } from '@phonestore/shared';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';

import adminRoutes from './routes/admin.routes';
import orderRoutes from './routes/order.routes';
import { searchProducts } from './controllers/product.controller';
import { startCronJobs } from './services/cron.service';
import prisma from './lib/prisma';
import { authRateLimiter } from './middlewares/rate-limit.middleware';

startCronJobs();

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRateLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.get('/api/search', searchProducts);

app.get('/', (req, res) => {
  res.send(`Backend is running: ${ping()}`);
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
