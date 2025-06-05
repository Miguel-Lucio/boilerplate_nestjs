import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @OneToMany(() => Product, (p) => p.company, {
    onDelete: "CASCADE",
  })
  products: Array<Product>;
}
