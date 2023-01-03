import { MigrationInterface, QueryRunner } from "typeorm";

export class SpeciesTable1662823021634 implements MigrationInterface {
    name = 'SpeciesTable1662823021634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`species\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` double NOT NULL, \`average_lifespan\` double NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`homeworld_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person_species_species\` (\`person_id\` int NOT NULL, \`species_id\` int NOT NULL, INDEX \`IDX_c925dcc30dee99a9adc7ab71b6\` (\`person_id\`), INDEX \`IDX_57bacd286664d61d21d5bd226d\` (\`species_id\`), PRIMARY KEY (\`person_id\`, \`species_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_species_species\` (\`film_id\` int NOT NULL, \`species_id\` int NOT NULL, INDEX \`IDX_0fc502f31c9e1b62f6e6c38314\` (\`film_id\`), INDEX \`IDX_f24ab6fc37cb0682cc6e9ecbea\` (\`species_id\`), PRIMARY KEY (\`film_id\`, \`species_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e9797533c90a8211d39784488f3\``);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e9797533c90a8211d39784488f3\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_f7e93a1974cc86fd87ce6777319\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person_species_species\` ADD CONSTRAINT \`FK_c925dcc30dee99a9adc7ab71b6a\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_species_species\` ADD CONSTRAINT \`FK_57bacd286664d61d21d5bd226db\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_species_species\` ADD CONSTRAINT \`FK_0fc502f31c9e1b62f6e6c383146\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_species_species\` ADD CONSTRAINT \`FK_f24ab6fc37cb0682cc6e9ecbea6\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film_species_species\` DROP FOREIGN KEY \`FK_f24ab6fc37cb0682cc6e9ecbea6\``);
        await queryRunner.query(`ALTER TABLE \`film_species_species\` DROP FOREIGN KEY \`FK_0fc502f31c9e1b62f6e6c383146\``);
        await queryRunner.query(`ALTER TABLE \`person_species_species\` DROP FOREIGN KEY \`FK_57bacd286664d61d21d5bd226db\``);
        await queryRunner.query(`ALTER TABLE \`person_species_species\` DROP FOREIGN KEY \`FK_c925dcc30dee99a9adc7ab71b6a\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_f7e93a1974cc86fd87ce6777319\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e9797533c90a8211d39784488f3\``);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e9797533c90a8211d39784488f3\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_f24ab6fc37cb0682cc6e9ecbea\` ON \`film_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_0fc502f31c9e1b62f6e6c38314\` ON \`film_species_species\``);
        await queryRunner.query(`DROP TABLE \`film_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_57bacd286664d61d21d5bd226d\` ON \`person_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_c925dcc30dee99a9adc7ab71b6\` ON \`person_species_species\``);
        await queryRunner.query(`DROP TABLE \`person_species_species\``);
        await queryRunner.query(`DROP TABLE \`species\``);
    }

}
