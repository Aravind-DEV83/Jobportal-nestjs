import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUserContact1717062663525 implements MigrationInterface {
    name = 'RelationUserContact1717062663525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."Contacts" ADD "userProfileUserID" integer`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."Contacts" ADD CONSTRAINT "UQ_e5af8fb4082d26a328c4db6e2b7" UNIQUE ("userProfileUserID")`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" ADD "contactContactId" integer`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" ADD CONSTRAINT "UQ_9af3285d6da3dd9893b3f18908c" UNIQUE ("contactContactId")`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."Contacts" ADD CONSTRAINT "FK_e5af8fb4082d26a328c4db6e2b7" FOREIGN KEY ("userProfileUserID") REFERENCES "jobportal_schema"."User"("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" ADD CONSTRAINT "FK_9af3285d6da3dd9893b3f18908c" FOREIGN KEY ("contactContactId") REFERENCES "jobportal_schema"."Contacts"("ContactId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" DROP CONSTRAINT "FK_9af3285d6da3dd9893b3f18908c"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."Contacts" DROP CONSTRAINT "FK_e5af8fb4082d26a328c4db6e2b7"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" DROP CONSTRAINT "UQ_9af3285d6da3dd9893b3f18908c"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."User" DROP COLUMN "contactContactId"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."Contacts" DROP CONSTRAINT "UQ_e5af8fb4082d26a328c4db6e2b7"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."Contacts" DROP COLUMN "userProfileUserID"`);
    }

}
