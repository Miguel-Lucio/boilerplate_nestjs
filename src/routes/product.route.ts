import { Request, Response, Router } from "express";
import { existingToken } from "../middlewares/existingToken.middleware";
import { verifyCompanyExists } from "../middlewares/verifyCompanyExists.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../schemas/product.schema";
import { productController } from "../controllers";
import { verifyOwner } from "../middlewares/verifyOwner.middleware";

export const productRouter = Router();

productRouter.use("/", existingToken, verifyCompanyExists);
productRouter.post(
  "/",
  validateBody(productCreateSchema),
  (req: Request, res: Response) => {
    productController.create(req, res);
  }
);
productRouter.get("/", (req: Request, res: Response) => {
  productController.read(req, res);
});

productRouter.use("/:id", existingToken, verifyCompanyExists, verifyOwner);
productRouter.patch(
  "/:id",
  validateBody(productUpdateSchema),
  (req: Request, res: Response) => {
    productController.update(req, res);
  }
);
productRouter.delete("/:id", (req: Request, res: Response) => {
  productController.remove(req, res);
});
