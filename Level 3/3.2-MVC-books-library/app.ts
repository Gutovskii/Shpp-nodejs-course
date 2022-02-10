import express, { Express } from 'express';
import expressBasicAuth from 'express-basic-auth';
import { runCron } from './utils/cron';
import booksRouter from './router/books';
import analyticsRouter from './router/analytics';
import adminRouter from './router/admin';

const app: Express = express();

const port = Number(process.env.PORT) || 3000;

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('views/books-page'));
app.use('/book/:id', express.static('views/book-page'));
app.use('/admin', express.static('views/admin-page'));
app.use('/register', express.static('views/register-page'));

app.use('/', booksRouter);
app.use('/admin', expressBasicAuth({
    users: { 'admin': 'admin' },
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


