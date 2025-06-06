import { Company } from "../entities/company.entity";
import {
  TCompany,
  TCompanyCreate,
  TCompanyList,
  TCompanyUpdate,
} from "../interfaces/company.interface";
import { companyRepo } from "../repositories";

export class CompanyService {
  async create(data: TCompanyCreate): Promise<TCompany> {
    const newCompany = companyRepo.create(data);
    await companyRepo.save(newCompany);
    return newCompany;
  }

  async read(): Promise<TCompanyList> {
    const companies = await companyRepo.find();
    return companies;
  }

  readOne(company: Company): TCompany {
    return company;
  }

  async update(company: Company, data: TCompanyUpdate): Promise<TCompany> {
    const updatecompany = companyRepo.create({ ...company, ...data });
    await companyRepo.save(updatecompany);

    return updatecompany;
  }

  async remove(company: Company): Promise<void> {
    await companyRepo.remove(company);
  }
}
