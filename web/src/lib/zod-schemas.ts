import { z } from 'zod';

export const citySchema = z.object({
  name: z.string().trim().min(1).max(50),
  countryCode: z.string().trim().min(2).max(2),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
