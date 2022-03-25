import prisma from '../../config/prisma';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';

export const getRecepies = async () => {
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

export const getRecepie = async (slug: string) => {
    const recepie = await prisma.recepie.findUnique({
        where: {
            slug: slug,
        },
    });

    return {
        recepie,
    };
};

export const createRecepie = async (recepie: Prisma.RecepieCreateInput) => {
    let slug = slugify(recepie.title);

    const existingTitle = await prisma.recepie.findUnique({
        where: {
            slug,
        },
        select: {
            slug: true,
        },
    });
    if (existingTitle) {
        // TODO: replace with error handler / express validator
        throw new Error('Must be uniq');
    }
    if (!recepie.ingredients) {
        // TODO: replace with error handler / express validator
        throw new Error('Must be uniq');
    }

    // @ts-ignore
    const newRecepie = await prisma.recepie.create({
        data: {
            ...recepie,
            slug,
            ingredients: {
                // @ts-ignore
                create: recepie.ingredients.map((ingredient: string) => ({
                    name: ingredient 
                })),
            },
        },
    });

    return {
        newRecepie,
    };
};
