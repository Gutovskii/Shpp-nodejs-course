import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { ormConfig } from "./ormconfig";

const dbConfig: MysqlConnectionOptions = {
    ...ormConfig,
    migrations: ['dist/src/seeds/*{.ts,.js}'],
    migrationsTableName: 'seeds'
}

export default new DataSource(dbConfig);