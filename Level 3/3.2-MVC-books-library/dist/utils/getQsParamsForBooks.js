"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQsParamsForBooks = void 0;
var getQsParamsForBooks = function (query) {
    var qsParams = {};
    qsParams.offset = query.offset;
    if (!qsParams.offset || qsParams.offset < '0')
        qsParams.offset = '0';
    if (query.search)
        qsParams.search = query.search;
    if (query.author)
        qsParams.author = query.author;
    if (query.year)
        qsParams.year = query.year;
    return qsParams;
};
exports.getQsParamsForBooks = getQsParamsForBooks;
