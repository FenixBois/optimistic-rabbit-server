import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.get('/recepies', async (req, res) => {
    const recepies = await prisma.recepie.findMany();
    res.json(recepies);
});

const server = app.listen(3000, () => console.log('🚀 Server ready at: http://localhost:3000'));
