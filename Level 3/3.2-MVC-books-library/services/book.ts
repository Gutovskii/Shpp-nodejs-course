import { RowDataPacket } from "mysql2";
import { db } from "../database/connection";
import { AuthorData, BookData, NewBookAndAuthorData, NewBookData } from '../interfaces/interfaces';
import { setMulterForBookImage } from "../utils/setMulter";

export const getBookService = async (id: string): Promise<BookData> => {
    const sqlGetBookData: string = `
        SELECT books_authors_id.book_id, books.title, books.year_of_publication, books.pages, books.description, authors.author_name FROM books
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

export const addBookService = async (newBookAndAuthorData: NewBookAndAuthorData) => {
    const addBookData = async (newBookData: NewBookData) => {
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

    const addAuthorData = async (authorData: AuthorData) => {
        const sqlFindExistingAuthorName: string = `
            SELECT authors.author_id AS id, authors.author_name AS name
            FROM authors
            WHERE authors.author_name = ?`;

        const [existingAuthorData] = await db.query<RowDataPacket[]>(sqlFindExistingAuthorName, [authorData.authorName]);
        
        if (!existingAuthorData[0]?.name) {
            const sqlAddAuthor: string = `
                INSERT INTO authors(author_name)
                VALUES(?)
            `;

            const sqlGetLastAuthorId: string = `
                SELECT MAX(authors.author_id) AS id
                FROM authors
            `;
            
            await db.query<RowDataPacket[]>(sqlAddAuthor, [authorData.authorName]);
            const [lastAuthorId] = await db.query<RowDataPacket[]>(sqlGetLastAuthorId);

            return lastAuthorId[0].id;
        }
        else {
            return existingAuthorData[0].id;
        }
    }

    const sqlCreateBinding = `
        INSERT INTO books_authors_id
        VALUES(?, ?);
    `;

    const bookId = await addBookData(newBookAndAuthorData as NewBookData);
    const authorId = await addAuthorData(newBookAndAuthorData as AuthorData);

    await db.query<RowDataPacket[]>(sqlCreateBinding, [bookId, authorId]);
}

export const addBookImageService = async () => {
    const sqlGetLastBookId: string = `
        SELECT MAX(books.book_id) AS id
        FROM books`;    

    const [lastBookId] = await db.query<RowDataPacket[]>(sqlGetLastBookId);
    
    const upload = setMulterForBookImage(lastBookId[0].id, './views/books-page/books-page_files');

    return upload;
}

export const deleteBookService = async (id: string) => {
    const sqlSoftDeleteBook: string = `
        UPDATE books
        SET books.deleted = 1
        WHERE books.book_id = ?`;

    await db.query<RowDataPacket[]>(sqlSoftDeleteBook, [id]);
}