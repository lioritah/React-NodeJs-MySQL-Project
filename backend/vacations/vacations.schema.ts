import { z } from "zod";

export const vacation = z.object({
  id: z.number(),
  description: z.string(),
  destination: z.string(),
  imageName: z.string(),
  date: z.string(),
  price: z
    .string()
    .transform(Number)
    .refine((v) => v >= 0)
    .refine((v) => v <= 50000),
  followers: z.number().optional(),
});

export const vacationData = vacation.pick({
  description: true,
  destination: true,
  date: true,
  price: true,
});

export const getVacationsOptions = z.object({
  textToSearch: z.string().optional().default(""),
  minPrice: z
    .string()
    .optional()
    .default("0")
    .transform((v: string) => +v),
  maxPrice: z
    .string()
    .optional()
    .default("50000")
    .transform((v: string) => +v),
});

export const partialVacationData = vacationData.partial();

export const vacationsParams = z.object({
  id: z.string(),
});
