"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var clickedAnalytics_1 = require("../controllers/clickedAnalytics");
var wishfulAnalytics_1 = require("../controllers/wishfulAnalytics");
var router = express_1.default.Router();
router.route('/clicked/:id').put(clickedAnalytics_1.clickedUpdate);
router.route('/wishful/:id').put(wishfulAnalytics_1.wishfulUpdate);
exports.default = router;
