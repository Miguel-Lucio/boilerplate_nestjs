import { Request, Response, Router } from "express";
import { companyController } from "../controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import { companyCreateSchema } from "../schemas/company.schema";
import { validCnpj } from "../middlewares/validCnpj.middleware";

export const companyRouter = Router();

companyRouter.post(
  "/",
  validateBody(companyCreateSchema),
  validCnpj,
  (req: Request, res: Response) => {
    companyController.create(req, res);
  }
);
