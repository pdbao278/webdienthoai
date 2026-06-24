import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { ping } from '@phonestore/shared';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';

import adminRoutes from './routes/admin.routes';
import orderRoutes from './routes/order.routes';
import { searchProducts } from './controllers/product.controller';
import { startCronJobs } from './services/cron.service';
import prisma from './lib/prisma';

startCronJobs();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
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
console.log('Backend restarted');
