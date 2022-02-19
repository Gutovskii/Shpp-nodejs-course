import 'dotenv/config';
import { PoolOptions } from "mysql2/typings/mysql";

export const poolOptions: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    multipleStatements: true
};