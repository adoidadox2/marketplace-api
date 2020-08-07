import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPurchasedByColumnToAd1596837210916 implements MigrationInterface {
    name = 'AddPurchasedByColumnToAd1596837210916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" ADD "purchasedBy" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" DROP COLUMN "purchasedBy"`);
    }

}
