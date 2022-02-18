"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = require("../controllers/admin");
var books_1 = require("../controllers/books");
var adminRouter = express_1.default.Router();
adminRouter.route('/').get(admin_1.getAdminPage);
adminRouter.route('/logout').post(admin_1.adminLogout);
adminRouter.route('/api/v1/create').post(books_1.addBook);
adminRouter.route('/api/v1/delete/:id').get(books_1.setDeletedBook);
exports.default = adminRouter;
