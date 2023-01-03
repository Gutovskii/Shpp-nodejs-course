import * as dotenv from 'dotenv';
import * as path from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

dotenv.config();

export const ormConfig: MysqlConnectionOptions & { seeds: string[] } = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    entities: [path.join(__dirname, '/../**/**.entity{.ts,.js}')],
    migrations: ['database/migrations/*{.ts,.js}'],
    seeds: ['database/seeds/*.seed{.ts,.js}']
}

export default ormConfig;