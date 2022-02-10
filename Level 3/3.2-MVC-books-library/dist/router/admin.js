"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = require("../controllers/admin");
var book_1 = require("../controllers/book");
var router = express_1.default.Router();
router.route('/').get(admin_1.getAdminPage);
router.route('/logout').post(admin_1.adminLogout);
router.route('/api/v1/create').post(book_1.addBook);
router.route('/api/v1/delete/:id').get(book_1.deleteBook);
exports.default = router;
