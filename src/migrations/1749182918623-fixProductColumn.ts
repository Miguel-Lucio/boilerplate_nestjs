import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProductColumn1749182918623 implements MigrationInterface {
    name = 'FixProductColumn1749182918623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_270b1a4eb00eebe56b528e909f6"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_270b1a4eb00eebe56b528e909f6" UNIQUE ("productName")`);
    }

}
