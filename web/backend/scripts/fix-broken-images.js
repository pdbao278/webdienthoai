const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const https = require('https');

const checkUrl = (url) => {
  return new Promise((resolve) => {
    if (!url.startsWith('http')) return resolve(false);
    https.get(url, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    }).on('error', () => resolve(false));
  });
};

const placeholderUrl = 'https://placehold.co/600x600/png?text=PhoneStore';

async function main() {
  console.log('Checking ProductMedia...');
  const media = await prisma.productMedia.findMany();
  for (const m of media) {
    if (m.url.includes('placehold.co')) continue;
    const isOk = await checkUrl(m.url);
    if (!isOk) {
      console.log(`Fixing broken media URL: ${m.url}`);
      await prisma.productMedia.update({
        where: { id: m.id },
        data: { url: placeholderUrl }
      });
    }
  }

  console.log('Checking ProductVariant imageUrls...');
  const variants = await prisma.productVariant.findMany({ where: { imageUrl: { not: null } } });
  for (const v of variants) {
    if (v.imageUrl.includes('placehold.co')) continue;
    const isOk = await checkUrl(v.imageUrl);
    if (!isOk) {
      console.log(`Fixing broken variant URL: ${v.imageUrl}`);
      await prisma.productVariant.update({
        where: { id: v.id },
        data: { imageUrl: placeholderUrl }
      });
    }
  }

  console.log('Done fixing broken images!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
