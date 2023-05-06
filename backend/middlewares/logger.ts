import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Method: ${req.method}, url: ${req.originalUrl}`);
  next();
}
