const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Finding iPhone 15 Pro Max 256GB...');
  const product = await prisma.product.findFirst({
    where: { slug: 'iphone-15-pro-max-256gb' }
  });

  if (!product) {
    console.log('Not found!');
    return;
  }

  // Rename to generic
  await prisma.product.update({
    where: { id: product.id },
    data: {
      sanPham: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
    }
  });

  // Delete old variants
  await prisma.productVariant.deleteMany({
    where: { productId: product.id }
  });

  // Create new variants
  const variantsToCreate = [
    { ramGb: 8, dungLuongGb: 256, mauSac: 'Titan Tự nhiên', giaGoc: 34990000, giaBan: 29590000, image: 'https://placehold.co/600x600/e6e3dd/000?text=Titan+Tu+Nhien' },
    { ramGb: 8, dungLuongGb: 256, mauSac: 'Titan Đen', giaGoc: 34990000, giaBan: 29090000, image: 'https://placehold.co/600x600/2f2f31/fff?text=Titan+Den' },
    { ramGb: 8, dungLuongGb: 256, mauSac: 'Titan Trắng', giaGoc: 34990000, giaBan: 29290000, image: 'https://placehold.co/600x600/f6f6f6/000?text=Titan+Trang' },

    { ramGb: 8, dungLuongGb: 512, mauSac: 'Titan Tự nhiên', giaGoc: 40990000, giaBan: 35590000, image: 'https://placehold.co/600x600/e6e3dd/000?text=Titan+Tu+Nhien' },
    { ramGb: 8, dungLuongGb: 512, mauSac: 'Titan Đen', giaGoc: 40990000, giaBan: 35090000, image: 'https://placehold.co/600x600/2f2f31/fff?text=Titan+Den' },
    
    { ramGb: 8, dungLuongGb: 1024, mauSac: 'Titan Tự nhiên', giaGoc: 46990000, giaBan: 41590000, image: 'https://placehold.co/600x600/e6e3dd/000?text=Titan+Tu+Nhien' },
  ];

  for (const v of variantsToCreate) {
    await prisma.productVariant.create({
      data: {
        productId: product.id,
        sku: `iphone-15-pro-max-${v.ramGb}-${v.dungLuongGb}-${v.mauSac.replace(/ /g, '-')}`,
        ramGb: v.ramGb,
        dungLuongGb: v.dungLuongGb,
        mauSac: v.mauSac,
        giaGoc: v.giaGoc,
        giaBan: v.giaBan,
        tonKho: 10,
        imageUrl: v.image
      }
    });
  }

  console.log('Added 6 variants for iPhone 15 Pro Max!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
