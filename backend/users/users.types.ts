import { z } from "zod";
import { user, userData, userLogin } from "./users.schema";

export type User = z.infer<typeof user>;

export type UserLogin = z.infer<typeof userLogin>;

export type UserData = z.infer<typeof userData>;
