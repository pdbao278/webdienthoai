/**
 * Prisma seed entry-point.
 *
 * Business logic lives in src/lib/seed.ts (inside TypeScript rootDir).
 * This file is the standard Prisma seed script location required by
 * the "prisma.seed" config in package.json.
 *
 * To run:           npx prisma db seed
 * To force reset:   RESET_DB=true npx prisma db seed
 */
import { seedDatabase, defaultPrisma } from '../src/lib/seed';

if (!process.env.VITEST) {
  seedDatabase()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await defaultPrisma.$disconnect();
    });
}
