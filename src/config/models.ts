import { difficulty, media, taste, unit } from '@prisma/client';

export { difficulty, media, taste, unit } from '@prisma/client';

export interface Recipe {
    name: string;
    description: string;
    servings: number;
    time: number;
    reference: string;
    difficulty: difficulty;
    media: media;
    taste: taste;
    vegetarian: boolean;
    ingredients: Ingredient[];
}

interface Ingredient {
    name: string;
    amount: number;
    unit: unit;
}
