import { z } from "zod";

export const follow = z.object({
  userId: z.number(),
  vacationId: z.number(),
});

export const followersParams = z.object({
  id: z.string(),
});
