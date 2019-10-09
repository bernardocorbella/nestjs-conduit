import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFollowsTable1570628837673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "follows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "followerId" character varying NOT NULL, "followingId" character varying NOT NULL, CONSTRAINT "PK_2f8f2d99a05c557ad6769180b07" PRIMARY KEY ("id", "followerId", "followingId"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "follows"`, undefined);
  }
}
