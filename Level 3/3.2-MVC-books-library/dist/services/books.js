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
exports.getAllBooksPerPageService = void 0;
var connection_1 = require("../database/connection");
var getAllBooksPerPageService = function (searchParams, fields, booksPerPage) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlGetBooksDataPerPage, dataForQuery, searchLine, sqlGetBooksDataCount, booksDataPerPage, booksDataCount, booksDataLength;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sqlGetBooksDataPerPage = "\n        SELECT ".concat(fields.join(', '), "\n        FROM books\n        JOIN books_authors_id ON books_authors_id.book_id = books.book_id\n        JOIN authors ON books_authors_id.author_id = authors.author_id\n        WHERE books.deleted = 0 AND (books.title LIKE ? OR authors.author_name LIKE ?)");
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
                sqlGetBooksDataCount = sqlGetBooksDataPerPage.replace(/(?<=SELECT ).*/i, 'COUNT(*) AS count');
                sqlGetBooksDataPerPage += "\n        LIMIT ?, ".concat(booksPerPage);
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
exports.getAllBooksPerPageService = getAllBooksPerPageService;
