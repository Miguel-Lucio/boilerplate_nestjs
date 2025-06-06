import { CompanyService } from "../services/company.service";
import { LoginService } from "../services/login.service";
import { CompanyController } from "./company.controller";
import { LoginController } from "./login.controller";

const companyService = new CompanyService();
export const companyController = new CompanyController(companyService);

const loginService = new LoginService();
export const loginController = new LoginController(loginService);
