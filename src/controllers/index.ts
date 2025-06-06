import { CompanyService } from "../services/company.service";
import { CompanyController } from "./company.controller";

const companyService = new CompanyService();
export const companyController = new CompanyController(companyService);
