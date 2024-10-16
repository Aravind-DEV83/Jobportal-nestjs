import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedRatingCol1716967046303 implements MigrationInterface {
    name = 'RemovedRatingCol1716967046303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" DROP COLUMN "Rating"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" ADD "Rating" numeric(3,2)`);
    }

}
