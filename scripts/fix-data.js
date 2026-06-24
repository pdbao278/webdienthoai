const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data', 'dienthoai');
const brands = fs.readdirSync(dataDir).filter(f => fs.statSync(path.join(dataDir, f)).isDirectory());

for (const brand of brands) {
  const jsonPath = path.join(dataDir, brand, 'data.json');
  if (!fs.existsSync(jsonPath)) continue;
  
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const newData = data.map(product => {
    const colors = product.mau_sac ? product.mau_sac.split(',').map(c => c.trim()) : ['Mặc định'];
    
    const variants = colors.map((color, idx) => {
      return {
        sku: `${product.slug}-${product.ram_gb || 0}-${product.dung_luong_gb || 0}-${idx}`,
        ram_gb: product.ram_gb || 0,
        dung_luong_gb: product.dung_luong_gb || 0,
        mau_sac: color,
        gia_goc: product.gia_goc || 0,
        gia_ban: product.gia_ban || 0,
        ton_kho: Math.floor((product.ton_kho || 0) / colors.length) || 1,
        image_url: product.media?.images?.[0] || null
      };
    });

    const newProduct = { ...product, variants };
    
    delete newProduct.ram_gb;
    delete newProduct.dung_luong_gb;
    delete newProduct.mau_sac;
    delete newProduct.gia_goc;
    delete newProduct.gia_ban;
    delete newProduct.ton_kho;

    return newProduct;
  });

  fs.writeFileSync(jsonPath, JSON.stringify(newData, null, 2), 'utf8');
}
console.log('Fixed data.json in all brands.');
