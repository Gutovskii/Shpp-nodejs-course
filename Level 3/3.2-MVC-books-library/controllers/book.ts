import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { NewBookAndAuthorData } from "../interfaces/interfaces";
import { addBookImageService, addBookService, deleteBookService, getBookService } from "../services/book";

export const getBook = async (req: Request, res: Response) => {
    try {
        const bookData: RowDataPacket = await getBookService(req.params.id);
        return res.render('book-page/book', {
            bookData
        });
    } catch (error) {
        return res.json({ error });
    }
}

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    const upload = await addBookImageService();

    upload.single('bookImage')(req, res, async () => {
        await addBookService(req.body as NewBookAndAuthorData);
        return res.redirect('back');
    });
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteBookService(id);
        return res.redirect('back');
    } catch (error) {
        return res.json({ error });
    }
}