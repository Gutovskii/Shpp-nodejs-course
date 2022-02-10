import express, { Router } from 'express';
import { getBook } from '../controllers/book';
import { getBooks } from '../controllers/books';

const router: Router = express.Router();

router.route('/').get(getBooks);
router.route('/book/:id').get(getBook);

export default router;