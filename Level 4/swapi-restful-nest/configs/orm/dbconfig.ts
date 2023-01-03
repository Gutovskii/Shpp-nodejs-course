import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { ormConfig } from "../ormconfig";

export const dbConfig: MysqlConnectionOptions = {
    ...ormConfig,
    migrations: ['dist/src/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations'
}

export default new DataSource(dbConfig);