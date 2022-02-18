"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolOptions = void 0;
exports.poolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    multipleStatements: true
};
