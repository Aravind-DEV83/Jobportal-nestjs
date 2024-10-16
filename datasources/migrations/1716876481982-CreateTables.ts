import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1716876481982 implements MigrationInterface {
    name = 'CreateTables1716876481982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."Skills" ("Skill_ID" SERIAL NOT NULL, "SkillName" character varying(255), "SkillLevel" character varying(255), "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "Categories" character varying(255), CONSTRAINT "PK_1cb4d1301fb2b2843952f1f73f1" PRIMARY KEY ("Skill_ID"))`);
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."JobProfile" ("ProfileId" SERIAL NOT NULL, "Description" text, "Duration" integer, "StartDate" TIMESTAMP, "EndDate" TIMESTAMP, "JobType" "jobportal_schema"."JobProfile_jobtype_enum", "Location" character varying(255), "MaxBudget" numeric(10,2), "Status" boolean NOT NULL DEFAULT false, "seekerUserID" integer, CONSTRAINT "PK_757d9cfc0d128f3f7bd05f0aead" PRIMARY KEY ("ProfileId"))`);
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."review_comment" ("ReviewID" SERIAL NOT NULL, "Rating" numeric(3,2) NOT NULL, "Comment" text NOT NULL, "reviewerUserID" integer, "targetUserUserID" integer, "jobProfileId" integer, CONSTRAINT "PK_61af151d5d1968708ba7b428ea6" PRIMARY KEY ("ReviewID"))`);
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."JobAcceptance" ("ApplicationID" SERIAL NOT NULL, "ProposedPrice" numeric(10,2) NOT NULL, "Status" "jobportal_schema"."JobAcceptance_status_enum" NOT NULL DEFAULT 'Pending', "AcceptedDate" TIMESTAMP, "comments" text, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "jobID" integer, "Provider" integer, CONSTRAINT "REL_8cd0cd14540c4a82c3cfd02e23" UNIQUE ("jobID"), CONSTRAINT "REL_c3b6aa92beb3e4c469fa43f051" UNIQUE ("Provider"), CONSTRAINT "PK_04ff702447574c9ab67ce313124" PRIMARY KEY ("ApplicationID"))`);
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."skills_profiles_job_profile" ("skillsSkillID" integer NOT NULL, "jobProfileProfileId" integer NOT NULL, CONSTRAINT "PK_54968ed48bd18cc6c9c5877218f" PRIMARY KEY ("skillsSkillID", "jobProfileProfileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_424d7295da62c1d484e41d466c" ON "jobportal_schema"."skills_profiles_job_profile" ("skillsSkillID") `);
        await queryRunner.query(`CREATE INDEX "IDX_658d65328050e8bcf358d889dd" ON "jobportal_schema"."skills_profiles_job_profile" ("jobProfileProfileId") `);
        await queryRunner.query(`CREATE TABLE "jobportal_schema"."job_profile_skill_skills" ("jobProfileProfileId" integer NOT NULL, "skillsSkillID" integer NOT NULL, CONSTRAINT "PK_55dbae5d98a10bdc743e18f6e0f" PRIMARY KEY ("jobProfileProfileId", "skillsSkillID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2674fd730bc91be395b6b09bff" ON "jobportal_schema"."job_profile_skill_skills" ("jobProfileProfileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_54b8caf8b36237f9b4ee973b90" ON "jobportal_schema"."job_profile_skill_skills" ("skillsSkillID") `);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobProfile" ADD CONSTRAINT "FK_a0cb0e488f87dd6738728a43cb7" FOREIGN KEY ("seekerUserID") REFERENCES "jobportal_schema"."User"("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."review_comment" ADD CONSTRAINT "FK_d0b1acc674ca5dc4e130c85cb59" FOREIGN KEY ("reviewerUserID") REFERENCES "jobportal_schema"."User"("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."review_comment" ADD CONSTRAINT "FK_575bedb6c80cbf7f74e27a513f4" FOREIGN KEY ("targetUserUserID") REFERENCES "jobportal_schema"."User"("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."review_comment" ADD CONSTRAINT "FK_a6d68cbba1aa55f55faf091ecdb" FOREIGN KEY ("jobProfileId") REFERENCES "jobportal_schema"."JobProfile"("ProfileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobAcceptance" ADD CONSTRAINT "FK_8cd0cd14540c4a82c3cfd02e232" FOREIGN KEY ("jobID") REFERENCES "jobportal_schema"."JobProfile"("ProfileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobAcceptance" ADD CONSTRAINT "FK_c3b6aa92beb3e4c469fa43f0516" FOREIGN KEY ("Provider") REFERENCES "jobportal_schema"."User"("UserID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."skills_profiles_job_profile" ADD CONSTRAINT "FK_424d7295da62c1d484e41d466c8" FOREIGN KEY ("skillsSkillID") REFERENCES "jobportal_schema"."Skills"("Skill_ID") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."skills_profiles_job_profile" ADD CONSTRAINT "FK_658d65328050e8bcf358d889dda" FOREIGN KEY ("jobProfileProfileId") REFERENCES "jobportal_schema"."JobProfile"("ProfileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."job_profile_skill_skills" ADD CONSTRAINT "FK_2674fd730bc91be395b6b09bff7" FOREIGN KEY ("jobProfileProfileId") REFERENCES "jobportal_schema"."JobProfile"("ProfileId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."job_profile_skill_skills" ADD CONSTRAINT "FK_54b8caf8b36237f9b4ee973b904" FOREIGN KEY ("skillsSkillID") REFERENCES "jobportal_schema"."Skills"("Skill_ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."job_profile_skill_skills" DROP CONSTRAINT "FK_54b8caf8b36237f9b4ee973b904"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."job_profile_skill_skills" DROP CONSTRAINT "FK_2674fd730bc91be395b6b09bff7"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."skills_profiles_job_profile" DROP CONSTRAINT "FK_658d65328050e8bcf358d889dda"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."skills_profiles_job_profile" DROP CONSTRAINT "FK_424d7295da62c1d484e41d466c8"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobAcceptance" DROP CONSTRAINT "FK_c3b6aa92beb3e4c469fa43f0516"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobAcceptance" DROP CONSTRAINT "FK_8cd0cd14540c4a82c3cfd02e232"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."review_comment" DROP CONSTRAINT "FK_a6d68cbba1aa55f55faf091ecdb"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."review_comment" DROP CONSTRAINT "FK_575bedb6c80cbf7f74e27a513f4"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."review_comment" DROP CONSTRAINT "FK_d0b1acc674ca5dc4e130c85cb59"`);
        await queryRunner.query(`ALTER TABLE "jobportal_schema"."JobProfile" DROP CONSTRAINT "FK_a0cb0e488f87dd6738728a43cb7"`);
        await queryRunner.query(`DROP INDEX "jobportal_schema"."IDX_54b8caf8b36237f9b4ee973b90"`);
        await queryRunner.query(`DROP INDEX "jobportal_schema"."IDX_2674fd730bc91be395b6b09bff"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."job_profile_skill_skills"`);
        await queryRunner.query(`DROP INDEX "jobportal_schema"."IDX_658d65328050e8bcf358d889dd"`);
        await queryRunner.query(`DROP INDEX "jobportal_schema"."IDX_424d7295da62c1d484e41d466c"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."skills_profiles_job_profile"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."JobAcceptance"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."review_comment"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."JobProfile"`);
        await queryRunner.query(`DROP TABLE "jobportal_schema"."Skills"`);
    }

}
