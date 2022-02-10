import { db } from '../database/connection';

export const runMigration = async (sqlQuery: string) => {
    await db.query(sqlQuery);
    console.log('Done');
}
