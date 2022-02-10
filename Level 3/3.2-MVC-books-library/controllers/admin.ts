import { Request, Response } from "express";
import { SearchParams, SqlBooksData } from "../interfaces/interfaces";
import { getAllBooksPerPageService } from "../services/books";
import { getQsParamsForBooks } from "../utils/getQsParamsForBooks";

export const getAdminPage = async (req: Request, res: Response) => {
    const booksPerPage: number = 6; // data to change
    const fields: string[] = ['books.book_id', 'books.title', 'books.year_of_publication', 'books.pages', 'books.clicked', 'books.wishful', 'authors.author_name'];

    try {
        const qsParams: SearchParams = getQsParamsForBooks(req.query as unknown as SearchParams);

        const booksData: SqlBooksData = await getAllBooksPerPageService(Object.assign({}, qsParams), fields, booksPerPage);
        
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
    return res.status(401).end();
}