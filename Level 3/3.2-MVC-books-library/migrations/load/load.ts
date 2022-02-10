import fs from 'fs';
import { runMigration } from '../runMigration';

const sqlQuery = fs.readFileSync('migrations/load/load.sql', 'utf-8');

runMigration(sqlQuery);
