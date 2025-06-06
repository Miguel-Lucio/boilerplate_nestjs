import { z } from "zod";
import {
  companyCreateSchema,
  companyListSchema,
  companySchema,
} from "../schemas/company.schema";
import { DeepPartial } from "typeorm";

export type TCompany = z.infer<typeof companySchema>;
export type TCompanyCreate = z.infer<typeof companyCreateSchema>;
export type TCompanyList = z.infer<typeof companyListSchema>;
export type TCompanyUpdate = DeepPartial<TCompanyCreate>;
