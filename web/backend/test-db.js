const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const media = await prisma.productMedia.findFirst();
  console.log(media);
  const variant = await prisma.productVariant.findFirst();
  console.log(variant);
}
main().finally(() => prisma.$disconnect());
