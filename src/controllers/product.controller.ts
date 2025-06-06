import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(private productService: ProductService) {}

  async create(req: Request, res: Response) {
    const { foundCompany } = res.locals;
    const newProduct = await this.productService.create(req.body, foundCompany);
    return res.status(201).json(newProduct);
  }

  async read(req: Request, res: Response) {
    const { foundCompany } = res.locals;
    const products = await this.productService.read(foundCompany);

    return res.json(products);
  }

  async update(req: Request, res: Response) {
    const { foundProduct } = res.locals;
    const productUpdate = await this.productService.update(
      foundProduct,
      req.body
    );
    return res.json(productUpdate);
  }

  async remove(req: Request, res: Response) {
    const { foundProduct } = res.locals;
    await this.productService.remove(foundProduct);
    return res.status(204).json();
  }
}
