import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddInsuranceTypeToLeadsTable1619876391036
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'leads',
      new TableColumn({
        name: 'insuranceType',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('leads', 'insuranceType');
  }
}
