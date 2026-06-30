import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import flashSaleRoutes from './flash-sale.routes';

const app = express();
app.use(express.json());
app.use('/api/flash-sales', flashSaleRoutes);

const prisma = new PrismaClient();

describe('Public Flash Sale API', () => {
  let product: any;
  let flashSaleId: string;

  beforeAll(async () => {
    product = await prisma.product.create({
      data: {
        slug: 'public-fs-test-' + Date.now(),
        hang: 'Test',
        sanPham: 'Public Flash Sale Test',
        phanKhuc: 'TAM_TRUNG',
        variants: {
          create: {
            sku: 'PUB-FS-SKU-' + Date.now(),
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

    const now = new Date();
    const flashSale = await prisma.flashSale.create({
      data: {
        ten: 'Current Public Flash Sale',
        batDau: new Date(now.getTime() - 100000), // started in the past
        ketThuc: new Date(now.getTime() + 100000), // ends in the future
        isActive: true,
        items: {
          create: {
            productVariantId: product.variants[0].id,
            giaFlashSale: 15000000,
            soLuong: 10,
            daBan: 0
          }
        }
      }
    });
    flashSaleId = flashSale.id;
  });

  afterAll(async () => {
    if (flashSaleId) await prisma.flashSale.delete({ where: { id: flashSaleId } }).catch(() => {});
    if (product) await prisma.product.delete({ where: { id: product.id } }).catch(() => {});
    await prisma.$disconnect();
  });

  it('should return the current active flash sale', async () => {
    const res = await request(app).get('/api/flash-sales/current');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.id).toBe(flashSaleId);
    expect(res.body.data.items).toBeInstanceOf(Array);
    expect(res.body.data.items.length).toBeGreaterThan(0);
    expect(res.body.data.items[0]).toHaveProperty('productVariant');
    expect(res.body.data.items[0].productVariant).toHaveProperty('product');
  });
});
