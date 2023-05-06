import { z } from "zod";

export const user = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string().min(3).max(20),
  role: z.string().optional(),
});

export const userLogin = user.pick({
  username: true,
  password: true,
});

export const userData = user;
