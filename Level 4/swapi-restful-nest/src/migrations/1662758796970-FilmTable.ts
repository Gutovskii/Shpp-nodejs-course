import { MigrationInterface, QueryRunner } from "typeorm";

export class FilmTable1662758796970 implements MigrationInterface {
    name = 'FilmTable1662758796970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`film\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`opening_crawl\` varchar(255) NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`realise_date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_characters_person\` (\`film_id\` int NOT NULL, \`character_id\` int NOT NULL, INDEX \`IDX_05161d79711362dd83b12aee9f\` (\`film_id\`), INDEX \`IDX_0a48b93810751acc05a47872ea\` (\`character_id\`), PRIMARY KEY (\`film_id\`, \`character_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`film_characters_person\` ADD CONSTRAINT \`FK_05161d79711362dd83b12aee9f9\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_characters_person\` ADD CONSTRAINT \`FK_0a48b93810751acc05a47872ea2\` FOREIGN KEY (\`character_id\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film_characters_person\` DROP FOREIGN KEY \`FK_0a48b93810751acc05a47872ea2\``);
        await queryRunner.query(`ALTER TABLE \`film_characters_person\` DROP FOREIGN KEY \`FK_05161d79711362dd83b12aee9f9\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a48b93810751acc05a47872ea\` ON \`film_characters_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_05161d79711362dd83b12aee9f\` ON \`film_characters_person\``);
        await queryRunner.query(`DROP TABLE \`film_characters_person\``);
        await queryRunner.query(`DROP TABLE \`film\``);
    }

}
