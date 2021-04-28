import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNewFieldsToLeads1619621733724
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('leads', [
      new TableColumn({
        name: 'bipdInsuranceOnFile',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'cargoInsuranceOnFile',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'bondInsuranceOnFile',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('leads', [
      new TableColumn({
        name: 'bipdInsuranceOnFile',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'cargoInsuranceOnFile',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'bondInsuranceOnFile',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }
}
