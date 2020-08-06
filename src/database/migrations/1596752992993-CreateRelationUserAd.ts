import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationUserAd1596752992993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ad" ADD CONSTRAINT "FK_ee93b44ac1911e95b7026881c28" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ad" DROP CONSTRAINT "FK_ee93b44ac1911e95b7026881c28"`
    );
  }
}
