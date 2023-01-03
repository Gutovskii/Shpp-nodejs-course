import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1667241836039 implements MigrationInterface {
    name = 'UserTable1667241836039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`hash_password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_f7e93a1974cc86fd87ce6777319\``);
        await queryRunner.query(`ALTER TABLE \`species\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e9797533c90a8211d39784488f3\``);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_f7e93a1974cc86fd87ce6777319\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e9797533c90a8211d39784488f3\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e9797533c90a8211d39784488f3\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_f7e93a1974cc86fd87ce6777319\``);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e9797533c90a8211d39784488f3\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_f7e93a1974cc86fd87ce6777319\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
