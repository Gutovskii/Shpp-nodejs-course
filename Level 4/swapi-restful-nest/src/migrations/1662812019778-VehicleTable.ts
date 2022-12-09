import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleTable1662812019778 implements MigrationInterface {
    name = 'VehicleTable1662812019778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`length\` double NOT NULL, \`cost_in_credits\` decimal NOT NULL, \`crew_count\` int NOT NULL, \`passengers_count\` int NOT NULL, \`max_atmospering_speed\` double NOT NULL, \`cargo_capacity\` double NOT NULL, \`consumables\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicle_pilots_person\` (\`vehicle_id\` int NOT NULL, \`pilot_id\` int NOT NULL, INDEX \`IDX_f89a8594cccd909b30bd234d57\` (\`vehicle_id\`), INDEX \`IDX_c73dfb1a6855a3090a53f1775d\` (\`pilot_id\`), PRIMARY KEY (\`vehicle_id\`, \`pilot_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_vehicles_vehicle\` (\`film_id\` int NOT NULL, \`vehicle_id\` int NOT NULL, INDEX \`IDX_3739e5aa868086ee99d121b5c4\` (\`film_id\`), INDEX \`IDX_06a000ce716c9d51c5aab52d92\` (\`vehicle_id\`), PRIMARY KEY (\`film_id\`, \`vehicle_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`cost_in_credits\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`cost_in_credits\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`length\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`length\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`max_atmosphering_speed\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`max_atmosphering_speed\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`mglt\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`mglt\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`hyperdrive_rating\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`hyperdrive_rating\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`cargo_capacity\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`cargo_capacity\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e9797533c90a8211d39784488f3\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`birth_year\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`birth_year\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`height\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`height\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`mass\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`mass\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`planet\` DROP COLUMN \`diameter\``);
        await queryRunner.query(`ALTER TABLE \`planet\` ADD \`diameter\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`planet\` DROP COLUMN \`gravity\``);
        await queryRunner.query(`ALTER TABLE \`planet\` ADD \`gravity\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`planet\` DROP COLUMN \`surface_water\``);
        await queryRunner.query(`ALTER TABLE \`planet\` ADD \`surface_water\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e9797533c90a8211d39784488f3\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vehicle_pilots_person\` ADD CONSTRAINT \`FK_f89a8594cccd909b30bd234d574\` FOREIGN KEY (\`vehicle_id\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vehicle_pilots_person\` ADD CONSTRAINT \`FK_c73dfb1a6855a3090a53f1775db\` FOREIGN KEY (\`pilot_id\`) REFERENCES \`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_vehicles_vehicle\` ADD CONSTRAINT \`FK_3739e5aa868086ee99d121b5c49\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_vehicles_vehicle\` ADD CONSTRAINT \`FK_06a000ce716c9d51c5aab52d924\` FOREIGN KEY (\`vehicle_id\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film_vehicles_vehicle\` DROP FOREIGN KEY \`FK_06a000ce716c9d51c5aab52d924\``);
        await queryRunner.query(`ALTER TABLE \`film_vehicles_vehicle\` DROP FOREIGN KEY \`FK_3739e5aa868086ee99d121b5c49\``);
        await queryRunner.query(`ALTER TABLE \`vehicle_pilots_person\` DROP FOREIGN KEY \`FK_c73dfb1a6855a3090a53f1775db\``);
        await queryRunner.query(`ALTER TABLE \`vehicle_pilots_person\` DROP FOREIGN KEY \`FK_f89a8594cccd909b30bd234d574\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_e9797533c90a8211d39784488f3\``);
        await queryRunner.query(`ALTER TABLE \`planet\` DROP COLUMN \`surface_water\``);
        await queryRunner.query(`ALTER TABLE \`planet\` ADD \`surface_water\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`planet\` DROP COLUMN \`gravity\``);
        await queryRunner.query(`ALTER TABLE \`planet\` ADD \`gravity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`planet\` DROP COLUMN \`diameter\``);
        await queryRunner.query(`ALTER TABLE \`planet\` ADD \`diameter\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`homeworld_id\` \`homeworld_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`mass\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`mass\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`height\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`height\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`birth_year\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`birth_year\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_e9797533c90a8211d39784488f3\` FOREIGN KEY (\`homeworld_id\`) REFERENCES \`planet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`cargo_capacity\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`cargo_capacity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`hyperdrive_rating\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`hyperdrive_rating\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`mglt\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`mglt\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`max_atmosphering_speed\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`max_atmosphering_speed\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`length\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`length\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`starship\` DROP COLUMN \`cost_in_credits\``);
        await queryRunner.query(`ALTER TABLE \`starship\` ADD \`cost_in_credits\` int NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_06a000ce716c9d51c5aab52d92\` ON \`film_vehicles_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_3739e5aa868086ee99d121b5c4\` ON \`film_vehicles_vehicle\``);
        await queryRunner.query(`DROP TABLE \`film_vehicles_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_c73dfb1a6855a3090a53f1775d\` ON \`vehicle_pilots_person\``);
        await queryRunner.query(`DROP INDEX \`IDX_f89a8594cccd909b30bd234d57\` ON \`vehicle_pilots_person\``);
        await queryRunner.query(`DROP TABLE \`vehicle_pilots_person\``);
        await queryRunner.query(`DROP TABLE \`vehicle\``);
    }

}
