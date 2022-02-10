import express, { Router } from 'express';
import { adminLogout, getAdminPage } from '../controllers/admin';
import { addBook, deleteBook } from '../controllers/book';

const router: Router = express.Router();

router.route('/').get(getAdminPage)
router.route('/logout').post(adminLogout);
router.route('/api/v1/create').post(addBook);
router.route('/api/v1/delete/:id').get(deleteBook);

export default router;