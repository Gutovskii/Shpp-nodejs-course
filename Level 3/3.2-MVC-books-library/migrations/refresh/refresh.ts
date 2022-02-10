import fs from 'fs';
import { runMigration } from '../runMigration';

const sqlQuery = fs.readFileSync('migrations/refresh/refresh.sql', 'utf-8');

runMigration(sqlQuery);
