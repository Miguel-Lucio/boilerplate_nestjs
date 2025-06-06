import { z } from "zod";

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  cnpj: z
    .string()
    .length(14, { message: "CNPJ must have exactly 14 numeric characters" })
    .regex(/^\d+$/, { message: "CNPJ must contain only numeric digits" }),
  password: z.string().max(120),
});

export const companyCreateSchema = companySchema.omit({ id: true });

export const companyReturnSchema = companySchema.omit({ password: true });
export const companyListSchema = companyReturnSchema.array();
export const companyUpdateSchema = companyCreateSchema.partial();
