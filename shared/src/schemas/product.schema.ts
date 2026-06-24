import { z } from 'zod';

export const productQuerySchema = z.object({
  page: z.string().optional().transform(val => (val ? parseInt(val) : 1)),
  limit: z.string().optional().transform(val => (val ? parseInt(val) : 12)),
  hang: z.string().optional(),
  minPrice: z.string().optional().transform(val => (val ? parseInt(val) : undefined)),
  maxPrice: z.string().optional().transform(val => (val ? parseInt(val) : undefined)),
  ramGb: z.string().optional().transform(val => (val ? parseInt(val) : undefined)),
  dungLuongGb: z.string().optional().transform(val => (val ? parseInt(val) : undefined)),
  sort: z.enum(['gia_asc', 'gia_desc', 'newest', 'popular']).optional().default('newest'),
  q: z.string().optional(),
});

export type ProductQueryInput = z.infer<typeof productQuerySchema>;
