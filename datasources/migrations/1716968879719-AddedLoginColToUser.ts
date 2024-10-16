import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedLoginColToUser1716968879719 implements MigrationInterface {
    name = 'AddedLoginColToUser1716968879719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" ADD "LastLoggedIn" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" DROP COLUMN "LastLoggedIn"`);
    }

}
