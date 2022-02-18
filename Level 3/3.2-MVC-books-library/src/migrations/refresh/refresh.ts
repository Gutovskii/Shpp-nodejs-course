import fs from 'fs';
import path from 'path';
import { runMigration } from '../runMigration';

const sqlQuery = fs.readFileSync(path.join('src', 'migrations', 'refresh', 'refresh.sql'), 'utf-8');

runMigration(sqlQuery);
