import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyPassword1749172646235 implements MigrationInterface {
    name = 'CompanyPassword1749172646235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "password" character varying(120) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "password"`);
    }

}
