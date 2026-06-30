import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import adminFlashSaleRoutes from './admin.flash-sale.routes';

const app = express();
app.use(express.json());

// Mock auth middleware to set user as ADMIN
app.use((req: any, res: any, next: any) => {
  req.user = { id: 'admin-123', role: 'ADMIN' };
  next();
});

app.use('/api/admin/flash-sales', adminFlashSaleRoutes);

const prisma = new PrismaClient();

describe('Admin Flash Sale API', () => {
  let product: any;
  let variant: any;
  let flashSaleId: string;

  beforeAll(async () => {
    product = await prisma.product.create({
      data: {
        slug: 'fs-test-prod-' + Date.now(),
        hang: 'Test',
        sanPham: 'Flash Sale Test',
        phanKhuc: 'TAM_TRUNG',
        variants: {
          create: {
            sku: 'FS-SKU-' + Date.now(),
            ramGb: 8,
            dungLuongGb: 256,
            mauSac: 'Black',
            giaGoc: 20000000,
            giaBan: 18000000,
            tonKho: 50
          }
        }
      },
      include: { variants: true }
    });
    variant = product.variants[0];
  });

  afterAll(async () => {
    if (flashSaleId) await prisma.flashSale.delete({ where: { id: flashSaleId } }).catch(() => {});
    await prisma.product.delete({ where: { id: product.id } }).catch(() => {});
    await prisma.$disconnect();
  });

  it('should create a new flash sale', async () => {
    const payload = {
      ten: 'Super Flash Sale',
      batDau: new Date().toISOString(),
      ketThuc: new Date(Date.now() + 86400000).toISOString(),
      isActive: true,
      items: [
        {
          productVariantId: variant.id,
          giaFlashSale: 15000000,
          soLuong: 10
        }
      ]
    };

    const res = await request(app).post('/api/admin/flash-sales').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.ten).toBe('Super Flash Sale');
    expect(res.body.data.items.length).toBe(1);
    
    flashSaleId = res.body.data.id;
  });

  it('should get a list of flash sales', async () => {
    const res = await request(app).get('/api/admin/flash-sales');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should get a single flash sale', async () => {
    const res = await request(app).get(`/api/admin/flash-sales/${flashSaleId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(flashSaleId);
  });

  it('should update a flash sale and retain daBan for existing items', async () => {
    // Simulate selling 2 items first
    await prisma.flashSaleItem.updateMany({
      where: { flashSaleId },
      data: { daBan: 2 }
    });

    const payload = { 
      ten: 'Mega Flash Sale',
      items: [
        {
          productVariantId: variant.id,
          giaFlashSale: 14000000,
          soLuong: 20
        }
      ]
    };
    
    const res = await request(app).put(`/api/admin/flash-sales/${flashSaleId}`).send(payload);
    expect(res.status).toBe(200);
    expect(res.body.data.ten).toBe('Mega Flash Sale');

    // Retrieve again to check items
    const getRes = await request(app).get(`/api/admin/flash-sales/${flashSaleId}`);
    const updatedItem = getRes.body.data.items.find((i: any) => i.productVariantId === variant.id);
    expect(updatedItem).toBeDefined();
    expect(updatedItem.soLuong).toBe(20);
    expect(updatedItem.giaFlashSale).toBe(14000000);
    expect(updatedItem.daBan).toBe(2); // Should NOT be reset to 0
  });

  it('should delete a flash sale', async () => {
    const res = await request(app).delete(`/api/admin/flash-sales/${flashSaleId}`);
    expect(res.status).toBe(200);
  });
});
