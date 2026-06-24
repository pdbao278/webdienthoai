import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ping } from '@phonestore/shared';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import { searchProducts } from './controllers/product.controller';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
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
