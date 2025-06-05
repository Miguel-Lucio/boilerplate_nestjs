import { Repository } from "typeorm";
import { Company } from "./entities/company.entity";
import { AppDataSource } from "./data-source";
import { Product } from "./entities/product.entity";

const companyRepo: Repository<Company> = AppDataSource.getRepository(Company);
const productRepo: Repository<Product> = AppDataSource.getRepository(Product);

export { companyRepo, productRepo };
