import prisma from '../client';

interface CretaeRecepie {
    title: string;
    content: string;
}

export async function createRecepie(recepie: CretaeRecepie) {
    await prisma.recepie.create({
        data: recepie,
    });
}
