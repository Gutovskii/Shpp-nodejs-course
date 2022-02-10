import { PoolOptions } from "mysql2/typings/mysql";

export const poolOptions: PoolOptions = {
    host: 'localhost',
    user: 'root',
    database: 'mvc-books-library',
    multipleStatements: true
};