import prisma from '../../config/prisma';

export const getRecepies = async (query: any) => {
    const recepies = await prisma.recepie.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        skip: 0,
        take: 10,
    });

    return {
        recepies,
    };
};
