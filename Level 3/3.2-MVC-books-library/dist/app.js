"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var express_basic_auth_1 = __importDefault(require("express-basic-auth"));
var runCron_1 = require("./src/utils/runCron");
var books_1 = __importDefault(require("./src/router/books"));
var admin_1 = __importDefault(require("./src/router/admin"));
var analytics_1 = __importDefault(require("./src/router/analytics"));
var app = (0, express_1.default)();
var port = Number(process.env.PORT) || 5000;
app.set('view engine', 'pug');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', express_1.default.static('views/books-page'));
app.use('/book/:id', express_1.default.static('views/book-page'));
app.use('/admin', express_1.default.static('views/admin-page'));
app.use('/register', express_1.default.static('views/register-page'));
var adminUserData = {};
adminUserData[process.env.ADMIN_LOGIN] = process.env.ADMIN_PASSWORD;
app.use('/', books_1.default);
app.use('/admin', (0, express_basic_auth_1.default)({
    users: adminUserData,
    challenge: true
}), admin_1.default);
app.use('/api/v1', analytics_1.default);
function bootstrap() {
    try {
        (0, runCron_1.runCron)();
        app.listen(port, function () { return console.log("Server started on port: " + port); });
    }
    catch (error) {
        console.log(error);
    }
}
bootstrap();
