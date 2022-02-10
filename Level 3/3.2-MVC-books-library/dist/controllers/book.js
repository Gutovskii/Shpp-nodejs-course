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
exports.deleteBook = exports.addBook = exports.getBook = void 0;
var express_validator_1 = require("express-validator");
var book_1 = require("../services/book");
var getBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, book_1.getBookService)(req.params.id)];
            case 1:
                bookData = _a.sent();
                return [2 /*return*/, res.render('book-page/book', {
                        bookData: bookData
                    })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.json({ error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBook = getBook;
var addBook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var upload, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, book_1.addBookImageService)()];
            case 1:
                upload = _a.sent();
                upload.single('bookImage')(req, res, function () { return __awaiter(void 0, void 0, void 0, function () {
                    var errors;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // express-validator check
                                (0, express_validator_1.body)('title').notEmpty(),
                                    (0, express_validator_1.body)('year').notEmpty(),
                                    (0, express_validator_1.body)('pages').notEmpty(),
                                    (0, express_validator_1.body)('authorName').notEmpty(),
                                    (0, express_validator_1.body)('description').notEmpty();
                                errors = (0, express_validator_1.validationResult)(req);
                                if (!errors.isEmpty()) {
                                    console.log(errors.array());
                                    return [2 /*return*/, res.json({ error: '404 Bad Request' })];
                                }
                                return [4 /*yield*/, (0, book_1.addBookService)(req.body)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, res.redirect('back')];
                        }
                    });
                }); });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.json({ error: error_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addBook = addBook;
var deleteBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, book_1.deleteBookService)(id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.json({ done: true })];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.json({ error: error_3 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteBook = deleteBook;
