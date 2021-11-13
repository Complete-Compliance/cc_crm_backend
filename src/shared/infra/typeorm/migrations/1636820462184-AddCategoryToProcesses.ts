import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCategoryToProcesses1636820462184
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'scrap_processes',
      new TableColumn({
        name: 'category',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.query(
      "UPDATE scrap_processes SET category='search_leads'",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('scrap_processes', 'category');
  }
}
