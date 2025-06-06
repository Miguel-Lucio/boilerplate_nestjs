import { z } from "zod";

export const loginSchema = z.object({
  cnpj: z.string(),
  password: z.string(),
});

export const loginReturnSchema = z.object({
  token: z.string(),
});
