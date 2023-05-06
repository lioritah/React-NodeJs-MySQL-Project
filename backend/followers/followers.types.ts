import { z } from "zod";
import { follow, followersParams } from "./followers.schema";

export type Follow = z.infer<typeof follow>;

export type FollowersParams = z.infer<typeof followersParams>;

export type FollowingResponse = { followers: number; isUserFollowing: boolean };
