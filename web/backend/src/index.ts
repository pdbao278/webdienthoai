import dotenv from 'dotenv';
dotenv.config({ override: true });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ping } from '@phonestore/shared';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import chatRoutes from './routes/chat.routes';
import flashSaleRoutes from './routes/flash-sale.routes';

import adminRoutes from './routes/admin.routes';
import orderRoutes from './routes/order.routes';
import { searchProducts } from './controllers/product.controller';
import { startCronJobs } from './services/cron.service';
import prisma from './lib/prisma';
import { authRateLimiter } from './middlewares/rate-limit.middleware';

// Cron jobs chỉ chạy khi là long-running server (không phải serverless/Vercel)
if (!process.env.VERCEL) {
  startCronJobs();
}

const app = express();
app.use(helmet());

// CORS: cho phép frontend URL + tất cả Vercel preview URLs
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'https://webdienthoai.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    // Cho phép requests không có origin (mobile apps, server-to-server, cURL)
    if (!origin) return callback(null, true);
    // Cho phép origin trong whitelist hoặc Vercel preview URLs
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRateLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/flash-sales', flashSaleRoutes);
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
