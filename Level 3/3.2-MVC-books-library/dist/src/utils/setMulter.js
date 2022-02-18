"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMulterForBookImage = void 0;
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var setMulterForBookImage = function (id, imgStorePath) {
    var storage = multer_1.default.diskStorage({
        destination: imgStorePath,
        filename: function (req, file, cb) {
            cb(null, (Number(id) + 1).toString() + path_1.default.extname(file.originalname));
        },
    });
    var upload = (0, multer_1.default)({
        storage: storage,
        fileFilter: function (req, file, cb) {
            if (file.mimetype != 'image/jpeg') {
                cb(new Error('File extension is not the .jpg'));
            }
            else {
                cb(null, true);
            }
        }
    });
    return upload;
};
exports.setMulterForBookImage = setMulterForBookImage;
