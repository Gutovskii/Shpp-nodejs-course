import express from 'express';
import 'dotenv/config';
import expressBasicAuth from 'express-basic-auth';
import { runCron } from './src/utils/runCron';
import booksRouter from './src/router/books';
import adminRouter from './src/router/admin'; 
import analyticsRouter from './src/router/analytics';

const app = express();

const port = Number(process.env.PORT) || 5000;

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('views/books-page'));
app.use('/book/:id', express.static('views/book-page'));
app.use('/admin', express.static('views/admin-page'));
app.use('/register', express.static('views/register-page'));

const adminUserData: Record<string, string> = {};
adminUserData[process.env.ADMIN_LOGIN!] = process.env.ADMIN_PASSWORD!

app.use('/', booksRouter);
app.use('/admin', expressBasicAuth({
    users: adminUserData,
    challenge: true
}), adminRouter);
app.use('/api/v1', analyticsRouter);

function bootstrap() {
    try {
        runCron();
        app.listen(port, () => console.log(`Server started on port: ${port}`));
    } catch (error) {
        console.log(error);
    }
}
bootstrap();


