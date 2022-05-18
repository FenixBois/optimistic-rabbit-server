import express, { Response } from 'express';
import cors from 'cors';
import logger from './config/winston';
import routes from './api/routes/routes';
import { ErrorHandler } from './errors/ErrorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(ErrorHandler);

app.use((_, res: Response) => {
    const e = new Error('not found');
    logger.error('not found');
    return res.status(404).json({
        message: e.message,
    });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    logger.info(`server up on port ${port}`);
});

// app.get('/recipes', async (req, res) => {
//     const recepies = await prisma.recipes.findMany({
//         include: {
//             ingredients: true,
//         },
//     });
//     res.json(recepies);
// });
//
// app.post('/recipe', async (req, res) => {
//     res.json(createRecipe(req.body));
// });
//
// app.delete('/recipe', async (req, res) => {});
//
// app.get('/', async (req, res) => {
//     res.send('Unicurn 🦄');
// });
//
// const PORT = process.env.port || 8080;
//
// app.listen(PORT, () => console.log(`🚀 Server ready at: ${PORT}`));
