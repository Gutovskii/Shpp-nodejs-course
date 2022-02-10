"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var runMigration_1 = require("../runMigration");
var sqlQuery = fs_1.default.readFileSync('migrations/refresh/refresh.sql', 'utf-8');
(0, runMigration_1.runMigration)(sqlQuery);
