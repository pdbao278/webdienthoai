import { PrismaClient, ProductSegment, Role, DiscountType, MediaType } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding from data directory...');

  // Delete old data
  // @ts-ignore - Prisma type cache issue in IDE
  await prisma.review.deleteMany();
  await prisma.orderActivityLog.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.voucher.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productMedia.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'accfamlala1@gmail.com',
      passwordHash: bcrypt.hashSync('123456', 10),
      hoTen: 'Admin Store',
      role: Role.ADMIN,
      emailVerified: new Date(),
    }
  });

  // 2. Read Vouchers
  const vouchersPath = path.resolve(__dirname, '../../../data/vouchers.json');
  if (fs.existsSync(vouchersPath)) {
    const vouchersData = JSON.parse(fs.readFileSync(vouchersPath, 'utf-8'));
    for (const v of vouchersData) {
      await prisma.voucher.create({
        data: {
          maVoucher: v.ma_voucher,
          loaiGiamGia: v.loai_giam_gia === 'phan_tram' ? DiscountType.PERCENTAGE : DiscountType.FIXED_AMOUNT,
          giaTri: v.gia_tri,
          toiDaGiam: v.toi_da_giam,
          donToiThieu: v.don_toi_thieu,
          apDungCho: v.ap_dung_cho,
          batDau: new Date(v.bat_dau),
          ketThuc: new Date(v.ket_thuc),
          soLuong: v.so_luong,
          daSuDung: v.da_su_dung || 0,
          nguoiTaoId: admin.id,
        }
      });
    }
    console.log(`Seeded ${vouchersData.length} vouchers.`);
  }

  // 3. Read Products
  const dataDir = path.resolve(__dirname, '../../../data/dienthoai');
  const brands = fs.readdirSync(dataDir).filter(b => fs.statSync(path.join(dataDir, b)).isDirectory());
  
  let productCount = 0;
  for (const brand of brands) {
    const dataJsonPath = path.join(dataDir, brand, 'data.json');
    if (!fs.existsSync(dataJsonPath)) continue;

    const products = JSON.parse(fs.readFileSync(dataJsonPath, 'utf-8'));
    for (const p of products) {
      // Map Segment
      let segment: ProductSegment = ProductSegment.PHO_THONG;
      const pkhuc = (p.phan_khuc || '').toLowerCase();
      if (pkhuc.includes('flagship')) segment = ProductSegment.FLAGSHIP;
      else if (pkhuc.includes('tam_trung')) segment = ProductSegment.TAM_TRUNG;
      else if (pkhuc.includes('gaming')) segment = ProductSegment.GAMING;

      // Prepare Media
      const mediaList: any[] = [];
      let thuTu = 0;
      
      const getActualPath = (imgPath: string) => {
        const fullPath = path.resolve(__dirname, '../../../', imgPath);
        if (fs.existsSync(fullPath)) return imgPath;
        const extless = imgPath.substring(0, imgPath.lastIndexOf('.'));
        const exts = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];
        for (const ext of exts) {
            const testPath = extless + ext;
            if (fs.existsSync(path.resolve(__dirname, '../../../', testPath))) {
                return testPath;
            }
        }
        return imgPath;
      };

      if (p.media?.images) {
        p.media.images.forEach((img: string, idx: number) => {
          mediaList.push({
            url: `/${getActualPath(img)}`, // Make it a relative absolute path for frontend
            loai: MediaType.IMAGE,
            isThumbnail: idx === 0,
            thuTu: thuTu++
          });
        });
      }
      if (p.media?.videos) {
        p.media.videos.forEach((vid: string) => {
          mediaList.push({
            url: `/${getActualPath(vid)}`,
            loai: MediaType.VIDEO,
            isThumbnail: false,
            thuTu: thuTu++
          });
        });
      }

      // Prepare Variants
      const variants = (p.variants || []).map((v: any) => ({
        sku: v.sku,
        ramGb: v.ram_gb || 0,
        dungLuongGb: v.dung_luong_gb || 0,
        mauSac: v.mau_sac || 'Mặc định',
        giaGoc: v.gia_goc || 0,
        giaBan: v.gia_ban || 0,
        tonKho: v.ton_kho || 0,
        imageUrl: v.image_url ? `/${getActualPath(v.image_url)}` : null
      }));

      // In case no media, we add a placeholder
      if (mediaList.length === 0) {
        mediaList.push({
          url: 'https://placehold.co/600x600/png?text=No+Image',
          loai: MediaType.IMAGE,
          isThumbnail: true,
          thuTu: 0
        });
      }

      await prisma.product.create({
        data: {
          slug: p.slug,
          hang: p.hang,
          sanPham: p.san_pham,
          phanKhuc: segment,
          moTa: p.mo_ta || null,
          manHinhCongNghe: p.man_hinh_cong_nghe ? String(p.man_hinh_cong_nghe) : null,
          manHinhKichThuoc: p.man_hinh_kich_thuoc ? p.man_hinh_kich_thuoc : null,
          manHinhDoPhanGiai: p.man_hinh_do_phan_giai || null,
          manHinhTanSoQuet: p.man_hinh_tan_so_quet || null,
          cameraSau: p.camera_sau || null,
          cameraSauTinhNang: p.camera_sau_tinh_nang || null,
          cameraTruoc: p.camera_truoc || null,
          chip: p.chip || null,
          heDieuHanh: p.he_dieu_hanh || null,
          pinMah: p.pin_mah || null,
          sacNhanhW: p.sac_nhanh_w || null,
          hoTro5g: p.ho_tro_5g || false,
          nfc: p.nfc || false,
          sim: p.sim || null,
          trongLuongG: p.trong_luong_g || null,
          chongNuoc: p.chong_nuoc || null,
          media: {
            create: mediaList
          },
          variants: {
            create: variants
          }
        }
      });
      productCount++;
    }
  }

  console.log(`Seeded ${productCount} products.`);
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
