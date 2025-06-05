import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1749163055723 implements MigrationInterface {
    name = 'InitialMigration1749163055723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cnpj" character varying(14) NOT NULL, CONSTRAINT "UQ_703760d095b8e399e34950f4960" UNIQUE ("cnpj"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productName" character varying(120) NOT NULL, "description" character varying NOT NULL DEFAULT '', "price" integer NOT NULL DEFAULT '0', "stock" integer NOT NULL DEFAULT '0', "companyId" uuid, CONSTRAINT "UQ_270b1a4eb00eebe56b528e909f6" UNIQUE ("productName"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_47942e65af8e4235d4045515f05" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_47942e65af8e4235d4045515f05"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
