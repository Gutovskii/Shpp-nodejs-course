import express from 'express';
import { getBook, getBooks } from '../controllers/books';

const booksRouter = express.Router();

booksRouter.route('/').get(getBooks);
booksRouter.route('/book/:id').get(getBook);

export default booksRouter;