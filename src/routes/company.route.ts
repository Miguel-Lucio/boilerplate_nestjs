import { Request, Response, Router } from "express";
import { companyController } from "../controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import {
  companyCreateSchema,
  companyUpdateSchema,
} from "../schemas/company.schema";
import { validCnpj } from "../middlewares/validCnpj.middleware";
import { validId } from "../middlewares/validId.middleware";

export const companyRouter = Router();

companyRouter.post(
  "/",
  validateBody(companyCreateSchema),
  validCnpj,
  (req: Request, res: Response) => {
    companyController.create(req, res);
  }
);

companyRouter.get("/", (req: Request, res: Response) => {
  companyController.read(req, res);
});

companyRouter.use("/:id", validId);
companyRouter.get("/:id", (req: Request, res: Response) => {
  companyController.readOne(req, res);
});
companyRouter.patch(
  "/:id",
  validateBody(companyUpdateSchema),
  validCnpj,
  (req: Request, res: Response) => {
    companyController.update(req, res);
  }
);
companyRouter.delete("/:id", (req: Request, res: Response) => {
  companyController.remove(req, res);
});
