import express from 'express';
import { createRecepie } from './functions/createRecepie';

import prisma from './client';

const app = express();

app.post('/recepie', async (req, res) => {
    const { title, content } = req.body;
    const result = await createRecepie({ title, content });
    res.json(result);
});

app.get('/recepies', async (req, res) => {
    const recepies = await prisma.recepie.findMany();
    res.json(recepies);
});

app.get('/', async (req, res) => {
    res.send({ 'Unicorn recepies server 🦄' });
});

const PORT = process.env.port || 8080;

app.listen(PORT, () => console.log(`🚀 Server ready at: ${PORT}`));
