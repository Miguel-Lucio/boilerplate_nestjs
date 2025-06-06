import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.error";
import { companyRepo } from "../repositories";

export const verifyCompanyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sub } = res.locals.decoded;
  const foundCompany = await companyRepo.findOneBy({ id: sub });

  if (!foundCompany) throw new AppError("invalid signature", 401);

  res.locals = { ...res.locals, foundCompany };
  return next();
};
