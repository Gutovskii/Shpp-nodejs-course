import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(express.static('dist'));

let plus = 0;
let minus = 0;

enum PlusMinus {
    Plus = '+',
    Minus = '-'
}

app.get('/', (req: Request, res: Response) => {
    return res.sendFile(__dirname + '/index.html');
});

app.get('/update', (req: Request, res: Response) => {
    return res.json({
        plus,
        minus
    });
})

app.post('/update', (req: Request, res: Response) => {
    const sign: PlusMinus = req.body.sign;

    if (sign === '+') {
        plus++;
        return res.json({ sign, plus });
    }
    if (sign === '-') {
        minus++;
        return res.json({ sign, minus });
    }
});

app.listen(3000, () => console.log('Server started on port: 3000'));