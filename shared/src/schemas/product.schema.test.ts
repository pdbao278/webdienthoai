import { describe, it, expect } from 'vitest';
import { productQuerySchema } from './product.schema';

describe('Product Schema', () => {
  it('validates product query params', () => {
    expect(productQuerySchema.safeParse({ hang: 'Apple', limit: '10' }).success).toBe(true);
    expect(productQuerySchema.safeParse({ minPrice: '1000', maxPrice: '5000' }).success).toBe(true);
  });
});
