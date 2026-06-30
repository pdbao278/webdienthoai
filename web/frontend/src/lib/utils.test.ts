import { describe, it, expect } from 'vitest';
import { calculateItemSubtotal } from './utils';

describe('calculateItemSubtotal', () => {
  it('should calculate normal price when no flash sale is active', () => {
    expect(calculateItemSubtotal(2, 10000)).toBe(20000);
  });

  it('should apply flash sale price to only the first item', () => {
    // 1 item at flash sale price (8000), 1 item at original price (10000)
    expect(calculateItemSubtotal(2, 8000, 10000, true)).toBe(18000);
  });

  it('should apply flash sale price if quantity is 1', () => {
    expect(calculateItemSubtotal(1, 8000, 10000, true)).toBe(8000);
  });
  
  it('should calculate correctly for 3 items', () => {
    // 1 * 8000 + 2 * 10000 = 28000
    expect(calculateItemSubtotal(3, 8000, 10000, true)).toBe(28000);
  });
});
