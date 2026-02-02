import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const citySchema = z.object({
  name: z.string().trim().min(1).max(50),
  countryCode: z.string().trim().min(2).max(2),
});

export const skyscraperSchema = z.object({
  name: z.string().trim().min(1).max(50),
  cityId: z.coerce.number().int().positive(),
  height: z.number().positive(),
  stories: z.coerce.number().int().positive().optional().nullable(),
  finished: z.coerce.number().int().positive().optional().nullable(),
});
