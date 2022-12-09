import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleTable1667654217387 implements MigrationInterface {
    name = 'RoleTable1667654217387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles_role\` (\`user_id\` int NOT NULL, \`role_id\` int NOT NULL, INDEX \`IDX_09d115a69b6014d324d592f9c4\` (\`user_id\`), INDEX \`IDX_0e2f5483d5e8d52043f9763453\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_f7e93a1974cc86fd87ce6777319\``);
        await queryRunner.query(`ALTER TABLE \`species\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e9797533c90a8211d39784488f3\``);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_f7e93a1974cc86fd87ce6777319\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e9797533c90a8211d39784488f3\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_09d115a69b6014d324d592f9c42\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_0e2f5483d5e8d52043f97634538\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_0e2f5483d5e8d52043f97634538\``);
        await queryRunner.query(`ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_09d115a69b6014d324d592f9c42\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e9797533c90a8211d39784488f3\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_f7e93a1974cc86fd87ce6777319\``);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e9797533c90a8211d39784488f3\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_f7e93a1974cc86fd87ce6777319\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_0e2f5483d5e8d52043f9763453\` ON \`user_roles_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_09d115a69b6014d324d592f9c4\` ON \`user_roles_role\``);
        await queryRunner.query(`DROP TABLE \`user_roles_role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
