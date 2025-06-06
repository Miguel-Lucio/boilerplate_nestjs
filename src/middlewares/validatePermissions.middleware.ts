import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.error";

export const validatePermissions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const { sub } = res.locals.decoded;

  if (id !== sub) throw new AppError("Insufficient permission.", 403);

  return next();
};
