import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.error";
import { companyRepo } from "../repositories";

export const validId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  if (uuidRegex.test(id)) {
    const foundCompany = await companyRepo.findOneBy({ id });
    if (!foundCompany) throw new AppError("Company not found.", 404);

    res.locals = { ...res.locals, foundCompany };
  } else {
    throw new AppError("Company not found.", 404);
  }
  return next();
};
