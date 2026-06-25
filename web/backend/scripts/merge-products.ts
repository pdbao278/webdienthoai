import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../../../data/dienthoai');

function mergeProductsForBrand(brand: string) {
  const brandDir = path.join(dataDir, brand);
  const dataFile = path.join(brandDir, 'data.json');
  
  if (!fs.existsSync(dataFile)) {
    console.log(`No data.json found for brand ${brand}`);
    return;
  }
  
  const rawData = fs.readFileSync(dataFile, 'utf-8');
  let products: any[];
  try {
    products = JSON.parse(rawData);
  } catch (e) {
    console.error(`Error parsing data.json for ${brand}`);
    return;
  }
  
  const mergedMap = new Map<string, any>();
  
  products.forEach(p => {
    // Tách bỏ phần dung lượng ở cuối (vd: " 256GB", " 1TB")
    const baseName = p.san_pham.replace(/\s\d+(GB|TB)$/i, '').trim();
    
    if (!mergedMap.has(baseName)) {
      // Clone product as base
      const baseProduct = JSON.parse(JSON.stringify(p));
      baseProduct.san_pham = baseName;
      baseProduct.slug = baseProduct.slug.replace(/-\d+(gb|tb)$/i, '');
      baseProduct.id = baseProduct.id.replace(/-\d+(gb|tb)$/i, '');
      
      // Keep only one set of media, but variants will bring their own imageUrls
      mergedMap.set(baseName, baseProduct);
    } else {
      const baseProduct = mergedMap.get(baseName);
      // Append variants
      p.variants.forEach((v: any) => {
        baseProduct.variants.push(v);
      });
    }
  });
  
  // Re-generate SKUs for all variants in the merged products
  const mergedProducts = Array.from(mergedMap.values()).map(p => {
    p.variants = p.variants.map((v: any, idx: number) => {
      v.sku = `${p.slug}-${v.ram_gb}-${v.dung_luong_gb}-${idx}`;
      return v;
    });
    return p;
  });
  
  fs.writeFileSync(dataFile, JSON.stringify(mergedProducts, null, 2));
  console.log(`Merged ${products.length} products into ${mergedProducts.length} for brand ${brand}`);
}

function run() {
  const brands = fs.readdirSync(dataDir).filter(f => fs.statSync(path.join(dataDir, f)).isDirectory());
  brands.forEach(brand => {
    mergeProductsForBrand(brand);
  });
  console.log('Done merging all brands.');
}

run();
