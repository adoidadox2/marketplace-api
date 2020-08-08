import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNullableToPurchasedByColumn1596848758822 implements MigrationInterface {
    name = 'AddNullableToPurchasedByColumn1596848758822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "purchasedBy" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "purchasedBy" SET NOT NULL`);
    }

}
