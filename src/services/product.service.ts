import { Company } from "../entities/company.entity";
import { Product } from "../entities/product.entity";
import {
  TProduct,
  TProductCreate,
  TProductUpdate,
} from "../interfaces/product.interface";
import { productRepo } from "../repositories";
import { productSchema } from "../schemas/product.schema";

export class ProductService {
  async create(data: TProductCreate, company: Company): Promise<TProduct> {
    const newProduct = productRepo.create({ ...data, company });
    await productRepo.save(newProduct);
    return productSchema.parse(newProduct);
  }

  async read(company: Company) {
    const products = await productRepo.find({ where: { company } });

    return products;
  }

  async update(product: Product, data: TProductUpdate) {
    const productUpdate = productRepo.create({ ...product, ...data });
    await productRepo.save(productUpdate);

    return productUpdate;
  }

  async remove(product: any) {
    await productRepo.remove(product);
  }
}
