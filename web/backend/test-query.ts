import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const p1 = await prisma.product.findUnique({where:{slug:'redmi-a3-64gb'}});
  console.log('redmi-a3-64gb:', p1 ? p1.id : 'null');
  
  const p2 = await prisma.product.findUnique({where:{slug:'redmi-a3'}});
  console.log('redmi-a3:', p2 ? p2.id : 'null');
  
  const all = await prisma.product.findMany({select: {slug: true}});
  console.log(all.map(p => p.slug).filter(s => s.includes('redmi-a3')));
}

main().finally(() => prisma.$disconnect());
