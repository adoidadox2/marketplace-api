import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSale1597374201717 implements MigrationInterface {
    name = 'CreateSale1597374201717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchaseId" uuid NOT NULL, "adId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_75e7f12aa14f1a4ec3463a65cc" UNIQUE ("purchaseId"), CONSTRAINT "REL_950752134c2468e9913f8fd530" UNIQUE ("adId"), CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_75e7f12aa14f1a4ec3463a65cc7" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_950752134c2468e9913f8fd5309" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_950752134c2468e9913f8fd5309"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_75e7f12aa14f1a4ec3463a65cc7"`);
        await queryRunner.query(`DROP TABLE "sale"`);
    }

}
