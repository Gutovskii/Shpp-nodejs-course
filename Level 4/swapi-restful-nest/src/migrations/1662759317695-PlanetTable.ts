import { MigrationInterface, QueryRunner } from "typeorm";

export class PlanetTable1662759317695 implements MigrationInterface {
    name = 'PlanetTable1662759317695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`diameter\` int NOT NULL, \`rotation_period\` int NOT NULL, \`orbital_period\` int NOT NULL, \`gravity\` int NOT NULL, \`population\` int NOT NULL, \`climat\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_planets_planet\` (\`film_id\` int NOT NULL, \`planet_id\` int NOT NULL, INDEX \`IDX_c6027f293f78e73539d8ee9744\` (\`film_id\`), INDEX \`IDX_ab8496e34e9348472fa6297afa\` (\`planet_id\`), PRIMARY KEY (\`film_id\`, \`planet_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`homeworld_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_88da46af5a9f357fe40193f7ecc\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`film_planets_planet\` ADD CONSTRAINT \`FK_c6027f293f78e73539d8ee97444\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_planets_planet\` ADD CONSTRAINT \`FK_ab8496e34e9348472fa6297afad\` FOREIGN KEY (\`planet_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film_planets_planet\` DROP FOREIGN KEY \`FK_ab8496e34e9348472fa6297afad\``);
        await queryRunner.query(`ALTER TABLE \`film_planets_planet\` DROP FOREIGN KEY \`FK_c6027f293f78e73539d8ee97444\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_88da46af5a9f357fe40193f7ecc\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`homeworld_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_ab8496e34e9348472fa6297afa\` ON \`film_planets_planet\``);
        await queryRunner.query(`DROP INDEX \`IDX_c6027f293f78e73539d8ee9744\` ON \`film_planets_planet\``);
        await queryRunner.query(`DROP TABLE \`film_planets_planet\``);
        await queryRunner.query(`DROP TABLE \`planet\``);
    }

}
