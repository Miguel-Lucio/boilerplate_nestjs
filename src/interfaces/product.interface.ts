import { z } from "zod";
import {
  productCreateSchema,
  productListSchema,
  productSchema,
} from "../schemas/product.schema";
import { DeepPartial } from "typeorm";

export type TProduct = z.infer<typeof productSchema>;
export type TProductCreate = z.infer<typeof productCreateSchema>;
export type TProductList = z.infer<typeof productListSchema>;
export type TProductUpdate = DeepPartial<TProductCreate>;
