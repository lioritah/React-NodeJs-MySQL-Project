import express from "express";
import { Request } from "express";
import { authenticator } from "../middlewares/authentication";

import {
  addCount,
  createFollow,
  getFollowersFromDB,
  getIDByUsername,
  isFollowing,
  removeCount,
} from "./followers.dal";
import * as schema from "./followers.schema";
import { Follow, FollowersParams, FollowingResponse } from "./followers.types";

export const followersRouter = express.Router();

followersRouter.get<FollowersParams, FollowingResponse, {}, {}>(
  "/:id",
  authenticator,
  async (req, res, next) => {
    try {
      let followers = [];
      const { id } = schema.followersParams.parse(req.params);
      followers = await getFollowersFromDB(+id);
      let result = followers[0];
      const objectValue = Object.values(result);
      const isUserFollowing = await isFollowing((req as any).username, id);

      return res.status(201).json({
        followers: +objectValue,
        isUserFollowing,
      });
    } catch (err) {
      next(err);
    }
  }
);

export function toData<T>(rowData: any) {
  return { ...rowData } as T;
}

followersRouter.post<{}, {}, Follow>(
  "/",
  authenticator,
  async (req: any, res, next) => {
    try {
      const username = req.username;
      let [userIdRowData] = await getIDByUsername(username);
      const { id } = toData<{ id: number }>(userIdRowData);
      const followData = schema.follow.parse({ ...req.body, userId: id });

      const { mode } = await createFollow(id, followData.vacationId);

      if (mode === "add") await addCount(followData.vacationId);
      else if (mode === "delete") await removeCount(followData.vacationId);
      return res.status(201).json({
        userId: id,
        vacationId: followData.vacationId,
        mode,
      });
    } catch (err) {
      next(err);
    }
  }
);
