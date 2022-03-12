import cors from 'cors';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import routes from './api/routes/routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (_, res: Response) => {
    res.json({ status: 'API is running on /api' });
});

app.use((_, res: Response, next: NextFunction) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message,
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.info(`server up on port  ${PORT}`);
});
