"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(express_1["default"].static('dist'));
var plus = 0;
var minus = 0;
var PlusMinus;
(function (PlusMinus) {
    PlusMinus["Plus"] = "+";
    PlusMinus["Minus"] = "-";
})(PlusMinus || (PlusMinus = {}));
app.get('/', function (req, res) {
    return res.sendFile(__dirname + '/index.html');
});
app.get('/update', function (req, res) {
    return res.json({
        plus: plus,
        minus: minus
    });
});
app.post('/update', function (req, res) {
    var sign = req.body.sign;
    if (sign === '+') {
        plus++;
        return res.json({ sign: sign, plus: plus });
    }
    if (sign === '-') {
        minus++;
        return res.json({ sign: sign, minus: minus });
    }
});
app.listen(3000, function () { return console.log('Server started on port: 3000'); });
