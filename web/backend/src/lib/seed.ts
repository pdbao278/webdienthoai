import { PrismaClient, ProductSegment, Role, DiscountType, MediaType } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

// Default singleton — only used when running the script directly (not in tests)
const defaultPrisma = new PrismaClient();

export interface SeedOptions {
  forceReset?: boolean;
  /** Inject a prisma-compatible client (used in tests for mocking) */
  db?: any;
  /**
   * Override the root data directory (defaults to <repo-root>/data).
   * Useful in tests to point to a fixture directory.
   */
  dataRoot?: string;
}

export interface SeedResult {
  skipped: boolean;
}

/**
 * Seeds the database with initial data.
 *
 * By default this is a SAFE operation:
 *  - If the database already has users or products, seeding is skipped.
 *  - Pass `forceReset: true` (or set env RESET_DB=true) to wipe and re-seed.
 *
 * Accepts an optional `db` injection for unit-testing without hitting a real database.
 */
export async function seedDatabase(options: SeedOptions = {}): Promise<SeedResult> {
  const db = options.db ?? defaultPrisma;
  const forceReset = options.forceReset ?? (process.env.RESET_DB === 'true');
  // Resolve the monorepo root robustly by walking up from __dirname
  // until we find the package.json whose "name" is "phonestore-monorepo".
  const findMonorepoRoot = (startDir: string): string => {
    let dir = startDir;
    for (let i = 0; i < 8; i++) {
      const pkgPath = path.join(dir, 'package.json');
      if (fs.existsSync(pkgPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
          if (pkg.name === 'phonestore-monorepo') return dir;
        } catch { /* continue */ }
      }
      const parent = path.dirname(dir);
      if (parent === dir) break; // filesystem root
      dir = parent;
    }
    // Fallback: 4 levels up from src/lib (web/backend/src/lib → webdienthoai/)
    return path.resolve(startDir, '../../../../');
  };

  const repoRoot = options.dataRoot ?? findMonorepoRoot(__dirname);
  // The Next.js frontend serves static files from web/frontend/public/.
  // Image paths stored in DB are relative URLs like /data/dienthoai/Brand/.../front.png
  // which Next.js resolves from its public/ folder.
  const publicRoot = path.join(repoRoot, 'web', 'frontend', 'public');

  const hasUsers = await db.user.count();
  const hasProducts = await db.product.count();

  if (hasUsers > 0 || hasProducts > 0) {
    if (!forceReset) {
      console.log('Database already has data. Skipping wipe to prevent data loss.');
      console.log('Run with RESET_DB=true or pass forceReset: true to force a wipe and re-seed.');
      return { skipped: true };
    }
  }

  console.log('Start seeding from data directory (Database will be reset)...');

  // Delete old data in dependency order (deepest relations first)
  // @ts-ignore - Prisma generated type cache can lag in IDE
  await db.review.deleteMany();
  await db.orderActivityLog.deleteMany();
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.cartItem.deleteMany();
  await db.flashSaleItem?.deleteMany?.();
  await db.flashSale?.deleteMany?.();
  await db.voucher.deleteMany();
  await db.productVariant.deleteMany();
  await db.productMedia.deleteMany();
  await db.product.deleteMany();
  await db.user.deleteMany();

  // 1. Create Admin User
  const admin = await db.user.create({
    data: {
      email: 'accfamlala1@gmail.com',
      passwordHash: bcrypt.hashSync('123456', 10),
      hoTen: 'Admin Store',
      role: Role.ADMIN,
      emailVerified: new Date(),
    }
  });

  // 2. Seed Vouchers
  const vouchersPath = path.join(repoRoot, 'data', 'vouchers.json');
  if (fs.existsSync(vouchersPath)) {
    let vouchersData = JSON.parse(fs.readFileSync(vouchersPath, 'utf-8'));
    // Limit volume in test environments for speed
    if (process.env.VITEST === 'true') {
      vouchersData = vouchersData.slice(0, 1);
    }
    for (const v of vouchersData) {
      await db.voucher.create({
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

  // 3. Seed Products from data/dienthoai/<Brand>/data.json
  const dataDir = path.join(repoRoot, 'data', 'dienthoai');
  const brands = fs.readdirSync(dataDir).filter(b => fs.statSync(path.join(dataDir, b)).isDirectory());

  let productCount = 0;

  const getActualPath = (imgPath: string): string => {
    // Prefer checking in web/frontend/public/ first (where Next.js serves static files),
    // then fall back to monorepo root. This ensures DB URLs match what Next.js can serve.
    const roots = [publicRoot, repoRoot];
    const exts = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

    for (const root of roots) {
      // 1. Try the exact path as given
      if (fs.existsSync(path.join(root, imgPath))) return imgPath;

      // 2. Try swapping extension (e.g. .svg → .png, .jpg, etc.)
      const extless = imgPath.substring(0, imgPath.lastIndexOf('.'));
      for (const ext of exts) {
        const candidate = extless + ext;
        if (fs.existsSync(path.join(root, candidate))) return candidate;
      }
    }

    // No file found anywhere — return original path as-is (will show broken image)
    return imgPath;
  };

  for (const brand of brands) {
    if (process.env.VITEST === 'true' && productCount >= 1) break;

    const dataJsonPath = path.join(dataDir, brand, 'data.json');
    if (!fs.existsSync(dataJsonPath)) continue;

    const products = JSON.parse(fs.readFileSync(dataJsonPath, 'utf-8'));
    for (const p of products) {
      if (process.env.VITEST === 'true' && productCount >= 1) break;

      // Map segment enum
      let segment: ProductSegment = ProductSegment.PHO_THONG;
      const pkhuc = (p.phan_khuc || '').toLowerCase();
      if (pkhuc.includes('flagship')) segment = ProductSegment.FLAGSHIP;
      else if (pkhuc.includes('tam_trung')) segment = ProductSegment.TAM_TRUNG;
      else if (pkhuc.includes('gaming')) segment = ProductSegment.GAMING;

      // Build media list
      const mediaList: any[] = [];
      let thuTu = 0;

      if (p.media?.images) {
        p.media.images.forEach((img: string, idx: number) => {
          mediaList.push({
            url: `/${getActualPath(img)}`,
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

      // Fallback placeholder if no media
      if (mediaList.length === 0) {
        mediaList.push({
          url: 'https://placehold.co/600x600/png?text=No+Image',
          loai: MediaType.IMAGE,
          isThumbnail: true,
          thuTu: 0
        });
      }

      // Build variants
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

      await db.product.create({
        data: {
          slug: p.slug,
          hang: p.hang,
          sanPham: p.san_pham,
          phanKhuc: segment,
          moTa: p.mo_ta || null,
          manHinhCongNghe: p.man_hinh_cong_nghe ? String(p.man_hinh_cong_nghe) : null,
          manHinhKichThuoc: p.man_hinh_kich_thuoc ?? null,
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
          media: { create: mediaList },
          variants: { create: variants }
        }
      });
      productCount++;
    }
  }

  console.log(`Seeded ${productCount} products.`);
  console.log('Seeding finished.');
  return { skipped: false };
}

export { defaultPrisma };
