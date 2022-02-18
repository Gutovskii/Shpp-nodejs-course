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
exports.deleteBooksService = exports.setDeletedBookService = exports.addBookImageService = exports.addBookService = exports.getBookService = exports.getBooksPerPageService = void 0;
var connection_1 = require("../database/connection");
var setMulter_1 = require("../utils/setMulter");
var getBooksPerPageService = function (searchParams, fields, booksPerPage) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlGetBooksDataPerPage, dataForQuery, searchLine, sqlGetBooksDataCount, booksDataPerPage, booksDataCount, booksDataLength;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqlGetBooksDataPerPage = "\n        SELECT " + fields.join(', ') + "\n        FROM books\n        \n        JOIN books_authors_id ON books_authors_id.book_id = books.book_id\n        JOIN authors ON books_authors_id.author_id = authors.author_id\n        WHERE books.deleted = 0 AND (books.title LIKE ? OR authors.author_name LIKE ?)";
                dataForQuery = [];
                if (!searchParams.search) {
                    searchParams.search = '%%';
                    dataForQuery.push(searchParams.search);
                    dataForQuery.push(searchParams.search);
                }
                else {
                    searchLine = Array.from(searchParams.search);
                    searchLine.unshift('%');
                    searchLine.push('%');
                    dataForQuery.push(searchLine.join(''));
                    dataForQuery.push(searchLine.join(''));
                }
                if (searchParams.year) {
                    sqlGetBooksDataPerPage += " AND books.year_of_publication = ?";
                    dataForQuery.push(Number(searchParams.year));
                }
                if (searchParams.author) {
                    sqlGetBooksDataPerPage += " AND authors.author_id = ?";
                    dataForQuery.push(Number(searchParams.author));
                }
                if (!searchParams.offset) {
                    searchParams.offset = '0';
                }
                else {
                    if (searchParams.offset < '0')
                        searchParams.offset = '0';
                }
                dataForQuery.push(Number(searchParams.offset));
                sqlGetBooksDataCount = sqlGetBooksDataPerPage.replace(/(?<=SELECT ).*/i, 'COUNT(DISTINCT books.title) AS count');
                sqlGetBooksDataPerPage += "\n        GROUP BY books_authors_id.book_id\n        LIMIT ?, " + booksPerPage;
                return [4 /*yield*/, connection_1.db.query(sqlGetBooksDataPerPage, dataForQuery)];
            case 1:
                booksDataPerPage = (_a.sent())[0];
                return [4 /*yield*/, connection_1.db.query(sqlGetBooksDataCount, dataForQuery)];
            case 2:
                booksDataCount = (_a.sent())[0];
                booksDataLength = booksDataCount[0].count;
                return [2 /*return*/, {
                        booksDataPerPage: booksDataPerPage,
                        booksDataLength: booksDataLength,
                        pageQuantity: Math.ceil(booksDataLength / booksPerPage)
                    }];
        }
    });
}); };
exports.getBooksPerPageService = getBooksPerPageService;
var getBookService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlGetBookData, bookData;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sqlGetBookData = "\n        SELECT books_authors_id.book_id, books.title, books.year_of_publication, books.pages, books.description, GROUP_CONCAT(CONCAT(' ', authors.author_name)) AS authorsNames FROM books\n        JOIN books_authors_id ON books_authors_id.book_id = books.book_id\n        JOIN authors ON books_authors_id.author_id = authors.author_id\n        WHERE books.book_id = ?";
                return [4 /*yield*/, connection_1.db.query(sqlGetBookData, [id])];
            case 1:
                bookData = (_b.sent())[0];
                if ((_a = bookData[0]) === null || _a === void 0 ? void 0 : _a.book_id) {
                    return [2 /*return*/, bookData[0]];
                }
                else {
                    return [2 /*return*/, { errorNotFound: '404 Not Found' }];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getBookService = getBookService;
var addBookService = function (newBookAndAuthorData) { return __awaiter(void 0, void 0, void 0, function () {
    var addBookData, addAuthorData, sqlCreateBinding, sqlNewBookData, bookId, authorId, i;
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
                addAuthorData = function (authorsData) { return __awaiter(void 0, void 0, void 0, function () {
                    var sqlFindExistingAuthorsNames, sqlAuthorsNamesData, i, existingAuthorsData, authorsId, existingAuthorsNames, i, existIdx, sqlAddAuthor, newAuthorOkPacket;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                sqlFindExistingAuthorsNames = "\n            SELECT authors.author_id, authors.author_name\n            FROM authors\n            WHERE LOWER(authors.author_name) = LOWER(?)";
                                sqlAuthorsNamesData = [authorsData.authorsNames[0]];
                                authorsData.authorsNames = authorsData.authorsNames.filter(function (name) { return name.trim(); });
                                if (authorsData.authorsNames.length > 1) {
                                    for (i = 1; i < authorsData.authorsNames.length; i++) {
                                        sqlFindExistingAuthorsNames += " OR LOWER(authors.author_name) = LOWER(?)";
                                        sqlAuthorsNamesData.push(authorsData.authorsNames[i]);
                                    }
                                }
                                return [4 /*yield*/, connection_1.db.query(sqlFindExistingAuthorsNames, sqlAuthorsNamesData)];
                            case 1:
                                existingAuthorsData = (_a.sent())[0];
                                authorsId = [];
                                existingAuthorsNames = existingAuthorsData.map(function (existingAuthorData) { return existingAuthorData.author_name; });
                                i = 0, existIdx = 0;
                                _a.label = 2;
                            case 2:
                                if (!(i < authorsData.authorsNames.length)) return [3 /*break*/, 6];
                                if (!!existingAuthorsNames.includes(authorsData.authorsNames[i])) return [3 /*break*/, 4];
                                sqlAddAuthor = "INSERT INTO authors(author_name) VALUES(?)";
                                return [4 /*yield*/, connection_1.db.query(sqlAddAuthor, [authorsData.authorsNames[i]])];
                            case 3:
                                newAuthorOkPacket = (_a.sent())[0];
                                authorsId.push(newAuthorOkPacket.insertId);
                                return [3 /*break*/, 5];
                            case 4:
                                authorsId.push(existingAuthorsData[existIdx].author_id);
                                existIdx++;
                                _a.label = 5;
                            case 5:
                                i++;
                                return [3 /*break*/, 2];
                            case 6: return [2 /*return*/, authorsId];
                        }
                    });
                }); };
                sqlCreateBinding = "\n        INSERT INTO books_authors_id VALUES";
                sqlNewBookData = [];
                return [4 /*yield*/, addBookData(newBookAndAuthorData)];
            case 1:
                bookId = _a.sent();
                return [4 /*yield*/, addAuthorData(newBookAndAuthorData)];
            case 2:
                authorId = _a.sent();
                for (i = 0; i < authorId.length; i++) {
                    sqlCreateBinding += "\n            (?, ?),";
                    sqlNewBookData.push(bookId);
                    sqlNewBookData.push(authorId[i]);
                }
                sqlCreateBinding = sqlCreateBinding.slice(0, -1);
                return [4 /*yield*/, connection_1.db.query(sqlCreateBinding, sqlNewBookData)];
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
var setDeletedBookService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
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
exports.setDeletedBookService = setDeletedBookService;
var deleteBooksService = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sqlGetDeletedBooksIds, sqlDeleteBooks, booksIdsToDelete, deletedIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqlGetDeletedBooksIds = "\n        SELECT books.book_id AS id\n        FROM books\n        WHERE books.deleted = 1";
                sqlDeleteBooks = "\n        DELETE FROM books\n        WHERE books.deleted = 1";
                return [4 /*yield*/, connection_1.db.query(sqlGetDeletedBooksIds)];
            case 1:
                booksIdsToDelete = (_a.sent())[0];
                deletedIds = booksIdsToDelete.map(function (idObj) { return idObj.id; });
                return [4 /*yield*/, connection_1.db.query(sqlDeleteBooks)];
            case 2:
                _a.sent();
                return [2 /*return*/, deletedIds];
        }
    });
}); };
exports.deleteBooksService = deleteBooksService;
