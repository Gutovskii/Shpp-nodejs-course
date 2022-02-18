import { Request, Response } from "express";
import { SearchParams, SqlBooksData } from "../interfaces/interfaces";
import { getBooksPerPageService } from "../services/books";
import { getQsParamsForBooks } from "../utils/getQsParamsForBooks";

export const getAdminPage = async (req: Request, res: Response) => {
    const booksPerPage: number = 6; // data to change
    const fields: string[] = ['books.book_id', 'books.title', 'books.year_of_publication', 'books.pages', 'books.clicked', 'books.wishful', 'GROUP_CONCAT(CONCAT(" ", authors.author_name)) AS authorsNames'];

    try {
        const qsParams: SearchParams = getQsParamsForBooks(req.query as unknown as SearchParams);

        const booksData: SqlBooksData = await getBooksPerPageService(Object.assign({}, qsParams), fields, booksPerPage);
        
        return res.render('admin-page/admin', {
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

export const adminLogout = (req: Request, res: Response) => {
    try {
        return res.status(401).end();
    } catch (error) {
        return res.json({ error });
    }
}