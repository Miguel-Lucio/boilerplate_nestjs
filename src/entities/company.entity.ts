import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @Column({ length: 120 })
  password: string;

  @OneToMany(() => Product, (p) => p.company, {
    onDelete: "CASCADE",
  })
  products: Array<Product>;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);

    if (!hasRounds) this.password = hashSync(this.password, 10);
  }
}
