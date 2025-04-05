import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1743802625021 implements MigrationInterface {
  name = "CreateTables1743802625021";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(128) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`partNumber\` varchar(255) NOT NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`devices\` ADD CONSTRAINT \`FK_17ef5d7808b3d831b6377032023\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`devices\` DROP FOREIGN KEY \`FK_17ef5d7808b3d831b6377032023\``,
    );
    await queryRunner.query(`DROP TABLE \`devices\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
