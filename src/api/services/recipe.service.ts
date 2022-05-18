import prisma from '../../config/prisma';
import logger from '../../config/winston';
import { EntityNotFound } from '../../errors/EntityNotFound';
import { Prisma } from '@prisma/client';

export const getAllRecipes = async (query: any) => {
    if (query != {}) logger.info(query);

    // let test: any = { servings: '2' };
    //
    // test = +test.servings;
    //
    // logger.info(`test value is: ${test}`);
    if (query.servings) {
        query.servings = +query.servings;
    }
    if (query.time) {
        query.time = +query.time;
    }
    if (query.vegetarian) {
        query.vegetarian = Boolean(JSON.parse(query.vegetarian));
    }

    return prisma.recipes.findMany({
        select: {
            id: true,
            name: true,
            servings: true,
            time: true,
            reference: true,
            difficulty: true,
            media: true,
            taste: true,
            vegetarian: true,
        },
        where: {
            ...query,
        },
    });
};

export const getRecipe = async (id: string) => {
    const result = prisma.recipes.findUnique({
        where: { id: id },
        include: { ingredients: true },
    });
    if (result === null) {
        throw new EntityNotFound();
    }
    return result;
};

export const createRecipe = async (recipe: any) => {
    let recipeCreate: Prisma.recipesCreateInput = {
        name: recipe.name,
        description: recipe.description,
        servings: recipe.servings,
        time: 0,
        reference: recipe.reference,
        difficulty: recipe.difficulty,
        media: recipe.media,
        taste: recipe.taste,
        vegetarian: recipe.vegetarian,
        ingredients: {
            createMany: {
                data: [...recipe.ingredients],
            },
        },
    };
    const result = prisma.recipes.create({
        data: recipeCreate,
        include: { ingredients: true },
    });

    return result;
};

export const deleteRecipe = async (id: string) => {};

// export const updateRecipe = async (id: string, recipe: Prisma.recipesUpdateInput) => {
//     const result = prisma.recipes.update({
//         where: { id: id },
//         data: recipe,
//         include: { ingredients: true },
//     });
//
//     return result;
// };

// export const getRecipes = async (query: any) => {
//     const recipes = await prisma.recipes.findMany();
// };
//
//
// //TODO: check if ingredient exists
// export const createRecipe = async (recipe: Prisma.recipesCreateInput) => {
//     await prisma.recipes.create({
//         data: {
//             ...recipe,
//         },
//     });
// };
