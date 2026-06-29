import cron from 'node-cron';
import prisma from '../lib/prisma';

export const autoCancelExpiredOrders = async () => {
  console.log('Running auto-cancel orders cronjob...');
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const expiredOrders = await prisma.order.findMany({
      where: {
        trangThai: { in: ['DA_DAT', 'DANG_CHUAN_BI', 'CHO_NHAN_HANG'] },
        thoiGianHenLayHang: {
          lt: oneDayAgo
        }
      },
      include: { items: true }
    });

    for (const order of expiredOrders) {
      await prisma.$transaction(async (tx: any) => {
        await tx.order.update({
          where: { id: order.id },
          data: { trangThai: 'DA_HUY' }
        });

        for (const item of order.items) {
          await tx.productVariant.update({
            where: { id: item.productVariantId },
            data: { tonKho: { increment: item.soLuong } }
          });
        }

        await tx.orderActivityLog.create({
          data: {
            orderId: order.id,
            hanhDong: 'Hệ thống tự động hủy đơn do quá hạn 24h kể từ thời gian hẹn',
          }
        });
      });
      console.log(`Auto-canceled order ${order.maNhanHang}`);
    }
  } catch (error) {
    console.error('Error running auto-cancel cronjob', error);
  }
};

export const startCronJobs = () => {
  // Run every hour
  cron.schedule('0 * * * *', autoCancelExpiredOrders);
};

