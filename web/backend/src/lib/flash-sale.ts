import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getActiveFlashSaleMap() {
  const now = new Date();
  
  // Find active flash sales
  const activeFlashSales = await prisma.flashSale.findMany({
    where: {
      isActive: true,
      batDau: { lte: now },
      ketThuc: { gte: now }
    },
    include: {
      items: true
    }
  });

  const flashSaleMap = new Map();
  if (activeFlashSales.length === 0) return flashSaleMap;

  activeFlashSales.forEach(fs => {
    fs.items.forEach(item => {
      // Ensure we haven't sold out
      if (item.daBan < item.soLuong) {
        flashSaleMap.set(item.productVariantId, {
          giaFlashSale: item.giaFlashSale,
          soLuong: item.soLuong,
          daBan: item.daBan,
          flashSaleId: fs.id,
          flashSaleItemId: item.id
        });
      }
    });
  });

  return flashSaleMap;
}

export async function applyFlashSalePrices(variants: any[]) {
  if (!variants || variants.length === 0) return variants;

  const flashSaleMap = await getActiveFlashSaleMap();
  if (flashSaleMap.size === 0) return variants;

  // Apply prices
  return variants.map(variant => {
    const fsData = flashSaleMap.get(variant.id);
    if (fsData) {
      return {
        ...variant,
        giaBanGoc: variant.giaBan, // Keep original price
        giaBan: fsData.giaFlashSale, // Show the flash sale price in UI
        flashSale: {
          daBan: fsData.daBan,
          soLuong: fsData.soLuong,
          giaGoc: variant.giaBan,
          flashSaleItemId: fsData.flashSaleItemId
        }
      };
    }
    return variant;
  });
}

// Hàm tính tiền theo logic: tối đa 1 sản phẩm giá Flash Sale, còn lại giá gốc
export function calculateItemPrice(itemQty: number, giaBanGoc: number, flashSaleData?: any) {
  if (!flashSaleData || flashSaleData.daBan >= flashSaleData.soLuong) {
    return giaBanGoc * itemQty;
  }
  // Nếu có flash sale
  if (itemQty === 1) {
    return flashSaleData.giaFlashSale;
  } else {
    return flashSaleData.giaFlashSale + (itemQty - 1) * giaBanGoc;
  }
}

