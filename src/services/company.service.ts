import { Company } from "../entities/company.entity";
import {
  TCompanyCreate,
  TCompanyList,
  TCompanyReturn,
  TCompanyUpdate,
} from "../interfaces/company.interface";
import { companyRepo } from "../repositories";
import {
  companyListSchema,
  companyReturnSchema,
} from "../schemas/company.schema";

export class CompanyService {
  async create(data: TCompanyCreate): Promise<TCompanyReturn> {
    const newCompany = companyRepo.create(data);
    await companyRepo.save(newCompany);
    return companyReturnSchema.parse(newCompany);
  }

  async read(): Promise<TCompanyList> {
    const companies = await companyRepo.find();
    return companyListSchema.parse(companies);
  }

  readOne(company: Company): TCompanyReturn {
    return companyReturnSchema.parse(company);
  }

  async update(
    company: Company,
    data: TCompanyUpdate
  ): Promise<TCompanyReturn> {
    const updatecompany = companyRepo.create({ ...company, ...data });
    await companyRepo.save(updatecompany);

    return companyReturnSchema.parse(updatecompany);
  }

  async remove(company: Company): Promise<void> {
    await companyRepo.remove(company);
  }
}
