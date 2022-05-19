import express, { Request, Response } from 'express';
import cors from 'cors';
import logger, { requestLogger } from './config/winston';
import routes from './api/routes/routes';
import { ErrorHandler } from './errors/ErrorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(ErrorHandler);

app.use((req: Request, res: Response) => {
    requestLogger(req);
    return res.status(404).send('Not found');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    logger.info(`server up on port ${port}`);
});

