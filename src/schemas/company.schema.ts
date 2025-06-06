import { z } from "zod";

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  cnpj: z
    .string()
    .length(14, { message: "CNPJ must have exactly 14 numeric characters" })
    .regex(/^\d+$/, { message: "CNPJ must contain only numeric digits" }),
});

export const companyCreateSchema = companySchema.omit({ id: true });
export const companyListSchema = companySchema.array();
export const companyUpdateSchema = companyCreateSchema.partial();
