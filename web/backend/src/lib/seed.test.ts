import { describe, it, expect, vi, beforeEach } from 'vitest';
import { seedDatabase } from './seed';

// Create a fully mocked db client matching the Prisma interface used in seed.ts
const createMockDb = () => ({
  user: {
    count: vi.fn(),
    create: vi.fn(),
    deleteMany: vi.fn(),
  },
  product: {
    count: vi.fn(),
    create: vi.fn(),
    deleteMany: vi.fn(),
  },
  review: { deleteMany: vi.fn() },
  orderActivityLog: { deleteMany: vi.fn() },
  orderItem: { deleteMany: vi.fn() },
  order: { deleteMany: vi.fn() },
  cartItem: { deleteMany: vi.fn() },
  flashSaleItem: { deleteMany: vi.fn() },
  flashSale: { deleteMany: vi.fn() },
  voucher: { deleteMany: vi.fn(), create: vi.fn() },
  productVariant: { deleteMany: vi.fn() },
  productMedia: { deleteMany: vi.fn() },
  $disconnect: vi.fn(),
});

describe('Prisma Seed Safety', () => {
  let mockDb: ReturnType<typeof createMockDb>;

  beforeEach(() => {
    mockDb = createMockDb();
  });

  it('should skip seeding and not delete data when database has data and forceReset is false', async () => {
    // Arrange: database already has data
    mockDb.user.count.mockResolvedValue(1);
    mockDb.product.count.mockResolvedValue(1);

    // Act
    const result = await seedDatabase({ forceReset: false, db: mockDb });

    // Assert: should return skipped
    expect(result.skipped).toBe(true);

    // Verify deleteMany was NEVER called — existing data is safe
    expect(mockDb.user.deleteMany).not.toHaveBeenCalled();
    expect(mockDb.product.deleteMany).not.toHaveBeenCalled();
    expect(mockDb.order.deleteMany).not.toHaveBeenCalled();
  });

  it('should delete all existing data and re-seed when forceReset: true is passed', async () => {
    // Arrange: database has data, but forceReset is requested
    mockDb.user.count.mockResolvedValue(5);
    mockDb.product.count.mockResolvedValue(100);
    mockDb.user.create.mockResolvedValue({ id: 'admin-id' });

    // Act
    const result = await seedDatabase({ forceReset: true, db: mockDb });

    // Assert: should NOT be skipped
    expect(result.skipped).toBe(false);

    // Verify all deleteMany calls were made (full wipe)
    expect(mockDb.user.deleteMany).toHaveBeenCalledTimes(1);
    expect(mockDb.product.deleteMany).toHaveBeenCalledTimes(1);
    expect(mockDb.voucher.deleteMany).toHaveBeenCalledTimes(1);
    expect(mockDb.order.deleteMany).toHaveBeenCalledTimes(1);
    expect(mockDb.cartItem.deleteMany).toHaveBeenCalledTimes(1);
    expect(mockDb.review.deleteMany).toHaveBeenCalledTimes(1);

    // Verify admin user was created after the wipe
    expect(mockDb.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: 'accfamlala1@gmail.com',
          role: 'ADMIN',
        }),
      })
    );
  });

  it('should seed data when database is completely empty even if forceReset is false', async () => {
    // Arrange: database is empty
    mockDb.user.count.mockResolvedValue(0);
    mockDb.product.count.mockResolvedValue(0);
    mockDb.user.create.mockResolvedValue({ id: 'admin-id' });

    // Act
    const result = await seedDatabase({ forceReset: false, db: mockDb });

    // Assert: should proceed with seeding (not skip)
    expect(result.skipped).toBe(false);

    // Admin was created
    expect(mockDb.user.create).toHaveBeenCalled();
  });

  it('should call deleteMany even on empty database (clean slate before seeding)', async () => {
    // Arrange: database is empty (count = 0)
    mockDb.user.count.mockResolvedValue(0);
    mockDb.product.count.mockResolvedValue(0);
    mockDb.user.create.mockResolvedValue({ id: 'admin-id' });

    // Act
    await seedDatabase({ forceReset: false, db: mockDb });

    // Assert: deleteMany is called as part of the clean-wipe before seeding
    // (even an empty DB goes through the delete path when count = 0)
    expect(mockDb.user.deleteMany).toHaveBeenCalledTimes(1);
    expect(mockDb.product.deleteMany).toHaveBeenCalledTimes(1);
  });
});
