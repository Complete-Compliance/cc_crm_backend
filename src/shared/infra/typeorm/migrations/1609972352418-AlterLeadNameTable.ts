import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterLeadNameTable1609972352418
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "leads" RENAME COLUMN "fullName" TO "dbaName"',
    );

    await queryRunner.query(
      'ALTER TABLE "leads" ADD COLUMN "fullName" varchar',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "leads" DROP COLUMN "fullName"');

    await queryRunner.query(
      'ALTER TABLE "leads" RENAME COLUMN "dbaName" TO "fullName"',
    );
  }
}
