import { Request, Response } from "express";
import { SearchParams, SqlBooksData } from "../interfaces/interfaces";
import { getAllBooksPerPageService } from "../services/books";
import { getQsParamsForBooks } from "../utils/getQsParamsForBooks";

export const getBooks = async (req: Request, res: Response) => {
    const booksPerPage: number = 6; // data to change
    const fields: string[] = ['books_authors_id.book_id', 'books.title', 'authors.author_name'];

    try {
        const qsParams: SearchParams = getQsParamsForBooks(req.query as unknown as SearchParams);

        const booksData: SqlBooksData = await getAllBooksPerPageService(Object.assign({}, qsParams), fields, booksPerPage);

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