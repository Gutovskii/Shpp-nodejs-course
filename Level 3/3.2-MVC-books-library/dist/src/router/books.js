"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var books_1 = require("../controllers/books");
var booksRouter = express_1.default.Router();
booksRouter.route('/').get(books_1.getBooks);
booksRouter.route('/book/:id').get(books_1.getBook);
exports.default = booksRouter;
