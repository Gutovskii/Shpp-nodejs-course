import fs from 'fs';
import { RowDataPacket } from 'mysql2';
import cron from 'node-cron';
import mysqldump from 'mysqldump';
import { db } from '../database/connection';

export const runCron = () => {
    const sqlGetIdFromDeletedBooks = `
        SELECT books.book_id AS id
        FROM books
        WHERE books.deleted = 1`;

    const sqlDeleteBooks = `
        DELETE FROM books
        WHERE books.deleted = 1`;

    cron.schedule('0-59/15 * * * *', async () => {
        const [idBooksToDelete] = await db.query<RowDataPacket[]>(sqlGetIdFromDeletedBooks);
        await db.query(sqlDeleteBooks);
        
        for (let i = 0; i < idBooksToDelete.length; i++) {
            fs.unlinkSync(`views/books-page/books-page_files/${idBooksToDelete[i].id}.jpg`);
        }

        console.log('Books have been deleted');
    });

    cron.schedule('30 * * * *', () => {
        mysqldump({
            connection: {
                host: 'localhost',
                user: 'root',
                database: 'mvc-books-library',
                password: ''
            },
            dumpToFile: 'backups/DBDump.sql'
        });
        console.log('Backup created');
    });
}