import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, unique: true })
  productName: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @ManyToOne(() => Company, (c) => c.products, { onDelete: "CASCADE" })
  company: Company;
}
