import express from "express";
import { register, verifyUser } from "./users.bl";
import * as schema from "./users.schema";
import { UserData, UserLogin } from "./users.types";
import { config } from "../config";
import {
  adminAuthenticator,
  authenticator,
} from "../middlewares/authentication";
import { getByUserAdmin } from "./users.dal";
import { UnauthorizedError } from "../errors";

export const usersRouter = express.Router();

usersRouter.post<{}, {}, UserData>("/register", async (req, res, next) => {
  try {
    const userData = schema.userData.parse(req.body);
    await register(userData);
    res.cookie("username", userData.username, config.cookie);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

usersRouter.post<{}, {}, UserLogin>("/login", async (req, res, next) => {
  try {
    const userData = schema.userLogin.parse(req.body);
    const user = await verifyUser(userData);
    res.cookie("username", user.username, config.cookie);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

usersRouter.post("/logout", (req, res, next) => {
  res.clearCookie("username", {
    signed: true,
    httpOnly: true,
  });

  return res.sendStatus(200);
});

usersRouter.get<{}, { username: string }>(
  "/me",
  authenticator,
  (req, res, next) => {
    return res.status(200).json({ username: (req as any).username });
  }
);

usersRouter.get<{}, { username: string }>(
  "/admin",
  adminAuthenticator,
  async (req, res, next) => {
    const username = req.signedCookies?.username;
    try {
      const isAdmin = await getByUserAdmin(username);
      if (isAdmin) {
        return res.sendStatus(200);
      }
    } catch (err) {
      throw new UnauthorizedError("Your not admin");
    }
  }
);
