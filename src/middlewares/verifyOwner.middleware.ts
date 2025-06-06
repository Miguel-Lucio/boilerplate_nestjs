import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.error";
import { productRepo } from "../repositories";

export const verifyOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { foundCompany } = res.locals;
  const { id } = req.params;
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  if (uuidRegex.test(id)) {
    const foundProduct = await productRepo.findOne({
      where: { company: foundCompany, id },
    });

    if (!foundProduct)
      throw new AppError("Company does not have this product", 404);
    res.locals = { ...res.locals, foundProduct };
  } else {
    throw new AppError("Company does not have this product", 404);
  }
  return next();
};
