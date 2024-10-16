import { MigrationInterface, QueryRunner } from "typeorm";

export class ProviderTables1716878518243 implements MigrationInterface {
    name = 'ProviderTables1716878518243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."JobProviderProfile" ("Id" SERIAL NOT NULL, "companyName" text, "industry" text, "location" text, "description" text, "website" text, "userUserID" integer, CONSTRAINT "PK_f9fc87c13eeac11a947fab65212" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."job_provider_profile_required_skills_skills" ("jobProviderProfileId" integer NOT NULL, "skillsSkillID" integer NOT NULL, CONSTRAINT "PK_736531ec8c7cbc4c07af9d1f40e" PRIMARY KEY ("jobProviderProfileId", "skillsSkillID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cc0330769c9c4c97de621e2ce0" ON "jobportal_schema"."job_provider_profile_required_skills_skills" ("jobProviderProfileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8e8e089ce87a3496abfde04235" ON "jobportal_schema"."job_provider_profile_required_skills_skills" ("skillsSkillID") `);
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."skills_provider_profiles_job_provider_profile" ("skillsSkillID" integer NOT NULL, "jobProviderProfileId" integer NOT NULL, CONSTRAINT "PK_6913e95c3975ed7ad948cb271e2" PRIMARY KEY ("skillsSkillID", "jobProviderProfileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_68b5242027ff647e9800210825" ON "jobportal_schema"."skills_provider_profiles_job_provider_profile" ("skillsSkillID") `);
        await queryRunner.query(`CREATE INDEX "IDX_8454b1f81fd63791adf3dd3175" ON "jobportal_schema"."skills_provider_profiles_job_provider_profile" ("jobProviderProfileId") `);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobProviderProfile" ADD CONSTRAINT "FK_3ac42bc5d1c95a0211ac6d20941" FOREIGN KEY ("userUserID") REFERENCES "jobportal_schema"."User"("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."job_provider_profile_required_skills_skills" ADD CONSTRAINT "FK_cc0330769c9c4c97de621e2ce08" FOREIGN KEY ("jobProviderProfileId") REFERENCES "jobportal_schema"."JobProviderProfile"("Id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."job_provider_profile_required_skills_skills" ADD CONSTRAINT "FK_8e8e089ce87a3496abfde042353" FOREIGN KEY ("skillsSkillID") REFERENCES "jobportal_schema"."Skills"("Skill_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."skills_provider_profiles_job_provider_profile" ADD CONSTRAINT "FK_68b5242027ff647e98002108256" FOREIGN KEY ("skillsSkillID") REFERENCES "jobportal_schema"."Skills"("Skill_ID") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."skills_provider_profiles_job_provider_profile" ADD CONSTRAINT "FK_8454b1f81fd63791adf3dd31751" FOREIGN KEY ("jobProviderProfileId") REFERENCES "jobportal_schema"."JobProviderProfile"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."skills_provider_profiles_job_provider_profile" DROP CONSTRAINT "FK_8454b1f81fd63791adf3dd31751"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."skills_provider_profiles_job_provider_profile" DROP CONSTRAINT "FK_68b5242027ff647e98002108256"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."job_provider_profile_required_skills_skills" DROP CONSTRAINT "FK_8e8e089ce87a3496abfde042353"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."job_provider_profile_required_skills_skills" DROP CONSTRAINT "FK_cc0330769c9c4c97de621e2ce08"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobProviderProfile" DROP CONSTRAINT "FK_3ac42bc5d1c95a0211ac6d20941"`);
        await queryRunner.query(`DROP INDEX "jobportal_schema"."IDX_8454b1f81fd63791adf3dd3175"`);
        await queryRunner.query(`DROP INDEX "jobportal_schema"."IDX_68b5242027ff647e9800210825"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."skills_provider_profiles_job_provider_profile"`);
        await queryRunner.query(`DROP INDEX "jobportal_schema"."IDX_8e8e089ce87a3496abfde04235"`);
        await queryRunner.query(`DROP INDEX "jobportal_schema"."IDX_cc0330769c9c4c97de621e2ce0"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."job_provider_profile_required_skills_skills"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."JobProviderProfile"`);
    }

}
