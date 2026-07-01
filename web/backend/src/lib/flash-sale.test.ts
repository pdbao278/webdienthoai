import { describe, it, expect, vi } from 'vitest';
import { applyFlashSalePrices } from './flash-sale';

describe('Flash Sale Price Logic', () => {
  it('should override giaBan and attach flashSale data for active flash sale', async () => {
    // Arrange: inject a mock flash sale map via DI
    const variantId = 'test-variant-id';
    const flashSaleItemId = 'test-flash-sale-item-id';

    const mockGetFlashSaleMap = vi.fn().mockResolvedValue(
      new Map([
        [variantId, {
          giaFlashSale: 10000000,
          soLuong: 5,
          daBan: 0,
          flashSaleId: 'test-flash-sale-id',
          flashSaleItemId,
        }]
      ])
    );

    const variants = [{
      id: variantId,
      sku: 'TEST-SKU',
      ramGb: 8,
      dungLuongGb: 256,
      mauSac: 'Black',
      giaGoc: 15000000,
      giaBan: 14000000,
      tonKho: 10,
    }];

    // Act: inject the mock map function
    const result = await applyFlashSalePrices(variants, mockGetFlashSaleMap);

    // Assert: flash sale price overrides giaBan, original saved as giaBanGoc
    expect(result[0].giaBan).toBe(10000000);
    expect(result[0].giaBanGoc).toBe(14000000);
    expect(result[0].flashSale).toBeDefined();
    expect(result[0].flashSale.soLuong).toBe(5);
    expect(result[0].flashSale.daBan).toBe(0);
    expect(result[0].flashSale.flashSaleItemId).toBe(flashSaleItemId);
  });

  it('should return variants unchanged when no active flash sale exists', async () => {
    // Arrange: empty flash sale map (no active sales)
    const mockGetFlashSaleMap = vi.fn().mockResolvedValue(new Map());

    const variants = [{
      id: 'no-flash-sale-variant',
      sku: 'TEST-SKU-2',
      giaGoc: 15000000,
      giaBan: 14000000,
      tonKho: 5,
    }];

    // Act
    const result = await applyFlashSalePrices(variants, mockGetFlashSaleMap);

    // Assert: prices unchanged, no flashSale attached
    expect(result[0].giaBan).toBe(14000000);
    expect(result[0].giaBanGoc).toBeUndefined();
    expect(result[0].flashSale).toBeUndefined();
  });

  it('should apply flash sale price for the matched variant only', async () => {
    // Arrange: flash sale exists only for variant A, not B
    const variantAId = 'variant-a';
    const variantBId = 'variant-b';

    const mockGetFlashSaleMap = vi.fn().mockResolvedValue(
      new Map([
        [variantAId, {
          giaFlashSale: 9000000,
          soLuong: 3,
          daBan: 1,
          flashSaleId: 'fs-id',
          flashSaleItemId: 'fsi-a',
        }]
      ])
    );

    const variants = [
      { id: variantAId, giaBan: 12000000, giaGoc: 14000000 },
      { id: variantBId, giaBan: 11000000, giaGoc: 13000000 },
    ];

    // Act
    const result = await applyFlashSalePrices(variants, mockGetFlashSaleMap);

    // Assert: variant A gets flash sale price, variant B is unchanged
    expect(result[0].giaBan).toBe(9000000);
    expect(result[0].giaBanGoc).toBe(12000000);
    expect(result[0].flashSale).toBeDefined();

    expect(result[1].giaBan).toBe(11000000);
    expect(result[1].giaBanGoc).toBeUndefined();
    expect(result[1].flashSale).toBeUndefined();
  });

  it('should return empty array unchanged when passed empty variants', async () => {
    const mockGetFlashSaleMap = vi.fn().mockResolvedValue(new Map());

    const result = await applyFlashSalePrices([], mockGetFlashSaleMap);

    expect(result).toEqual([]);
    // getFlashSaleMap should NOT be called for empty arrays (short circuit)
    expect(mockGetFlashSaleMap).not.toHaveBeenCalled();
  });
});
