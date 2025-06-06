import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  productName: z.string().max(120),
  description: z.string().default(""),
  price: z.number().default(0),
  stock: z.number().default(0),
});

export const productCreateSchema = productSchema.omit({ id: true });
export const productListSchema = productSchema.array();
export const productUpdateSchema = productCreateSchema.partial();
