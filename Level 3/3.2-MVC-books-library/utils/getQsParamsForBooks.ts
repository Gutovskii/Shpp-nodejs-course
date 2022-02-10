import { SearchParams } from "../interfaces/interfaces";

export const getQsParamsForBooks = (query: SearchParams): SearchParams => {
    const qsParams: SearchParams = {} as SearchParams;

    qsParams.offset = <string>query.offset;
    if (!qsParams.offset || qsParams.offset < '0') qsParams.offset = '0';
    if (query.search) qsParams.search = <string>query.search;
    if (query.author) qsParams.author = <string>query.author;
    if (query.year) qsParams.year = <string>query.year;
    
    return qsParams;
}