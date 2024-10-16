import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedAcceptToSelect1716999340396 implements MigrationInterface {
    name = 'ChangedAcceptToSelect1716999340396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "jobportal_schema"."JobSelection_status_enum" AS ENUM('Pending', 'Accepted', 'Rejected')`);
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."JobSelection" ("ApplicationID" SERIAL NOT NULL, "ProposedPrice" numeric(10,2) NOT NULL, "Status" "jobportal_schema"."JobSelection_status_enum" NOT NULL DEFAULT 'Pending', "SelectedDate" TIMESTAMP, "comments" text, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "jobID" integer, "Provider" integer, CONSTRAINT "REL_71397ccd5310a6e6f56338ceb6" UNIQUE ("jobID"), CONSTRAINT "REL_00ee1ef6e674a625c89f9d7ed7" UNIQUE ("Provider"), CONSTRAINT "PK_bf20ff1fed818d30032c71f790a" PRIMARY KEY ("ApplicationID"))`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobSelection" ADD CONSTRAINT "FK_71397ccd5310a6e6f56338ceb68" FOREIGN KEY ("jobID") REFERENCES "jobportal_schema"."JobProfile"("ProfileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobSelection" ADD CONSTRAINT "FK_00ee1ef6e674a625c89f9d7ed7c" FOREIGN KEY ("Provider") REFERENCES "jobportal_schema"."User"("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobSelection" DROP CONSTRAINT "FK_00ee1ef6e674a625c89f9d7ed7c"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobSelection" DROP CONSTRAINT "FK_71397ccd5310a6e6f56338ceb68"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."JobSelection"`);
        await queryRunner.query(`DROP TYPE "jobportal_schema"."JobSelection_status_enum"`);
    }

}
