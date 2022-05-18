import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { getAllRecipes, getRecipe } from '../services/recipe.service';
import logger from '../../config/winston';
import { param, query, ValidationChain, validationResult } from 'express-validator';
import { ValidationErrorFound } from '../../errors/ValidationErrorFound';

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
    console.log(result);
    console.log(result.isEmpty());
    if (!result.isEmpty()) {
        throw new ValidationErrorFound(result);
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
            const result = await getRecipe(req.params.id);
            logger.info(req.params);
            res.json(result);
        } catch (e) {
            next(e);
            logger.error(e);
        }
    },
);

const CreationValidation: ValidationChain[] = [];

router.post(
    '/recipe',
    ...CreationValidation,
    throwIfInvalid,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (e) {
            next(e);
            logger.error(e);
        }
    },
);

export default router;
