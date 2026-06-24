const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const generateSlug = (str) => {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};

const parseGb = (str) => {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

const mapSegment = (cat) => {
  if (cat === 'flagship') return 'FLAGSHIP';
  if (cat === 'midrange') return 'TAM_TRUNG';
  if (cat === 'budget') return 'PHO_THONG';
  if (cat === 'gaming') return 'GAMING';
  return 'PHO_THONG';
};

async function main() {
  console.log('Clearing database...');
  await prisma.orderActivityLog.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productMedia.deleteMany();
  await prisma.product.deleteMany();

  console.log('Reading mockup_products.json...');
  const dataPath = path.join(__dirname, '../../../mockup_products.json');
  const productsRaw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const products = Object.values(productsRaw);

  console.log(`Seeding ${products.length} products...`);
  for (const p of products) {
    const slug = generateSlug(p.name);
    
    // Parse specs safely
    const specs = p.specs || {};
    const screenMatch = specs.screen?.match(/(\d+\.?\d*)/);
    const manHinhKichThuoc = screenMatch ? parseFloat(screenMatch[1]) : 6.0;
    
    // Parse price
    const giaGoc = parseInt(p.priceOld?.replace(/[^\d]/g, '')) || p.rawPrice + 2000000;
    const giaBan = parseInt(p.priceCurrent?.replace(/[^\d]/g, '')) || p.rawPrice;

    const mediaList = [];
    if (p.imageFront) mediaList.push({ url: p.imageFront, isThumbnail: true, thuTu: 0 });
    if (p.imageBack) mediaList.push({ url: p.imageBack, isThumbnail: false, thuTu: 1 });
    if (p.imageDetail) mediaList.push({ url: p.imageDetail, isThumbnail: false, thuTu: 2 });

    const ramGb = parseGb(p.ram || '8GB');
    const dungLuongGb = parseGb(p.storage || '128GB');

    const created = await prisma.product.create({
      data: {
        hang: p.brand,
        sanPham: p.name,
        slug: slug,
        phanKhuc: mapSegment(p.category),
        moTa: p.description,
        manHinhCongNghe: specs.screen || 'AMOLED',
        manHinhKichThuoc: manHinhKichThuoc,
        manHinhDoPhanGiai: p.resolution || 'FHD+',
        manHinhTanSoQuet: parseInt(p.refreshRate) || 120,
        cameraSau: '50MP',
        cameraTruoc: '16MP',
        chip: specs.chip || 'Snapdragon',
        heDieuHanh: specs.os || p.type,
        pinMah: parseInt(specs.battery) || 5000,
        sacNhanhW: 33,
        hoTro5g: p.specialFeatures?.includes('5G') || false,
        nfc: p.specialFeatures?.includes('nfc') || false,
        sim: '2 Nano SIM',
        trongLuongG: 200,
        chongNuoc: p.specialFeatures?.includes('waterResist') ? 'Có' : 'Không',
        variants: {
          create: [
            {
              sku: `${slug}-${ramGb}-${dungLuongGb}-0`,
              ramGb: ramGb,
              dungLuongGb: dungLuongGb,
              mauSac: "Đen",
              giaGoc: giaGoc,
              giaBan: giaBan,
              tonKho: 50,
              imageUrl: p.imageFront || null
            }
          ]
        },
        media: {
          create: mediaList.map(m => ({
            url: m.url,
            isThumbnail: m.isThumbnail,
            thuTu: m.thuTu
          }))
        }
      }
    });
    console.log(`Created ${created.sanPham}`);
  }
  console.log('Done seeding from mockup data.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
