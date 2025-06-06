import { CompanyService } from "../services/company.service";
import { LoginService } from "../services/login.service";
import { ProductService } from "../services/product.service";
import { CompanyController } from "./company.controller";
import { LoginController } from "./login.controller";
import { ProductController } from "./product.controller";

const companyService = new CompanyService();
export const companyController = new CompanyController(companyService);

const loginService = new LoginService();
export const loginController = new LoginController(loginService);

const productService = new ProductService();
export const productController = new ProductController(productService);
