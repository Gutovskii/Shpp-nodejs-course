import { RowDataPacket } from 'mysql2';
import { db } from '../database/connection'
import { SearchParams, SqlBooksData } from '../interfaces/interfaces';

export const getAllBooksPerPageService = async (searchParams: SearchParams, fields: string[], booksPerPage: number): Promise<SqlBooksData> => {
    let sqlGetBooksDataPerPage: string = `
        SELECT ${fields.join(', ')}
        FROM books
        JOIN books_authors_id ON books_authors_id.book_id = books.book_id
        JOIN authors ON books_authors_id.author_id = authors.author_id
        WHERE books.deleted = 0 AND (books.title LIKE ? OR authors.author_name LIKE ?)`;

    const dataForQuery: (string | number)[] = [];

    if (!searchParams.search) {
        searchParams.search = '%%';
        dataForQuery.push(searchParams.search);
        dataForQuery.push(searchParams.search);
    } else {
        const searchLine: string[] = Array.from(searchParams.search);
        searchLine.unshift('%');
        searchLine.push('%');
        dataForQuery.push(searchLine.join(''));
        dataForQuery.push(searchLine.join(''));
    }
    if (searchParams.year) {
        sqlGetBooksDataPerPage += ` AND books.year_of_publication = ?`;
        dataForQuery.push(Number(searchParams.year));
    }
    if (searchParams.author) {
        sqlGetBooksDataPerPage += ` AND authors.author_id = ?`;
        dataForQuery.push(Number(searchParams.author));
    }
    if (!searchParams.offset) {
        searchParams.offset = '0';
    } else {
        if (searchParams.offset < '0') searchParams.offset = '0';
    }
    dataForQuery.push(Number(searchParams.offset));

    const sqlGetBooksDataCount = sqlGetBooksDataPerPage.replace(/(?<=SELECT ).*/i, 'COUNT(DISTINCT books.title) AS count');
    
    sqlGetBooksDataPerPage += `
        GROUP BY books_authors_id.book_id
        LIMIT ?, ${booksPerPage}`;

    const [booksDataPerPage] = await db.query<RowDataPacket[]>(sqlGetBooksDataPerPage, dataForQuery);
    const [booksDataCount] = await db.query<RowDataPacket[]>(sqlGetBooksDataCount, dataForQuery);
    
    let booksDataLength = booksDataCount[0].count;

    return {
        booksDataPerPage,
        booksDataLength,
        pageQuantity: Math.ceil(booksDataLength / booksPerPage)
    }
}