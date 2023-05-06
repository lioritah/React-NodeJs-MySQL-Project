import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors";
import { getByUsername } from "../users/users.dal";

export function authenticator(
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction
) {
  try {
    const username = req.signedCookies?.username;
    if (!username) {
      throw new UnauthorizedError("Please perform login");
    }
    (req as any).username = username;
    return next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function adminAuthenticator(
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction
) {
  try {
    const username = req.signedCookies?.username;
    const user = await getByUsername(username);
    if (user.role === "admin") {
      (req as any).username = username;
      return next();
    }
    throw new UnauthorizedError("Your not admin");
  } catch (err) {
    next(err);
  }
}
