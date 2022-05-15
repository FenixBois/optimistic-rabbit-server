import prisma from '../../config/prisma';
import logger from '../../config/winston';

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
