import { NextFunction, Request, Response } from "express";
import { companyRepo } from "../repositories";
import { AppError } from "../errors/AppError.error";

export const validCnpj = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cnpj } = req.body;
  if (!cnpj) return next();

  const foundCompany = await companyRepo.findOneBy({ cnpj });
  if (foundCompany) throw new AppError("cnpj already registered.");
  return next();
};
