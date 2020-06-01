import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePlanetsTable1590983399984
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'planets',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'mass',
            type: 'double',
          },
          {
            name: 'has_station',
            type: 'boolean',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('planets');
  }
}
