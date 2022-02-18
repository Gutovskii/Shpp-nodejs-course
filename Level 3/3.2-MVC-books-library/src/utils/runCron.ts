import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import mysqldump from 'mysqldump';
import { deleteBooksService } from '../services/books';

export const runCron = () => {
    cron.schedule('0-59/15 * * * *', async () => {
        const idBooksToDelete = await deleteBooksService();
        
        if (idBooksToDelete) {
            for (let i = 0; i < idBooksToDelete.length; i++) {
                fs.unlinkSync(path.join('views', 'books-page', 'books-page_files', `${idBooksToDelete[i]}.jpg`));
            }
    
            console.log('Books have been deleted');
        }
    });

    cron.schedule('00 * * * *', () => {
        mysqldump({
            connection: {
                host: process.env.DB_HOST!,
                user: process.env.DB_USER!,
                database: process.env.DB_NAME!,
                password: ''
            },
            dumpToFile: 'backups/DBDump.sql'
        });
        console.log('Backup created');
    });
}