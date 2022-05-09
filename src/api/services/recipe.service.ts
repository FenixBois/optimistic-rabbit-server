import prisma from '../../config/prisma';

export const getAllRecipes = async () => {
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
