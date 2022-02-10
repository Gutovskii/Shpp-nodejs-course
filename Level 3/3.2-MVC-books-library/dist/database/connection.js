"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var promise_1 = require("mysql2/promise");
var options_1 = require("./options");
exports.db = (0, promise_1.createPool)(options_1.poolOptions);
