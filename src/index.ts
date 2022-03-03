import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.get('/recepies', async (req, res) => {
    const recepies = await prisma.recepie.findMany();
    res.json(recepies);
});

app.get('/', async (req, res) => {
    res.json({ 'Hello world': 1 });
});

const PORT = process.env.port || 8080;

app.listen(PORT, () => console.log(`🚀 Server ready at: ${PORT}`));
