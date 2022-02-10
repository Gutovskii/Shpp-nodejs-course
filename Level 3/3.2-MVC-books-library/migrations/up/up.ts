import fs from 'fs';
import { runMigration } from '../runMigration';

const sqlQuery = fs.readFileSync('migrations/up/up.sql', 'utf-8');

runMigration(sqlQuery);