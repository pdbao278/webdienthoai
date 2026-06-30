import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { applyFlashSalePrices } from './flash-sale';

const prisma = new PrismaClient();

describe('Flash Sale Price Logic', () => {
  let product: any;
  let variant: any;
  let flashSale: any;

  beforeAll(async () => {
    try {
      // Create a mock product and variant
      product = await prisma.product.create({
        data: {
          slug: 'test-flash-sale-product-' + Date.now(),
          hang: 'Test',
          sanPham: 'Test Product',
          phanKhuc: 'TAM_TRUNG',
          variants: {
            create: {
              sku: 'TEST-SKU-' + Date.now(),
              ramGb: 8,
              dungLuongGb: 256,
              mauSac: 'Black',
              giaGoc: 15000000,
              giaBan: 14000000,
              tonKho: 10
            }
          }
        },
        include: { variants: true }
      });

      variant = product.variants[0];

      // Create an active flash sale
      const now = new Date();
      flashSale = await prisma.flashSale.create({
        data: {
          ten: 'Test Active Flash Sale',
          batDau: new Date(now.getTime() - 10000), // started 10s ago
          ketThuc: new Date(now.getTime() + 10000), // ends in 10s
          isActive: true,
          items: {
            create: {
              productVariantId: variant.id,
              giaFlashSale: 10000000,
              soLuong: 5,
              daBan: 0
            }
          }
        }
      });
    } catch (e) {
      console.error('ERROR in beforeAll:', e);
      throw e;
    }
  });

  afterAll(async () => {
    await prisma.flashSale.delete({ where: { id: flashSale.id } });
    await prisma.product.delete({ where: { id: product.id } });
    await prisma.$disconnect();
  });

  it('should override giaBan and attach flashSale data for active flash sale', async () => {
    const variants = [variant];
    const result = await applyFlashSalePrices(variants);

    expect(result[0].giaBan).toBe(10000000);
    expect(result[0].giaBanGoc).toBe(14000000);
    expect(result[0].flashSale).toBeDefined();
    expect(result[0].flashSale.soLuong).toBe(5);
    expect(result[0].flashSale.daBan).toBe(0);
  });
});
