import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";

export class CompanyController {
  constructor(private companyService: CompanyService) {}

  async create(req: Request, res: Response) {
    const newCompany = await this.companyService.create(req.body);
    return res.status(201).json(newCompany);
  }

  async read(req: Request, res: Response) {
    const companies = await this.companyService.read();
    return res.json(companies);
  }

  async readOne(req: Request, res: Response) {
    const company = this.companyService.readOne(res.locals.foundCompany);
    return res.json(company);
  }

  async update(req: Request, res: Response) {
    const company = await this.companyService.update(
      res.locals.foundCompany,
      req.body
    );
    return res.json(company);
  }

  async remove(req: Request, res: Response) {
    await this.companyService.remove(res.locals.foundCompany);
    return res.status(204).json();
  }
}
