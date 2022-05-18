import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { createRecipe, getAllRecipes, getRecipe } from '../services/recipe.service';
import logger from '../../config/winston';
import { body, check, matchedData, param, query, ValidationChain, validationResult } from 'express-validator';
import { ValidationException } from '../../errors/ValidationException';
import prisma from '../../config/prisma';

const router = Router();

const FilterValidation: ValidationChain[] = [
    query('servings').if(query('servings').exists()).isNumeric().withMessage({ message: '' }),
    query('time').if(query('time').exists()).isNumeric(),
    query('reference').if(query('reference').exists()).isString(),
    query('difficulty').if(query('difficulty').exists()).isIn(['EASY', 'MEDIUM', 'HARD']),
    query('media').if(query('media').exists()).isIn(['MOVIE', 'BOOK', 'GAME']),
    query('taste').if(query('taste').exists()).isIn(['SWEET', 'SALTY', 'SOUR', 'BITTER', 'SPICY']),
    query('vegetarian').if(query('vegetarian').exists()).isBoolean(),
];

const throwIfInvalid: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new ValidationException(result);
    }

    return next();
};

//get all/filtered recipes
router.get('/recipes', ...FilterValidation, throwIfInvalid, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // logger.info(req.);
        const result = await getAllRecipes(req.query);
        logger.info(req.query);
        res.json(result);
    } catch (e) {
        logger.error(e);
        next();
    }
});

//get recipe detail
router.get(
    '/recipe/:id',
    param('id').isLength({ min: 25, max: 25 }),
    throwIfInvalid,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await getRecipe(matchedData(req).id);
            logger.info(req.params);
            res.json(result);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    },
);

const RecipeValidation: ValidationChain[] = [
    body('name').isString(),
    body('description').isString(),
    body('servings').isNumeric().withMessage({ message: '' }),
    body('time').isNumeric(),
    body('reference').isString(),
    body('difficulty').isIn(['EASY', 'MEDIUM', 'HARD']),
    body('media').isIn(['MOVIE', 'BOOK', 'GAME']),
    body('taste').isIn(['SWEET', 'SALTY', 'SOUR', 'BITTER', 'SPICY']),
    body('vegetarian').isBoolean(),

    check('ingredients.*.name').isString(),
    check('ingredients.*.amount').isNumeric(),
    check('ingredients.*.unit').isIn(['ML', 'G', 'PIECES']),
];

router.post('/recipe', ...RecipeValidation, throwIfInvalid, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await createRecipe(req.body);
        res.json(result);
    } catch (e) {
        next(e);
        logger.error(e);
    }
});

//update recipe
// router.put(
//     '/recipe/:id',
//     ...RecipeValidation,
//     throwIfInvalid,
//     async (req: Request, res: Response, next: NextFunction) => {
//         //check if recipe exists
//         //
//     },
// );

//delete recipe
router.delete(
    '/recipe/:id',
    param('id').trim().isLength({ min: 25, max: 25 }),
    throwIfInvalid,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await prisma.recipes.delete(matchedData(req).id);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    },
);

export default router;
