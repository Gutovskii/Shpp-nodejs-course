import multer from "multer";
import { OkPacket, RowDataPacket } from "mysql2";
import { db } from "../database/connection";
import { AuthorData, GetBookDataResult, NewBookAndAuthorData, NewBookData, SearchParams, SqlBooksData } from '../interfaces/interfaces';
import { setMulterForBookImage } from "../utils/setMulter";

export const getBooksPerPageService = async (searchParams: SearchParams, fields: string[], booksPerPage: number): Promise<SqlBooksData> => {
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

export const getBookService = async (id: string): Promise<GetBookDataResult> => {
    const sqlGetBookData: string = `
        SELECT books_authors_id.book_id, books.title, books.year_of_publication, books.pages, books.description, GROUP_CONCAT(CONCAT(' ', authors.author_name)) AS authorsNames FROM books
        JOIN books_authors_id ON books_authors_id.book_id = books.book_id
        JOIN authors ON books_authors_id.author_id = authors.author_id
        WHERE books.book_id = ?`;
    
    const [bookData] = await db.query<RowDataPacket[]>(sqlGetBookData, [id]);
    if (bookData[0]?.book_id) {
        return bookData[0];
    }
    else {
        return { errorNotFound: '404 Not Found' };
    }
}

export const addBookService = async (newBookAndAuthorData: NewBookAndAuthorData): Promise<void> => {
    const addBookData = async (newBookData: NewBookData): Promise<number> => {
        const sqlGetLastBookId: string = `
            SELECT MAX(books.book_id) AS id
            FROM books`;

        let sqlCreateNewBook: string = `
            INSERT INTO books(book_id, title, year_of_publication, pages, description)
            VALUES(?, ?, ?, ?, ?)`;

        const [lastBookId] = await db.query<RowDataPacket[]>(sqlGetLastBookId);
        
        const dataForQuery: (string | number)[] = [
            lastBookId[0].id + 1,
            newBookData.title,
            Number(newBookData.year),
            Number(newBookData.pages),
            newBookData.description,
        ];

        await db.query<RowDataPacket[]>(sqlCreateNewBook, dataForQuery);
        
        return lastBookId[0].id + 1;
    }

    const addAuthorData = async (authorsData: AuthorData): Promise<number[]> => {
        let sqlFindExistingAuthorsNames: string = `
            SELECT authors.author_id, authors.author_name
            FROM authors
            WHERE LOWER(authors.author_name) = LOWER(?)`;

        const sqlAuthorsNamesData: string[] = [authorsData.authorsNames[0]];
        
        authorsData.authorsNames = authorsData.authorsNames.filter(name => name.trim());

        if (authorsData.authorsNames.length > 1) {
            for (let i = 1; i < authorsData.authorsNames.length; i++) {
                sqlFindExistingAuthorsNames += ` OR LOWER(authors.author_name) = LOWER(?)`;
                sqlAuthorsNamesData.push(authorsData.authorsNames[i]);
            }
        }

        const [existingAuthorsData] = await db.query<RowDataPacket[]>(sqlFindExistingAuthorsNames, sqlAuthorsNamesData);
        
        const authorsId: number[] = [];
        const existingAuthorsNames: string[] = existingAuthorsData.map(existingAuthorData => existingAuthorData.author_name);
        
        for (let i = 0, existIdx = 0; i < authorsData.authorsNames.length; i++) {
            if (!existingAuthorsNames.includes(authorsData.authorsNames[i])) {
                const sqlAddAuthor: string = `INSERT INTO authors(author_name) VALUES(?)`;
                
                const [newAuthorOkPacket] = await db.query<OkPacket>(sqlAddAuthor, [authorsData.authorsNames[i]]);
                
                authorsId.push(newAuthorOkPacket.insertId);
            }
            else {
                authorsId.push(existingAuthorsData[existIdx].author_id);
                existIdx++;
            }
        }
        return authorsId;
    }

    let sqlCreateBinding = `
        INSERT INTO books_authors_id VALUES`;
        
    const sqlNewBookData: number[] = [];

    const bookId = await addBookData(newBookAndAuthorData as NewBookData);
    const authorId = await addAuthorData(newBookAndAuthorData as AuthorData);

    for (let i = 0; i < authorId.length; i++) {
        sqlCreateBinding += `
            (?, ?),`;
        sqlNewBookData.push(bookId);
        sqlNewBookData.push(authorId[i]);
    }
    sqlCreateBinding = sqlCreateBinding.slice(0, -1);
    await db.query<RowDataPacket[]>(sqlCreateBinding, sqlNewBookData);
}

export const addBookImageService = async (): Promise<multer.Multer> => {
    const sqlGetLastBookId: string = `
        SELECT MAX(books.book_id) AS id
        FROM books`;    

    const [lastBookId] = await db.query<RowDataPacket[]>(sqlGetLastBookId);
    
    const upload = setMulterForBookImage(lastBookId[0].id, './views/books-page/books-page_files');

    return upload;
}

export const setDeletedBookService = async (id: string): Promise<void> => {
    const sqlSoftDeleteBook: string = `
        UPDATE books
        SET books.deleted = 1
        WHERE books.book_id = ?`;

    await db.query<RowDataPacket[]>(sqlSoftDeleteBook, [id]);
}

export const deleteBooksService = async (): Promise<number[]> => {
    const sqlGetDeletedBooksIds: string = `
        SELECT books.book_id AS id
        FROM books
        WHERE books.deleted = 1`;

    const sqlDeleteBooks: string = `
        DELETE FROM books
        WHERE books.deleted = 1`;

    const [booksIdsToDelete] = await db.query<RowDataPacket[]>(sqlGetDeletedBooksIds);
    const deletedIds: number[] = booksIdsToDelete.map(idObj => idObj.id);
    
    await db.query(sqlDeleteBooks);
    
    return deletedIds;
}