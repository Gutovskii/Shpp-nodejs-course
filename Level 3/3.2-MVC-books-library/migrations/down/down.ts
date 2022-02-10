import fs from 'fs';
import { runMigration } from '../runMigration';

const sqlQuery = fs.readFileSync('migrations/down/down.sql', 'utf-8');

runMigration(sqlQuery);
