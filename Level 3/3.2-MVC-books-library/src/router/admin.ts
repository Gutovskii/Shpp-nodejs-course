import express from 'express';
import { adminLogout, getAdminPage } from '../controllers/admin';
import { addBook, setDeletedBook } from '../controllers/books';

const adminRouter = express.Router();

adminRouter.route('/').get(getAdminPage)
adminRouter.route('/logout').post(adminLogout);
adminRouter.route('/api/v1/create').post(addBook);
adminRouter.route('/api/v1/delete/:id').get(setDeletedBook);

export default adminRouter;
