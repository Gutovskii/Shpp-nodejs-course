import { OkPacket, RowDataPacket } from "mysql2";
import { db } from "../database/connection";
import { AuthorData, GetBookDataResult, NewBookAndAuthorData, NewBookData } from '../interfaces/interfaces';
import { setMulterForBookImage } from "../utils/setMulter";

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

export const addBookService = async (newBookAndAuthorData: NewBookAndAuthorData) => {
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

    const addAuthorData = async (authorData: AuthorData): Promise<number[]> => {
        let sqlFindExistingAuthorsNames: string = `
            SELECT authors.author_id, authors.author_name
            FROM authors
            WHERE LOWER(authors.author_name) = LOWER(?)`;

        // Потому что один автор у нас и так должен быть указан, без этого будет ошибка 400
        const sqlAuthorsNamesData: string[] = [authorData.authorsNames[0]];

        if (authorData.authorsNames.length > 1) {
            for (let i = 1; i < authorData.authorsNames.length; i++) {
                sqlFindExistingAuthorsNames += ` OR LOWER(authors.author_name) = LOWER(?)`;
                sqlAuthorsNamesData.push(authorData.authorsNames[i]);
            }
        }

        const [existingAuthorsData] = await db.query<RowDataPacket[]>(sqlFindExistingAuthorsNames, sqlAuthorsNamesData);
        
        const authorsId: number[] = [];
        const existingAuthorsNames: string[] = existingAuthorsData.map(existingAuthorData => existingAuthorData.author_name);
        // const nonExistionAuthorsNames: string[] = authorData.authorsNames.filter((authorName, i) => authorName != existingAuthorsNames[i]); 
        
        for (let i = 0, existIdx = 0; i < authorData.authorsNames.length; i++) {
            if (!existingAuthorsNames.includes(authorData.authorsNames[i])) {
                const sqlAddAuthor: string = `INSERT INTO authors(author_name) VALUES(?)`;
                
                const [newAuthorOkPacket] = await db.query<OkPacket>(sqlAddAuthor, [authorData.authorsNames[i]]);
                
                authorsId.push(newAuthorOkPacket.insertId);
            }
            else {
                authorsId.push(existingAuthorsData[existIdx].author_id);
                existIdx++;
            }
        }
        console.log(authorsId);
        return authorsId;
    }

    const sqlNewBookData: number[] = [];

    let sqlCreateBinding = `
        INSERT INTO books_authors_id VALUES`;

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