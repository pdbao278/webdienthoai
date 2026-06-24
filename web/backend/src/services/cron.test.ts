import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient, Role, ProductSegment } from '@prisma/client';
import { autoCancelExpiredOrders } from './cron.service';

const prisma = new PrismaClient();

describe('Cron Service Auto-Cancellation', () => {
  let customerId: string;
  let productId: string;
  let variantId: string;
  let orderId: string;

  beforeAll(async () => {
    // 1. Create a customer
    const customer = await prisma.user.create({
      data: {
        email: `cron_cust_${Date.now()}@test.com`,
        passwordHash: 'pwd',
        role: Role.CUSTOMER
      }
    });
    customerId = customer.id;

    // 2. Create a product and variant
    const product = await prisma.product.create({
      data: {
        slug: `cron-prod-${Date.now()}`,
        sanPham: 'Test Product Cron',
        hang: 'Brand',
        phanKhuc: ProductSegment.TAM_TRUNG,
        variants: {
          create: {
            sku: `cron-sku-${Date.now()}`,
            ramGb: 8,
            dungLuongGb: 128,
            mauSac: 'Black',
            giaGoc: 100,
            giaBan: 90,
            tonKho: 10
          }
        }
      },
      include: { variants: true }
    });
    productId = product.id;
    variantId = product.variants[0].id;

    // 3. Create an order that is expired (appointment time is 25 hours ago)
    const twentyFiveHoursAgo = new Date(Date.now() - 25 * 60 * 60 * 1000);
    const order = await prisma.order.create({
      data: {
        userId: customer.id,
        tongTienHang: 90,
        thanhTien: 90,
        sdtLienHe: '0123456789',
        thoiGianHenLayHang: twentyFiveHoursAgo,
        trangThai: 'DA_DAT',
        maNhanHang: `ORD-CRON-${Date.now()}`,
        items: {
          create: {
            productVariantId: variantId,
            soLuong: 2,
            donGia: 90
          }
        }
      }
    });
    orderId = order.id;
  });

  afterAll(async () => {
    // Cleanup database
    await prisma.orderActivityLog.deleteMany({ where: { orderId } });
    await prisma.orderItem.deleteMany({ where: { orderId } });
    await prisma.order.deleteMany({ where: { id: orderId } });
    await prisma.productVariant.deleteMany({ where: { id: variantId } });
    await prisma.product.deleteMany({ where: { id: productId } });
    await prisma.user.deleteMany({ where: { id: customerId } });
    await prisma.$disconnect();
  });

  it('automatically cancels the order and restores stock', async () => {
    // Check initial stock
    const variantBefore = await prisma.productVariant.findUnique({
      where: { id: variantId }
    });
    expect(variantBefore?.tonKho).toBe(10);

    // Run cron job function
    await autoCancelExpiredOrders();

    // Check order status changed to DA_HUY
    const orderAfter = await prisma.order.findUnique({
      where: { id: orderId }
    });
    expect(orderAfter?.trangThai).toBe('DA_HUY');

    // Check stock was incremented by 2 (should be 12)
    const variantAfter = await prisma.productVariant.findUnique({
      where: { id: variantId }
    });
    expect(variantAfter?.tonKho).toBe(12);

    // Check activity log created
    const logs = await prisma.orderActivityLog.findMany({
      where: { orderId }
    });
    expect(logs.length).toBe(1);
    expect(logs[0].hanhDong).toContain('tự động hủy đơn do quá hạn 24h');
  });
});
