import { MigrationInterface, QueryRunner } from "typeorm";

export class PersonTable1662374967106 implements MigrationInterface {
    name = 'PersonTable1662374967106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`person\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`birth_year\` varchar(255) NOT NULL,
                \`gender\` varchar(255) NOT NULL,
                \`height\` varchar(255) NOT NULL,
                \`mass\` varchar(255) NOT NULL,
                \`eye_color\` varchar(255) NOT NULL,
                \`hair_color\` varchar(255) NOT NULL,
                \`skin_color\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`person\`
        `);
    }

}
