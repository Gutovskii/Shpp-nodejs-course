import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { NewBookAndAuthorData } from "../interfaces/interfaces";
import { addBookImageService, addBookService, deleteBookService, getBookService } from "../services/book";

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
            // express-validator check
            // body('title').notEmpty(),
            // body('year').notEmpty(),
            // body('pages').notEmpty(),
            // body('authorName').notEmpty(),
            // body('description').notEmpty();
            
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     console.log(errors.array());
            //     return res.json({ error: '404 Bad Request' });
            // }
            await addBookService(req.body as NewBookAndAuthorData);
            return res.redirect('back');
        });
    } catch (error) {
        return res.json({ error });
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteBookService(id);
        return res.json({ done: true });
    } catch (error) {
        return res.json({ error });
    }
}