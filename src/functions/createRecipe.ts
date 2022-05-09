import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';


export async function createRecipe(recipe: Prisma.recipesCreateInput) {
    prisma.recipes.create({
        data: {
            ...recipe,
        },
    });
}
