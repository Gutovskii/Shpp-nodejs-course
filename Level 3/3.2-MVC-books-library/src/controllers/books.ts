import { NextFunction, Request, Response } from "express";
import { NewBookAndAuthorData, SearchParams, SqlBooksData } from "../interfaces/interfaces";
import { addBookImageService, addBookService, setDeletedBookService, getBookService, getBooksPerPageService } from "../services/books";
import { getQsParamsForBooks } from "../utils/getQsParamsForBooks";

export const getBooks = async (req: Request, res: Response) => {
    const booksPerPage: number = 6; // data to change
    const fields: string[] = ['books_authors_id.book_id', 'books.title', 'GROUP_CONCAT(CONCAT(" ", authors.author_name)) AS authorsNames'];

    try {
        const qsParams: SearchParams = getQsParamsForBooks(req.query as unknown as SearchParams);

        const booksData: SqlBooksData = await getBooksPerPageService(Object.assign({}, qsParams), fields, booksPerPage);

        return res.render('books-page/books', {
            booksDataPerPage: booksData.booksDataPerPage,
            booksDataLength: booksData.booksDataLength,
            pageQuantity: booksData.pageQuantity,
            booksPerPage,
            qsParams
        });
    } catch (error) {
        return res.json({ error });
    }
}

export const getBook = async (req: Request, res: Response) => {
    try {
        const bookData = await getBookService(req.params.id);
        if (bookData.errorNotFound) {
            return res.status(404).json(bookData.errorNotFound);
        }
        else {
            return res.render('book-page/book', {
                bookData
            });
        }
    } catch (error) {
        return res.json({ error });
    }
}

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const upload = await addBookImageService();
        upload.single('bookImage')(req, res, async () => {
            await addBookService(req.body as NewBookAndAuthorData);
            return res.redirect('back');
        });
    } catch (error) {
        return res.json({ error });
    }
}

export const setDeletedBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await setDeletedBookService(id);
        return res.json({ done: true });
    } catch (error) {
        return res.json({ error });
    }
}