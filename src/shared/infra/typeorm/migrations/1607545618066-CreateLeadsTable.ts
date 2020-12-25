import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateLeadsTable1607545618066
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'leads',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'usdot',
            type: 'varchar',
          },
          {
            name: 'entityType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'operatingStatus',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fullName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'primaryAddress',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'zipCode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'altAddress',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'altState',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'altZipCode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'powerUnits',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'drivers',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mcs150FormDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'operationClassification',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'carrierOperation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cargoCarried',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bipdInsuranceRequired',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cargoInsuranceRequired',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bondInsuranceRequired',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'insuranceCarrier',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'policySurety',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'postedDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'coverageFrom',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'coverageTo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'effectiveDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cancellationDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('leads');
  }
}
