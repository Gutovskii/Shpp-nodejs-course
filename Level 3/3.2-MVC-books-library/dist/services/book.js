"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = exports.addBookImageService = exports.addBookService = exports.getBookService = void 0;
var connection_1 = require("../database/connection");
var setMulter_1 = require("../utils/setMulter");
var getBookService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, bookData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n        SELECT books_authors_id.book_id, books.title, books.year_of_publication, books.pages, books.description, authors.author_name FROM books\n        JOIN books_authors_id ON books_authors_id.book_id = books.book_id\n        JOIN authors ON books_authors_id.author_id = authors.author_id\n        WHERE books.book_id = ?";
                return [4 /*yield*/, connection_1.db.query(sql, [id])];
            case 1:
                bookData = (_a.sent())[0];
                return [2 /*return*/, bookData[0]];
        }
    });
}); };
exports.getBookService = getBookService;
var addBookService = function (newBookAndAuthorData) { return __awaiter(void 0, void 0, void 0, function () {
    var addBookData, addAuthorData, sqlCreateBinding, bookId, authorId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                addBookData = function (newBookData) { return __awaiter(void 0, void 0, void 0, function () {
                    var sqlGetLastBookId, sqlCreateNewBook, lastBookId, dataForQuery;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                sqlGetLastBookId = "\n            SELECT MAX(books.book_id) AS id\n            FROM books";
                                sqlCreateNewBook = "\n            INSERT INTO books(book_id, title, year_of_publication, pages, description)\n            VALUES(?, ?, ?, ?, ?)";
                                return [4 /*yield*/, connection_1.db.query(sqlGetLastBookId)];
                            case 1:
                                lastBookId = (_a.sent())[0];
                                dataForQuery = [
                                    lastBookId[0].id + 1,
                                    newBookData.title,
                                    Number(newBookData.year),
                                    Number(newBookData.pages),
                                    newBookData.description,
                                ];
                                return [4 /*yield*/, connection_1.db.query(sqlCreateNewBook, dataForQuery)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, lastBookId[0].id + 1];
                        }
                    });
                }); };
                addAuthorData = function (authorData) { return __awaiter(void 0, void 0, void 0, function () {
                    var sqlFindExistingAuthorName, existingAuthorData, sqlAddAuthor, sqlGetLastAuthorId, lastAuthorId;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                sqlFindExistingAuthorName = "\n            SELECT authors.author_id AS id, authors.author_name AS name\n            FROM authors\n            WHERE authors.author_name = ?";
                                return [4 /*yield*/, connection_1.db.query(sqlFindExistingAuthorName, [authorData.authorName])];
                            case 1:
                                existingAuthorData = (_b.sent())[0];
                                if (!!((_a = existingAuthorData[0]) === null || _a === void 0 ? void 0 : _a.name)) return [3 /*break*/, 4];
                                sqlAddAuthor = "\n                INSERT INTO authors(author_name)\n                VALUES(?)\n            ";
                                sqlGetLastAuthorId = "\n                SELECT MAX(authors.author_id) AS id\n                FROM authors\n            ";
                                return [4 /*yield*/, connection_1.db.query(sqlAddAuthor, [authorData.authorName])];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, connection_1.db.query(sqlGetLastAuthorId)];
                            case 3:
                                lastAuthorId = (_b.sent())[0];
                                return [2 /*return*/, lastAuthorId[0].id];
                            case 4: return [2 /*return*/, existingAuthorData[0].id];
                        }
                    });
                }); };
                sqlCreateBinding = "\n        INSERT INTO books_authors_id\n        VALUES(?, ?);\n    ";
                return [4 /*yield*/, addBookData(newBookAndAuthorData)];
            case 1:
                bookId = _a.sent();
                return [4 /*yield*/, addAuthorData(newBookAndAuthorData)];
            case 2:
                authorId = _a.sent();
                return [4 /*yield*/, connection_1.db.query(sqlCreateBinding, [bookId, authorId])];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addBookService = addBookService;
var addBookImageService = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sqlGetLastBookId, lastBookId, upload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqlGetLastBookId = "\n        SELECT MAX(books.book_id) AS id\n        FROM books";
                return [4 /*yield*/, connection_1.db.query(sqlGetLastBookId)];
            case 1:
                lastBookId = (_a.sent())[0];
                upload = (0, setMulter_1.setMulterForBookImage)(lastBookId[0].id, './views/books-page/books-page_files');
                return [2 /*return*/, upload];
        }
    });
}); };
exports.addBookImageService = addBookImageService;
var deleteBookService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlSoftDeleteBook;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqlSoftDeleteBook = "\n        UPDATE books\n        SET books.deleted = 1\n        WHERE books.book_id = ?";
                return [4 /*yield*/, connection_1.db.query(sqlSoftDeleteBook, [id])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteBookService = deleteBookService;
