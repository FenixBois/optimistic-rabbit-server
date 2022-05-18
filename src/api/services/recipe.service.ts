import prisma from '../../config/prisma';
import { Prisma } from '@prisma/client';
import { Recipe } from '../../config/models';

export const getAllRecipes = async (query: any) => {
    if (query.name) {
        query = { ...query, name: { contains: query.name } };
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
    return prisma.recipes.findUnique({
        where: { id: id },
        include: { ingredients: true },
    });
};

export const createRecipe = async (recipe: Recipe) => {
    let recipeCreate: Prisma.recipesCreateInput = {
        name: recipe.name,
        description: recipe.description,
        servings: recipe.servings,
        time: recipe.time,
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
    return prisma.recipes.create({
        data: recipeCreate,
        include: { ingredients: true },
    });
};

// export const deleteRecipe = async (id: string) => {};
