import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  NotFoundError,
  UnauthorizedError,
  UserAlreadyExistsError,
  WrongUsernameOrPasswordError,
} from "../errors";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json(err.issues);
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof UserAlreadyExistsError) {
    return res.status(409).json({ message: err.message });
  }
  if (err instanceof WrongUsernameOrPasswordError) {
    return res.status(401).json({ message: err.message });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: err.message });
  }
  console.log(err);
  return res.status(500).json({ message: "Something went wrong!" });
}
