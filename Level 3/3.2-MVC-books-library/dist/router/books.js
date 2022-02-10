"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var book_1 = require("../controllers/book");
var books_1 = require("../controllers/books");
var router = express_1.default.Router();
router.route('/').get(books_1.getBooks);
router.route('/book/:id').get(book_1.getBook);
exports.default = router;
