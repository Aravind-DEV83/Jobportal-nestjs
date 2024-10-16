import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRatingCol1716967199838 implements MigrationInterface {
    name = 'RemoveRatingCol1716967199838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" DROP COLUMN "Rating"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" ADD "Rating" numeric(3,2)`);
    }

}
