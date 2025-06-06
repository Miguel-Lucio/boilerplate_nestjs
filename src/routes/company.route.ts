import { Request, Response, Router } from "express";
import { companyController } from "../controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import {
  companyCreateSchema,
  companyUpdateSchema,
} from "../schemas/company.schema";
import { validCnpj } from "../middlewares/validCnpj.middleware";
import { validId } from "../middlewares/validId.middleware";
import { existingToken } from "../middlewares/existingToken.middleware";
import { validateToken } from "../middlewares/validateToken.middleware";
import { validatePermissions } from "../middlewares/validatePermissions.middleware";

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

companyRouter.get("/:id", validId, (req: Request, res: Response) => {
  companyController.readOne(req, res);
});

companyRouter.use(
  "/:id",
  existingToken,
  validateToken,
  validId,
  validatePermissions
);
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
