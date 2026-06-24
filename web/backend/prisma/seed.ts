import { PrismaClient, ProductSegment } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Xóa dữ liệu cũ (chú ý thứ tự do ràng buộc khóa ngoại)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productMedia.deleteMany();
  await prisma.product.deleteMany();

  const productsData = [
    {
      hang: 'Apple',
      sanPham: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      phanKhuc: ProductSegment.FLAGSHIP,
      giaGoc: 34990000,
      giaBan: 29990000,
      tonKho: 50,
      moTa: 'iPhone 15 Pro Max với thiết kế titan nguyên khối, chip A17 Pro mạnh mẽ...',
      manHinhCongNghe: 'Super Retina XDR OLED',
      manHinhKichThuoc: 6.7,
      manHinhDoPhanGiai: '2796 x 1290',
      manHinhTanSoQuet: 120,
      cameraSau: '48MP + 12MP + 12MP',
      cameraTruoc: '12MP',
      chip: 'Apple A17 Pro',
      ramGb: 8,
      dungLuongGb: 256,
      heDieuHanh: 'iOS 17',
      pinMah: 4422,
      sacNhanhW: 27,
      hoTro5g: true,
      nfc: true,
      sim: '1 Nano SIM & 1 eSIM',
      trongLuongG: 221,
      chongNuoc: 'IP68',
      mauSac: 'Titan Tự nhiên, Titan Đen, Titan Xanh, Titan Trắng',
      media: [
        {
          url: 'https://res.cloudinary.com/dw9catzob/image/upload/v1782227129/phonestore/products/Apple/iphone-15-pro-max-256gb/front.webp',
          publicId: 'iphone-15-pro-max-blue',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'Samsung',
      sanPham: 'Samsung Galaxy S24 Ultra 5G 256GB',
      slug: 'samsung-galaxy-s24-ultra-5g-256gb',
      phanKhuc: ProductSegment.FLAGSHIP,
      giaGoc: 33990000,
      giaBan: 30490000,
      tonKho: 30,
      moTa: 'Galaxy S24 Ultra mở ra kỷ nguyên AI mới với khung viền Titanium bền bỉ...',
      manHinhCongNghe: 'Dynamic AMOLED 2X',
      manHinhKichThuoc: 6.8,
      manHinhDoPhanGiai: 'QHD+ (3120 x 1440)',
      manHinhTanSoQuet: 120,
      cameraSau: '200MP + 50MP + 12MP + 10MP',
      cameraTruoc: '12MP',
      chip: 'Snapdragon 8 Gen 3 for Galaxy',
      ramGb: 12,
      dungLuongGb: 256,
      heDieuHanh: 'Android 14',
      pinMah: 5000,
      sacNhanhW: 45,
      hoTro5g: true,
      nfc: true,
      sim: '2 Nano SIM hoặc 1 Nano + 1 eSIM',
      trongLuongG: 232,
      chongNuoc: 'IP68',
      mauSac: 'Đen, Xám, Tím, Vàng',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'samsung-galaxy-s24-ultra-grey',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'Xiaomi',
      sanPham: 'Xiaomi 14 5G',
      slug: 'xiaomi-14-5g',
      phanKhuc: ProductSegment.FLAGSHIP,
      giaGoc: 22990000,
      giaBan: 21990000,
      tonKho: 40,
      moTa: 'Cùng Xiaomi 14 trải nghiệm sức mạnh vượt trội từ Snapdragon 8 Gen 3...',
      manHinhCongNghe: 'AMOLED',
      manHinhKichThuoc: 6.36,
      manHinhDoPhanGiai: '1.5K (2670 x 1200)',
      manHinhTanSoQuet: 120,
      cameraSau: '50MP + 50MP + 50MP',
      cameraTruoc: '32MP',
      chip: 'Snapdragon 8 Gen 3',
      ramGb: 12,
      dungLuongGb: 256,
      heDieuHanh: 'Android 14',
      pinMah: 4610,
      sacNhanhW: 90,
      hoTro5g: true,
      nfc: true,
      sim: '2 Nano SIM',
      trongLuongG: 193,
      chongNuoc: 'IP68',
      mauSac: 'Đen, Trắng, Xanh Lá',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'xiaomi-14-green',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'OPPO',
      sanPham: 'OPPO Reno11 5G',
      slug: 'oppo-reno11-5g',
      phanKhuc: ProductSegment.TAM_TRUNG,
      giaGoc: 10990000,
      giaBan: 10490000,
      tonKho: 60,
      moTa: 'OPPO Reno11 5G với thiết kế thời thượng, camera chân dung siêu nét...',
      manHinhCongNghe: 'AMOLED',
      manHinhKichThuoc: 6.7,
      manHinhDoPhanGiai: 'FHD+ (2412 x 1080)',
      manHinhTanSoQuet: 120,
      cameraSau: '50MP + 32MP + 8MP',
      cameraTruoc: '32MP',
      chip: 'MediaTek Dimensity 7050',
      ramGb: 8,
      dungLuongGb: 256,
      heDieuHanh: 'Android 14',
      pinMah: 5000,
      sacNhanhW: 67,
      hoTro5g: true,
      nfc: true,
      sim: '2 Nano SIM',
      trongLuongG: 182,
      chongNuoc: 'IP54',
      mauSac: 'Xanh Lá, Xám',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'oppo-reno11-xanh',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'Samsung',
      sanPham: 'Samsung Galaxy A55 5G 128GB',
      slug: 'samsung-galaxy-a55-5g-128gb',
      phanKhuc: ProductSegment.TAM_TRUNG,
      giaGoc: 9990000,
      giaBan: 9490000,
      tonKho: 80,
      moTa: 'Galaxy A55 5G với thiết kế cao cấp viền kim loại, camera sắc nét...',
      manHinhCongNghe: 'Super AMOLED',
      manHinhKichThuoc: 6.6,
      manHinhDoPhanGiai: 'FHD+ (2340 x 1080)',
      manHinhTanSoQuet: 120,
      cameraSau: '50MP + 12MP + 5MP',
      cameraTruoc: '32MP',
      chip: 'Exynos 1480',
      ramGb: 8,
      dungLuongGb: 128,
      heDieuHanh: 'Android 14',
      pinMah: 5000,
      sacNhanhW: 25,
      hoTro5g: true,
      nfc: true,
      sim: '2 Nano SIM',
      trongLuongG: 213,
      chongNuoc: 'IP67',
      mauSac: 'Xanh Đen, Xanh Dương, Tím',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'samsung-galaxy-a55-5g-blue',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'vivo',
      sanPham: 'vivo V30 5G',
      slug: 'vivo-v30-5g',
      phanKhuc: ProductSegment.TAM_TRUNG,
      giaGoc: 13990000,
      giaBan: 13490000,
      tonKho: 40,
      moTa: 'vivo V30 5G với vòng sáng Aura chân dung thế hệ mới...',
      manHinhCongNghe: 'AMOLED',
      manHinhKichThuoc: 6.78,
      manHinhDoPhanGiai: '1.5K (2800 x 1260)',
      manHinhTanSoQuet: 120,
      cameraSau: '50MP + 50MP',
      cameraTruoc: '50MP',
      chip: 'Snapdragon 7 Gen 3',
      ramGb: 12,
      dungLuongGb: 256,
      heDieuHanh: 'Android 14',
      pinMah: 5000,
      sacNhanhW: 80,
      hoTro5g: true,
      nfc: true,
      sim: '2 Nano SIM',
      trongLuongG: 186,
      chongNuoc: 'IP54',
      mauSac: 'Đen, Xanh, Trắng',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'vivo-v30-5g-den',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'Apple',
      sanPham: 'iPhone 13 128GB',
      slug: 'iphone-13-128gb',
      phanKhuc: ProductSegment.TAM_TRUNG,
      giaGoc: 15990000,
      giaBan: 13990000,
      tonKho: 100,
      moTa: 'iPhone 13 mang đến hệ thống camera kép tiên tiến, chip A15 Bionic...',
      manHinhCongNghe: 'Super Retina XDR OLED',
      manHinhKichThuoc: 6.1,
      manHinhDoPhanGiai: '2532 x 1170',
      manHinhTanSoQuet: 60,
      cameraSau: '12MP + 12MP',
      cameraTruoc: '12MP',
      chip: 'Apple A15 Bionic',
      ramGb: 4,
      dungLuongGb: 128,
      heDieuHanh: 'iOS 17',
      pinMah: 3240,
      sacNhanhW: 20,
      hoTro5g: true,
      nfc: true,
      sim: '1 Nano SIM & 1 eSIM',
      trongLuongG: 174,
      chongNuoc: 'IP68',
      mauSac: 'Hồng, Xanh Dương, Đen, Trắng, Đỏ',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'iphone-13-pink',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'realme',
      sanPham: 'realme C67',
      slug: 'realme-c67',
      phanKhuc: ProductSegment.PHO_THONG,
      giaGoc: 5990000,
      giaBan: 5490000,
      tonKho: 70,
      moTa: 'realme C67 nổi bật với camera 108MP, chip Snapdragon 685...',
      manHinhCongNghe: 'IPS LCD',
      manHinhKichThuoc: 6.72,
      manHinhDoPhanGiai: 'FHD+ (2400 x 1080)',
      manHinhTanSoQuet: 90,
      cameraSau: '108MP + 2MP',
      cameraTruoc: '8MP',
      chip: 'Snapdragon 685',
      ramGb: 8,
      dungLuongGb: 128,
      heDieuHanh: 'Android 14',
      pinMah: 5000,
      sacNhanhW: 33,
      hoTro5g: false,
      nfc: false,
      sim: '2 Nano SIM',
      trongLuongG: 185,
      chongNuoc: 'IP54',
      mauSac: 'Xanh, Đen',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'realme-c67-den',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'HONOR',
      sanPham: 'HONOR X9b 5G',
      slug: 'honor-x9b-5g',
      phanKhuc: ProductSegment.TAM_TRUNG,
      giaGoc: 8990000,
      giaBan: 8490000,
      tonKho: 50,
      moTa: 'HONOR X9b nổi tiếng với màn hình siêu bền chống rơi vỡ...',
      manHinhCongNghe: 'AMOLED',
      manHinhKichThuoc: 6.78,
      manHinhDoPhanGiai: '1.5K (2652 x 1200)',
      manHinhTanSoQuet: 120,
      cameraSau: '108MP + 5MP + 2MP',
      cameraTruoc: '16MP',
      chip: 'Snapdragon 6 Gen 1',
      ramGb: 12,
      dungLuongGb: 256,
      heDieuHanh: 'Android 13',
      pinMah: 5800,
      sacNhanhW: 35,
      hoTro5g: true,
      nfc: true,
      sim: '2 Nano SIM',
      trongLuongG: 185,
      chongNuoc: 'Không',
      mauSac: 'Cam, Đen, Bạc',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'honor-x9b-orange',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'Tecno',
      sanPham: 'Tecno Pova 6 Pro 5G',
      slug: 'tecno-pova-6-pro-5g',
      phanKhuc: ProductSegment.GAMING,
      giaGoc: 7490000,
      giaBan: 6990000,
      tonKho: 60,
      moTa: 'Tecno Pova 6 Pro thiết kế đậm chất gaming với đèn LED mặt lưng...',
      manHinhCongNghe: 'AMOLED',
      manHinhKichThuoc: 6.78,
      manHinhDoPhanGiai: 'FHD+ (2436 x 1080)',
      manHinhTanSoQuet: 120,
      cameraSau: '108MP + 2MP + 0.08MP',
      cameraTruoc: '32MP',
      chip: 'MediaTek Dimensity 6080',
      ramGb: 8,
      dungLuongGb: 256,
      heDieuHanh: 'Android 14',
      pinMah: 6000,
      sacNhanhW: 70,
      hoTro5g: true,
      nfc: true,
      sim: '2 Nano SIM',
      trongLuongG: 195,
      chongNuoc: 'IP53',
      mauSac: 'Xám, Xanh Lá',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'tecno-pova-6-pro-grey',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'Motorola',
      sanPham: 'Motorola Edge 40',
      slug: 'motorola-edge-40',
      phanKhuc: ProductSegment.TAM_TRUNG,
      giaGoc: 11990000,
      giaBan: 10990000,
      tonKho: 25,
      moTa: 'Motorola Edge 40 mỏng nhẹ, sang trọng với màn hình cong pOLED...',
      manHinhCongNghe: 'pOLED',
      manHinhKichThuoc: 6.55,
      manHinhDoPhanGiai: 'FHD+ (2400 x 1080)',
      manHinhTanSoQuet: 144,
      cameraSau: '50MP + 13MP',
      cameraTruoc: '32MP',
      chip: 'MediaTek Dimensity 8020',
      ramGb: 8,
      dungLuongGb: 256,
      heDieuHanh: 'Android 13',
      pinMah: 4400,
      sacNhanhW: 68,
      hoTro5g: true,
      nfc: true,
      sim: '1 Nano SIM & 1 eSIM',
      trongLuongG: 167,
      chongNuoc: 'IP68',
      mauSac: 'Đen, Xanh, Đỏ',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'motorola-edge-40-black',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'Nubia',
      sanPham: 'Nubia RedMagic 9 Pro',
      slug: 'nubia-redmagic-9-pro',
      phanKhuc: ProductSegment.GAMING,
      giaGoc: 21990000,
      giaBan: 20990000,
      tonKho: 20,
      moTa: 'RedMagic 9 Pro là quái thú gaming với quạt tản nhiệt tích hợp...',
      manHinhCongNghe: 'AMOLED',
      manHinhKichThuoc: 6.8,
      manHinhDoPhanGiai: 'FHD+ (2480 x 1116)',
      manHinhTanSoQuet: 120,
      cameraSau: '50MP + 50MP + 2MP',
      cameraTruoc: '16MP',
      chip: 'Snapdragon 8 Gen 3',
      ramGb: 12,
      dungLuongGb: 256,
      heDieuHanh: 'Android 14',
      pinMah: 6500,
      sacNhanhW: 80,
      hoTro5g: true,
      nfc: true,
      sim: '2 Nano SIM',
      trongLuongG: 229,
      chongNuoc: 'Không',
      mauSac: 'Đen, Trắng, Trong suốt',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'nubia-redmagic-9-pro-black',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    },
    {
      hang: 'Nokia',
      sanPham: 'Nokia G22',
      slug: 'nokia-g22',
      phanKhuc: ProductSegment.PHO_THONG,
      giaGoc: 3990000,
      giaBan: 3490000,
      tonKho: 120,
      moTa: 'Nokia G22 nổi bật với thiết kế thân thiện, dễ dàng tự sửa chữa...',
      manHinhCongNghe: 'IPS LCD',
      manHinhKichThuoc: 6.5,
      manHinhDoPhanGiai: 'HD+ (1600 x 720)',
      manHinhTanSoQuet: 90,
      cameraSau: '50MP + 2MP + 2MP',
      cameraTruoc: '8MP',
      chip: 'Unisoc T606',
      ramGb: 4,
      dungLuongGb: 128,
      heDieuHanh: 'Android 12',
      pinMah: 5050,
      sacNhanhW: 20,
      hoTro5g: false,
      nfc: true,
      sim: '2 Nano SIM',
      trongLuongG: 196,
      chongNuoc: 'IP52',
      mauSac: 'Xám, Xanh dương',
      media: [
        {
          url: 'https://placehold.co/600x600/png?text=PhoneStore',
          publicId: 'nokia-g22-grey',
          loai: 'IMAGE',
          isThumbnail: true,
        }
      ]
    }
  ];

  for (const productData of productsData) {
    const { media, ramGb, dungLuongGb, mauSac, giaGoc, giaBan, tonKho, ...data } = productData as any;
    
    const colors = mauSac ? mauSac.split(',').map((c: string) => c.trim()) : ['Mặc định'];
    const variants = colors.map((color: string, index: number) => ({
      sku: `${data.slug}-${ramGb || 0}-${dungLuongGb || 0}-${index}`,
      ramGb: ramGb || 0,
      dungLuongGb: dungLuongGb || 0,
      mauSac: color,
      giaGoc: giaGoc || 0,
      giaBan: (data.slug === 'iphone-15-pro-max-256gb' && color === 'Titan Tự nhiên') ? 35000000 : (giaBan || 0),
      tonKho: Math.floor((tonKho || 0) / colors.length) || 1,
      imageUrl: media[0]?.url || null
    }));

    const product = await prisma.product.create({
      data: {
        ...data,
        variants: {
          create: variants
        },
        media: {
          create: media
        }
      }
    });
    console.log(`Created product: ${product.sanPham}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
