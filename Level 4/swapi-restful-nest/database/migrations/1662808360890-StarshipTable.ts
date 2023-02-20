import { MigrationInterface, QueryRunner } from 'typeorm';

export class StarshipTable1662808360890 implements MigrationInterface {
  name = 'StarshipTable1662808360890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_88da46af5a9f357fe40193f7ecc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` DROP FOREIGN KEY \`FK_05161d79711362dd83b12aee9f9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` DROP FOREIGN KEY \`FK_0a48b93810751acc05a47872ea2\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_05161d79711362dd83b12aee9f\` ON \`film_characters_person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0a48b93810751acc05a47872ea\` ON \`film_characters_person\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`starship\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` int NOT NULL, \`length\` int NOT NULL, \`crew_count\` int NOT NULL, \`passengers_count\` int NOT NULL, \`max_atmosphering_speed\` int NOT NULL, \`mglt\` int NOT NULL, \`hyperdrive_rating\` int NOT NULL, \`cargo_capacity\` int NOT NULL, \`consumables\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`starship_pilots_person\` (\`starship_id\` int NOT NULL, \`pilot_id\` int NOT NULL, INDEX \`IDX_d5cd9218bdd6842c6a969f41bb\` (\`starship_id\`), INDEX \`IDX_c288e78f5f06c73e7f7dc0d098\` (\`pilot_id\`), PRIMARY KEY (\`starship_id\`, \`pilot_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`film_starships_starship\` (\`film_id\` int NOT NULL, \`starship_id\` int NOT NULL, INDEX \`IDX_4164078fd6526b02f59d05c335\` (\`film_id\`), INDEX \`IDX_31c21f4a2e9b82e67edb2c0fce\` (\`starship_id\`), PRIMARY KEY (\`film_id\`, \`starship_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_9a72ed6b1d86f4fb3c91ac3ed4\` ON \`film_characters_person\` (\`film_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_ac77e50e8297245fc2dec2208c\` ON \`film_characters_person\` (\`character_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e9797533c90a8211d39784488f3\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`starship_pilots_person\` ADD CONSTRAINT \`FK_d5cd9218bdd6842c6a969f41bb7\` FOREIGN KEY (\`starship_id\`) REFERENCES \`starship\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`starship_pilots_person\` ADD CONSTRAINT \`FK_c288e78f5f06c73e7f7dc0d0987\` FOREIGN KEY (\`pilot_id\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` ADD CONSTRAINT \`FK_9a72ed6b1d86f4fb3c91ac3ed43\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` ADD CONSTRAINT \`FK_ac77e50e8297245fc2dec2208c5\` FOREIGN KEY (\`character_id\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_starships_starship\` ADD CONSTRAINT \`FK_4164078fd6526b02f59d05c335d\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_starships_starship\` ADD CONSTRAINT \`FK_31c21f4a2e9b82e67edb2c0fce2\` FOREIGN KEY (\`starship_id\`) REFERENCES \`starship\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`film_starships_starship\` DROP FOREIGN KEY \`FK_31c21f4a2e9b82e67edb2c0fce2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_starships_starship\` DROP FOREIGN KEY \`FK_4164078fd6526b02f59d05c335d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` DROP FOREIGN KEY \`FK_ac77e50e8297245fc2dec2208c5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` DROP FOREIGN KEY \`FK_9a72ed6b1d86f4fb3c91ac3ed43\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`starship_pilots_person\` DROP FOREIGN KEY \`FK_c288e78f5f06c73e7f7dc0d0987\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`starship_pilots_person\` DROP FOREIGN KEY \`FK_d5cd9218bdd6842c6a969f41bb7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e9797533c90a8211d39784488f3\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ac77e50e8297245fc2dec2208c\` ON \`film_characters_person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9a72ed6b1d86f4fb3c91ac3ed4\` ON \`film_characters_person\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_31c21f4a2e9b82e67edb2c0fce\` ON \`film_starships_starship\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4164078fd6526b02f59d05c335\` ON \`film_starships_starship\``,
    );
    await queryRunner.query(`DROP TABLE \`film_starships_starship\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_c288e78f5f06c73e7f7dc0d098\` ON \`starship_pilots_person\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d5cd9218bdd6842c6a969f41bb\` ON \`starship_pilots_person\``,
    );
    await queryRunner.query(`DROP TABLE \`starship_pilots_person\``);
    await queryRunner.query(`DROP TABLE \`starship\``);
    await queryRunner.query(
      `CREATE INDEX \`IDX_0a48b93810751acc05a47872ea\` ON \`film_characters_person\` (\`character_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_05161d79711362dd83b12aee9f\` ON \`film_characters_person\` (\`film_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` ADD CONSTRAINT \`FK_0a48b93810751acc05a47872ea2\` FOREIGN KEY (\`character_id\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`film_characters_person\` ADD CONSTRAINT \`FK_05161d79711362dd83b12aee9f9\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`person\` ADD CONSTRAINT \`FK_88da46af5a9f357fe40193f7ecc\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
