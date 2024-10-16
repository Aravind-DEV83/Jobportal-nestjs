import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContactsTable1717061149989 implements MigrationInterface {
    name = 'CreateContactsTable1717061149989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."Contacts" ("ContactId" SERIAL NOT NULL, "PhoneNumber" character varying(255), "Address" character varying(255), "State" character varying(255), "City" character varying(255), "CreatedAt" TIMESTAMP DEFAULT now(), "UpdatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_d4ff02c7b2965add50ad28d7201" PRIMARY KEY ("ContactId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "jobportal_schema"."Contacts"`);
    }

}
